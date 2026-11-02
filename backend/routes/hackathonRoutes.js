// TODO [PART 2]: Replace Gemini API adapter with genuine Codequiry API v3 & Python ML service

import { Router } from 'express';
import { analyzeRepositoryIntegrity } from '../services/geminiAnalysisService.js';

const router = Router();

// In-memory master state for Hackathon
let hackathonState = {
  event: {
    id: 'event-codestorm-2026',
    name: 'CodeStorm 2026 National Hackathon',
    organizer: 'MITS Hackathon Committee',
    startTime: new Date(Date.now() - 3600000 * 36).toISOString().slice(0, 16),
    endTime: new Date(Date.now() + 3600000 * 12).toISOString().slice(0, 16),
    tracks: ['AI & Neural Systems', 'Web3 & Decentralization', 'FinTech & Cryptography', 'Open Innovation'],
    prizePool: '₹2,50,000',
    description: 'National developer hackathon bringing together collegiate coders to build zero-obscurity algorithms and open infrastructure.',
    minScoreRequirement: 5000,
    registrationStatus: 'Open',
    minTeamSize: 2,
    maxTeamSize: 4,
    teamsCount: 24,
    submissionsCount: 18,
    isLeaderboardLive: false,
    isResultsPublished: false,
    publishedAt: null,
  },
  teams: [
    {
      id: 'team-neuralforge',
      name: 'NeuralForge',
      leaderEmail: 'parthpanchal1932@gmail.com',
      track: 'AI & Neural Systems',
      repoUrl: 'https://github.com/parthpanchal-7/test.git',
      repo: 'parthpanchal-7/test',
      members: ['Parth Panchal (Leader)', 'Aarav Patel', 'Priya Sharma'],
      pitch: 'Real-time AST token regularity and forensic code analysis engine',
      registrationStatus: 'Approved',
      currentRound: 2,
      round1Submission: {
        pptUrl: 'https://speakerdeck.com/neuralforge/pitch-deck-2026',
        timestamp: 'Monday, 02 Nov 2026 • 10:15 AM IST',
        status: 'Approved',
      },
      round2Submission: {
        videoUrl: 'https://youtu.be/demo_neuralforge_v2',
        repoUrl: 'https://github.com/parthpanchal-7/test.git',
        timestamp: 'Monday, 02 Nov 2026 • 01:15 PM IST',
        status: 'Under Review',
      },
      evaluation: {
        innovation: 24,
        complexity: 23,
        gitConsistency: 24,
        presentation: 23,
        remarks: 'Exceptional AST token irregularity detector with verifiable commit intervals and realistic multi-developer authoring split.',
        total: 94,
        evaluatedBy: 'Dr. S. K. Sharma (Senior Technical Mentor)',
        evaluatedAt: 'Monday, 02 Nov 2026 • 01:25 PM IST',
      },
      integrityStatus: 'Clear',
      preEventPct: 15,
      inWindowPct: 85,
      readmeScore: 88,
      status: 'Submitted',
    },
    {
      id: 'team-aetherai',
      name: 'AetherAI Squad',
      leaderEmail: 'rohan.verma@mitsgwalior.in',
      track: 'AI & Neural Systems',
      repoUrl: 'https://github.com/parthpanchal-7/GIT-TRACKER.git',
      repo: 'parthpanchal-7/GIT-TRACKER',
      members: ['Rohan Verma (Leader)', 'Ananya Iyer'],
      pitch: 'Autonomous agent workflows with deterministic telemetry scoring',
      registrationStatus: 'Approved',
      currentRound: 2,
      round1Submission: {
        pptUrl: 'https://slides.com/aetherai/deck-2026',
        timestamp: 'Monday, 02 Nov 2026 • 09:30 AM IST',
        status: 'Approved',
      },
      round2Submission: {
        videoUrl: 'https://youtu.be/demo_aetherai_agent',
        repoUrl: 'https://github.com/parthpanchal-7/GIT-TRACKER.git',
        timestamp: 'Monday, 02 Nov 2026 • 12:45 PM IST',
        status: 'Under Review',
      },
      evaluation: {
        innovation: 23,
        complexity: 24,
        gitConsistency: 23,
        presentation: 22,
        remarks: 'Robust agent orchestration model with clean separation of concerns and high commit cadences.',
        total: 92,
        evaluatedBy: 'Dr. S. K. Sharma (Senior Technical Mentor)',
        evaluatedAt: 'Monday, 02 Nov 2026 • 01:10 PM IST',
      },
      integrityStatus: 'Clear',
      preEventPct: 8,
      inWindowPct: 92,
      readmeScore: 94,
      status: 'Submitted',
    },
    {
      id: 'team-blockflow',
      name: 'BlockFlow Core',
      leaderEmail: 'kabir.mehta@mitsgwalior.in',
      track: 'Web3 & Decentralization',
      repoUrl: 'https://github.com/ethereum/solidity.git',
      repo: 'ethereum/solidity',
      members: ['Kabir Mehta (Leader)', 'Vikram Singh', 'Devika Sen'],
      pitch: 'Decentralized smart contract state cache with zero-knowledge proofs',
      registrationStatus: 'Pending Screening',
      currentRound: 1,
      round1Submission: {
        pptUrl: 'https://pitch.com/blockflow/zk-state',
        timestamp: 'Monday, 02 Nov 2026 • 11:20 AM IST',
        status: 'Pending Screening',
      },
      round2Submission: null,
      evaluation: {
        innovation: 20,
        complexity: 22,
        gitConsistency: 18,
        presentation: 20,
        remarks: 'Significant pre-existing commit repository detected. Requires code boundary verification.',
        total: 80,
        evaluatedBy: null,
        evaluatedAt: null,
      },
      integrityStatus: 'Needs Review',
      preEventPct: 62,
      inWindowPct: 38,
      readmeScore: 78,
      status: 'Submitted',
    },
    {
      id: 'team-quantumpulse',
      name: 'QuantumPulse Labs',
      leaderEmail: 'neha.gupta@mitsgwalior.in',
      track: 'FinTech & Cryptography',
      repoUrl: 'https://github.com/facebook/react.git',
      repo: 'facebook/react',
      members: ['Neha Gupta (Leader)', 'Arjun Singh'],
      pitch: 'High-frequency algorithmic trade matching with cryptographic proofs',
      registrationStatus: 'Approved',
      currentRound: 1,
      round1Submission: {
        pptUrl: 'https://canva.com/design/quantumpulse',
        timestamp: 'Monday, 02 Nov 2026 • 11:45 AM IST',
        status: 'Approved',
      },
      round2Submission: null,
      evaluation: {
        innovation: 22,
        complexity: 21,
        gitConsistency: 19,
        presentation: 21,
        remarks: 'Promising financial model but large pre-existing codebase needs closer scrutiny.',
        total: 83,
        evaluatedBy: null,
        evaluatedAt: null,
      },
      integrityStatus: 'Needs Review',
      preEventPct: 75,
      inWindowPct: 25,
      readmeScore: 82,
      status: 'In Progress',
    },
  ],
  announcements: [
    {
      id: 'ann-1',
      title: '🚀 Round 2 Video Demo & GitHub Link Submission Live!',
      message: 'All shortlisted teams who cleared Round 1 Idea Screening can now upload their 3-minute video walk-through and official GitHub repository.',
      time: 'Monday, 02 Nov 2026 • 12:00 PM IST',
      priority: 'high',
      author: 'Hackathon Organizing Committee',
    },
    {
      id: 'ann-2',
      title: '⚡ Codequiry Anti-Cheat & Forensic Scan Scheduled',
      message: 'Automated commit timeline forensics will cross-verify commit timestamps against the sanctioned event launch window. Ensure all commits are pushed to main.',
      time: 'Monday, 02 Nov 2026 • 10:30 AM IST',
      priority: 'normal',
      author: 'Technical Jury',
    },
    {
      id: 'ann-3',
      title: '📢 Mandatory Team Sizing Rules Active',
      message: 'All teams must have between 2 and 4 verified members. Solitary submissions or teams with >4 members will not qualify for jury evaluation.',
      time: 'Monday, 02 Nov 2026 • 09:00 AM IST',
      priority: 'warning',
      author: 'Academic Governance',
    },
  ],
  mentors: [
    { id: 'm-1', name: 'Dr. S. K. Sharma', email: 'dr.sharma@mits.ac.in', expertise: 'AI & Neural Systems, Code Forensics', assignedCount: 4 },
    { id: 'm-2', name: 'Prof. Anjali Saxena', email: 'anjali.saxena@mitsgwalior.in', expertise: 'Web3 & Cryptography', assignedCount: 3 },
    { id: 'm-3', name: 'Er. Rajesh Kothari', email: 'rajesh.kothari@techcorp.io', expertise: 'Cloud Architecture & DevOps', assignedCount: 2 },
  ],
  winners: [
    { rank: 1, title: 'Winner (1st Place)', teamName: 'NeuralForge', prize: '₹1,25,000', score: 94, track: 'AI & Neural Systems' },
    { rank: 2, title: '1st Runner-Up (2nd Place)', teamName: 'AetherAI Squad', prize: '₹75,000', score: 92, track: 'AI & Neural Systems' },
    { rank: 3, title: '2nd Runner-Up (3rd Place)', teamName: 'QuantumPulse Labs', prize: '₹50,000', score: 83, track: 'FinTech & Cryptography' },
  ],
};

