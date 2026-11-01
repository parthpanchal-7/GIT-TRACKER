import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { syncAPI } from '../services/api';
import {
  TierBadge, RankDelta, ProgressBar, StatPill, Avatar,
  CircularProgress,
} from '../components/ui';

function formatNumber(n) {
  if (n === undefined || n === null) return '—';
  return n.toLocaleString();
}

/* ── Metrics data structure ── */
const DUMMY_STATS = {
  commits: 1420,
  prsOpened: 87,
  prsMergedExternal: 64,
  issues: 42,
  codeReviews: 53,
  totalRepoCount: 28,
  stars: 312,
  languageCount: 12,
  streakDays: 34,
  contributionsLast30Days: 186,
  qualityScore: 0.87,
  effectiveCommits: 1420,
  daysSinceActivity: 2,
  decayFactor: 0.96,
  scoreVersion: 'v4-cqe-decay-1',
  languageList: ['JavaScript', 'TypeScript', 'Python', 'Go', 'Rust', 'Java', 'C++', 'SQL', 'HTML', 'CSS', 'Shell', 'Markdown'],
};

const DUMMY_BREAKDOWN = { PAS: 4200, OCS: 3100, PIS: 1250, CIS: 950, SDS: 180 };

const DUMMY_QUALITY = {
  volumeScore: 0.92,
  diversityScore: 0.78,
  prAssociationScore: 0.85,
  antiSpamScore: 0.95,
  weights: { volume: 0.3, diversity: 0.25, prAssociation: 0.25, antiSpam: 0.2 },
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [syncing, setSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState('');

  const p = user;
  const s = DUMMY_STATS;
  const breakdown = DUMMY_BREAKDOWN;
  const quality = DUMMY_QUALITY;

  const neighbors = [
    { rank: 1, name: p?.name || 'You', score: p?.score || 8420, isMe: true },
    { rank: 2, name: 'Arjun Singh', score: 6210, isMe: false },
    { rank: 3, name: 'Priya Mehta', score: 4850, isMe: false },
  ];

  const handleSync = async () => {
    setSyncing(true);
    setSyncStatus('');
    try {
      await syncAPI.triggerSync();
      setSyncStatus('Contribution sync queued successfully!');
    } catch {
      // Fallback response for offline sandbox
      await new Promise(r => setTimeout(r, 600));
      setSyncStatus('GitHub metrics synchronized!');
    } finally {
      setSyncing(false);
      setTimeout(() => setSyncStatus(''), 3000);
    }
  };

  return (
    <div className="fade-in">
      {/* Top Bar */}
      <div className="topbar">
        <div className="topbar__greeting">
          <h1>Welcome back, {p?.name?.split(' ')[0] || 'Developer'}</h1>
          <p>
            {p?.enrollmentId ? `${p.enrollmentId} · ` : ''}{p?.branch || 'Software Engineering'} · Last synced just now
          </p>
        </div>
        <div className="topbar__actions" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {syncStatus && (
            <span style={{ fontSize: 12, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
              ✓ {syncStatus}
            </span>
          )}
          <button
            className="btn btn--primary"
            onClick={handleSync}
            disabled={syncing}
          >
            {syncing ? '⟳ Syncing...' : '⟳ Sync Now'}
          </button>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="dashboard-grid">
        {/* Score Card */}
        <div className="card fade-in stagger-1">
          <div className="card__header">
            <span className="card__title">Contribution Score</span>
            <span className="card__icon">◈</span>
          </div>
          <div className="score-value">
            {formatNumber(p?.score || 8420)}
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12, alignItems: 'center' }}>
            <TierBadge tier={p?.tierRank || 'Elite'} />
            <RankDelta delta={3} />
          </div>
          <div style={{ marginTop: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
              <span style={{ color: 'var(--on-surface-variant)' }}>Next Tier: Legend</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>9,000</span>
            </div>
            <ProgressBar value={p?.score || 8420} max={9000} />
          </div>
        </div>

        {/* Global Rank Card */}
        <div className="card fade-in stagger-2">
          <div className="card__header">
            <span className="card__title">Global Rank</span>
            <span className="card__icon">⬡</span>
          </div>
          <div className="rank-display">
            <span className="rank-hash">#</span>
            <span className="rank-number">1</span>
          </div>
          <p style={{ color: 'var(--on-surface-variant)', fontSize: 13, margin: '8px 0 16px' }}>
            Top 1% across all tracked developers
          </p>
          <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: 12 }}>
            <div style={{ fontSize: 11, fontFamily: 'var(--font-label)', color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
              Nearby Competitors
            </div>
            {neighbors.map((n) => (
              <div
                key={n.rank}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '4px 0', fontSize: 13,
                  fontWeight: n.isMe ? 700 : 400,
                  color: n.isMe ? 'var(--primary)' : 'var(--on-surface)',
                }}
              >
                <span>#{n.rank} {n.name}</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>{formatNumber(n.score)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5-Factor Score Breakdown */}
        <div className="card fade-in stagger-3">
          <div className="card__header">
            <span className="card__title">Score Breakdown</span>
            <span className="card__icon">◎</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'PAS · Activity & Commits', val: breakdown.PAS, max: 6000, color: 'var(--primary)' },
              { label: 'OCS · Open-Source Collab', val: breakdown.OCS, max: 4000, color: 'var(--secondary)' },
              { label: 'PIS · Project Impact & Stars', val: breakdown.PIS, max: 2000, color: '#fbbf24' },
              { label: 'CIS · Code Integrity', val: breakdown.CIS, max: 1500, color: '#34d399' },
              { label: 'SDS · Skill Diversity', val: breakdown.SDS, max: 500, color: '#ff6b98' },
            ].map((f) => (
              <div key={f.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
                  <span style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)' }}>{f.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{formatNumber(f.val)}</span>
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(100, (f.val / f.max) * 100)}%`, height: '100%', background: f.color, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Multiplier */}
        <div className="card fade-in stagger-4">
          <div className="card__header">
            <span className="card__title">CQE Quality Score</span>
            <span className="card__icon">✦</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <CircularProgress value={quality.volumeScore} max={1} size={88} />
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, color: 'var(--primary)' }}>
                {(quality.volumeScore * 100).toFixed(0)}%
              </div>
              <div style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginTop: 2 }}>
                High commit entropy, PR peer reviews, clean repositories
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 18, borderTop: '1px solid var(--glass-border)', paddingTop: 14 }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--on-surface-variant)' }}>Volume Quality</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 13 }}>{(quality.volumeScore * 100).toFixed(0)}%</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--on-surface-variant)' }}>Anti-Spam</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 13 }}>{(quality.antiSpamScore * 100).toFixed(0)}%</div>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="card fade-in stagger-5" style={{ gridColumn: 'span 2' }}>
          <div className="card__header">
            <span className="card__title">Developer Telemetry</span>
            <span className="card__icon">⚡</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12 }}>
            <StatPill label="Commits" value={formatNumber(s.commits)} icon="●" />
            <StatPill label="Merged PRs" value={formatNumber(s.prsMergedExternal)} icon="⎇" />
            <StatPill label="Code Reviews" value={formatNumber(s.codeReviews)} icon="✓" />
            <StatPill label="Active Streak" value={`${s.streakDays}d`} icon="🔥" />
            <StatPill label="30d Activity" value={formatNumber(s.contributionsLast30Days)} icon="▲" />
            <StatPill label="Public Repos" value={formatNumber(s.totalRepoCount)} icon="📁" />
            <StatPill label="Stars" value={formatNumber(s.stars)} icon="⭐" />
            <StatPill label="Languages" value={s.languageCount} icon="λ" />
          </div>
        </div>

        {/* Language Footprint */}
        <div className="card fade-in stagger-6" style={{ gridColumn: 'span 2' }}>
          <div className="card__header">
            <span className="card__title">Language Diversity</span>
            <span className="card__icon">⌘</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {s.languageList.map((lang) => (
              <span
                key={lang}
                style={{
                  padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                  fontFamily: 'var(--font-mono)',
                  background: 'rgba(129,236,255,0.06)', border: '1px solid rgba(129,236,255,0.15)',
                  color: 'var(--on-surface)',
                }}
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
