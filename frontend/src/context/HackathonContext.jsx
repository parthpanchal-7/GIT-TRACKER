import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { hackathonAPI } from '../services/api';
import { useAuth } from './AuthContext';

const STORAGE_KEY = 'gt_shared_hackathon_state_v2';

const DEFAULT_STATE = {
  event: {
    id: 'event-codestorm-2026',
    name: 'CodeStorm 2026 National Hackathon',
    organizer: 'MITS Hackathon Committee & Academic Governance',
    startTime: new Date(Date.now() - 3600000 * 36).toISOString().slice(0, 16),
    endTime: new Date(Date.now() + 3600000 * 12).toISOString().slice(0, 16),
    tracks: ['AI & Neural Systems', 'Web3 & Decentralization', 'FinTech & Cryptography', 'Open Innovation'],
    prizePool: '₹2,50,000',
    description: 'National collegiate hackathon bringing together coders to build verified algorithmic solutions under forensic timeline tracking.',
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

const getNowFormatted = () => {
  const d = new Date();
  const dayName = d.toLocaleDateString('en-IN', { weekday: 'long' });
  const dayNum = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  return `${dayName}, ${dayNum} • ${timeStr} IST`;
};

const HackathonContext = createContext(null);

export function HackathonProvider({ children }) {
  const { user } = useAuth();

  // Load from local storage or fallback to DEFAULT_STATE
  const [state, setState] = useState(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch {
      // ignore
    }
    return DEFAULT_STATE;
  });

  // Keep state saved and broadcasted
  const commitState = useCallback((updater) => {
    setState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        window.dispatchEvent(new Event('hackathon_state_updated'));
      } catch (e) {
        console.warn('LocalStorage save failed:', e);
      }
      // Async sync to backend
      hackathonAPI.saveState(next).catch(() => {});
      return next;
    });
  }, []);

  // Listen to cross-tab / cross-window updates
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setState(JSON.parse(e.newValue));
        } catch {}
      }
    };
    const handleCustom = () => {
      try {
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) setState(JSON.parse(cached));
      } catch {}
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('hackathon_state_updated', handleCustom);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('hackathon_state_updated', handleCustom);
    };
  }, []);

  // Initial fetch from backend if available
  useEffect(() => {
    hackathonAPI
      .getState()
      .then((res) => {
        if (res.data?.event && res.data?.teams) {
          commitState((prev) => ({
            ...prev,
            event: { ...prev.event, ...res.data.event },
            teams: res.data.teams || prev.teams,
            announcements: res.data.announcements || prev.announcements,
            mentors: res.data.mentors || prev.mentors,
            winners: res.data.winners || prev.winners,
          }));
        }
      })
      .catch(() => {});
  }, [commitState]);

  // Student specific team finder (by user email or default to NeuralForge)
  const myTeam = useMemo(() => {
    if (!user) return null;
    const found = state.teams.find(
      (t) =>
        t.leaderEmail === user.email ||
        t.members.some((m) => m.toLowerCase().includes(user.name?.toLowerCase() || 'parth'))
    );
    return found || state.teams[0];
  }, [state.teams, user]);

  // Actions
  const updateEventSettings = useCallback((eventUpdates) => {
    commitState((prev) => ({
      ...prev,
      event: { ...prev.event, ...eventUpdates },
    }));
  }, [commitState]);

  const approveTeamRegistration = useCallback((teamId) => {
    commitState((prev) => ({
      ...prev,
      teams: prev.teams.map((t) => (t.id === teamId ? { ...t, registrationStatus: 'Approved' } : t)),
    }));
  }, [commitState]);

  const rejectTeamRegistration = useCallback((teamId) => {
    commitState((prev) => ({
      ...prev,
      teams: prev.teams.map((t) => (t.id === teamId ? { ...t, registrationStatus: 'Rejected' } : t)),
    }));
  }, [commitState]);

  const submitRound1 = useCallback((teamId, { pptUrl }) => {
    const timestamp = getNowFormatted();
    commitState((prev) => ({
      ...prev,
      teams: prev.teams.map((t) => {
        if (t.id === teamId) {
          return {
            ...t,
            round1Submission: {
              pptUrl,
              timestamp,
              status: 'Under Review',
            },
          };
        }
        return t;
      }),
    }));
  }, [commitState]);

  const approveRound1Submission = useCallback((teamId) => {
    commitState((prev) => ({
      ...prev,
      teams: prev.teams.map((t) => {
        if (t.id === teamId) {
          return {
            ...t,
            currentRound: 2,
            round1Submission: {
              ...t.round1Submission,
              status: 'Approved',
            },
          };
        }
        return t;
      }),
    }));
  }, [commitState]);

  const rejectRound1Submission = useCallback((teamId) => {
    commitState((prev) => ({
      ...prev,
      teams: prev.teams.map((t) => {
        if (t.id === teamId) {
          return {
            ...t,
            round1Submission: {
              ...t.round1Submission,
              status: 'Rejected',
            },
          };
        }
        return t;
      }),
    }));
  }, [commitState]);

  const submitRound2 = useCallback((teamId, { videoUrl, repoUrl }) => {
    const timestamp = getNowFormatted();
    commitState((prev) => ({
      ...prev,
      teams: prev.teams.map((t) => {
        if (t.id === teamId) {
          const cleanUrl = (repoUrl || t.repoUrl || '').trim().replace(/\.git$/i, '');
          const parts = cleanUrl.split('/').filter(Boolean);
          const repo = parts.length >= 2 ? `${parts[parts.length - 2]}/${parts[parts.length - 1]}` : cleanUrl;
          return {
            ...t,
            repoUrl: repoUrl || t.repoUrl,
            repo: repo || t.repo,
            round2Submission: {
              videoUrl,
              repoUrl: repoUrl || t.repoUrl,
              timestamp,
              status: 'Under Review',
            },
            status: 'Submitted',
          };
        }
        return t;
      }),
    }));
  }, [commitState]);

  const evaluateTeam = useCallback((teamId, evaluationData) => {
    const total =
      Number(evaluationData.innovation || 0) +
      Number(evaluationData.complexity || 0) +
      Number(evaluationData.gitConsistency || 0) +
      Number(evaluationData.presentation || 0);

    const evaluatedAt = getNowFormatted();

    commitState((prev) => ({
      ...prev,
      teams: prev.teams.map((t) => {
        if (t.id === teamId) {
          return {
            ...t,
            evaluation: {
              ...evaluationData,
              total,
              evaluatedAt,
            },
          };
        }
        return t;
      }),
    }));
  }, [commitState]);

  const toggleLeaderboard = useCallback((isLive) => {
    commitState((prev) => ({
      ...prev,
      event: { ...prev.event, isLeaderboardLive: isLive },
    }));
  }, [commitState]);

  const publishResults = useCallback((winnersList = null) => {
    commitState((prev) => {
      // Auto-compute top 3 if not provided
      let finalWinners = winnersList;
      if (!finalWinners || finalWinners.length === 0) {
        const sorted = [...prev.teams].sort((a, b) => (b.evaluation?.total || 0) - (a.evaluation?.total || 0));
        finalWinners = [
          { rank: 1, title: 'Winner (1st Place)', teamName: sorted[0]?.name || 'NeuralForge', prize: '₹1,25,000', score: sorted[0]?.evaluation?.total || 94, track: sorted[0]?.track || 'AI & Neural Systems' },
          { rank: 2, title: '1st Runner-Up (2nd Place)', teamName: sorted[1]?.name || 'AetherAI Squad', prize: '₹75,000', score: sorted[1]?.evaluation?.total || 92, track: sorted[1]?.track || 'AI & Neural Systems' },
          { rank: 3, title: '2nd Runner-Up (3rd Place)', teamName: sorted[2]?.name || 'QuantumPulse Labs', prize: '₹50,000', score: sorted[2]?.evaluation?.total || 83, track: sorted[2]?.track || 'FinTech & Cryptography' },
        ];
      }
      return {
        ...prev,
        event: {
          ...prev.event,
          isResultsPublished: true,
          publishedAt: getNowFormatted(),
        },
        winners: finalWinners,
      };
    });
  }, [commitState]);

  const postAnnouncement = useCallback(({ title, message, priority = 'normal', author = 'Organizing Committee' }) => {
    const newAnn = {
      id: 'ann-' + Date.now(),
      title,
      message,
      priority,
      author,
      time: getNowFormatted(),
    };
    commitState((prev) => ({
      ...prev,
      announcements: [newAnn, ...prev.announcements],
    }));
  }, [commitState]);

  const registerTeam = useCallback(({ name, track, members, pitch, repoUrl }) => {
    const memberList = Array.isArray(members)
      ? members
      : typeof members === 'string'
        ? members.split(',').map((m) => m.trim()).filter(Boolean)
        : ['Parth Panchal (Leader)'];

    if (memberList.length < state.event.minTeamSize) {
      throw new Error(`Team size too small! Minimum ${state.event.minTeamSize} members required.`);
    }
    if (memberList.length > state.event.maxTeamSize) {
      throw new Error(`Team size too large! Maximum ${state.event.maxTeamSize} members allowed.`);
    }

    const cleanUrl = (repoUrl || '').trim().replace(/\.git$/i, '');
    const parts = cleanUrl.split('/').filter(Boolean);
    const repo = parts.length >= 2 ? `${parts[parts.length - 2]}/${parts[parts.length - 1]}` : repoUrl || '';

    const newTeam = {
      id: 'team-' + Date.now(),
      name,
      leaderEmail: user?.email || 'parthpanchal1932@gmail.com',
      track: track || 'AI & Neural Systems',
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

    commitState((prev) => ({
      ...prev,
      teams: [newTeam, ...prev.teams],
      event: { ...prev.event, teamsCount: prev.teams.length + 1 },
    }));

    return newTeam;
  }, [commitState, state.event.minTeamSize, state.event.maxTeamSize, user?.email]);

  const downloadTeamsCsv = useCallback(() => {
    const headers = ['Team ID', 'Team Name', 'Track', 'Members Count', 'Members Roster', 'Status', 'Current Round', 'Score', 'Integrity Status', 'GitHub Repo'];
    const rows = state.teams.map((t) => [
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
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'registered_teams_codestorm_2026.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [state.teams]);

  const importMentorsCsv = useCallback((csvString) => {
    const lines = csvString.split('\n').filter(Boolean);
    const newMentors = [];
    lines.forEach((line, idx) => {
      if (idx === 0 && line.toLowerCase().includes('name')) return; // skip header
      const parts = line.split(',').map((p) => p.trim().replace(/^"|"$/g, ''));
      if (parts[0] && parts[1]) {
        newMentors.push({
          id: 'm-' + Date.now() + '-' + idx,
          name: parts[0],
          email: parts[1],
          expertise: parts[2] || 'Technical Evaluation',
          assignedCount: 0,
        });
      }
    });

    if (newMentors.length > 0) {
      commitState((prev) => ({
        ...prev,
        mentors: [...prev.mentors, ...newMentors],
      }));
    }
    return newMentors.length;
  }, [commitState]);

  const updateTeamIntegrity = useCallback((teamId, auditReport) => {
    commitState((prev) => ({
      ...prev,
      teams: prev.teams.map((t) => {
        if (t.id === teamId) {
          return {
            ...t,
            integrityStatus: auditReport.integrityStatus,
            preEventPct: auditReport.preEventPercentage,
            inWindowPct: auditReport.inWindowPercentage,
            readmeScore: auditReport.readmeQualityScore,
          };
        }
        return t;
      }),
    }));
  }, [commitState]);

  return (
    <HackathonContext.Provider
      value={{
        state,
        event: state.event,
        teams: state.teams,
        announcements: state.announcements,
        mentors: state.mentors,
        winners: state.winners,
        myTeam,
        updateEventSettings,
        approveTeamRegistration,
        rejectTeamRegistration,
        submitRound1,
        approveRound1Submission,
        rejectRound1Submission,
        submitRound2,
        evaluateTeam,
        toggleLeaderboard,
        publishResults,
        postAnnouncement,
        registerTeam,
        downloadTeamsCsv,
        importMentorsCsv,
        updateTeamIntegrity,
      }}
    >
      {children}
    </HackathonContext.Provider>
  );
}

export function useHackathon() {
  const context = useContext(HackathonContext);
  if (!context) throw new Error('useHackathon must be used within HackathonProvider');
  return context;
}
