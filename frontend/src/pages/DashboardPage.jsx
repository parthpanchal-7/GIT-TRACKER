import { useAuth } from '../context/AuthContext';
import {
  TierBadge, RankDelta, ProgressBar, StatPill,
  CircularProgress,
} from '../components/ui';

function formatNumber(n) {
  if (n === undefined || n === null) return '—';
  return n.toLocaleString();
}

/* ── Realistic Mock Data for Institutional Telemetry ── */
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
  languageList: ['TypeScript', 'Python', 'Go', 'Rust', 'JavaScript', 'Java', 'C++', 'SQL', 'HTML', 'CSS', 'Shell', 'Markdown'],
};

const DUMMY_BREAKDOWN = {
  PAS: { name: 'Productivity & Activity', val: 4200, max: 6000, desc: 'Commits, streaks & 30d velocity' },
  OCS: { name: 'Open-Source Collab', val: 3100, max: 6500, desc: 'External PRs, reviews & issues' },
  PIS: { name: 'Project Impact', val: 1250, max: 1500, desc: 'Repositories, stars & forks' },
  CIS: { name: 'Community Influence', val: 950, max: 4000, desc: 'Developer network & followers' },
  SDS: { name: 'Skill Diversity', val: 180, max: 200, desc: 'Polyglot language footprint' },
};

const DUMMY_QUALITY = {
  volumeScore: 0.92,
  diversityScore: 0.78,
  prAssociationScore: 0.85,
  antiSpamScore: 0.95,
  weights: { volume: 0.3, diversity: 0.25, prAssociation: 0.25, antiSpam: 0.2 },
};

const DUMMY_NEIGHBORS = [
  { rank: 1, name: 'Admin User', score: 8420, isMe: true, tier: 'Elite' },
  { rank: 2, name: 'Arjun Singh', score: 6210, isMe: false, tier: 'Platinum' },
  { rank: 3, name: 'Priya Mehta', score: 4850, isMe: false, tier: 'Gold' },
  { rank: 4, name: 'Rohan Sharma', score: 3940, isMe: false, tier: 'Silver' },
];

