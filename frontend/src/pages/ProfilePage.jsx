import { useAuth } from '../context/AuthContext';
import {
  TierBadge, Avatar, ProgressBar, CircularProgress,
} from '../components/ui';

/* ── Score explainability vector data ── */
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
    source: 'Scores derived from verified Git topology, AST complexity, and public repository events. No private source code is retained.',
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
  const caps = ex?.capsApplied || {};
  const antiCheat = ex?.antiCheat || {};

  return (
    <div className="fade-in">
      {/* ── Page Header ── */}
      <div className="page-header">
        <div>
          <div className="overline">DEVELOPER INTELLIGENCE & EXPLAINABILITY</div>
          <h1 className="page-header__title">Contributor Profile & Score Audit</h1>
          <p className="page-header__subtitle">
            Comprehensive audit breakdown of the 5-Factor Vector Score with Zero Obscurity mathematical explainability
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="badge badge-lime">
            SYSTEM SPEC 2.0
          </span>
        </div>
      </div>

      {/* ── Contributor Hero Identity Card ── */}
      <div className="card" style={{ marginBottom: 28, padding: '28px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <Avatar src={p?.avatar} alt={p?.name} size="lg" tier={p?.tierRank || 'Elite'} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
                  {p?.name}
                </h2>
                <TierBadge tier={p?.tierRank || 'Elite'} />
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginTop: 8 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--on-surface-variant)' }}>
                  {p?.enrollmentId}
                </span>
                <span style={{ opacity: 0.3 }}>|</span>
                <span className="pill">{p?.branch}</span>
                <span className="pill">Year {p?.year}</span>
                {p?.githubUsername && (
                  <a
                    href={`https://github.com/${p.githubUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill pill--active"
                  >
                    @{p.githubUsername} ↗
                  </a>
                )}
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div className="score-label" style={{ marginBottom: 4 }}>VERIFIED VECTOR SCORE</div>
            <div className="score-value">{formatNumber(ex.rank?.score)}</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'flex-end', marginTop: 8 }}>
              <span className="badge badge-lime" style={{ fontSize: 12 }}>
                Cohort Rank #{ex.rank?.leaderboardRank}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Explainability Matrix ── */}
      {ex?.available ? (
        <div className="dashboard-grid">
          {/* 5-Factor Score Breakdown */}
          <div className="card fade-in stagger-1 col-span-2">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <div className="overline overline--no-dot" style={{ fontSize: 10, marginBottom: 4 }}>
                  VECTOR DECOMPOSITION
                </div>
                <h3 className="card-title">5-Factor Score Breakdown</h3>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--primary)', padding: '2px 8px', background: 'rgba(191,245,73,0.1)', borderRadius: 4 }}>
                {formula.scoreVersion}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { key: 'PAS', label: 'Productivity & Activity', desc: 'commits×1 + 30d_contrib×2 + streak×1', max: 6000, color: 'var(--primary)' },
                { key: 'OCS', label: 'Open-Source Collaboration', desc: 'external_PRs×15 + issues×8 + code_reviews×4', max: 6500, color: '#A78BFA' },
                { key: 'PIS', label: 'Project Impact', desc: 'repos×5 + log(stars)×20 + log(forks)×10', max: 1500, color: '#34D399' },
                { key: 'CIS', label: 'Community Influence', desc: 'followers×2 + network_citations×5', max: 4000, color: '#F59E0B' },
                { key: 'SDS', label: 'Skill Diversity', desc: 'polyglot_languages×15 with entropy weight', max: 200, color: '#CBD5E1' },
              ].map(({ key, label, desc, max, color }) => (
                <div key={key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: 13, color }}>
                        {key}
                      </span>
                      <span style={{ marginLeft: 8, fontSize: 13, color: '#FFFFFF' }}>{label}</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: 15, color: '#FFFFFF' }}>
                      {formatNumber(components[key])}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
                    {desc}
                  </div>
                  <ProgressBar value={components[key] || 0} max={max} size="sm" />
                </div>
              ))}

              {/* Raw vs Decayed Totals */}
              <div style={{
                display: 'flex',
                gap: 24,
                marginTop: 12,
                paddingTop: 18,
                borderTop: '1px solid var(--card-border)',
                flexWrap: 'wrap',
              }}>
                <div>
                  <div className="score-label">Raw Total</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 800, color: '#FFFFFF' }}>
                    {formatNumber(formula.rawTotal)}
                  </div>
                </div>
                <div>
                  <div className="score-label">After Activity Decay</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 800, color: 'var(--primary)' }}>
                    {formatNumber(formula.totalAfterDecay)}
                  </div>
                </div>
                <div>
                  <div className="score-label">Final Weighted Score</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 900, color: 'var(--primary)' }}>
                    {formatNumber(formula.totalScore)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Code Quality Engine (CQE) */}
          <div className="card fade-in stagger-2">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <div className="overline overline--no-dot" style={{ fontSize: 10, marginBottom: 4 }}>
                  ENGINE METRICS
                </div>
                <h3 className="card-title">Code Quality (CQE)</h3>
              </div>
              <span style={{ fontSize: 18, color: 'var(--primary)' }}>◎</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 }}>
              <CircularProgress value={formula.qualityScore || 0} max={1} size={90} />
              <div>
                <div className="score-label">Effective Commits</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 800, color: '#FFFFFF' }}>
                  {formatNumber(formula.effectiveCommits)}
                </div>
                <div style={{ fontSize: 11, color: 'var(--primary)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
                  Integrity Multiplier: 0.87
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { key: 'volumeScore', label: 'Volume Score', weight: quality.weights?.volume },
                { key: 'diversityScore', label: 'Tech Diversity', weight: quality.weights?.diversity },
                { key: 'prAssociationScore', label: 'PR Association', weight: quality.weights?.prAssociation },
                { key: 'antiSpamScore', label: 'Anti-Spam Filter', weight: quality.weights?.antiSpam },
              ].map(({ key, label, weight }) => (
                <div key={key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 3 }}>
                    <span style={{ fontFamily: 'var(--font-label)', color: 'var(--on-surface-variant)' }}>
                      {label} {weight ? `(${(weight * 100).toFixed(0)}%)` : ''}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--on-surface)' }}>
                      {((quality[key] || 0) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <ProgressBar value={(quality[key] || 0) * 100} max={100} size="sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Temporal Decay Engine */}
          <div className="card fade-in stagger-3">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <div className="overline overline--no-dot" style={{ fontSize: 10, marginBottom: 4 }}>
                  ACTIVITY METRICS
                </div>
                <h3 className="card-title">Temporal Decay Engine</h3>
              </div>
              <span style={{ fontSize: 18, color: 'var(--primary)' }}>⏱</span>
            </div>

            <div style={{ display: 'flex', gap: 20, marginBottom: 16 }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 800, color: '#FFFFFF' }}>
                  {decay.daysSinceActivity ?? 0}
                </div>
                <div className="score-label">Days Inactive</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 800, color: 'var(--primary)' }}>
                  {((decay.decayFactor ?? 1) * 100).toFixed(0)}%
                </div>
                <div className="score-label">Decay Multiplier</div>
              </div>
            </div>

            <div style={{
              padding: '12px 14px',
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid var(--card-border)',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--on-surface-variant)',
            }}>
              {decay.expression || 'decay_factor = 1 / log(days_since + 2) with safety clamp [0.2, 1.0]'}
            </div>
          </div>

          {/* Anti-Cheat Status */}
          <div className="card fade-in stagger-4">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <div className="overline overline--no-dot" style={{ fontSize: 10, marginBottom: 4 }}>
                  FORENSIC STATUS
                </div>
                <h3 className="card-title">Anti-Cheat Audit</h3>
              </div>
              <span style={{ fontSize: 18, color: 'var(--primary)' }}>🛡</span>
            </div>

            {antiCheat.isFlagged ? (
              <div>
                <div className="alert alert--danger" style={{ marginBottom: 12 }}>
                  ⚠ {antiCheat.flags?.length || 0} Forensic Flags Detected
                </div>
                {(antiCheat.flags || []).map((f, i) => (
                  <div key={i} style={{ padding: '8px 12px', background: 'rgba(239,68,68,0.1)', borderRadius: 6, marginBottom: 6 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--error)' }}>{f.code}</div>
                    <div style={{ fontSize: 11, color: 'var(--on-surface-variant)' }}>{f.reason}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 12px' }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>🛡</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>
                  Zero Anomalies Detected
                </div>
                <div style={{ fontSize: 12, color: 'var(--on-surface-variant)', maxWidth: 280, margin: '0 auto' }}>
                  Commit entropy matches verified human cognitive cadence. Cleared for institutional ranking.
                </div>
              </div>
            )}
          </div>

          {/* Caps Applied */}
          {Object.keys(caps).length > 0 && (
            <div className="card fade-in stagger-5 col-span-2">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                  <div className="overline overline--no-dot" style={{ fontSize: 10, marginBottom: 4 }}>
                    FAIRNESS GUARDS
                  </div>
                  <h3 className="card-title">System Caps & Safeguards</h3>
                </div>
                <span className="badge badge-spec">ANTI-GAMING ENGINE</span>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table className="glass-table">
                  <thead>
                    <tr>
                      <th>Evaluated Metric</th>
                      <th>Upper Saturation Cap</th>
                      <th>Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(caps).map(([key, val]) => (
                      <tr key={key}>
                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--primary)' }}>
                          {key}
                        </td>
                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700 }}>
                          {typeof val === 'number' ? formatNumber(val) : String(val)}
                        </td>
                        <td style={{ fontSize: 12, color: 'var(--on-surface-variant)' }}>
                          Prevents automated bots from farming points through high-frequency trivial events.
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>📊</div>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>No Telemetry Synchronized</h3>
          <p style={{ fontSize: 13, color: 'var(--on-surface-variant)' }}>
            Sync your GitHub profile to calculate your 5-Factor Vector Score breakdown.
          </p>
        </div>
      )}

      {/* ── Transparency Disclaimer ── */}
      <div style={{
        marginTop: 32,
        padding: '16px 20px',
        borderRadius: 'var(--radius-md)',
        background: '#090B12',
        border: '1px solid var(--card-border)',
        fontSize: 12,
        color: 'var(--on-surface-variant)',
        textAlign: 'center',
        fontFamily: 'var(--font-mono)',
      }}>
        {ex.transparency?.source}
      </div>
    </div>
  );
}
