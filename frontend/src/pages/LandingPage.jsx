import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo, ThemeToggle } from '../components/ui';

/* ─── Fullscreen Cinematic Branch Intro Overlay (HTML5 Canvas) ─── */
function CinematicIntro({ onComplete }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let startTime = null;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const DURATION = 4600; // 4.6 seconds total cinematic sequence
    const letters = ['G', 'I', 'T', 'T', 'R', 'A', 'C', 'K', 'E', 'R'];
    const hashes = ['8fe447a', '4ee945b', '2655f10', '91ff916', 'ab31226', 'dd88cae', '759c01e', '0901cs2', 'bff549a', 'v3.0.0'];

    const branches = [
      { start: { x: 0.5, y: 0.5 }, cp1: { x: 0.35, y: 0.3 }, cp2: { x: 0.2, y: 0.25 }, end: { x: 0.08, y: 0.2 } },
      { start: { x: 0.5, y: 0.5 }, cp1: { x: 0.65, y: 0.3 }, cp2: { x: 0.8, y: 0.22 }, end: { x: 0.92, y: 0.18 } },
      { start: { x: 0.5, y: 0.5 }, cp1: { x: 0.38, y: 0.7 }, cp2: { x: 0.25, y: 0.8 }, end: { x: 0.1, y: 0.85 } },
      { start: { x: 0.5, y: 0.5 }, cp1: { x: 0.62, y: 0.7 }, cp2: { x: 0.75, y: 0.82 }, end: { x: 0.9, y: 0.82 } },
      { start: { x: 0.5, y: 0.5 }, cp1: { x: 0.5, y: 0.25 }, cp2: { x: 0.5, y: 0.15 }, end: { x: 0.5, y: 0.08 } },
      { start: { x: 0.5, y: 0.5 }, cp1: { x: 0.5, y: 0.75 }, cp2: { x: 0.5, y: 0.88 }, end: { x: 0.5, y: 0.94 } },
    ];

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / DURATION);

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      // Background fade
      ctx.fillStyle = '#04060F';
      ctx.fillRect(0, 0, w, h);

      // Ambient radial grid background
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(w, h) * 0.7);
      grad.addColorStop(0, 'rgba(191, 245, 73, 0.1)');
      grad.addColorStop(0.5, 'rgba(129, 236, 255, 0.03)');
      grad.addColorStop(1, 'rgba(4, 6, 15, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Phase 1: Zooming Geometric Central Glyph (0 to 1800ms)
      const zoomProgress = Math.min(1, elapsed / 1400);
      const glyphScale = 1.6 - 0.6 * Math.sin((zoomProgress * Math.PI) / 2);
      const glyphAlpha = Math.min(1, elapsed / 400);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(glyphScale, glyphScale);
      ctx.globalAlpha = glyphAlpha;

      // Draw central concentric Lime G Rings
      ctx.beginPath();
      ctx.arc(0, 0, 48, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(191, 245, 73, 0.25)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, 36, 0.4, Math.PI * 1.85);
      ctx.strokeStyle = '#BFF549';
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, 20, 0, Math.PI * 2);
      ctx.fillStyle = '#BFF549';
      ctx.fill();

      // Stem of G
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(24, 0);
      ctx.strokeStyle = '#BFF549';
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.stroke();

      ctx.restore();

      // Phase 2: Cubic Bézier Git branches sprouting (1000ms to 3200ms)
      if (elapsed > 900) {
        const branchProgress = Math.min(1, (elapsed - 900) / 1800);

        branches.forEach((b) => {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(b.start.x * w, b.start.y * h);

          // Subdivide cubic Bezier by branchProgress
          const t = branchProgress;
          const x0 = b.start.x * w, y0 = b.start.y * h;
          const x1 = b.cp1.x * w, y1 = b.cp1.y * h;
          const x2 = b.cp2.x * w, y2 = b.cp2.y * h;
          const x3 = b.end.x * w, y3 = b.end.y * h;

          // De Casteljau subdivision point
          const qx = (1 - t) * x0 + t * x1;
          const qy = (1 - t) * y0 + t * y1;
          const rx = (1 - t) * x1 + t * x2;
          const ry = (1 - t) * y1 + t * y2;
          const sx = (1 - t) * x2 + t * x3;
          const sy = (1 - t) * y2 + t * y3;
          const px = (1 - t) * ((1 - t) * x0 + t * x1) + t * ((1 - t) * x1 + t * x2);
          const py = (1 - t) * ((1 - t) * y0 + t * y1) + t * ((1 - t) * y1 + t * y2);
          const targetX = (1 - t) * px + t * ((1 - t) * rx + t * sx);
          const targetY = (1 - t) * py + t * ((1 - t) * ry + t * sy);

          ctx.quadraticCurveTo(qx, qy, targetX, targetY);
          ctx.strokeStyle = 'rgba(191, 245, 73, 0.75)';
          ctx.lineWidth = 2.5;
          ctx.shadowColor = '#BFF549';
          ctx.shadowBlur = 12;
          ctx.stroke();
          ctx.restore();
        });
      }

      // Phase 3: Letter Nodes Popping G-I-T-T-R-A-C-K-E-R (1800ms to 3600ms)
      if (elapsed > 1600) {
        const letterTime = elapsed - 1600;
        const totalLetters = letters.length;
        const spacing = Math.min(w * 0.78, 720) / (totalLetters - 1);
        const startX = cx - (spacing * (totalLetters - 1)) / 2;
        const letterY = cy + 110;

        letters.forEach((char, idx) => {
          const charDelay = idx * 160;
          if (letterTime > charDelay) {
            const charAge = letterTime - charDelay;
            const popScale = Math.min(1.2, 0.4 + charAge / 120);
            const finalScale = charAge > 180 ? Math.max(1, 1.2 - (charAge - 180) / 200) : popScale;
            const charAlpha = Math.min(1, charAge / 120);

            const lx = startX + idx * spacing;

            ctx.save();
            ctx.translate(lx, letterY);
            ctx.scale(finalScale, finalScale);
            ctx.globalAlpha = charAlpha;

            // Commit Node circle
            ctx.beginPath();
            ctx.arc(0, -32, 6, 0, Math.PI * 2);
            ctx.fillStyle = '#BFF549';
            ctx.shadowColor = '#BFF549';
            ctx.shadowBlur = 10;
            ctx.fill();

            // Connecting commit tick
            ctx.beginPath();
            ctx.moveTo(0, -26);
            ctx.lineTo(0, -14);
            ctx.strokeStyle = 'rgba(191, 245, 73, 0.4)';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Letter
            ctx.font = '900 32px "Plus Jakarta Sans", sans-serif';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#F8FAFC';
            ctx.shadowColor = 'rgba(191, 245, 73, 0.5)';
            ctx.shadowBlur = 14;
            ctx.fillText(char, 0, 16);

            // Commit Hash label below
            ctx.font = '600 10px "JetBrains Mono", monospace';
            ctx.fillStyle = 'rgba(148, 163, 184, 0.8)';
            ctx.shadowBlur = 0;
            ctx.fillText(hashes[idx], 0, 36);

            ctx.restore();
          }
        });
      }

      // Phase 4: Convergence & Tagline Drop (3200ms to 4600ms)
      if (elapsed > 3000) {
        const taglineAlpha = Math.min(1, (elapsed - 3000) / 800);
        ctx.save();
        ctx.globalAlpha = taglineAlpha;
        ctx.font = '700 15px "Space Grotesk", sans-serif';
        ctx.textAlign = 'center';
        ctx.letterSpacing = '0.12em';
        ctx.fillStyle = '#BFF549';
        ctx.fillText('THE DEVELOPER CONTRIBUTION INTELLIGENCE PLATFORM', cx, cy + 185);
        ctx.restore();
      }

      // Final Fade Out (4000ms to 4600ms)
      if (elapsed > 3900) {
        const fadeOutAlpha = (elapsed - 3900) / 700;
        ctx.save();
        ctx.globalAlpha = Math.min(1, fadeOutAlpha);
        ctx.fillStyle = '#04060F';
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
      }

      if (elapsed < DURATION) {
        animId = requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#04060F',
        overflow: 'hidden',
      }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      <button
        onClick={onComplete}
        style={{
          position: 'absolute',
          top: 24,
          right: 28,
          zIndex: 10000,
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(191, 245, 73, 0.3)',
          color: '#F8FAFC',
          padding: '8px 16px',
          borderRadius: 999,
          fontFamily: 'var(--font-label)',
          fontSize: 12,
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          backdropFilter: 'blur(8px)',
        }}
      >
        <span>Skip Intro</span>
        <span style={{ color: '#BFF549' }}>✕</span>
      </button>
    </div>
  );
}

