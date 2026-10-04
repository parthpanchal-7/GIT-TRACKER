import { useAuth } from '../context/AuthContext';
import {
  TierBadge, RankDelta, ProgressBar, StatPill, Avatar,
  CircularProgress,
} from '../components/ui';

function formatNumber(n) {
  if (n === undefined || n === null) return '—';
  return n.toLocaleString();
}

/* ── Dummy data so dashboard works without backend ── */
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

const DUMMY_NEIGHBORS = [
  { rank: 1, name: 'Admin User', score: 8420, isMe: true },
  { rank: 2, name: 'Arjun Singh', score: 6210, isMe: false },
  { rank: 3, name: 'Priya Mehta', score: 4850, isMe: false },
];

export default function DashboardPage() {
  const { user } = useAuth();

  const p = user;
  const s = DUMMY_STATS;
  const breakdown = DUMMY_BREAKDOWN;
  const quality = DUMMY_QUALITY;

  return (
    <div className="fade-in">
      {/* Top Bar */}
      <div className="topbar">
        <div className="topbar__greeting">
          <h1>Welcome back, {p?.name?.split(' ')[0] || 'User'}</h1>
          <p>
            {p?.enrollmentId} · {p?.branch} · Year {p?.year}
            <> · Last synced 2m ago</>
          </p>
        </div>
        <div className="topbar__actions">
          <button
            className="btn btn--primary"
            onClick={() => alert('Sync is disabled in demo mode')}
          >
            ⟳ Sync Now
          </button>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="dashboard-grid">
        {/* Score Card */}
        <div className="card fade-in stagger-1">
          <div className="card__header">
            <span className="card__title">Total Score</span>
            <TierBadge tier={p?.tierRank} />
          </div>
          <div className="score-value">{formatNumber(p?.score)}</div>
          <div className="score-label">
            Score Version: {s.scoreVersion}
          </div>
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {Object.entries(breakdown).map(([key, val]) => {
              const maxVals = { PAS: 6000, OCS: 6500, PIS: 1500, CIS: 4000, SDS: 200 };
              return (
                <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, width: 30, color: 'var(--on-surface-variant)' }}>
                    {key}
                  </span>
                  <div style={{ flex: 1 }}>
                    <ProgressBar value={val} max={maxVals[key] || 5000} size="sm" />
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, width: 50, textAlign: 'right', color: 'var(--on-surface)' }}>
                    {formatNumber(val)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rank Card */}
        <div className="card fade-in stagger-2">
          <div className="card__header">
            <span className="card__title">Leaderboard Rank</span>
            <RankDelta delta={0} />
          </div>
          <div className="rank-display">
            <span className="rank-hash">#</span>
            <span className="rank-number">1</span>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
            <span className="pill">{p?.branch}</span>
            <span className="pill">Year {p?.year}</span>
            {p?.githubUsername && <span className="pill">@{p.githubUsername}</span>}
          </div>
          {/* Neighbors */}
          <div style={{ marginTop: 16, fontSize: 13 }}>
            {DUMMY_NEIGHBORS.map((n, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 0', opacity: n.isMe ? 1 : 0.7,
                fontWeight: n.isMe ? 600 : 400,
                color: n.isMe ? 'var(--primary)' : 'var(--on-surface-variant)',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', width: 28, fontSize: 12 }}>#{n.rank}</span>
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.name}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{formatNumber(n.score)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub Stats */}
        <div className="card fade-in stagger-3" style={{ gridColumn: 'span 2' }}>
          <div className="card__header">
            <span className="card__title">GitHub Metrics</span>
            <span className="card__icon">⬡</span>
          </div>
          <div className="stats-grid">
            <StatPill label="Commits" value={formatNumber(s.commits)} icon="●" />
            <StatPill label="PRs Opened" value={formatNumber(s.prsOpened)} icon="⤴" />
            <StatPill label="PRs Merged" value={formatNumber(s.prsMergedExternal)} icon="✓" />
            <StatPill label="Issues" value={formatNumber(s.issues)} icon="◉" />
            <StatPill label="Reviews" value={formatNumber(s.codeReviews)} icon="◈" />
            <StatPill label="Repos" value={formatNumber(s.totalRepoCount)} icon="▣" />
            <StatPill label="Stars" value={formatNumber(s.stars)} icon="★" />
            <StatPill label="Languages" value={formatNumber(s.languageCount)} icon="◇" />
            <StatPill label="Streak" value={`${s.streakDays}d`} icon="⚡" />
            <StatPill label="30-Day" value={formatNumber(s.contributionsLast30Days)} icon="⏱" />
          </div>
        </div>

        {/* Quality Engine */}
        <div className="card fade-in stagger-4">
          <div className="card__header">
            <span className="card__title">Quality Engine</span>
            <span className="card__icon">◎</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <CircularProgress value={s.qualityScore} max={1} size={100} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginBottom: 4, fontFamily: 'var(--font-label)' }}>
                EFFECTIVE COMMITS
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700 }}>
                {formatNumber(s.effectiveCommits)}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { key: 'volumeScore', label: 'Volume' },
              { key: 'diversityScore', label: 'Diversity' },
              { key: 'prAssociationScore', label: 'PR Quality' },
              { key: 'antiSpamScore', label: 'Anti-Spam' },
            ].map(({ key, label }) => (
              <div key={key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
                  <span style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)' }}>{label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--on-surface)' }}>
                    {((quality[key] || 0) * 100).toFixed(0)}%
                  </span>
                </div>
                <ProgressBar value={(quality[key] || 0) * 100} max={100} size="sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Decay & Activity */}
        <div className="card fade-in stagger-5">
          <div className="card__header">
            <span className="card__title">Activity & Decay</span>
            <span className="card__icon">⏱</span>
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 120 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 32, fontWeight: 700, color: 'var(--on-surface)' }}>
                {s.daysSinceActivity}
              </div>
              <div className="score-label">Days Since Activity</div>
            </div>
            <div style={{ flex: 1, minWidth: 120 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 32, fontWeight: 700, color: 'var(--primary)' }}>
                {(s.decayFactor * 100).toFixed(0)}%
              </div>
              <div className="score-label">Decay Factor</div>
            </div>
          </div>
          <div style={{ marginTop: 14, fontSize: 12, color: 'var(--outline)', fontFamily: 'var(--font-mono)' }}>
            decay = 1 / log(days + 2) ∈ [0.2, 1.0]
          </div>
          <div style={{ marginTop: 16, fontSize: 13, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: 6 }}>
            🛡 No anti-cheat flags detected
          </div>
        </div>

        {/* Language List */}
        <div className="card fade-in stagger-6">
          <div className="card__header">
            <span className="card__title">Languages</span>
            <span className="card__icon">◇</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {s.languageList.map((lang) => (
              <span key={lang} className="pill">{lang}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
