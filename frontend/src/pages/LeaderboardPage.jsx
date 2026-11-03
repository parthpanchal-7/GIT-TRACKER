import { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { leaderboardAPI } from '../services/api';
import { TierBadge, Avatar } from '../components/ui';

function formatNumber(n) {
  if (n === undefined || n === null) return '—';
  return n.toLocaleString();
}

const COLLEGES = ['Global', 'MITS Gwalior', 'IIIT Hyderabad', 'IIT Bombay'];
const DEPARTMENTS = ['All', 'CSE', 'AI', 'IT', 'ECE'];
const YEARS = ['All', '1st Year', '2nd Year', '3rd Year', '4th Year'];
const TIERS = ['All', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Elite'];

// Rich student directory
const MOCK_LEADERBOARD = [

  {
    _id: 'comm-1',
    name: 'Priya Sharma',
    email: 'priya@mits.ac.in',
    githubUsername: 'priya-sharma',
    enrollmentId: '0901CS211045',
    college: 'MITS Gwalior',
    department: 'CSE',
    year: '4th Year',
    score: 9450,
    tierRank: 'Elite',
    weeklyDelta: '+12%',
    lastActiveDays: 1,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
  },
  {
    _id: 'comm-2',
    name: 'Rohan Verma',
    email: 'rohan.v@iiit.ac.in',
    githubUsername: 'rohan-verma',
    enrollmentId: '2022IT1088',
    college: 'IIIT Hyderabad',
    department: 'IT',
    year: '3rd Year',
    score: 8320,
    tierRank: 'Platinum',
    weeklyDelta: '+24%',
    lastActiveDays: 2,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
  },
  {
    _id: 'comm-3',
    name: 'Aarav Patel',
    email: 'aarav.ai@mits.ac.in',
    githubUsername: 'aarav-patel',
    enrollmentId: '0901AI231012',
    college: 'MITS Gwalior',
    department: 'AI',
    year: '2nd Year',
    score: 7420,
    tierRank: 'Gold',
    weeklyDelta: '+31%',
    lastActiveDays: 1,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
  },
  {
    _id: 'comm-4',
    name: 'Ananya Iyer',
    email: 'ananya@iitb.ac.in',
    githubUsername: 'ananya-iyer',
    enrollmentId: '22D070034',
    college: 'IIT Bombay',
    department: 'ECE',
    year: '3rd Year',
    score: 6180,
    tierRank: 'Gold',
    weeklyDelta: '+8%',
    lastActiveDays: 3,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  },
  {
    _id: 'comm-5',
    name: 'Vikram Singh',
    email: 'vikram.s@mits.ac.in',
    githubUsername: 'vikram-codes',
    enrollmentId: '0901CS211099',
    college: 'MITS Gwalior',
    department: 'CSE',
    year: '4th Year',
    score: 5200,
    tierRank: 'Silver',
    weeklyDelta: '-2%',
    lastActiveDays: 18, // Inactive
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
  },
  {
    _id: 'comm-6',
    name: 'Neha Gupta',
    email: 'neha.g@mits.ac.in',
    githubUsername: 'neha-tech',
    enrollmentId: '0901IT241019',
    college: 'MITS Gwalior',
    department: 'IT',
    year: '1st Year',
    score: 4150,
    tierRank: 'Silver',
    weeklyDelta: '+19%',
    lastActiveDays: 2,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
  },
  {
    _id: 'comm-7',
    name: 'Kabir Mehta',
    email: 'kabir.m@mits.ac.in',
    githubUsername: 'kabir-mehta',
    enrollmentId: '0901EC231005',
    college: 'MITS Gwalior',
    department: 'ECE',
    year: '2nd Year',
    score: 3200,
    tierRank: 'Bronze',
    weeklyDelta: '-5%',
    lastActiveDays: 22, // Inactive
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
  },
];

export default function LeaderboardPage() {
  const { user, activePov, isOrganizer, isAdmin, isInstitution } = useAuth();
  const [selectedCollege, setSelectedCollege] = useState('Global');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedTier, setSelectedTier] = useState('All');
  const [dbStudents, setDbStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const isInstitutionView = isOrganizer || isAdmin || isInstitution || activePov === 'organizer' || activePov === 'admin';

  // Fetch real students from API if available
  useEffect(() => {
    let active = true;
    const fetchBoard = async () => {
      setLoading(true);
      try {
        const res = await leaderboardAPI.getLeaderboard({ limit: 100 });
        if (active && res?.data?.students && res.data.students.length > 0) {
          setDbStudents(res.data.students);
        }
      } catch {
        // Fallback to rich mock roster
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchBoard();
    return () => { active = false; };
  }, []);

  // Compute filtered & ranked list
  const filteredStudents = useMemo(() => {
    let list = dbStudents.length > 0 ? [...dbStudents] : [...MOCK_LEADERBOARD];

    // Ensure logged-in user is present
    const currentEmail = user?.email || 'parthpanchal1932@gmail.com';
    const exists = list.some(s => s.email === currentEmail || s.githubUsername === user?.githubUsername);
    if (!exists && user) {
      list.push({
        _id: user._id || 'user-current',
        name: user.name || 'Developer',
        email: user.email,
        githubUsername: user.githubUsername || '',
        enrollmentId: user.enrollmentId || 'BTCS24O1089',
        college: user.college || 'MITS Gwalior',
        department: user.branch || 'CSE',
        year: user.year ? `${user.year}th Year` : '2nd Year',
        score: user.score || 0,
        tierRank: user.score > 0 ? (user.tierRank || 'Bronze') : 'Unranked',
        isMe: true,
        weeklyDelta: user.score > 0 ? '+12%' : '0%',
        lastActiveDays: user.score > 0 ? 0 : 30,
        avatar: user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      });
    }

    // Sort descending by score
    list.sort((a, b) => (b.score || 0) - (a.score || 0));

    // Apply College filter
    if (selectedCollege !== 'Global') {
      list = list.filter(s => (s.college || 'MITS Gwalior') === selectedCollege);
    }

    // Apply Department filter
    if (selectedDept !== 'All') {
      list = list.filter(s => {
        const dept = s.department || (s.branch?.includes('Computer') ? 'CSE' : s.branch?.includes('Information') ? 'IT' : s.branch?.includes('Electronic') ? 'ECE' : s.branch);
        return dept === selectedDept;
      });
    }

    // Apply Academic Year filter
    if (selectedYear !== 'All') {
      list = list.filter(s => {
        const yStr = String(s.year || '');
        return yStr.includes(selectedYear.charAt(0)) || yStr === selectedYear;
      });
    }

    // Apply Tier filter
    if (selectedTier !== 'All') {
      list = list.filter(s => s.tierRank === selectedTier);
    }

    return list.map((s, idx) => ({
      ...s,
      displayRank: idx + 1,
      isMe: s.isMe || (user && (s.email === user.email || s._id === user._id || s.githubUsername === user.githubUsername)),
    }));
  }, [dbStudents, user, selectedCollege, selectedDept, selectedYear, selectedTier]);

  // Find the pinned user record
  const pinnedUser = useMemo(() => {
    const found = filteredStudents.find(s => s.isMe);
    if (found) return found;
    return {
      name: user?.name || 'Developer',
      enrollmentId: user?.enrollmentId || 'BTCS24O1089',
      college: user?.college || 'MITS Gwalior',
      department: user?.branch || 'CSE',
      year: user?.year ? `${user.year}th Year` : '2nd Year',
      score: user?.score || 0,
      tierRank: user?.score > 0 ? (user?.tierRank || 'Bronze') : 'Unranked',
      displayRank: user?.score > 0 ? (user?.leaderboardRank || '—') : '—',
      isMe: true,
      avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    };
  }, [filteredStudents, user]);

  // Cohort analytics for Institution POV
  const institutionCohorts = useMemo(() => {
    const rising = MOCK_LEADERBOARD.filter(s => s.weeklyDelta && s.weeklyDelta.startsWith('+') && parseInt(s.weeklyDelta) >= 15);
    const inactive = MOCK_LEADERBOARD.filter(s => s.lastActiveDays >= 14);
    return { rising, inactive };
  }, []);

  return (
    <div className="fade-in" style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 20px 60px' }}>
      {/* ── PAGE HEADER ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 16, marginBottom: 24,
      }}>
        <div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, margin: 0,
            background: 'linear-gradient(135deg, var(--text-primary) 40%, #BFF549 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Multi-Scope Campus & Global Leaderboard
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--on-surface-variant)' }}>
            Real-time algorithmic ranking filtered across colleges, departments, academic cohorts, and verified tiers.
          </p>
        </div>

        {isInstitutionView && (
          <div style={{
            padding: '6px 14px', borderRadius: 999, fontSize: 12,
            fontFamily: 'var(--font-mono)', fontWeight: 700,
            background: 'rgba(129, 236, 255, 0.12)', color: '#81ecff',
            border: '1px solid rgba(129, 236, 255, 0.3)',
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            <span>🏛️</span> Institution Dean View Active
          </div>
        )}
      </div>

      {/* ── INSTITUTION POV COMPARISON & COHORTS (User Request Requirement) ── */}
      {isInstitutionView && (
        <div style={{ marginBottom: 28 }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16, marginBottom: 20,
          }}>
            {/* Department Comparison Card */}
            <div className="card" style={{
              padding: 20, borderRadius: 16,
              background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
            }}>
              <div style={{ fontSize: 12, fontFamily: 'var(--font-label)', color: '#81ecff', textTransform: 'uppercase', fontWeight: 700, marginBottom: 12 }}>
                Department Average Score Comparison
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { dept: 'CSE (Computer Science)', avg: 7850, active: 142, color: '#BFF549' },
                  { dept: 'AI (Artificial Intelligence)', avg: 7420, active: 88, color: '#81ecff' },
                  { dept: 'IT (Information Tech)', avg: 6910, active: 96, color: '#fbbf24' },
                  { dept: 'ECE (Electronics)', avg: 5640, active: 54, color: '#d674ff' },
                ].map(d => (
                  <div key={d.dept}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                      <span style={{ fontWeight: 600 }}>{d.dept}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: d.color }}>{d.avg} avg ({d.active} devs)</span>
                    </div>
                    <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ width: `${(d.avg / 9000) * 100}%`, height: '100%', background: d.color, borderRadius: 3 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Year Velocity Card */}
            <div className="card" style={{
              padding: 20, borderRadius: 16,
              background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
            }}>
              <div style={{ fontSize: 12, fontFamily: 'var(--font-label)', color: '#BFF549', textTransform: 'uppercase', fontWeight: 700, marginBottom: 12 }}>
                Academic Year Performance Velocity
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { year: '4th Year (Senior)', avg: 8120, label: 'Production Ready', color: '#BFF549' },
                  { year: '3rd Year (Junior)', avg: 7240, label: 'Accelerating', color: '#81ecff' },
                  { year: '2nd Year (Sophomore)', avg: 5480, label: 'Foundations', color: '#fbbf24' },
                  { year: '1st Year (Freshman)', avg: 3920, label: 'Onboarding', color: '#94a3b8' },
                ].map(y => (
                  <div key={y.year}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                      <span style={{ fontWeight: 600 }}>{y.year} · <span style={{ color: 'var(--on-surface-variant)' }}>{y.label}</span></span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: y.color }}>{y.avg} pts</span>
                    </div>
                    <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ width: `${(y.avg / 9000) * 100}%`, height: '100%', background: y.color, borderRadius: 3 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cohort Highlights: Rising vs Inactive */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 16, marginBottom: 8,
          }}>
            {/* Rising Accelerators */}
            <div className="card" style={{
              padding: 20, borderRadius: 16,
              background: 'rgba(191, 245, 73, 0.03)', border: '1px solid rgba(191, 245, 73, 0.2)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 16 }}>🔥</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#BFF549', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Rising Accelerators (Top Weekly Velocity)
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {institutionCohorts.rising.map(s => (
                  <div key={s._id} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.02)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar src={s.avatar} alt={s.name} size="sm" />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--on-surface-variant)' }}>{s.department} · {s.year}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        padding: '2px 8px', borderRadius: 999, fontSize: 11,
                        background: 'rgba(191, 245, 73, 0.15)', color: '#BFF549',
                        fontFamily: 'var(--font-mono)', fontWeight: 700,
                      }}>
                        {s.weeklyDelta} jump
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inactive / At-Risk Cohort */}
            <div className="card" style={{
              padding: 20, borderRadius: 16,
              background: 'rgba(255, 113, 108, 0.03)', border: '1px solid rgba(255, 113, 108, 0.2)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 16 }}>⚠️</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#ff716c', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  At-Risk Cohort (&gt;14 Days Inactivity)
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {institutionCohorts.inactive.map(s => (
                  <div key={s._id} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.02)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar src={s.avatar} alt={s.name} size="sm" />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--on-surface-variant)' }}>{s.department} · {s.year}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        padding: '2px 8px', borderRadius: 999, fontSize: 11,
                        background: 'rgba(255, 113, 108, 0.15)', color: '#ff716c',
                        fontFamily: 'var(--font-mono)', fontWeight: 700,
                      }}>
                        {s.lastActiveDays}d inactive
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── PINNED CURRENT STUDENT CARD (User Request Requirement) ── */}
      <div className="card" style={{
        padding: '16px 20px', borderRadius: 16,
        background: 'rgba(191, 245, 73, 0.05)',
        border: '1.5px solid rgba(191, 245, 73, 0.4)',
        boxShadow: '0 0 24px rgba(191, 245, 73, 0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 16, marginBottom: 28,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{
            padding: '4px 10px', borderRadius: 999, fontSize: 11,
            background: '#BFF549', color: '#04060F',
            fontFamily: 'var(--font-mono)', fontWeight: 800, letterSpacing: '0.04em',
          }}>
            PINNED (YOU)
          </span>
          <Avatar src={pinnedUser.avatar} alt={pinnedUser.name} size="md" />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
                {pinnedUser.name}
              </span>
              <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--on-surface-variant)' }}>
                @{pinnedUser.githubUsername || 'parthpanchal-7'}
              </span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginTop: 2 }}>
              {pinnedUser.college || 'MITS Gwalior'} · {pinnedUser.department || 'CSE'} · {pinnedUser.year || '4th Year'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)', textTransform: 'uppercase' }}>
              Your Rank
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 800, color: '#BFF549' }}>
              #{pinnedUser.displayRank || 2}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)', textTransform: 'uppercase' }}>
              Your Score
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>
              {formatNumber(pinnedUser.score || 8420)} pts
            </div>
          </div>
          <TierBadge tier={pinnedUser.tierRank || 'Elite'} />
        </div>
      </div>

      {/* ── MULTI-SCOPE FILTER CONTROLS ── */}
      <div style={{
        padding: '16px 20px', borderRadius: 16,
        background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
        marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        {/* Scope / College Row */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: 11, color: '#81ecff', fontFamily: 'var(--font-mono)', fontWeight: 700, width: 100 }}>
            COLLEGE:
          </span>
          {COLLEGES.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCollege(c)}
              style={{
                padding: '6px 14px', borderRadius: 8, fontSize: 12,
                fontFamily: 'var(--font-label)', fontWeight: 600, cursor: 'pointer',
                border: selectedCollege === c ? '1px solid #81ecff' : '1px solid var(--border-subtle)',
                background: selectedCollege === c ? 'rgba(129, 236, 255, 0.15)' : 'rgba(255,255,255,0.02)',
                color: selectedCollege === c ? '#81ecff' : 'var(--on-surface-variant)',
                transition: 'all 0.2s ease',
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Department Row */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: 11, color: '#BFF549', fontFamily: 'var(--font-mono)', fontWeight: 700, width: 100 }}>
            DEPARTMENT:
          </span>
          {DEPARTMENTS.map(d => (
            <button
              key={d}
              onClick={() => setSelectedDept(d)}
              style={{
                padding: '6px 14px', borderRadius: 8, fontSize: 12,
                fontFamily: 'var(--font-label)', fontWeight: 600, cursor: 'pointer',
                border: selectedDept === d ? '1px solid #BFF549' : '1px solid var(--border-subtle)',
                background: selectedDept === d ? 'rgba(191, 245, 73, 0.15)' : 'rgba(255,255,255,0.02)',
                color: selectedDept === d ? '#BFF549' : 'var(--on-surface-variant)',
                transition: 'all 0.2s ease',
              }}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Academic Year Row */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: 11, color: '#fbbf24', fontFamily: 'var(--font-mono)', fontWeight: 700, width: 100 }}>
            ACADEMIC YEAR:
          </span>
          {YEARS.map(y => (
            <button
              key={y}
              onClick={() => setSelectedYear(y)}
              style={{
                padding: '6px 14px', borderRadius: 8, fontSize: 12,
                fontFamily: 'var(--font-label)', fontWeight: 600, cursor: 'pointer',
                border: selectedYear === y ? '1px solid #fbbf24' : '1px solid var(--border-subtle)',
                background: selectedYear === y ? 'rgba(251, 191, 36, 0.15)' : 'rgba(255,255,255,0.02)',
                color: selectedYear === y ? '#fbbf24' : 'var(--on-surface-variant)',
                transition: 'all 0.2s ease',
              }}
            >
              {y}
            </button>
          ))}
        </div>

        {/* Tier Row */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: 11, color: '#d674ff', fontFamily: 'var(--font-mono)', fontWeight: 700, width: 100 }}>
            TIER RANK:
          </span>
          {TIERS.map(t => (
            <button
              key={t}
              onClick={() => setSelectedTier(t)}
              style={{
                padding: '6px 14px', borderRadius: 8, fontSize: 12,
                fontFamily: 'var(--font-label)', fontWeight: 600, cursor: 'pointer',
                border: selectedTier === t ? '1px solid #d674ff' : '1px solid var(--border-subtle)',
                background: selectedTier === t ? 'rgba(214, 116, 255, 0.15)' : 'rgba(255,255,255,0.02)',
                color: selectedTier === t ? '#d674ff' : 'var(--on-surface-variant)',
                transition: 'all 0.2s ease',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ── RANKINGS TABLE ── */}
      <div className="card" style={{
        padding: 0, borderRadius: 16, overflow: 'hidden',
        background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
      }}>
        <div style={{
          padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Active Competitors ({filteredStudents.length})
          </span>
          <span style={{ fontSize: 12, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-mono)' }}>
            Showing {selectedCollege} · {selectedDept} · {selectedYear} · {selectedTier}
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-subtle)' }}>
                <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--on-surface-variant)', width: 80 }}>RANK</th>
                <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--on-surface-variant)' }}>DEVELOPER</th>
                <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--on-surface-variant)' }}>COLLEGE & COHORT</th>
                <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--on-surface-variant)' }}>TIER</th>
                <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--on-surface-variant)', textAlign: 'right' }}>CONTRIBUTION SCORE</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s) => {
                const isTop1 = s.displayRank === 1;
                const isTop2 = s.displayRank === 2;
                const isTop3 = s.displayRank === 3;
                const rankColor = isTop1 ? '#BFF549' : isTop2 ? '#81ecff' : isTop3 ? '#fbbf24' : 'var(--text-primary)';

                return (
                  <tr
                    key={s._id}
                    style={{
                      borderBottom: '1px solid var(--border-subtle)',
                      background: s.isMe ? 'rgba(191, 245, 73, 0.05)' : 'transparent',
                      transition: 'background 0.15s ease',
                    }}
                  >
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 800,
                        color: rankColor,
                      }}>
                        #{s.displayRank}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <Avatar src={s.avatar} alt={s.name} size="sm" />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontWeight: 700, color: s.isMe ? '#BFF549' : 'var(--text-primary)' }}>
                              {s.name}
                            </span>
                            {s.isMe && (
                              <span style={{
                                padding: '2px 6px', borderRadius: 4, fontSize: 10,
                                background: '#BFF549', color: '#04060F', fontWeight: 800,
                              }}>
                                YOU
                              </span>
                            )}
                          </div>
                          <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--on-surface-variant)' }}>
                            @{s.githubUsername || 'developer'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                        {s.college || 'MITS Gwalior'}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--on-surface-variant)' }}>
                        {s.department || 'CSE'} · {s.year || '4th Year'}
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <TierBadge tier={s.tierRank || 'Gold'} />
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>
                        {formatNumber(s.score)}
                      </div>
                      <div style={{ fontSize: 11, color: s.weeklyDelta?.startsWith('+') ? '#34d399' : 'var(--on-surface-variant)', fontFamily: 'var(--font-mono)' }}>
                        {s.weeklyDelta || '+5%'} velocity
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
