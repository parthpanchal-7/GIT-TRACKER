// TODO [PART 2]: Replace Gemini API adapter with genuine Codequiry API v3 & Python ML service

import { Router } from 'express';
import { analyzeRepositoryIntegrity } from '../services/geminiAnalysisService.js';

const router = Router();

// In-memory persistent store for hackathon events during session
let activeEvent = {
  id: 'event-codestorm-2026',
  name: 'CodeStorm 2026 National Hackathon',
  organizer: 'MITS Hackathon Committee',
  startTime: new Date(Date.now() - 3600000 * 36).toISOString(), // 36 hours ago
  endTime: new Date(Date.now() + 3600000 * 12).toISOString(),   // 12 hours remaining
  tracks: ['AI & Neural Systems', 'Web3 & Decentralization', 'FinTech & Cryptography', 'Open Innovation'],
  prizePool: '₹2,50,000',
  description: 'National developer hackathon bringing together collegiate coders to build zero-obscurity algorithms and open infrastructure.',
  minScoreRequirement: 5000,
  registrationStatus: 'open',
  teamsCount: 24,
  submissionsCount: 18,
};

let teams = [
  {
    id: 'team-neuralforge',
    name: 'NeuralForge',
    track: 'AI & Neural Systems',
    repoUrl: 'https://github.com/parthpanchal-7/test.git',
    repo: 'parthpanchal-7/test',
    members: ['Parth Panchal (Leader)', 'Aarav Patel', 'Priya Sharma'],
    pitch: 'Real-time AST token regularity and forensic code analysis engine',
    status: 'Submitted',
    integrityStatus: 'Clear',
    preEventPct: 15,
    inWindowPct: 85,
    readmeScore: 88,
  },
  {
    id: 'team-aetherai',
    name: 'AetherAI Squad',
    track: 'AI & Neural Systems',
    repoUrl: 'https://github.com/parthpanchal-7/GIT-TRACKER.git',
    repo: 'parthpanchal-7/GIT-TRACKER',
    members: ['Rohan Verma', 'Ananya Iyer'],
    pitch: 'Autonomous agent workflows with deterministic telemetry scoring',
    status: 'Submitted',
    integrityStatus: 'Clear',
    preEventPct: 8,
    inWindowPct: 92,
    readmeScore: 94,
  },
  {
    id: 'team-blockflow',
    name: 'BlockFlow Core',
    track: 'Web3 & Decentralization',
    repoUrl: 'https://github.com/ethereum/solidity.git',
    repo: 'ethereum/solidity',
    members: ['Kabir Mehta', 'Vikram Singh'],
    pitch: 'Decentralized smart contract state cache with zero-knowledge proofs',
    status: 'Submitted',
    integrityStatus: 'Needs Review',
    preEventPct: 62,
    inWindowPct: 38,
    readmeScore: 78,
  },
  {
    id: 'team-quantumpulse',
    name: 'QuantumPulse Labs',
    track: 'FinTech & Cryptography',
    repoUrl: 'https://github.com/facebook/react.git',
    repo: 'facebook/react',
    members: ['Neha Gupta', 'Arjun Singh'],
    pitch: 'High-frequency algorithmic trade matching with cryptographic proofs',
    status: 'In Progress',
    integrityStatus: 'Needs Review',
    preEventPct: 75,
    inWindowPct: 25,
    readmeScore: 82,
  },
];

// ─── GET /api/hackathon/event — Current Event Details ───
router.get('/event', (req, res) => {
  return res.json({
    event: activeEvent,
    geminiKeyConfigured: Boolean(process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY),
  });
});

// ─── PATCH /api/hackathon/event — Update Event Details ───
router.patch('/event', (req, res) => {
  const updates = req.body || {};
  activeEvent = { ...activeEvent, ...updates };
  return res.json({ message: 'Event configuration saved', event: activeEvent });
});

// ─── GET /api/hackathon/teams — List All Teams ───
router.get('/teams', (req, res) => {
  return res.json({ teams });
});

// ─── POST /api/hackathon/teams — Register a New Team ───
router.post('/teams', (req, res) => {
  const { name, track, repoUrl, members, pitch } = req.body || {};
  if (!name || !repoUrl) {
    return res.status(400).json({ error: 'Team name and GitHub repository URL are required' });
  }

  const cleanUrl = repoUrl.trim().replace(/\.git$/i, '');
  const parts = cleanUrl.split('/').filter(Boolean);
  const repo = parts.length >= 2 ? `${parts[parts.length - 2]}/${parts[parts.length - 1]}` : repoUrl;

  const newTeam = {
    id: 'team-' + Date.now(),
    name,
    track: track || 'Open Innovation',
    repoUrl,
    repo,
    members: Array.isArray(members) ? members : [members || 'Lead Developer'],
    pitch: pitch || 'Innovative hackathon submission',
    status: 'Submitted',
    integrityStatus: 'Pending Audit',
    preEventPct: 0,
    inWindowPct: 100,
    readmeScore: 75,
  };

  teams.unshift(newTeam);
  activeEvent.teamsCount = teams.length;

  return res.status(201).json({ message: 'Team registered successfully', team: newTeam });
});

// ─── POST /api/hackathon/audit-repo — Run Gemini Timeline & Integrity Audit ───
router.post('/audit-repo', async (req, res) => {
  try {
    const { repoUrl, eventStartTime, eventEndTime, teamName, teamId } = req.body || {};

    if (!repoUrl) {
      return res.status(400).json({ error: 'Repository URL is required' });
    }

    const start = eventStartTime || activeEvent.startTime;
    const end = eventEndTime || activeEvent.endTime;

    const auditResult = await analyzeRepositoryIntegrity({
      repoUrl,
      eventStartTime: start,
      eventEndTime: end,
      teamName: teamName || 'Hackathon Team',
    });

    // Update in-memory team if matched
    if (teamId) {
      const idx = teams.findIndex(t => t.id === teamId || t.name === teamName);
      if (idx !== -1) {
        teams[idx].integrityStatus = auditResult.integrityStatus;
        teams[idx].preEventPct = auditResult.preEventPercentage;
        teams[idx].inWindowPct = auditResult.inWindowPercentage;
        teams[idx].readmeScore = auditResult.readmeQualityScore;
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
