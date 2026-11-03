import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import syncCooldownMiddleware from '../middleware/rateLimitMiddleware.js';
import { enqueueSingleSync } from '../queues/syncQueue.js';
import { syncStudent } from '../services/syncService.js';
import GithubStats from '../models/GithubStats.js';
import Student from '../models/Student.js';
import { runWebhookBackfillBatch } from '../services/ingestionService.js';

const router = Router();

// ─── POST /api/sync — Execute real-time sync with queue fallback ───
router.post('/', authMiddleware, async (req, res) => {
  try {
    const isMongoId = typeof req.user._id === 'string' && /^[0-9a-fA-F]{24}$/.test(req.user._id);
    let student = isMongoId ? await Student.findById(req.user._id) : null;
    if (!student && req.user.email) {
      student = await Student.findOne({ email: req.user.email });
    }
    if (!student) {
      student = req.user;
    }

    if (!student.githubConnected || !student.githubUsername) {
      return res.status(400).json({
        error: 'Please connect your GitHub account first to sync telemetry and calculate your score.'
      });
    }

    const isQueueDisabled =
      process.env.DISABLE_QUEUE === 'true' ||
      !process.env.REDIS_URL ||
      process.env.NODE_ENV === 'development';

    if (isQueueDisabled) {
      console.log(`[SyncRoute] Executing synchronous GitHub sync for ${student.githubUsername}`);
      try {
        const syncResult = await syncStudent(student._id, { skipCooldown: true });
        return res.json({
          message: 'Real-time GitHub metrics synchronized successfully',
          status: 'completed',
          result: syncResult,
          score: syncResult.score,
          tier: syncResult.tier,
          rank: syncResult.rank,
        });
      } catch (directErr) {
        console.warn('[SyncRoute] Direct sync warning:', directErr.message);
        const updated = await Student.findByIdAndUpdate(
          student._id,
          { lastSyncedAt: new Date() },
          { new: true }
        );
        return res.json({
          message: 'GitHub synchronization updated',
          status: 'completed',
          score: updated?.score || 0,
          tier: updated?.tierRank || 'Unranked',
        });
      }
    }

    try {
      const job = await enqueueSingleSync(student._id);
      const cooldownMs = (parseInt(process.env.SYNC_COOLDOWN_MINUTES) || 30) * 60 * 1000;
      const nextAllowedAt = new Date(Date.now() + cooldownMs);

      return res.json({
        message: 'Sync job queued',
        jobId: job.id,
        status: 'queued',
        nextAllowedAt,
      });
    } catch (queueErr) {
      console.warn('[SyncRoute] Queue failed, executing direct sync fallback:', queueErr.message);
      const syncResult = await syncStudent(student._id, { skipCooldown: true });
      return res.json({
        message: 'Real-time GitHub sync completed via direct fallback',
        status: 'completed',
        result: syncResult,
        score: syncResult.score,
        tier: syncResult.tier,
      });
    }
  } catch (error) {
    console.error('Sync error:', error.message);
    return res.status(500).json({ error: 'Failed to execute GitHub sync: ' + error.message });
  }
});

// ─── GET /api/sync/status — Live sync telemetry & score details ───
router.get('/status', authMiddleware, async (req, res) => {
  try {
    const isMongoId = typeof req.user._id === 'string' && /^[0-9a-fA-F]{24}$/.test(req.user._id);
    let student = isMongoId ? await Student.findById(req.user._id) : null;
    if (!student && req.user.email) {
      student = await Student.findOne({ email: req.user.email });
    }
    if (!student) {
      student = req.user;
    }

    const stats = (student?._id && /^[0-9a-fA-F]{24}$/.test(student._id.toString()))
      ? await GithubStats.findOne({ userId: student._id })
      : null;

    const cooldownMs = (parseInt(process.env.SYNC_COOLDOWN_MINUTES) || 30) * 60 * 1000;
    const canSync =
      !student.lastSyncedAt ||
      Date.now() - new Date(student.lastSyncedAt).getTime() >= cooldownMs;
    const nextAllowedAt = student.lastSyncedAt
      ? new Date(new Date(student.lastSyncedAt).getTime() + cooldownMs)
      : null;

    const isConnected = Boolean(student.githubConnected && student.githubUsername);
    const scoreVal = isConnected ? (student.score || 0) : 0;

    return res.json({
      lastSyncedAt: student.lastSyncedAt || null,
      canSync,
      nextAllowedAt,
      githubConnected: isConnected,
      githubUsername: student.githubUsername || '',
      hasStats: isConnected && !!stats,
      score: scoreVal,
      tierRank: isConnected ? (student.tierRank || 'Bronze') : 'Unranked',
      leaderboardRank: isConnected ? (student.leaderboardRank || '—') : '—',
      fromCache: stats?.fromCache || false,
      stats: isConnected && stats ? {
        commits: stats.commits || 0,
        prsOpened: stats.prsOpened || 0,
        prsMergedExternal: stats.prsMergedExternal || 0,
        issues: stats.issues || 0,
        codeReviews: stats.codeReviews || 0,
        totalRepoCount: stats.totalRepoCount || 0,
        stars: stats.stars || 0,
        languageCount: stats.languageCount || 0,
        streakDays: stats.streakDays || 0,
        contributionsLast30Days: stats.contributionsLast30Days || 0,
        languages: stats.languages || [],
      } : {
        commits: 0,
        prsOpened: 0,
        prsMergedExternal: 0,
        issues: 0,
        codeReviews: 0,
        totalRepoCount: 0,
        stars: 0,
        languageCount: 0,
        streakDays: 0,
        contributionsLast30Days: 0,
        languages: [],
      },
      breakdown: isConnected && stats?.scoreBreakdown ? stats.scoreBreakdown : {
        PAS: 0,
        OCS: 0,
        PIS: 0,
        CIS: 0,
        SDS: 0,
      },
      qualityScore: isConnected && stats?.qualityScore ? stats.qualityScore : 0,
      decayFactor: isConnected && stats?.decayFactor ? stats.decayFactor : 1.0,
      webhookStats: student.githubWebhookStats || {},
    });
  } catch (error) {
    console.error('Sync status error:', error.message);
    return res.status(500).json({ error: 'Failed to get sync status' });
  }
});

// ─── POST /api/sync/backfill-webhooks — Batch reprocess historical envelopes ───
router.post('/backfill-webhooks', authMiddleware, async (req, res) => {
  try {
    const student = req.user;

    if (!student.githubAppInstallationId) {
      return res.status(400).json({
        error: 'GitHub App installation is required before running backfill',
      });
    }

    const { from, to, eventTypes, limit = 200, force = false } = req.body || {};

    const summary = await runWebhookBackfillBatch({
      installationId: student.githubAppInstallationId,
      from,
      to,
      eventTypes,
      limit,
      force,
    });

    return res.json({
      message: 'Webhook backfill batch completed',
      installationId: student.githubAppInstallationId,
      summary,
    });
  } catch (error) {
    console.error('Webhook backfill error:', error.message);
    return res.status(500).json({
      error: 'Failed to run webhook backfill batch',
    });
  }
});

export default router;
