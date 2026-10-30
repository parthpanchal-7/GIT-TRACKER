import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GeometricGMark, CosmicBackground } from '../components/ui';

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    document.title = 'GitTracker — Developer Intelligence with Forensic Precision';
  }, []);

  const NAV_LINKS = [
    { label: 'Overview', href: '#overview' },
    { label: '5-Factor Score', href: '#scoring' },
    { label: 'Forensics', href: '#forensics' },
    { label: 'Hackathons', href: '#hackathons' },
    { label: 'Tiers', href: '#tiers' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#04060F', color: '#FFFFFF', position: 'relative' }}>
      <CosmicBackground />

      {/* ── TOP NAVIGATION ── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
          height: 68,
          backgroundColor: 'rgba(4, 6, 15, 0.88)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid #1F2937',
        }}
      >
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
        >
          <GeometricGMark size={32} glow />
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 800, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
              GitTracker
            </span>
            <span className="badge badge-lime" style={{ fontSize: 9, padding: '2px 7px' }}>
              SPEC 2.0
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontSize: 13,
                fontFamily: 'var(--font-label)',
                color: '#9CA3AF',
                letterSpacing: '0.04em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#BFF549')}
              onMouseLeave={(e) => (e.target.style.color = '#9CA3AF')}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {user ? (
            <button
              onClick={() => navigate('/dashboard')}
              className="btn btn--lime"
            >
              Console Dashboard →
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="btn btn--ghost"
                style={{ padding: '8px 18px', fontSize: 13 }}
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/login')}
                className="btn btn--lime"
                style={{ padding: '8px 20px', fontSize: 13 }}
              >
                Start Telemetry →
              </button>
            </>
          )}
        </div>
      </nav>

      {/* ── 1. HERO SECTION ── */}
      <section
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '120px 24px 70px',
          maxWidth: 1040,
          margin: '0 auto',
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <span className="overline">
            CONTRIBUTION TELEMETRY &amp; VERIFICATION
          </span>
        </div>

        <h1 className="hero-heading" style={{ margin: '0 0 24px', maxWidth: 880 }}>
          Developer Intelligence with Forensic Precision
        </h1>

        <p
          style={{
            fontSize: 17,
            color: '#9CA3AF',
            lineHeight: 1.65,
            maxWidth: 720,
            margin: '0 auto 36px',
            fontFamily: 'var(--font-body)',
          }}
        >
          Transforming raw GitHub commits, pull requests, and codebase histories into transparent multi-dimensional developer evaluations.
        </p>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 56 }}>
          <button
            onClick={() => navigate('/login')}
            className="btn btn--lime btn--lg"
          >
            Connect Repositories →
          </button>
          <button
            onClick={() => navigate('/anti-cheat')}
            className="btn btn--outline-lime btn--lg"
          >
            🛡️ Run Forensic Check
          </button>
        </div>

        {/* Hero Metadata Chips from Brand Deck Page 1 */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            justifyContent: 'center',
            padding: '16px 24px',
            background: '#0F1117',
            border: '1px solid #1F2937',
            borderRadius: 12,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
          }}
        >
          <div>
            <span style={{ color: '#6B7280' }}>CORE ENGINE: </span>
            <strong style={{ color: '#FFFFFF' }}>Codequiry Anti-Cheat</strong>
          </div>
          <div style={{ color: '#1F2937' }}>|</div>
          <div>
            <span style={{ color: '#6B7280' }}>DATA MODEL: </span>
            <strong style={{ color: '#FFFFFF' }}>5-Factor Decay Scoring</strong>
          </div>
          <div style={{ color: '#1F2937' }}>|</div>
          <div>
            <span style={{ color: '#6B7280' }}>IDENTITY: </span>
            <strong style={{ color: '#BFF549' }}>Lime Geometric G Symbol</strong>
          </div>
        </div>
      </section>

      {/* ── 2. PLATFORM OVERVIEW (Page 2) ── */}
      <section
        id="overview"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '90px 24px',
          maxWidth: 1120,
          margin: '0 auto',
          borderTop: '1px solid #1F2937',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div className="overline" style={{ marginBottom: 8 }}>PLATFORM OVERVIEW</div>
            <h2 className="page-title">The Contribution Benchmark Problem</h2>
          </div>
          <div className="badge badge-spec">
            PAS • OCS • PIS • CIS • SDS
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          <div className="card card--interactive">
            <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(191,245,73,0.1)', border: '1px solid rgba(191,245,73,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginBottom: 16 }}>
              ●
            </div>
            <h3 className="card-title" style={{ marginBottom: 8 }}>Un-Gameable Telemetry</h3>
            <p style={{ fontSize: 14, color: '#9CA3AF', lineHeight: 1.6 }}>
              Replaces cosmetic GitHub green squares with depth-weighted verification algorithms, analyzing commit diffs and branch integrity.
            </p>
          </div>

          <div className="card card--interactive">
            <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(191,245,73,0.1)', border: '1px solid rgba(191,245,73,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginBottom: 16 }}>
              🛡️
            </div>
            <h3 className="card-title" style={{ marginBottom: 8 }}>Forensic Inspection</h3>
            <p style={{ fontSize: 14, color: '#9CA3AF', lineHeight: 1.6 }}>
              Instant detection of AI code boilerplate, cohort cross-plagiarism, and token anomalies via integrated Codequiry AST parsing.
            </p>
          </div>

          <div className="card card--interactive">
            <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(191,245,73,0.1)', border: '1px solid rgba(191,245,73,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginBottom: 16 }}>
              📊
            </div>
            <h3 className="card-title" style={{ marginBottom: 8 }}>Meritocratic Tiering</h3>
            <p style={{ fontSize: 14, color: '#9CA3AF', lineHeight: 1.6 }}>
              Live candidate rankings built on verified pull request acceptance, decay recalibration, and authentic engineering complexity.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, fontSize: 11, color: '#6B7280', fontFamily: 'var(--font-mono)' }}>
          <span>ENTERPRISE &amp; HACKATHON EDITIONS</span>
          <span>ZERO OBSCURITY ENGINE</span>
        </div>
      </section>

      {/* ── 3. QUANTIFIED CODE TELEMETRY (Page 4) ── */}
      <section
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '100px 24px',
          background: '#090B12',
          borderTop: '1px solid #1F2937',
          borderBottom: '1px solid #1F2937',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <div className="overline" style={{ marginBottom: 12 }}>SCORING EFFICIENCY</div>
          <h2 className="page-title" style={{ marginBottom: 40 }}>Quantified Code Telemetry</h2>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(64px, 10vw, 120px)', fontWeight: 900, lineHeight: 1, marginBottom: 12 }}>
            <span style={{ color: '#FFFFFF' }}>99</span>
            <span style={{ color: '#BFF549' }}>.4%</span>
          </div>

          <p style={{ fontSize: 16, color: '#9CA3AF', maxWidth: 540, margin: '0 auto 36px', fontFamily: 'var(--font-body)' }}>
            Plagiarism &amp; Synthetic Commit Discrepancy Detection across verified repositories.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, fontSize: 11, fontFamily: 'var(--font-mono)', color: '#6B7280' }}>
            <span>VALIDATED ACROSS 50,000+ COMMITS</span>
            <span>•</span>
            <span style={{ color: '#BFF549' }}>ANTI-CHEAT ENGINE: ACTIVE</span>
          </div>
        </div>
      </section>

      {/* ── 4. THE 5-FACTOR VECTOR SCORE (Page 5) ── */}
      <section
        id="scoring"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '90px 24px',
          maxWidth: 1120,
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="overline" style={{ marginBottom: 8 }}>EVALUATION ARCHITECTURE</div>
          <h2 className="page-title">The 5-Factor Vector Score</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
          {[
            { tag: 'PAS', label: 'Productivity Score', desc: 'Active commit cadences and streak density.' },
            { tag: 'OCS', label: 'Collaboration', desc: 'Merged pull requests and peer code reviews.' },
            { tag: 'PIS', label: 'Project Impact', desc: 'External stars, forks, and library adoptions.' },
            { tag: 'CIS', label: 'Code Integrity', desc: 'Codequiry audit and syntax uniqueness.' },
            { tag: 'SDS', label: 'Skill Diversity', desc: 'Multi-language versatility and ecosystem breadth.' },
          ].map((f) => (
            <div key={f.tag} className="card card--interactive" style={{ padding: 20 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 800, color: '#BFF549', marginBottom: 8 }}>
                {f.tag}
              </div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{f.label}</div>
              <div style={{ fontSize: 12, color: '#9CA3AF', lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        {/* Terminal Formula Bar from Brand Deck Page 5 */}
        <div className="code-terminal" style={{ textAlign: 'center' }}>
          Composite Rank Formula = PAS(0.3) + OCS(0.25) + PIS(0.2) + CIS(0.15) + SDS(0.1)
        </div>
      </section>

      {/* ── 5. TRADITIONAL AUDITING VS. GITTRACKER (Page 6) ── */}
      <section
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '80px 24px',
          maxWidth: 1040,
          margin: '0 auto',
          borderTop: '1px solid #1F2937',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div className="overline" style={{ marginBottom: 8 }}>EVALUATION UPGRADE</div>
          <h2 className="page-title">Traditional Auditing vs. GitTracker</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24 }}>
          {/* Surface Level */}
          <div className="card" style={{ padding: 32, opacity: 0.85 }}>
            <div style={{ fontSize: 11, fontFamily: 'var(--font-label)', letterSpacing: '0.08em', color: '#6B7280', textTransform: 'uppercase', marginBottom: 12 }}>
              CONVENTIONAL RESUME EVALUATION
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Surface-Level Screening</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                'Superficial commit counts and green heatmaps.',
                'Vulnerable to bot scripts and copy-paste commits.',
                'AI generated boilerplate accepted without verification.',
                'Manual reviewer bias and non-standardized scores.',
              ].map((item, idx) => (
                <li key={idx} style={{ display: 'flex', gap: 12, fontSize: 13, color: '#9CA3AF' }}>
                  <span style={{ color: '#EF4444', fontWeight: 800 }}>✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Verified Intelligence */}
          <div className="card card-highlight" style={{ padding: 32, backgroundColor: '#090B12' }}>
            <div style={{ fontSize: 11, fontFamily: 'var(--font-label)', letterSpacing: '0.08em', color: '#BFF549', textTransform: 'uppercase', marginBottom: 12 }}>
              GITTRACKER FORENSICS
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20 }}>Verified Code Intelligence</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                'AST-level code parsing and structural syntax analysis.',
                'Automated Codequiry plagiarism check engine.',
                'Time-decay weighted scores preventing stale ranking.',
                'Verifiable badge tokens for student & dev profiles.',
              ].map((item, idx) => (
                <li key={idx} style={{ display: 'flex', gap: 12, fontSize: 13, color: '#FFFFFF' }}>
                  <span style={{ color: '#BFF549', fontWeight: 800 }}>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28, fontSize: 12, color: '#6B7280', fontFamily: 'var(--font-mono)' }}>
          <span>Audit Result: 94% reduction in technical screening overhead.</span>
          <span style={{ color: '#BFF549' }}>PROVEN RELIABILITY</span>
        </div>
      </section>

      {/* ── 6. CODEQUIRY FORENSIC PIPELINE (Page 7) ── */}
      <section
        id="forensics"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '90px 24px',
          maxWidth: 1120,
          margin: '0 auto',
          borderTop: '1px solid #1F2937',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div className="overline" style={{ marginBottom: 8 }}>SECURITY &amp; FORENSICS</div>
          <h2 className="page-title">Codequiry Forensic Pipeline</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 28 }}>
          <div className="card card--interactive">
            <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-label)', color: '#A78BFA', letterSpacing: '0.08em' }}>
              PILLAR 01
            </span>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: '10px 0 8px' }}>AI Synthesis Entropy</h3>
            <p style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.6 }}>
              Detects characteristic LLM prompt token cadences, excessive uniform commenting, and synthetic variable scaffolds.
            </p>
          </div>

          <div className="card card--interactive">
            <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-label)', color: '#F87171', letterSpacing: '0.08em' }}>
              PILLAR 02
            </span>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: '10px 0 8px' }}>Repository Collision</h3>
            <p style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.6 }}>
              Cross-references submissions against 50M+ open-source repos and event cohort codebases in real time.
            </p>
          </div>

          <div className="card card--interactive">
            <span style={{ fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-label)', color: '#34D399', letterSpacing: '0.08em' }}>
              PILLAR 03
            </span>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: '10px 0 8px' }}>Organic Craftsmanship</h3>
            <p style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.6 }}>
              Authenticates natural incremental commit graphs, debug iterations, and idiomatic problem-solving.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 20px', background: '#090B12', border: '1px solid #1F2937', borderRadius: 10, fontSize: 11, fontFamily: 'var(--font-mono)' }}>
          <span style={{ color: '#9CA3AF' }}>INTEGRATION PROTOCOL: CODEQUIRY API v3</span>
          <span style={{ color: '#BFF549' }}>ZERO FALSE-POSITIVE TOLERANCE</span>
        </div>
      </section>

      {/* ── 7. HACKATHON CONTROL MODULES (Page 8) ── */}
      <section
        id="hackathons"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '90px 24px',
          maxWidth: 1120,
          margin: '0 auto',
          borderTop: '1px solid #1F2937',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div className="overline" style={{ marginBottom: 8 }}>EVENT OPERATIONS</div>
          <h2 className="page-title">Hackathon Control Modules</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18, marginBottom: 28 }}>
          {[
            { mod: 'MODULE 01', name: 'Registration Flow', desc: 'Custom dev signups & automated technical screening.' },
            { mod: 'MODULE 02', name: 'Team Assembly', desc: 'Skill-matched squad builders and open team pairing.' },
            { mod: 'MODULE 03', name: 'Project Idea Hub', desc: 'Track pitch proposals, milestones, and asset drops.' },
            { mod: 'MODULE 04', name: 'Live Chat & Comms', desc: 'Real-time cohort notifications and mentor queues.' },
            { mod: 'MODULE 05', name: 'Mentor Routing', desc: 'Expert feedback, code review sessions, and ratings.' },
            { mod: 'MODULE 06', name: 'Live Leaderboard', desc: 'Real-time verified standings and anti-cheat tracking.' },
          ].map((m) => (
            <div key={m.mod} className="card card--interactive" style={{ padding: 22 }}>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-label)', color: '#BFF549', letterSpacing: '0.08em', marginBottom: 6 }}>
                {m.mod}
              </div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{m.name}</div>
              <div style={{ fontSize: 13, color: '#9CA3AF' }}>{m.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#6B7280', fontFamily: 'var(--font-mono)' }}>
          <span>Supported by integrated Git webhook listeners on every push.</span>
          <span>SYNC LATENCY &lt; 800MS</span>
        </div>
      </section>

      {/* ── 8. THE VERIFIED TIER LADDER (Page 9) ── */}
      <section
        id="tiers"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '90px 24px',
          maxWidth: 1120,
          margin: '0 auto',
          borderTop: '1px solid #1F2937',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div className="overline" style={{ marginBottom: 8 }}>ENGINEER PROGRESSION</div>
          <h2 className="page-title">The Verified Tier Ladder</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16, marginBottom: 28 }}>
          {[
            { tier: 'Bronze', pts: '0 – 249 PTS', desc: 'First verified commit cycle', color: '#C87941', isElite: false },
            { tier: 'Silver', pts: '250 – 499 PTS', desc: 'Active PR contributions', color: '#9CA3AF', isElite: false },
            { tier: 'Gold', pts: '500 – 749 PTS', desc: 'Consistent multi-repo impact', color: '#F59E0B', isElite: false },
            { tier: 'Platinum', pts: '750 – 899 PTS', desc: 'Architecture lead score', color: '#CBD5E1', isElite: false },
            { tier: 'Elite', pts: '900+ PTS', desc: 'Top 1% engineering audit', color: '#BFF549', isElite: true },
          ].map((t) => (
            <div
              key={t.tier}
              className={`card ${t.isElite ? 'card-highlight' : 'card--interactive'}`}
              style={{
                textAlign: 'center',
                padding: '28px 18px',
                backgroundColor: t.isElite ? '#04060F' : '#0F1117',
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: t.color,
                  margin: '0 auto 16px',
                  boxShadow: t.isElite ? '0 0 16px rgba(191,245,73,0.4)' : 'none',
                }}
              />
              <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 4, color: t.isElite ? '#BFF549' : '#FFFFFF' }}>
                {t.tier}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#6B7280', marginBottom: 12 }}>
                {t.pts}
              </div>
              <div style={{ fontSize: 12, color: '#9CA3AF', lineHeight: 1.4 }}>{t.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#6B7280', fontFamily: 'var(--font-mono)' }}>
          <span>Decay algorithm recalibrates rankings bi-weekly to prevent zombie positions.</span>
          <span style={{ color: '#BFF549' }}>DYNAMIC DECAY: ON</span>
        </div>
      </section>

      {/* ── 9. COMMERCIAL TIERS & PACKAGING (Page 10) ── */}
      <section
        id="pricing"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '90px 24px',
          maxWidth: 1040,
          margin: '0 auto',
          borderTop: '1px solid #1F2937',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div className="overline" style={{ marginBottom: 8 }}>COMMERCIAL TIERS</div>
          <h2 className="page-title">Startup &amp; Hackathon Packaging</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 24, marginBottom: 28 }}>
          {/* Open Access Free */}
          <div className="card card--interactive" style={{ padding: 32 }}>
            <div style={{ fontSize: 11, fontFamily: 'var(--font-label)', color: '#6B7280', letterSpacing: '0.08em', marginBottom: 8 }}>
              STUDENT &amp; COMMUNITY
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Open Access</h3>
            <div style={{ fontSize: 38, fontWeight: 900, fontFamily: 'var(--font-mono)', marginBottom: 20 }}>
              Free
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
              {['Public repo telemetry sync', 'Standard 5-Factor Score profile', 'Shareable profile badge'].map((f, i) => (
                <li key={i} style={{ fontSize: 13, color: '#9CA3AF', display: 'flex', gap: 10 }}>
                  <span style={{ color: '#BFF549' }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <button onClick={() => navigate('/login')} className="btn btn-dark" style={{ width: '100%' }}>
              Get Started
            </button>
          </div>

          {/* Event Edition ₹5,000 (Active Highlight) */}
          <div className="card card-highlight" style={{ padding: 32, backgroundColor: '#090B12', position: 'relative' }}>
            <div style={{ fontSize: 11, fontFamily: 'var(--font-label)', color: '#BFF549', letterSpacing: '0.08em', marginBottom: 8 }}>
              HACKATHON EVENT PACK
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>Event Edition</h3>
            <div style={{ fontSize: 38, fontWeight: 900, fontFamily: 'var(--font-mono)', color: '#BFF549', marginBottom: 20 }}>
              ₹5,000
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
              {['Up to 500 participants', 'Automated Codequiry scan audit', 'Full 9-module control panel'].map((f, i) => (
                <li key={i} style={{ fontSize: 13, color: '#FFFFFF', display: 'flex', gap: 10 }}>
                  <span style={{ color: '#BFF549' }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <button onClick={() => navigate('/login')} className="btn btn--lime" style={{ width: '100%' }}>
              Launch Hackathon →
            </button>
          </div>

          {/* Enterprise */}
          <div className="card card--interactive" style={{ padding: 32 }}>
            <div style={{ fontSize: 11, fontFamily: 'var(--font-label)', color: '#6B7280', letterSpacing: '0.08em', marginBottom: 8 }}>
              STARTUP TEAM SUITE
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Enterprise</h3>
            <div style={{ fontSize: 38, fontWeight: 900, fontFamily: 'var(--font-mono)', marginBottom: 20 }}>
              Custom
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
              {['Private enterprise org sync', 'Candidate technical ranking API', 'Dedicated support & SLAs'].map((f, i) => (
                <li key={i} style={{ fontSize: 13, color: '#9CA3AF', display: 'flex', gap: 10 }}>
                  <span style={{ color: '#BFF549' }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <button onClick={() => navigate('/login')} className="btn btn-dark" style={{ width: '100%' }}>
              Contact Sales
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#6B7280', fontFamily: 'var(--font-mono)' }}>
          <span>Transparent pricing built for Indian tech ecosystems and global hackathons.</span>
          <span style={{ color: '#BFF549' }}>INSTANT ONBOARDING</span>
        </div>
      </section>

      {/* ── 10. CLOSING HERO CTA (Page 12) ── */}
      <section
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '120px 24px 100px',
          textAlign: 'center',
          backgroundColor: '#04060F',
          borderTop: '1px solid #1F2937',
        }}
      >
        <div style={{ maxWidth: 840, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <GeometricGMark size={64} glow />
          <div className="overline" style={{ margin: '24px 0 16px' }}>
            VERIFIED ENGINEERING INTELLIGENCE
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 20 }}>
            Empower Genuine Developer Craftsmanship
          </h2>
          <p style={{ fontSize: 16, color: '#9CA3AF', maxWidth: 640, marginBottom: 36, lineHeight: 1.6 }}>
            Connect your repositories, initiate forensic Codequiry checks, and rank developers with mathematical transparency.
          </p>

          <div style={{ display: 'flex', gap: 14, marginBottom: 40 }}>
            <button onClick={() => navigate('/login')} className="btn btn--lime btn--lg">
              Get Started Free →
            </button>
          </div>

          <div
            style={{
              padding: '8px 20px',
              borderRadius: 8,
              border: '1px solid #1F2937',
              backgroundColor: '#090B12',
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              color: '#BFF549',
              letterSpacing: '0.05em',
            }}
          >
            gittracker.dev • api.gittracker.dev
          </div>
        </div>
      </section>
    </div>
  );
}
