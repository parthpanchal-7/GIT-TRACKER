import { useAuth } from '../context/AuthContext';
import {
  TierBadge, Avatar, ProgressBar, CircularProgress,
} from '../components/ui';

/* ── Dummy score explanation data for the admin user ── */
const DUMMY_EXPLANATION = {
  available: true,
  rank: { score: 8420, tierRank: 'Elite', leaderboardRank: 1 },
  formula: {
    scoreVersion: 'v2.1.0',
    rawTotal: 9850,
    totalAfterDecay: 8680,
    totalScore: 8420,
    qualityScore: 0.87,
    effectiveCommits: 1420,
    components: {
      PAS: 4200,
      OCS: 3100,
      PIS: 1250,
      CIS: 950,
      SDS: 180,
    },
    qualityBreakdown: {
      volumeScore: 0.92,
      diversityScore: 0.78,
      prAssociationScore: 0.85,
      antiSpamScore: 0.95,
      weights: { volume: 0.3, diversity: 0.25, prAssociation: 0.25, antiSpam: 0.2 },
    },
    decay: {
      daysSinceActivity: 2,
      decayFactor: 0.96,
      expression: 'decay_factor = 1 / log(days_since + 2) with safety clamp [0.2, 1.0]',
    },
  },
  capsApplied: {
    'PAS.commits': 5000,
    'CIS.followers': 2000,
    'SDS.languages': 20,
  },
  antiCheat: {
    isFlagged: false,
    flags: [],
  },
  transparency: {
    source: 'Scores derived from GitHub metadata only. No source code is stored or analyzed.',
  },
};

function formatNumber(n) {
  if (n === undefined || n === null) return '—';
  return n.toLocaleString();
}