// ─── GET /api/hackathon/state — Full State Sync ───
router.get('/state', (req, res) => {
  return res.json({
    ...hackathonState,
    geminiKeyConfigured: Boolean(process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY),
  });
});

// ─── POST /api/hackathon/state — Full State Overwrite ───
router.post('/state', (req, res) => {
  const updates = req.body || {};
  if (updates.event) hackathonState.event = { ...hackathonState.event, ...updates.event };
  if (updates.teams) hackathonState.teams = updates.teams;
  if (updates.announcements) hackathonState.announcements = updates.announcements;
  if (updates.mentors) hackathonState.mentors = updates.mentors;
  if (updates.winners) hackathonState.winners = updates.winners;
  return res.json({ success: true, message: 'Hackathon master state updated', state: hackathonState });
});

// ─── GET /api/hackathon/event — Current Event Details (Legacy support) ───
router.get('/event', (req, res) => {
  return res.json({
    event: hackathonState.event,
    geminiKeyConfigured: Boolean(process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY),
  });
});

// ─── PATCH /api/hackathon/event — Update Event Details ───
router.patch('/event', (req, res) => {
  const updates = req.body || {};
  hackathonState.event = { ...hackathonState.event, ...updates };
  return res.json({ message: 'Event configuration saved', event: hackathonState.event });
});

