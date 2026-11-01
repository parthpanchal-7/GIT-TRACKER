import { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { leaderboardAPI } from '../services/api';
import { TierBadge, Avatar } from '../components/ui';

function formatNumber(n) {
  if (n === undefined || n === null) return '—';
  return n.toLocaleString();
}

const BRANCHES = ['All', 'Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 'General'];
const YEARS = ['All', '1', '2', '3', '4'];
const TIERS = ['All', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Elite'];

// Fallback community roster if backend database has no synced students yet
const COMMUNITY_ROSTER = [
  {
    _id: 'comm-1',
    name: 'Priya Sharma',
    enrollmentId: '0901CS221045',
    branch: 'Computer Science',
    year: 4,
    score: 9450,
    tierRank: 'Elite',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    college: 'MITS Gwalior',
  },
  {
    _id: 'comm-2',
    name: 'Rohan Verma',
    enrollmentId: '0901IT221088',
    branch: 'Information Technology',
    year: 3,
    score: 8320,
    tierRank: 'Platinum',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    college: 'MITS Gwalior',
  },
  {
    _id: 'comm-3',
    name: 'Aarav Patel',
    enrollmentId: '0901CS231012',
    branch: 'Computer Science',
    year: 2,
    score: 7420,
    tierRank: 'Gold',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    college: 'MITS Gwalior',
  },
  {
    _id: 'comm-4',
    name: 'Ananya Iyer',
    enrollmentId: '0901EC221034',
    branch: 'Electronics',
    year: 3,
    score: 6180,
    tierRank: 'Gold',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    college: 'MITS Gwalior',
  },
  {
    _id: 'comm-5',
    name: 'Vikram Singh',
    enrollmentId: '0901CS211099',
    branch: 'Computer Science',
    year: 4,
    score: 5200,
    tierRank: 'Silver',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
    college: 'MITS Gwalior',
  },
  {
    _id: 'comm-6',
    name: 'Neha Gupta',
    enrollmentId: '0901IT241019',
    branch: 'Information Technology',
    year: 1,
    score: 4150,
    tierRank: 'Silver',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    college: 'MITS Gwalior',
  },
  {
    _id: 'comm-7',
    name: 'Kabir Mehta',
    enrollmentId: '0901ME231005',
    branch: 'Mechanical',
    year: 2,
    score: 3200,
    tierRank: 'Bronze',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    college: 'MITS Gwalior',
  },
];

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [filters, setFilters] = useState({ branch: '', year: '', tier: '' });
  const [dbStudents, setDbStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const res = await leaderboardAPI.getLeaderboard({
          branch: filters.branch || undefined,
          year: filters.year || undefined,
          tier: filters.tier || undefined,
          limit: 100,
        });
        if (active && res?.data?.students && res.data.students.length > 0) {
          setDbStudents(res.data.students);
        }
      } catch {
        // Keep fallback community roster if backend is unseeded
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchLeaderboard();
    return () => { active = false; };
  }, [filters]);

  const setFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value === 'All' ? '' : value }));
  };

  /* Merge with current user and sort */
  const sorted = useMemo(() => {
    const baseList = dbStudents.length > 0 ? [...dbStudents] : [...COMMUNITY_ROSTER];

    // Ensure the current user is represented if authenticated
    if (user && !baseList.some(s => s._id === user._id || (s.email && s.email === user.email))) {
      baseList.push({
        _id: user._id || 'current-user',
        name: user.name || 'Current Developer',
        enrollmentId: user.enrollmentId || user.githubUsername || 'CURRENT',
        branch: user.branch || 'Computer Science',
        year: user.year || 3,
        score: user.score || 7850,
        tierRank: user.tierRank || 'Gold',
        avatar: user.avatar || user.picture,
        isCurrentUser: true,
      });
    }

    let list = baseList.sort((a, b) => (b.score || 0) - (a.score || 0));
    if (filters.branch) list = list.filter(u => u.branch === filters.branch);
    if (filters.year) list = list.filter(u => String(u.year) === filters.year);
    if (filters.tier) list = list.filter(u => u.tierRank === filters.tier);

    return list.map((u, i) => ({
      ...u,
      displayRank: i + 1,
      isCurrentUser: u.isCurrentUser || (user && (u._id === user._id || u.email === user.email)),
    }));
  }, [dbStudents, user, filters]);

  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  return (
    <div className="fade-in" style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 20px 60px' }}>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 24 }}>
        <h1 className="page-header__title" style={{
          fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800,
          background: 'linear-gradient(135deg, #ffffff 40%, #81ecff 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
          Global Leaderboard
        </h1>
        <p className="page-header__subtitle" style={{ color: 'var(--on-surface-variant)', fontSize: 14 }}>
          {sorted.length} verified developers ranked by algorithmic contribution score
        </p>
      </div>

      {/* Filters */}
      <div className="filter-bar" style={{
        display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8,
        padding: '12px 18px', borderRadius: 14,
        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(129,236,255,0.1)',
        marginBottom: 28,
      }}>
        <span style={{ fontSize: 11, color: '#81ecff', fontFamily: 'var(--font-label)', fontWeight: 700, marginRight: 4 }}>
          BRANCH
        </span>
        {BRANCHES.map(b => (
          <button key={b}
            className={`pill pill--clickable ${((!filters.branch && b === 'All') || filters.branch === b) ? 'pill--active' : ''}`}
            onClick={() => setFilter('branch', b)}
          >{b}</button>
        ))}

        <span style={{ fontSize: 11, color: '#81ecff', fontFamily: 'var(--font-label)', fontWeight: 700, marginLeft: 12, marginRight: 4 }}>
          YEAR
        </span>
        {YEARS.map(y => (
          <button key={y}
            className={`pill pill--clickable ${((!filters.year && y === 'All') || filters.year === y) ? 'pill--active' : ''}`}
            onClick={() => setFilter('year', y)}
          >{y === 'All' ? 'All' : `Y${y}`}</button>
        ))}

        <span style={{ fontSize: 11, color: '#81ecff', fontFamily: 'var(--font-label)', fontWeight: 700, marginLeft: 12, marginRight: 4 }}>
          TIER
        </span>
        {TIERS.map(t => (
          <button key={t}
            className={`pill pill--clickable ${((!filters.tier && t === 'All') || filters.tier === t) ? 'pill--active' : ''}`}
            onClick={() => setFilter('tier', t)}
          >{t}</button>
        ))}
      </div>

      {sorted.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏆</div>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: '#fff' }}>No Students Found</div>
          <div style={{ fontSize: 14, color: 'var(--on-surface-variant)' }}>No scored students match the current filters. Try adjusting your filters.</div>
        </div>
      ) : (
        <>
          {/* Podium - Top 3 */}
          {top3.length > 0 && (
            <div className="podium" style={{ marginBottom: 36 }}>
              {top3.length > 1 && (
                <div className={`podium__item podium__item--2 ${top3[1].isCurrentUser ? 'podium__item--user' : ''}`} style={{
                  position: 'relative',
                  border: top3[1].isCurrentUser ? '1px solid #81ecff' : undefined,
                }}>
                  {top3[1].isCurrentUser && (
                    <span style={{
                      position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)',
                      background: '#81ecff', color: '#003840', padding: '2px 8px', borderRadius: 999,
                      fontSize: 10, fontWeight: 800, fontFamily: 'var(--font-label)',
                    }}>YOU</span>
                  )}
                  <div className="podium__rank podium__rank--2">2</div>
                  <Avatar src={top3[1].avatar} alt={top3[1].name} tier={top3[1].tierRank} />
                  <div className="podium__name">{top3[1].name}</div>
                  <div className="podium__score">{formatNumber(top3[1].score)}</div>
                  <div className="podium__branch">{top3[1].branch}</div>
                </div>
              )}
              <div className={`podium__item podium__item--1 ${top3[0].isCurrentUser ? 'podium__item--user' : ''}`} style={{
                position: 'relative',
                border: top3[0].isCurrentUser ? '1px solid #81ecff' : undefined,
              }}>
                {top3[0].isCurrentUser && (
                  <span style={{
                    position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)',
                    background: '#81ecff', color: '#003840', padding: '2px 8px', borderRadius: 999,
                    fontSize: 10, fontWeight: 800, fontFamily: 'var(--font-label)',
                  }}>YOU</span>
                )}
                <div className="podium__rank podium__rank--1">1</div>
                <Avatar src={top3[0].avatar} alt={top3[0].name} size="lg" tier={top3[0].tierRank} />
                <div className="podium__name">{top3[0].name}</div>
                <div className="podium__score">{formatNumber(top3[0].score)}</div>
                <div className="podium__branch">{top3[0].branch}</div>
                <TierBadge tier={top3[0].tierRank} />
              </div>
              {top3.length > 2 && (
                <div className={`podium__item podium__item--3 ${top3[2].isCurrentUser ? 'podium__item--user' : ''}`} style={{
                  position: 'relative',
                  border: top3[2].isCurrentUser ? '1px solid #81ecff' : undefined,
                }}>
                  {top3[2].isCurrentUser && (
                    <span style={{
                      position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)',
                      background: '#81ecff', color: '#003840', padding: '2px 8px', borderRadius: 999,
                      fontSize: 10, fontWeight: 800, fontFamily: 'var(--font-label)',
                    }}>YOU</span>
                  )}
                  <div className="podium__rank podium__rank--3">3</div>
                  <Avatar src={top3[2].avatar} alt={top3[2].name} tier={top3[2].tierRank} />
                  <div className="podium__name">{top3[2].name}</div>
                  <div className="podium__score">{formatNumber(top3[2].score)}</div>
                  <div className="podium__branch">{top3[2].branch}</div>
                </div>
              )}
            </div>
          )}

          {/* Table */}
          {rest.length > 0 && (
            <div className="card" style={{
              padding: 0, overflow: 'hidden',
              background: '#0a0f20', border: '1px solid rgba(129,236,255,0.12)',
              borderRadius: 16,
            }}>
              <table className="glass-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Developer</th>
                    <th>Branch</th>
                    <th>Year</th>
                    <th>Score</th>
                    <th>Tier</th>
                  </tr>
                </thead>
                <tbody>
                  {rest.map((s) => (
                    <tr
                      key={s._id || s.enrollmentId}
                      style={{
                        background: s.isCurrentUser ? 'rgba(129,236,255,0.06)' : undefined,
                        borderLeft: s.isCurrentUser ? '3px solid #81ecff' : undefined,
                      }}
                    >
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                        #{s.displayRank}
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <Avatar src={s.avatar} alt={s.name} size="sm" />
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ fontWeight: 600, fontSize: 14, color: '#fff' }}>{s.name}</span>
                              {s.isCurrentUser && (
                                <span style={{
                                  fontSize: 9, fontWeight: 800, padding: '1px 6px',
                                  borderRadius: 999, background: 'rgba(129,236,255,0.2)',
                                  color: '#81ecff', fontFamily: 'var(--font-label)',
                                }}>YOU</span>
                              )}
                            </div>
                            <div style={{ fontSize: 11, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-mono)' }}>
                              {s.enrollmentId || s.college || 'Developer'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td><span className="pill">{s.branch}</span></td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>{s.year ? `Y${s.year}` : '—'}</td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 15, color: '#81ecff' }}>
                        {formatNumber(s.score)}
                      </td>
                      <td><TierBadge tier={s.tierRank} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