export default function ProfilePage() {
  const { user } = useAuth();

  const ex = DUMMY_EXPLANATION;
  const p = user;
  const formula = ex.formula || {};
  const components = formula.components || {};
  const quality = formula.qualityBreakdown || {};
  const decay = formula.decay || {};
  const caps = ex.capsApplied || {};
  const antiCheat = ex.antiCheat || {};

  return (
    <div className="fade-in">
      {/* Profile Header */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <Avatar src={p?.avatar} alt={p?.name} size="lg" tier={p?.tierRank} />
          <div style={{ flex: 1, minWidth: 200 }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, marginBottom: 4 }}>
              {p?.name}
            </h1>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--on-surface-variant)' }}>
                {p?.enrollmentId}
              </span>
              <span className="pill">{p?.branch}</span>
              <span className="pill">Year {p?.year}</span>
              {p?.githubUsername && (
                <a href={`https://github.com/${p.githubUsername}`} target="_blank" rel="noopener noreferrer"
                  className="pill pill--active" style={{ textDecoration: 'none' }}>
                  @{p.githubUsername} ↗
                </a>
              )}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="score-value score-value--sm">{formatNumber(ex.rank?.score)}</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'flex-end', marginTop: 6 }}>
              <TierBadge tier={ex.rank?.tierRank} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--on-surface-variant)' }}>
                Rank #{ex.rank?.leaderboardRank}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Score Formula Breakdown */}
        <div className="card fade-in stagger-1" style={{ gridColumn: 'span 2' }}>
          <div className="card__header">
            <span className="card__title">Score Breakdown</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--outline)' }}>
              {formula.scoreVersion}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { key: 'PAS', label: 'Productivity & Activity', desc: 'commits×1 + 30d_contrib×2 + streak×1', max: 6000, color: '#81ecff' },
              { key: 'OCS', label: 'Open-Source Collaboration', desc: 'PRs×5 + merged×15 + issues×8 + reviews×4', max: 6500, color: '#d674ff' },
              { key: 'PIS', label: 'Project Impact', desc: 'repos×5 + log(stars) + log(forks) + watchers×2', max: 1500, color: '#ff6b98' },
              { key: 'CIS', label: 'Community Influence', desc: 'followers×2', max: 4000, color: '#00d4ec' },
              { key: 'SDS', label: 'Skill Diversity', desc: 'languages×10', max: 200, color: '#fbbf24' },
            ].map(({ key, label, desc, max, color }) => (
              <div key={key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 13, color }}>{key}</span>
                    <span style={{ marginLeft: 8, fontSize: 13, color: 'var(--on-surface)' }}>{label}</span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 15 }}>
                    {formatNumber(components[key])}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--outline)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>{desc}</div>
                <ProgressBar value={components[key] || 0} max={max} size="sm" />
              </div>
            ))}

            {/* Raw vs Decayed totals */}
            <div style={{ display: 'flex', gap: 24, marginTop: 8, paddingTop: 16, borderTop: '1px solid var(--glass-border)' }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)', textTransform: 'uppercase' }}>Raw Total</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700 }}>{formatNumber(formula.rawTotal)}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)', textTransform: 'uppercase' }}>After Decay</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, color: 'var(--primary)' }}>{formatNumber(formula.totalAfterDecay)}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)', textTransform: 'uppercase' }}>Final Score</div>
                <div className="score-value" style={{ fontSize: 20 }}>{formatNumber(formula.totalScore)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Engine */}
        <div className="card fade-in stagger-2">
          <div className="card__header">
            <span className="card__title">Quality Engine (CQE)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16 }}>
            <CircularProgress value={formula.qualityScore || 0} max={1} size={90} />
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--on-surface-variant)' }}>Effective Commits</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 700 }}>{formatNumber(formula.effectiveCommits)}</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { key: 'volumeScore', label: 'Volume', weight: quality.weights?.volume },
              { key: 'diversityScore', label: 'Diversity', weight: quality.weights?.diversity },
              { key: 'prAssociationScore', label: 'PR Quality', weight: quality.weights?.prAssociation },
              { key: 'antiSpamScore', label: 'Anti-Spam', weight: quality.weights?.antiSpam },
            ].map(({ key, label, weight }) => (
              <div key={key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
                  <span style={{ fontFamily: 'var(--font-label)', color: 'var(--on-surface-variant)' }}>
                    {label} {weight ? `(${(weight * 100).toFixed(0)}%)` : ''}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>
                    {((quality[key] || 0) * 100).toFixed(1)}%
                  </span>
                </div>
                <ProgressBar value={(quality[key] || 0) * 100} max={100} size="sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Decay Engine */}
        <div className="card fade-in stagger-3">
          <div className="card__header">
            <span className="card__title">Decay Engine</span>
          </div>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 700 }}>{decay.daysSinceActivity ?? 0}</div>
              <div className="score-label">Days Since Activity</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 700, color: 'var(--primary)' }}>
                {((decay.decayFactor ?? 1) * 100).toFixed(0)}%
              </div>
              <div className="score-label">Decay Factor</div>
            </div>
          </div>
          <div style={{
            padding: '12px 16px', background: 'rgba(13,19,35,0.4)', borderRadius: 12,
            fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--outline)',
          }}>
            {decay.expression || 'decay_factor = 1 / log(days_since + 2) with safety clamp [0.2, 1.0]'}
          </div>
        </div>

        {/* Anti-Cheat Flags */}
        <div className="card fade-in stagger-4">
          <div className="card__header">
            <span className="card__title">Anti-Cheat Status</span>
          </div>
          {antiCheat.isFlagged ? (
            <div>
              <div className="alert alert--warning" style={{ marginBottom: 12 }}>
                ⚠ {antiCheat.flags?.length || 0} flag(s) detected
              </div>
              {(antiCheat.flags || []).map((f, i) => (
                <div key={i} className="flag-item">
                  <div className="flag-item__code">{f.code}</div>
                  <div className="flag-item__reason">{f.reason}</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>🛡</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--success)' }}>No Flags Detected</div>
              <div style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginTop: 4 }}>Your contribution patterns appear organic</div>
            </div>
          )}
        </div>

        {/* Caps Applied */}
        {Object.keys(caps).length > 0 && (
          <div className="card fade-in stagger-5" style={{ gridColumn: 'span 2' }}>
            <div className="card__header">
              <span className="card__title">Caps Applied</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="glass-table">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Capped Value</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(caps).map(([key, val]) => (
                    <tr key={key}>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>{key}</td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600 }}>
                        {typeof val === 'number' ? formatNumber(val) : String(val)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Transparency Note */}
      <div style={{
        marginTop: 32, padding: '16px 20px', borderRadius: 14,
        background: 'rgba(13,19,35,0.3)', border: '1px solid var(--glass-border)',
        fontSize: 12, color: 'var(--outline)', textAlign: 'center', fontFamily: 'var(--font-label)',
      }}>
        {ex.transparency?.source || 'Scores derived from GitHub metadata only. No source code is stored.'}
      </div>
    </div>
  );
}