// ─── GET /api/hackathon/teams — List All Teams ───
router.get('/teams', (req, res) => {
  return res.json({ teams: hackathonState.teams });
});

// ─── PATCH /api/hackathon/teams/:id — Update Team ───
router.patch('/teams/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body || {};
  const idx = hackathonState.teams.findIndex(t => t.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Team not found' });
  }
  hackathonState.teams[idx] = { ...hackathonState.teams[idx], ...updates };
  return res.json({ success: true, team: hackathonState.teams[idx] });
});

// ─── POST /api/hackathon/teams — Register a New Team ───
router.post('/teams', (req, res) => {
  const { name, track, repoUrl, members, pitch, leaderEmail } = req.body || {};
  if (!name) {
    return res.status(400).json({ error: 'Team name is required' });
  }

  const cleanUrl = (repoUrl || '').trim().replace(/\.git$/i, '');
  const parts = cleanUrl.split('/').filter(Boolean);
  const repo = parts.length >= 2 ? `${parts[parts.length - 2]}/${parts[parts.length - 1]}` : repoUrl || '';

  const memberList = Array.isArray(members)
    ? members
    : typeof members === 'string'
      ? members.split(',').map(m => m.trim()).filter(Boolean)
      : ['Parth Panchal (Leader)'];

  const newTeam = {
    id: 'team-' + Date.now(),
    name,
    leaderEmail: leaderEmail || 'parthpanchal1932@gmail.com',
    track: track || 'Open Innovation',
    repoUrl: repoUrl || '',
    repo,
    members: memberList,
    pitch: pitch || 'Innovative hackathon prototype',
    registrationStatus: 'Pending Screening',
    currentRound: 1,
    round1Submission: null,
    round2Submission: null,
    evaluation: {
      innovation: 0,
      complexity: 0,
      gitConsistency: 0,
      presentation: 0,
      remarks: '',
      total: 0,
    },
    integrityStatus: 'Pending Audit',
    preEventPct: 0,
    inWindowPct: 100,
    readmeScore: 80,
    status: 'Registered',
  };

  hackathonState.teams.unshift(newTeam);
  hackathonState.event.teamsCount = hackathonState.teams.length;

  return res.status(201).json({ message: 'Team registered successfully', team: newTeam });
});