/* ─── Animated star particles ─── */
function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      alpha: Math.random(),
      speed: Math.random() * 0.004 + 0.001,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.alpha += s.speed;
        if (s.alpha > 1 || s.alpha < 0) s.speed *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(191,245,73,${s.alpha * 0.5})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}

/* ─── Symmetric Bento Metric Stat Box ─── */
function StatCard({ icon, value, label }) {
  return (
    <div
      className="card h-full flex flex-col justify-between"
      style={{
        borderRadius: 16,
        padding: '24px 20px',
        textAlign: 'center',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        flex: '1 1 180px',
        minWidth: 160,
        boxSizing: 'border-box',
      }}
    >
      <div style={{ fontSize: 26, marginBottom: 8 }}>{icon}</div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 30,
          fontWeight: 800,
          color: 'var(--brand-lime, #BFF549)',
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 11,
          color: 'var(--text-secondary)',
          marginTop: 6,
          fontFamily: 'var(--font-label)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          fontWeight: 600,
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* ─── Symmetric 3-Column Bento Feature Card ─── */
function FeatureCard({ icon, title, desc, tag, accent = '#BFF549' }) {
  return (
    <div
      className="card h-full flex flex-col justify-between"
      style={{
        borderRadius: 16,
        padding: 24,
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        boxSizing: 'border-box',
        transition: 'all 0.2s ease',
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'rgba(191, 245, 73, 0.12)',
              border: '1px solid rgba(191, 245, 73, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
            }}
          >
            {icon}
          </div>
          {tag && (
            <span
              style={{
                fontFamily: 'var(--font-label)',
                fontSize: 10,
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: 999,
                background: '#04060F',
                color: '#BFF549',
                border: '1px solid rgba(191, 245, 73, 0.3)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {tag}
            </span>
          )}
        </div>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 18,
            fontWeight: 800,
            marginBottom: 8,
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: 14,
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          {desc}
        </p>
      </div>
      <div
        style={{
          marginTop: 20,
          paddingTop: 14,
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 12,
          fontWeight: 700,
          fontFamily: 'var(--font-label)',
          color: 'var(--brand-lime, #BFF549)',
        }}
      >
        <span>Verified Architecture</span>
        <span>→</span>
      </div>
    </div>
  );
}

/* ─── Symmetric Pricing Bento Card ─── */
function PricingCard({ plan, price, period, features, highlighted, badgeText }) {
  const navigate = useNavigate();
  return (
    <div
      className="card h-full flex flex-col justify-between"
      style={{
        borderRadius: 16,
        padding: 28,
        background: highlighted ? 'rgba(191, 245, 73, 0.05)' : 'var(--bg-card)',
        border: highlighted ? '1.5px solid var(--brand-lime, #BFF549)' : '1px solid var(--border-subtle)',
        boxSizing: 'border-box',
        position: 'relative',
        transition: 'transform 0.2s ease',
      }}
    >
      <div>
        {badgeText && (
          <div
            style={{
              position: 'absolute',
              top: -12,
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#04060F',
              color: '#BFF549',
              border: '1px solid #BFF549',
              fontSize: 10,
              fontWeight: 800,
              padding: '3px 12px',
              borderRadius: 999,
              fontFamily: 'var(--font-label)',
              letterSpacing: '0.06em',
            }}
          >
            {badgeText}
          </div>
        )}
        <div
          style={{
            fontSize: 12,
            color: highlighted ? 'var(--brand-lime, #BFF549)' : 'var(--text-secondary)',
            fontFamily: 'var(--font-label)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          {plan}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 4 }}>
          {price}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 24 }}>{period}</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {features.map((f, i) => (
            <li key={i} style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <span style={{ color: '#BFF549', fontWeight: 800 }}>✓</span> <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => navigate('/login')}
        style={{
          width: '100%',
          padding: '12px 0',
          borderRadius: 10,
          border: 'none',
          cursor: 'pointer',
          background: highlighted ? '#BFF549' : 'rgba(255, 255, 255, 0.08)',
          color: highlighted ? '#04060F' : 'var(--text-primary)',
          fontWeight: 800,
          fontSize: 13,
          fontFamily: 'var(--font-label)',
          transition: 'opacity 0.2s',
        }}
      >
        Get Started →
      </button>
    </div>
  );
}

const NAV_LINKS = [
  { label: 'Home', href: '/Home' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [introActive, setIntroActive] = useState(() => {
    return !sessionStorage.getItem('gt_intro_played');
  });

  const handleIntroComplete = () => {
    sessionStorage.setItem('gt_intro_played', 'true');
    setIntroActive(false);
  };

  useEffect(() => {
    document.title = 'HOME — GitTracker';
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-canvas, #04060f)',
        color: 'var(--text-primary, var(--on-surface))',
        fontFamily: 'var(--font-body)',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* ── CINEMATIC FULLSCREEN INTRO OVERLAY ── */}
      {introActive && <CinematicIntro onComplete={handleIntroComplete} />}

      <Particles />

      {/* ── NAVBAR ── */}
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
          padding: '0 48px',
          height: 68,
          background: 'var(--bg-surface, rgba(9,14,28,0.8))',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid var(--border-subtle, rgba(129,236,255,0.08))',
        }}
      >
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
        >
          <Logo size={34} />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 20,
              fontWeight: 800,
              color: 'var(--text-primary)',
            }}
          >
            GitTracker
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              fontFamily: 'var(--font-label)',
              padding: '2px 8px',
              borderRadius: 6,
              background: '#04060F',
              color: '#BFF549',
              border: '1px solid rgba(191,245,73,0.3)',
              letterSpacing: '0.08em',
            }}
          >
            HOME
          </span>
        </div>

        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontSize: 13,
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontFamily: 'var(--font-label)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#BFF549')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <ThemeToggle compact />
          {user ? (
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                padding: '8px 22px',
                borderRadius: 10,
                border: 'none',
                cursor: 'pointer',
                background: '#BFF549',
                color: '#04060F',
                fontWeight: 800,
                fontSize: 13,
                fontFamily: 'var(--font-label)',
                boxShadow: '0 0 18px rgba(191,245,73,0.25)',
              }}
            >
              Dashboard →
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                style={{
                  padding: '8px 20px',
                  borderRadius: 10,
                  background: 'transparent',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: 13,
                  fontFamily: 'var(--font-label)',
                  cursor: 'pointer',
                }}
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/login')}
                style={{
                  padding: '8px 22px',
                  borderRadius: 10,
                  border: 'none',
                  cursor: 'pointer',
                  background: '#BFF549',
                  color: '#04060F',
                  fontWeight: 800,
                  fontSize: 13,
                  fontFamily: 'var(--font-label)',
                  boxShadow: '0 0 20px rgba(191,245,73,0.25)',
                }}
              >
                Get Started →
              </button>
            </>
          )}
        </div>
      </nav>

      {/* ── HERO ── */}
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
          padding: '100px 24px 60px',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 18px',
              borderRadius: 999,
              background: '#04060F',
              border: '1px solid rgba(191,245,73,0.3)',
            }}
          >
            <span style={{ fontSize: 13 }}>⚡</span>
            <span style={{ fontSize: 12, color: '#BFF549', fontFamily: 'var(--font-label)', letterSpacing: '0.04em', fontWeight: 700 }}>
              GITTRACKER v3.0 • LIME GEOMETRIC EDITION
            </span>
          </div>

          <button
            onClick={() => setIntroActive(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 14px',
              borderRadius: 999,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              fontSize: 12,
              fontFamily: 'var(--font-label)',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            <span>🎬</span>
            <span>Replay Cinematic Intro</span>
          </button>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(44px, 7vw, 84px)',
            fontWeight: 900,
            lineHeight: 1.05,
            margin: '0 0 20px',
            letterSpacing: '-0.03em',
            maxWidth: 880,
            color: 'var(--text-primary)',
          }}
        >
          Track. Score.<br />
          <span style={{ color: 'var(--brand-lime, #BFF549)' }}>Rise Together.</span>
        </h1>

        <p
          style={{
            fontSize: 'clamp(15px, 2.2vw, 19px)',
            color: 'var(--text-secondary)',
            maxWidth: 620,
            lineHeight: 1.7,
            marginBottom: 44,
          }}
        >
          GitTracker is the developer contribution intelligence platform that turns GitHub commits into transparent rankings, college merit benchmarks, and career-defining proof of work.
        </p>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 64 }}>
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '15px 40px',
              borderRadius: 12,
              border: 'none',
              cursor: 'pointer',
              background: '#BFF549',
              color: '#04060F',
              fontWeight: 800,
              fontSize: 15,
              fontFamily: 'var(--font-label)',
              boxShadow: '0 0 32px rgba(191,245,73,0.3)',
            }}
          >
            Start Free Today →
          </button>
          <button
            onClick={() => navigate('/leaderboard')}
            style={{
              padding: '15px 36px',
              borderRadius: 12,
              cursor: 'pointer',
              background: 'transparent',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              fontWeight: 700,
              fontSize: 15,
              fontFamily: 'var(--font-label)',
            }}
          >
            ▶ Live Leaderboard
          </button>
        </div>

        {/* ── 5-COLUMN BENTO METRICS BAR ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, width: '100%' }}>
          <StatCard icon="👨‍💻" value="10K+" label="Verified Developers" />
          <StatCard icon="⭐" value="2.4M+" label="Commits Tracked" />
          <StatCard icon="🏆" value="5" label="Merit Tier Ranks" />
          <StatCard icon="📡" value="Real-Time" label="Sync Engine" />
          <StatCard icon="🛡️" value="Anti-Cheat" label="AI Forensic Guard" />
        </div>
      </section>

      {/* ── 3-COLUMN BENTO FEATURES GRID ── */}
      <section
        id="features"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '80px 24px',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 54 }}>
          <div
            style={{
              fontSize: 11,
              color: 'var(--brand-lime, #BFF549)',
              fontFamily: 'var(--font-label)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 10,
              fontWeight: 700,
            }}
          >
            Platform Capabilities
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 800,
              margin: 0,
              color: 'var(--text-primary)',
            }}
          >
            Symmetric Bento Architecture for Builders
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 24, alignItems: 'stretch' }}>
          <FeatureCard
            icon="📊"
            title="Real-Time GitHub Analytics"
            tag="Core Ingestion"
            desc="Auto-syncs commits, PR reviews, issue solutions, and code lines directly from GitHub via webhook and GraphQL telemetry."
          />
          <FeatureCard
            icon="🏅"
            title="5-Tier Ranking & Fairness"
            tag="Transparent Algorithm"
            desc="From Bronze to Elite — transparent scoring where every metric is explainable and free of bias or black-box rankings."
          />
          <FeatureCard
            icon="🔬"
            title="Explainability Matrix"
            tag="5-Factor Scoring"
            desc="Deep audit breakdown of PAS, OCS, PIS, CIS, and SDS weights with active decay modeling for genuine peer comparison."
          />
          <FeatureCard
            icon="🛡️"
            title="Anti-Cheat Forensic Scanner"
            tag="Code Integrity"
            desc="Examines codebases against 14M+ repositories to detect textbook algorithm plagiarism and neural AI regularities."
          />
          <FeatureCard
            icon="🏆"
            title="Hackathon Suite (₹5,000 Tier)"
            tag="Organizers & Colleges"
            desc="Launch hackathons with commit timelines, team authenticity PDF export, automated integrity auditing, and live prize boards."
          />
          <FeatureCard
            icon="📈"
            title="Career Proof-of-Work Badge"
            tag="Student Advancement"
            desc="Shareable verified credentials, contribution heatmaps, streak tracking, and skill distribution for tech hiring."
          />
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        id="how"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '80px 24px',
          textAlign: 'center',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <div style={{ fontSize: 11, color: 'var(--brand-lime, #BFF549)', fontFamily: 'var(--font-label)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10, fontWeight: 700 }}>
          Workflow
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, marginBottom: 50, color: 'var(--text-primary)' }}>
          Up and Running in 3 Minutes
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, alignItems: 'stretch' }}>
          {[
            { step: '01', icon: '🔑', title: 'Sign In via Google OAuth', desc: 'Instant single sign-on with your developer account. Zero passwords, 100% secure.' },
            { step: '02', icon: '🔗', title: 'Connect Your GitHub Profile', desc: 'Link your GitHub account. All public contribution data and commit history syncs automatically.' },
            { step: '03', icon: '🚀', title: 'Ascend the Leaderboard', desc: 'Watch your verified ranking update in real time. Share your authentic proof-of-work portfolio.' },
          ].map(({ step, icon, title, desc }) => (
            <div
              key={step}
              className="card h-full flex flex-col justify-between"
              style={{
                borderRadius: 16,
                padding: '32px 24px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                textAlign: 'left',
                position: 'relative',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div style={{ fontSize: 32 }}>{icon}</div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--brand-lime, #BFF549)', fontWeight: 800 }}>
                    {step}
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>
                  {title}
                </div>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING BENTO WITH ₹5,000 HACKATHON PRO TIER ── */}
      <section
        id="pricing"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '80px 24px',
          textAlign: 'center',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <div style={{ fontSize: 11, color: 'var(--brand-lime, #BFF549)', fontFamily: 'var(--font-label)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10, fontWeight: 700 }}>
          Transparent Tiers
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, marginBottom: 12, color: 'var(--text-primary)' }}>
          Fair Pricing for Students & Institutions
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 50, maxWidth: 540, margin: '0 auto 50px' }}>
          Free forever for developers. Scalable tiering for colleges and hackathon organizers.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, alignItems: 'stretch' }}>
          <PricingCard
            plan="Student & Individual"
            price="Free"
            period="forever"
            features={[
              'Personal GitHub contribution scoring',
              'Global and college-wide leaderboard',
              'Score explainability metrics (PAS, OCS, PIS)',
              'Basic anti-cheat repo scan preview',
              'Verified proof-of-work developer profile',
            ]}
            highlighted={false}
          />
          <PricingCard
            plan="Hackathon Pro & Events"
            price="₹5,000"
            period="per event or hackathon"
            features={[
              'Full 9-module Hackathon Management Suite',
              'Real-time commit cadence & velocity timeline',
              'Automated AI & AST plagiarism inspection',
              'Exportable Authenticity PDF & JSON audit reports',
              'Priority Discord support & live leaderboard display',
            ]}
            highlighted={true}
            badgeText="MOST POPULAR FOR HACKATHONS"
          />
          <PricingCard
            plan="University & Enterprise"
            price="Custom"
            period="annual institutional license"
            features={[
              'Campus-wide student & batch tracking',
              'Department & branch comparison cohorts',
              'Custom rubric weighting & semester decay',
              'Dedicated API integrations & database export',
              'Institution-wide administrative controls',
            ]}
            highlighted={false}
          />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '36px 48px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          background: 'var(--bg-surface)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo size={30} />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>
            GitTracker
          </span>
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {['Privacy Policy', 'Terms of Service', 'Security', 'Status'].map((l) => (
            <a key={l} href="#" style={{ fontSize: 12, color: 'var(--text-secondary)', textDecoration: 'none' }}>
              {l}
            </a>
          ))}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'var(--font-label)' }}>
          © {new Date().getFullYear()} GitTracker, Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
