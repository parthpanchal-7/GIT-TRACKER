import { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { TierBadge, Avatar } from '../components/ui';

function formatNumber(n) {
  if (n === undefined || n === null) return '—';
  return n.toLocaleString();
}

const BRANCHES = ['All', 'Computer Science', 'Electronics', 'Information Technology'];
const YEARS = ['All', '1', '2', '3', '4'];
const TIERS = ['All', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Elite'];

export default function LeaderboardPage() {
  const { users } = useAuth();
  const [filters, setFilters] = useState({ branch: '', year: '', tier: '' });

  const setFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value === 'All' ? '' : value }));
  };

  /* Sort and filter from the demo user list */
  const sorted = useMemo(() => {
    let list = [...(users || [])].sort((a, b) => (b.score || 0) - (a.score || 0));
    if (filters.branch) list = list.filter(u => u.branch === filters.branch);
    if (filters.year) list = list.filter(u => String(u.year) === filters.year);
    if (filters.tier) list = list.filter(u => u.tierRank === filters.tier);
    return list.map((u, i) => ({ ...u, displayRank: i + 1 }));
  }, [users, filters]);

  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-header__title">Leaderboard</h1>
        <p className="page-header__subtitle">
          {sorted.length} students ranked by contribution score
        </p>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <span style={{ fontSize: 12, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)', marginRight: 4 }}>
          BRANCH
        </span>
        {BRANCHES.map(b => (
          <button key={b}
            className={`pill pill--clickable ${((!filters.branch && b === 'All') || filters.branch === b) ? 'pill--active' : ''}`}
            onClick={() => setFilter('branch', b)}
          >{b}</button>
        ))}

        <span style={{ fontSize: 12, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)', marginLeft: 12, marginRight: 4 }}>
          YEAR
        </span>
        {YEARS.map(y => (
          <button key={y}
            className={`pill pill--clickable ${((!filters.year && y === 'All') || filters.year === y) ? 'pill--active' : ''}`}
            onClick={() => setFilter('year', y)}
          >{y === 'All' ? 'All' : `Y${y}`}</button>
        ))}

        <span style={{ fontSize: 12, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)', marginLeft: 12, marginRight: 4 }}>
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
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No Students Found</div>
          <div style={{ fontSize: 14, color: 'var(--on-surface-variant)' }}>No scored students match the current filters. Try adjusting your filters.</div>
        </div>
      ) : (
        <>
          {/* Podium - Top 3 */}
          {top3.length > 0 && (
            <div className="podium">
              {top3.length > 1 && (
                <div className="podium__item podium__item--2">
                  <div className="podium__rank podium__rank--2">2</div>
                  <Avatar src={top3[1].avatar} alt={top3[1].name} tier={top3[1].tierRank} />
                  <div className="podium__name">{top3[1].name}</div>
                  <div className="podium__score">{formatNumber(top3[1].score)}</div>
                  <div className="podium__branch">{top3[1].branch}</div>
                </div>
              )}
              <div className="podium__item podium__item--1">
                <div className="podium__rank podium__rank--1">1</div>
                <Avatar src={top3[0].avatar} alt={top3[0].name} size="lg" tier={top3[0].tierRank} />
                <div className="podium__name">{top3[0].name}</div>
                <div className="podium__score">{formatNumber(top3[0].score)}</div>
                <div className="podium__branch">{top3[0].branch}</div>
                <TierBadge tier={top3[0].tierRank} />
              </div>
              {top3.length > 2 && (
                <div className="podium__item podium__item--3">
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
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <table className="glass-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Student</th>
                    <th>Branch</th>
                    <th>Year</th>
                    <th>Score</th>
                    <th>Tier</th>
                  </tr>
                </thead>
                <tbody>
                  {rest.map((s) => (
                    <tr key={s._id || s.enrollmentId}>
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                        #{s.displayRank}
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <Avatar src={s.avatar} alt={s.name} size="sm" />
                          <div>
                            <div style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</div>
                            <div style={{ fontSize: 11, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-mono)' }}>
                              {s.enrollmentId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td><span className="pill">{s.branch}</span></td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>{s.year}</td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 15, color: 'var(--primary)' }}>
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