// ─── POST /api/hackathon/announcements — Post Live Notification ───
router.post('/announcements', (req, res) => {
  const { title, message, priority, author } = req.body || {};
  if (!title || !message) {
    return res.status(400).json({ error: 'Title and message are required' });
  }
  const dateStr = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const timeStr = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const newAnn = {
    id: 'ann-' + Date.now(),
    title,
    message,
    time: `${dateStr} • ${timeStr} IST`,
    priority: priority || 'normal',
    author: author || 'Hackathon Organizing Committee',
  };
  hackathonState.announcements.unshift(newAnn);
  return res.status(201).json({ message: 'Announcement broadcasted', announcement: newAnn });
});

// ─── GET /api/hackathon/export/teams-csv — Download Registered Teams CSV ───
router.get('/export/teams-csv', (req, res) => {
  const headers = ['Team ID', 'Team Name', 'Track', 'Members Count', 'Members Roster', 'Status', 'Current Round', 'Score', 'Integrity Status', 'GitHub Repo'];
  const rows = hackathonState.teams.map(t => [
    `"${t.id}"`,
    `"${t.name}"`,
    `"${t.track}"`,
    t.members.length,
    `"${t.members.join('; ')}"`,
    `"${t.registrationStatus}"`,
    `Round ${t.currentRound}`,
    t.evaluation?.total || 0,
    `"${t.integrityStatus}"`,
    `"${t.repoUrl || ''}"`,
  ]);
  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="registered_teams_codestorm_2026.csv"');
  return res.send(csvContent);
});

// ─── POST /api/hackathon/publish-results — Publish Official Results ───
router.post('/publish-results', (req, res) => {
  const { winners } = req.body || {};
  hackathonState.event.isResultsPublished = true;
  hackathonState.event.publishedAt = new Date().toISOString();
  if (winners && Array.isArray(winners)) {
    hackathonState.winners = winners;
  }
  return res.json({ success: true, message: 'Results published successfully', event: hackathonState.event, winners: hackathonState.winners });
});

// ─── POST /api/hackathon/audit-repo — Run Gemini Timeline & Integrity Audit ───
router.post('/audit-repo', async (req, res) => {
  try {
    const { repoUrl, eventStartTime, eventEndTime, teamName, teamId } = req.body || {};

    if (!repoUrl) {
      return res.status(400).json({ error: 'Repository URL is required' });
    }

    const start = eventStartTime || hackathonState.event.startTime;
    const end = eventEndTime || hackathonState.event.endTime;

    const auditResult = await analyzeRepositoryIntegrity({
      repoUrl,
      eventStartTime: start,
      eventEndTime: end,
      teamName: teamName || 'Hackathon Team',
    });

    // Update in-memory team if matched
    if (teamId) {
      const idx = hackathonState.teams.findIndex(t => t.id === teamId || t.name === teamName);
      if (idx !== -1) {
        hackathonState.teams[idx].integrityStatus = auditResult.integrityStatus;
        hackathonState.teams[idx].preEventPct = auditResult.preEventPercentage;
        hackathonState.teams[idx].inWindowPct = auditResult.inWindowPercentage;
        hackathonState.teams[idx].readmeScore = auditResult.readmeQualityScore;
      }
    }

    return res.json({
      success: true,
      audit: auditResult,
    });
  } catch (error) {
    console.error('[HackathonRoute] Repository audit error:', error.message);
    return res.status(500).json({ error: 'Failed to complete repository audit: ' + error.message });
  }
});

export default router;