export default function DashboardPage() {
  const { user } = useAuth();

  const p = user;
  const s = DUMMY_STATS;
  const breakdown = DUMMY_BREAKDOWN;
  const quality = DUMMY_QUALITY;

  return (
    <div className="fade-in">
      {/* ── Top Bar Header ── */}
      <div className="topbar">
        <div className="topbar__greeting">
          <div className="overline">TELEMETRY DASHBOARD</div>
          <h1>Welcome back, {p?.name?.split(' ')[0] || 'User'}</h1>
          <p>
            {p?.enrollmentId} · {p?.branch} · Year {p?.year}
            <span style={{ margin: '0 8px', opacity: 0.4 }}>|</span>
            <span style={{ color: 'var(--primary)' }}>SYSTEM SPEC 2.0</span>
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div className="sync-indicator">
            <span className="sync-indicator__dot" />
            Telemetry Synced 2m ago
          </div>
          <button
            className="btn btn--outline-lime btn--sm"
            onClick={() => alert('Sync pipeline active. Telemetry refreshed from GitHub event stream.')}
          >
            ⟳ Sync Now
          </button>
        </div>
      </div>

      {/* ── Primary Telemetry Grid ── */}
      <div className="dashboard-grid">
        {/* Card 1: 5-Factor Score Card */}
        <div className="card fade-in stagger-1">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <div className="overline overline--no-dot" style={{ fontSize: 10, marginBottom: 4 }}>
                COMPOSITE EVALUATION
              </div>
              <h2 className="card-title">5-Factor Vector Score</h2>
            </div>
            <TierBadge tier={p?.tierRank || 'Elite'} />
          </div>

          <div className="score-value">{formatNumber(p?.score || 8420)}</div>
          <div className="score-label" style={{ marginTop: 4 }}>
            Engine Version: <span style={{ color: 'var(--on-surface)' }}>{s.scoreVersion}</span>
          </div>

          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {Object.entries(breakdown).map(([key, item]) => (
              <div key={key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--primary)', width: 28 }}>
                      {key}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--on-surface-variant)' }}>
                      {item.name}
                    </span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--on-surface)' }}>
                    {formatNumber(item.val)}
                  </span>
                </div>
                <ProgressBar value={item.val} max={item.max} size="sm" />
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 18,
            padding: '8px 12px',
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--on-surface-variant)',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <span>FORMULA</span>
            <span style={{ color: 'var(--primary)' }}>Score = Decay × [Σ(w_i · F_i)]</span>
          </div>
        </div>

        {/* Card 2: Institutional Standing */}
        <div className="card fade-in stagger-2">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <div className="overline overline--no-dot" style={{ fontSize: 10, marginBottom: 4 }}>
                INSTITUTIONAL RANK
              </div>
              <h2 className="card-title">Cohort Standing</h2>
            </div>
            <RankDelta delta={0} />
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 12 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 24, color: 'var(--primary)', fontWeight: 800 }}>#</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 44, fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>1</span>
            <span style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginLeft: 8 }}>in Computer Science</span>
          </div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 18 }}>
            <span className="pill">{p?.branch}</span>
            <span className="pill">Year {p?.year}</span>
            {p?.githubUsername && (
              <a
                href={`https://github.com/${p.githubUsername}`}
                target="_blank"
                rel="noreferrer"
                className="pill pill--active"
              >
                @{p.githubUsername} ↗
              </a>
            )}
          </div>

          <div className="overline overline--no-dot" style={{ fontSize: 10, marginBottom: 8 }}>
            COHORT NEIGHBORS
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {DUMMY_NEIGHBORS.map((n) => (
              <div
                key={n.rank}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '7px 10px',
                  borderRadius: 'var(--radius-sm)',
                  background: n.isMe ? 'rgba(191, 245, 73, 0.08)' : 'transparent',
                  border: `1px solid ${n.isMe ? 'rgba(191, 245, 73, 0.3)' : 'transparent'}`,
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', width: 24, fontSize: 11, fontWeight: 700, color: n.isMe ? 'var(--primary)' : 'var(--on-surface-variant)' }}>
                  #{n.rank}
                </span>
                <span style={{ flex: 1, fontSize: 13, fontWeight: n.isMe ? 700 : 400, color: n.isMe ? '#FFFFFF' : 'var(--on-surface-variant)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {n.name} {n.isMe && <span style={{ fontSize: 10, color: 'var(--primary)' }}>(You)</span>}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: n.isMe ? 'var(--primary)' : 'var(--on-surface)' }}>
                  {formatNumber(n.score)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: GitHub Telemetry Grid (Spans 2 cols) */}
        <div className="card fade-in stagger-3 col-span-2">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div className="overline overline--no-dot" style={{ fontSize: 10, marginBottom: 4 }}>
                QUANTIFIED ACTIVITY
              </div>
              <h2 className="card-title">Verified Git Telemetry</h2>
            </div>
            <span className="badge badge-lime">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)' }} />
              99.4% TELEMETRY FIDELITY
            </span>
          </div>

          <div className="stats-grid">
            <StatPill label="Commits" value={formatNumber(s.commits)} icon="●" />
            <StatPill label="PRs Opened" value={formatNumber(s.prsOpened)} icon="⤴" />
            <StatPill label="PRs Merged" value={formatNumber(s.prsMergedExternal)} icon="✓" />
            <StatPill label="Issues Solved" value={formatNumber(s.issues)} icon="◉" />
            <StatPill label="Code Reviews" value={formatNumber(s.codeReviews)} icon="◈" />
            <StatPill label="Repositories" value={formatNumber(s.totalRepoCount)} icon="▣" />
            <StatPill label="Stars Earned" value={formatNumber(s.stars)} icon="★" />
            <StatPill label="Languages" value={formatNumber(s.languageCount)} icon="◇" />
            <StatPill label="Active Streak" value={`${s.streakDays}d`} icon="⚡" />
            <StatPill label="30-Day Velocity" value={formatNumber(s.contributionsLast30Days)} icon="⏱" />
          </div>

          <div style={{
            marginTop: 16,
            padding: '10px 14px',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--card-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 12,
            color: 'var(--on-surface-variant)',
          }}>
            <span>Anti-Spam Filter: <strong style={{ color: '#FFFFFF' }}>0 Empty Commits Detected</strong></span>
            <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>Verified AST Hashes</span>
          </div>
        </div>

        {/* Card 4: Quality Engine (CQE) */}
        <div className="card fade-in stagger-4">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <div className="overline overline--no-dot" style={{ fontSize: 10, marginBottom: 4 }}>
                CODE QUALITY ENGINE
              </div>
              <h2 className="card-title">Zero Obscurity CQE</h2>
            </div>
            <span style={{ fontSize: 18, color: 'var(--primary)' }}>◎</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 }}>
            <CircularProgress value={s.qualityScore} max={1} size={90} />
            <div>
              <div style={{ fontSize: 11, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                EFFECTIVE COMMITS
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 800, color: '#FFFFFF' }}>
                {formatNumber(s.effectiveCommits)}
              </div>
              <div style={{ fontSize: 11, color: 'var(--primary)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
                CQE Weight: 87.0%
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { key: 'volumeScore', label: 'Commit Volume', weight: '30%' },
              { key: 'diversityScore', label: 'Tech Diversity', weight: '25%' },
              { key: 'prAssociationScore', label: 'PR Association', weight: '25%' },
              { key: 'antiSpamScore', label: 'Anti-Spam Cleanliness', weight: '20%' },
            ].map(({ key, label, weight }) => (
              <div key={key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 3 }}>
                  <span style={{ color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)' }}>
                    {label} <span style={{ opacity: 0.6 }}>({weight})</span>
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--on-surface)' }}>
                    {((quality[key] || 0) * 100).toFixed(0)}%
                  </span>
                </div>
                <ProgressBar value={(quality[key] || 0) * 100} max={100} size="sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Card 5: Activity Decay & Anti-Cheat Clearance */}
        <div className="card fade-in stagger-5">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <div className="overline overline--no-dot" style={{ fontSize: 10, marginBottom: 4 }}>
                TEMPORAL HEALTH
              </div>
              <h2 className="card-title">Decay & Anti-Cheat</h2>
            </div>
            <span style={{ fontSize: 18, color: 'var(--primary)' }}>⏱</span>
          </div>

          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 32, fontWeight: 800, color: '#FFFFFF' }}>
                {s.daysSinceActivity}
              </div>
              <div className="score-label">Days Inactive</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 32, fontWeight: 800, color: 'var(--primary)' }}>
                {(s.decayFactor * 100).toFixed(0)}%
              </div>
              <div className="score-label">Decay Retained</div>
            </div>
          </div>

          <div style={{
            padding: '10px 14px',
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--on-surface-variant)',
            marginBottom: 16,
          }}>
            decay = 1 / log(days + 2) ∈ [0.2, 1.0]
          </div>

          <div style={{
            padding: '12px 14px',
            background: 'rgba(191, 245, 73, 0.08)',
            border: '1px solid rgba(191, 245, 73, 0.25)',
            borderRadius: 'var(--radius-sm)',
            fontSize: 12,
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <span style={{ fontSize: 16 }}>🛡</span>
            <div>
              <div style={{ fontWeight: 700 }}>Zero Obscurity Clearance</div>
              <div style={{ fontSize: 11, opacity: 0.8, color: 'var(--on-surface-variant)' }}>
                Zero plagiarism or artificial commit anomalies detected.
              </div>
            </div>
          </div>
        </div>

        {/* Card 6: Polyglot Language Stack */}
        <div className="card fade-in stagger-6 col-span-2">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div className="overline overline--no-dot" style={{ fontSize: 10, marginBottom: 4 }}>
                SKILL DIVERSITY
              </div>
              <h2 className="card-title">Polyglot Language Stack</h2>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--primary)' }}>
              12 Technologies Detected
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {s.languageList.map((lang, idx) => (
              <span
                key={lang}
                className="pill"
                style={{
                  background: idx < 3 ? 'rgba(191, 245, 73, 0.08)' : '#0F1117',
                  borderColor: idx < 3 ? 'rgba(191, 245, 73, 0.3)' : 'var(--card-border)',
                  color: idx < 3 ? 'var(--primary)' : 'var(--on-surface)',
                }}
              >
                <span style={{ opacity: 0.5 }}>#</span> {lang}
              </span>
            ))}
          </div>

          <div style={{
            marginTop: 18,
            fontSize: 12,
            color: 'var(--on-surface-variant)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span>Primary Core: <strong style={{ color: '#FFFFFF' }}>TypeScript & Python</strong></span>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>SDS Score: 180 / 200</span>
          </div>
        </div>
      </div>
    </div>
  );
}
