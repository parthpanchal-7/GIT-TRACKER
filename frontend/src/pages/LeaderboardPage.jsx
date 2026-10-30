import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { TierBadge, Avatar } from '../components/ui';

function formatNumber(n) {
  if (n === undefined || n === null) return '—';
  return n.toLocaleString();
}

const BRANCHES = ['All', 'Computer Science', 'Electronics', 'Information Technology'];
const YEARS = ['All', '1', '2', '3', '4'];
const TIERS = ['All', 'Elite', 'Platinum', 'Gold', 'Silver', 'Bronze'];

export default function LeaderboardPage() {
  const { users } = useAuth();
  const [filters, setFilters] = useState({ branch: '', year: '', tier: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const setFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value === 'All' ? '' : value }));
  };

  /* Sort and filter from the demo user list */
  const sorted = useMemo(() => {
    let list = [...(users || [])].sort((a, b) => (b.score || 0) - (a.score || 0));
    if (filters.branch) list = list.filter(u => u.branch === filters.branch);
    if (filters.year) list = list.filter(u => String(u.year) === filters.year);
    if (filters.tier) list = list.filter(u => u.tierRank === filters.tier);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(u =>
        u.name.toLowerCase().includes(q) ||
        (u.enrollmentId && u.enrollmentId.toLowerCase().includes(q)) ||
        (u.githubUsername && u.githubUsername.toLowerCase().includes(q))
      );
    }
    return list.map((u, i) => ({ ...u, displayRank: i + 1 }));
  }, [users, filters, searchQuery]);

  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  return (
    <div className="fade-in">
      {/* ── Page Header ── */}
      <div className="page-header">
        <div>
          <div className="overline">MERITOCRATIC TIERING</div>
          <h1 className="page-header__title">Institutional Contributor Leaderboard</h1>
          <p className="page-header__subtitle">
            Zero-obscurity ranking indexed on AST code quality, commit entropy, and anti-cheat clearance
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="badge badge-lime">
            {sorted.length} VERIFIED CONTRIBUTORS
          </span>
        </div>
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="card" style={{ marginBottom: 28, padding: '18px 22px' }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Search Box */}
          <div style={{ flex: '1 1 260px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', opacity: 0.5, fontSize: 13 }}>
              🔍
            </span>
            <input
              type="text"
              placeholder="Search by student name, enrollment ID, or GitHub..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 14px 9px 34px',
                background: '#04060F',
                border: '1px solid var(--card-border)',
                borderRadius: 'var(--radius-md)',
                color: '#FFFFFF',
                fontSize: 13,
                fontFamily: 'var(--font-body)',
                outline: 'none',
              }}
            />
          </div>

          {/* Quick Stats */}
          <div style={{ display: 'flex', gap: 12, fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--on-surface-variant)' }}>
            <span>Top Score: <strong style={{ color: 'var(--primary)' }}>{formatNumber(sorted[0]?.score || 0)}</strong></span>
            <span>Average: <strong style={{ color: '#FFFFFF' }}>{formatNumber(Math.round(sorted.reduce((acc, u) => acc + (u.score || 0), 0) / (sorted.length || 1)))}</strong></span>
          </div>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--card-border)' }}>
          {/* Branch Filter */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
            <span style={{ fontSize: 10, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)', letterSpacing: '0.08em', width: 60 }}>
              BRANCH:
            </span>
            {BRANCHES.map(b => (
              <button
                key={b}
                className={`pill pill--clickable ${((!filters.branch && b === 'All') || filters.branch === b) ? 'pill--active' : ''}`}
                onClick={() => setFilter('branch', b)}
              >
                {b}
              </button>
            ))}
          </div>

          {/* Tier Filter */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
            <span style={{ fontSize: 10, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)', letterSpacing: '0.08em', width: 60 }}>
              TIER:
            </span>
            {TIERS.map(t => (
              <button
                key={t}
                className={`pill pill--clickable ${((!filters.tier && t === 'All') || filters.tier === t) ? 'pill--active' : ''}`}
                onClick={() => setFilter('tier', t)}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Year Filter */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
            <span style={{ fontSize: 10, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)', letterSpacing: '0.08em', width: 60 }}>
              YEAR:
            </span>
            {YEARS.map(y => (
              <button
                key={y}
                className={`pill pill--clickable ${((!filters.year && y === 'All') || filters.year === y) ? 'pill--active' : ''}`}
                onClick={() => setFilter('year', y)}
              >
                {y === 'All' ? 'All Years' : `Year ${y}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '64px 24px' }}>
          <div style={{ fontSize: 44, marginBottom: 12 }}>🛡</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 6 }}>No Contributors Found</h2>
          <p style={{ fontSize: 13, color: 'var(--on-surface-variant)', maxWidth: 400, margin: '0 auto 16px' }}>
            No scored contributors match your selected filters. Try clearing or expanding your query.
          </p>
          <button
            className="btn btn--outline-lime btn--sm"
            onClick={() => { setFilters({ branch: '', year: '', tier: '' }); setSearchQuery(''); }}
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <>
          {/* ── Podium - Top 3 Contributors ── */}
          {top3.length > 0 && (
            <div className="podium">
              {/* Rank 2 (Silver) */}
              {top3.length > 1 && (
                <div className="podium__item podium__item--2">
                  <div className="podium__rank podium__rank--2">2</div>
                  <Avatar src={top3[1].avatar} alt={top3[1].name} size="default" tier={top3[1].tierRank} />
                  <div className="podium__name">{top3[1].name}</div>
                  <div className="podium__score">{formatNumber(top3[1].score)}</div>
                  <div className="podium__branch">{top3[1].branch} · Year {top3[1].year}</div>
                  <TierBadge tier={top3[1].tierRank} />
                </div>
              )}

              {/* Rank 1 (Elite - Crown) */}
              <div className="podium__item podium__item--1">
                <div className="podium__rank podium__rank--1">1</div>
                <Avatar src={top3[0].avatar} alt={top3[0].name} size="lg" tier={top3[0].tierRank} />
                <div className="podium__name" style={{ fontSize: 18 }}>{top3[0].name}</div>
                <div className="podium__score" style={{ fontSize: 32 }}>{formatNumber(top3[0].score)}</div>
                <div className="podium__branch">{top3[0].branch} · Year {top3[0].year}</div>
                <TierBadge tier={top3[0].tierRank} />
                {top3[0].githubUsername && (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--primary)', marginTop: 4 }}>
                    @{top3[0].githubUsername}
                  </span>
                )}
              </div>

              {/* Rank 3 (Bronze) */}
              {top3.length > 2 && (
                <div className="podium__item podium__item--3">
                  <div className="podium__rank podium__rank--3">3</div>
                  <Avatar src={top3[2].avatar} alt={top3[2].name} size="default" tier={top3[2].tierRank} />
                  <div className="podium__name">{top3[2].name}</div>
                  <div className="podium__score">{formatNumber(top3[2].score)}</div>
                  <div className="podium__branch">{top3[2].branch} · Year {top3[2].year}</div>
                  <TierBadge tier={top3[2].tierRank} />
                </div>
              )}
            </div>
          )}

          {/* ── Contributor Table ── */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{
              padding: '14px 20px',
              background: '#090B12',
              borderBottom: '1px solid var(--card-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span className="overline overline--no-dot" style={{ fontSize: 11 }}>
                ALL RANKED CONTRIBUTORS ({sorted.length})
              </span>
              <span style={{ fontSize: 11, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-mono)' }}>
                Sorted by 5-Factor Vector Score
              </span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="glass-table">
                <thead>
                  <tr>
                    <th style={{ width: 80 }}>Rank</th>
                    <th>Contributor</th>
                    <th>Branch</th>
                    <th>Cohort</th>
                    <th>Verified Score</th>
                    <th>Tier Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((s) => (
                    <tr key={s._id || s.enrollmentId}>
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: 14 }}>
                        <span style={{ color: s.displayRank === 1 ? 'var(--primary)' : s.displayRank <= 3 ? '#FFFFFF' : 'var(--on-surface-variant)' }}>
                          #{s.displayRank}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <Avatar src={s.avatar} alt={s.name} size="sm" tier={s.tierRank} />
                          <div>
                            <div style={{ fontWeight: 700, fontSize: 14, color: '#FFFFFF' }}>{s.name}</div>
                            <div style={{ fontSize: 11, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-mono)' }}>
                              {s.enrollmentId} {s.githubUsername && `· @${s.githubUsername}`}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="pill" style={{ fontSize: 11 }}>{s.branch}</span>
                      </td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--on-surface-variant)' }}>
                        Year {s.year}
                      </td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: 16, color: 'var(--primary)' }}>
                        {formatNumber(s.score)}
                      </td>
                      <td>
                        <TierBadge tier={s.tierRank} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
