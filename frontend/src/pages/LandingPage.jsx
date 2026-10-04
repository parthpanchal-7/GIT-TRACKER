import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/* ── Animated star particles ── */
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

    const stars = Array.from({ length: 160 }, () => ({
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
        ctx.fillStyle = `rgba(129,236,255,${s.alpha * 0.6})`;
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

function StatCard({ icon, value, label }) {
  return (
    <div style={{
      background: 'rgba(129,236,255,0.04)',
      border: '1px solid rgba(129,236,255,0.12)',
      borderRadius: 16, padding: '24px 32px', textAlign: 'center',
      backdropFilter: 'blur(12px)', flex: '1 1 140px', minWidth: 140,
    }}>
      <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 800,
        background: 'linear-gradient(135deg, #81ecff, #d674ff)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>{value}</div>
      <div style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginTop: 4, fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
    </div>
  );
}

function FeatureCard({ icon, title, desc, accent }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.025)', border: `1px solid ${accent}22`,
      borderRadius: 20, padding: '28px', backdropFilter: 'blur(16px)',
      display: 'flex', gap: 20, alignItems: 'flex-start',
      transition: 'transform 0.2s, border-color 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = accent + '55'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = accent + '22'; }}
    >
      <div style={{
        width: 48, height: 48, borderRadius: 14, flexShrink: 0,
        background: `${accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22, border: `1px solid ${accent}30`,
      }}>{icon}</div>
      <div>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, color: 'var(--on-surface)', fontFamily: 'var(--font-display)' }}>{title}</div>
        <div style={{ fontSize: 13, color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>{desc}</div>
      </div>
    </div>
  );
}

function PricingCard({ plan, price, period, features, highlighted }) {
  const navigate = useNavigate();
  return (
    <div style={{
      background: highlighted ? 'rgba(129,236,255,0.07)' : 'rgba(255,255,255,0.025)',
      border: highlighted ? '1.5px solid rgba(129,236,255,0.4)' : '1px solid rgba(129,236,255,0.1)',
      borderRadius: 24, padding: '36px 28px', backdropFilter: 'blur(16px)',
      flex: '1 1 260px', minWidth: 240, position: 'relative',
      transition: 'transform 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      {highlighted && (
        <div style={{
          position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, #81ecff, #d674ff)',
          color: '#003840', fontSize: 11, fontWeight: 800, padding: '4px 16px',
          borderRadius: 999, fontFamily: 'var(--font-label)', letterSpacing: '0.05em',
        }}>MOST POPULAR</div>
      )}
      <div style={{ fontSize: 13, color: highlighted ? '#81ecff' : 'var(--on-surface-variant)', fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>{plan}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 900, marginBottom: 4 }}>{price}</div>
      <div style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginBottom: 24 }}>{period}</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {features.map((f, i) => (
          <li key={i} style={{ fontSize: 13, color: 'var(--on-surface-variant)', display: 'flex', gap: 8 }}>
            <span style={{ color: '#81ecff' }}>✓</span> {f}
          </li>
        ))}
      </ul>
      <button
        onClick={() => navigate('/login')}
        style={{
          width: '100%', padding: '12px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
          background: highlighted ? 'linear-gradient(135deg, #81ecff, #00d4ec)' : 'rgba(129,236,255,0.1)',
          color: highlighted ? '#003840' : '#81ecff',
          fontWeight: 700, fontSize: 13, fontFamily: 'var(--font-label)',
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
      >
        Get Started →
      </button>
    </div>
  );
}

function TestimonialCard({ name, role, quote, avatar }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(129,236,255,0.1)',
      borderRadius: 20, padding: '28px 24px', backdropFilter: 'blur(12px)',
      flex: '1 1 280px', minWidth: 260,
    }}>
      <div style={{ fontSize: 14, color: 'var(--on-surface-variant)', lineHeight: 1.7, marginBottom: 20 }}>"{quote}"</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 38, height: 38, borderRadius: '50%',
          background: 'linear-gradient(135deg, #81ecff, #d674ff)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: 16, color: '#003840',
        }}>{avatar}</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>{name}</div>
          <div style={{ fontSize: 12, color: 'var(--on-surface-variant)' }}>{role}</div>
        </div>
      </div>
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

  useEffect(() => {
    document.title = 'HOME — GitTracker';
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #04060f 0%, #090e1c 40%, #0d1323 100%)',
      color: 'var(--on-surface)', fontFamily: 'var(--font-body)',
      position: 'relative', overflowX: 'hidden',
    }}>
      <Particles />

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 48px', height: 68,
        background: 'rgba(9,14,28,0.8)', backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(129,236,255,0.08)',
      }}>
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
        >
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: 'linear-gradient(135deg, #81ecff, #d674ff)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: 16, color: '#003840',
          }}>G</div>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800,
            background: 'linear-gradient(135deg, #81ecff 30%, #d674ff)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>GitTracker</span>
          <span style={{
            fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-label)',
            padding: '2px 8px', borderRadius: 6,
            background: 'rgba(129,236,255,0.1)', color: '#81ecff',
            border: '1px solid rgba(129,236,255,0.2)',
            letterSpacing: '0.08em',
          }}>HOME</span>
        </div>

        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {NAV_LINKS.map(link => (
            <a key={link.label} href={link.href} style={{
              fontSize: 13, color: 'var(--on-surface-variant)', textDecoration: 'none',
              fontFamily: 'var(--font-label)', transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = '#81ecff'}
              onMouseLeave={e => e.target.style.color = 'var(--on-surface-variant)'}
            >{link.label}</a>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          {user ? (
            <button onClick={() => navigate('/dashboard')} style={{
              padding: '8px 22px', borderRadius: 10, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #81ecff, #00d4ec)',
              color: '#003840', fontWeight: 700, fontSize: 13, fontFamily: 'var(--font-label)',
              boxShadow: '0 0 18px rgba(129,236,255,0.25)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 0 28px rgba(129,236,255,0.45)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 18px rgba(129,236,255,0.25)'; }}
            >Dashboard →</button>
          ) : (
            <>
              <button onClick={() => navigate('/login')} style={{
                padding: '8px 20px', borderRadius: 10, background: 'transparent',
                border: '1px solid rgba(129,236,255,0.25)', color: '#81ecff',
                fontWeight: 600, fontSize: 13, fontFamily: 'var(--font-label)', cursor: 'pointer',
                transition: 'border-color 0.2s, background 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(129,236,255,0.5)'; e.currentTarget.style.background = 'rgba(129,236,255,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(129,236,255,0.25)'; e.currentTarget.style.background = 'transparent'; }}
              >Sign In</button>
              <button onClick={() => navigate('/login')} style={{
                padding: '8px 22px', borderRadius: 10, border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg, #81ecff, #00d4ec)',
                color: '#003840', fontWeight: 700, fontSize: 13, fontFamily: 'var(--font-label)',
                boxShadow: '0 0 18px rgba(129,236,255,0.25)',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 0 28px rgba(129,236,255,0.45)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 18px rgba(129,236,255,0.25)'; }}
              >Get Started →</button>
            </>
          )}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative', zIndex: 1, minHeight: '100vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '80px 24px 60px',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 18px', borderRadius: 999,
          background: 'rgba(129,236,255,0.07)', border: '1px solid rgba(129,236,255,0.18)',
          marginBottom: 24,
        }}>
          <span style={{ fontSize: 14 }}>🏠</span>
          <span style={{ fontSize: 12, color: '#81ecff', fontFamily: 'var(--font-label)', letterSpacing: '0.04em' }}>
            HOME • The Developer Contribution Intelligence Platform
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(44px, 7vw, 88px)', fontWeight: 900, lineHeight: 1.05,
          margin: '0 0 20px', letterSpacing: '-0.03em', maxWidth: 800,
        }}>
          <span style={{ color: '#e1e4fa' }}>Track. Score.</span><br />
          <span style={{
            background: 'linear-gradient(135deg, #81ecff 20%, #d674ff 80%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>Rise Together.</span>
        </h1>

        <p style={{
          fontSize: 'clamp(15px, 2.2vw, 20px)', color: 'var(--on-surface-variant)',
          maxWidth: 580, lineHeight: 1.7, marginBottom: 44,
        }}>
          GitTracker is the all-in-one developer analytics platform that turns GitHub contributions into transparent rankings, meaningful insights, and career-defining proof of work.
        </p>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 80 }}>
          <button onClick={() => navigate('/login')} style={{
            padding: '15px 40px', borderRadius: 12, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #81ecff, #00d4ec)',
            color: '#003840', fontWeight: 800, fontSize: 15, fontFamily: 'var(--font-label)',
            boxShadow: '0 0 32px rgba(129,236,255,0.35)',
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 0 48px rgba(129,236,255,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 32px rgba(129,236,255,0.35)'; }}
          >Start Free Today →</button>
          <button onClick={() => navigate('/leaderboard')} style={{
            padding: '15px 36px', borderRadius: 12, cursor: 'pointer',
            background: 'transparent', border: '1px solid rgba(129,236,255,0.25)',
            color: '#81ecff', fontWeight: 700, fontSize: 15, fontFamily: 'var(--font-label)',
            backdropFilter: 'blur(8px)', transition: 'border-color 0.2s, background 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(129,236,255,0.55)'; e.currentTarget.style.background = 'rgba(129,236,255,0.06)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(129,236,255,0.25)'; e.currentTarget.style.background = 'transparent'; }}
          >▶ Live Leaderboard</button>
        </div>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <StatCard icon="👨‍💻" value="10K+" label="Developers" />
          <StatCard icon="⭐" value="2.4M+" label="Commits Tracked" />
          <StatCard icon="🏆" value="5" label="Tier Ranks" />
          <StatCard icon="📡" value="Real-Time" label="Sync Engine" />
          <StatCard icon="🛡️" value="Anti-Cheat" label="Built In" />
        </div>

        <div style={{ marginTop: 64, fontSize: 22, color: 'rgba(129,236,255,0.4)', animation: 'bounce 2s infinite' }}>↓</div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{
        position: 'relative', zIndex: 1, padding: '100px 24px',
        maxWidth: 960, margin: '0 auto',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ fontSize: 12, color: '#81ecff', fontFamily: 'var(--font-label)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Platform Features</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, margin: 0 }}>
            Everything you need to&nbsp;
            <span style={{ background: 'linear-gradient(135deg,#81ecff,#d674ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>prove your skills</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 16 }}>
          <FeatureCard icon="📊" title="Real-Time GitHub Analytics" desc="Auto-syncs commits, pull requests, issues, stars, forks directly from GitHub. Always up to date." accent="#81ecff" />
          <FeatureCard icon="🏅" title="5-Tier Ranking System" desc="From Bronze to Elite — a transparent scoring formula where every metric is fully explained." accent="#d674ff" />
          <FeatureCard icon="🔬" title="Score Explainability Engine" desc="Deep breakdown of PAS, OCS, PIS, CIS, SDS with decay weighting. No black box scoring." accent="#ff6b98" />
          <FeatureCard icon="🛡️" title="Codequiry Anti-Cheat & AI Detection" desc="Powered by Codequiry API: Input any GitHub repo to detect plagiarism across 14M+ repos and calculate AI-generated code % (ChatGPT, Claude, Copilot)." accent="#fbbf24" />
          <FeatureCard icon="🏆" title="Hackathon Manager" desc="Host hackathons, manage teams, gather ideas, collect feedback, and publish results — all in one place." accent="#34d399" />
          <FeatureCard icon="📈" title="Career Analytics" desc="Shareable developer profile with contribution heatmaps, streak tracking, and skill distribution." accent="#a78bfa" />
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{
        position: 'relative', zIndex: 1, padding: '100px 24px', textAlign: 'center',
        background: 'rgba(129,236,255,0.02)',
        borderTop: '1px solid rgba(129,236,255,0.06)', borderBottom: '1px solid rgba(129,236,255,0.06)',
      }}>
        <div style={{ fontSize: 12, color: '#81ecff', fontFamily: 'var(--font-label)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>How It Works</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, marginBottom: 60 }}>Up and running in 3 minutes</h2>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 900, margin: '0 auto' }}>
          {[
            { step: '01', icon: '🔑', title: 'Sign In', desc: 'Create your account with your email. Instant access, no credit card required.' },
            { step: '02', icon: '🔗', title: 'Connect GitHub', desc: 'Link your GitHub via OAuth. Your public contributions are pulled and analyzed instantly.' },
            { step: '03', icon: '🚀', title: 'Rise the Board', desc: 'Watch your score update in real-time. See your rank, get insights, and showcase your profile.' },
          ].map(({ step, icon, title, desc }) => (
            <div key={step} style={{
              flex: '1 1 240px', minWidth: 240,
              background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(129,236,255,0.1)',
              borderRadius: 20, padding: '36px 24px', backdropFilter: 'blur(12px)',
              position: 'relative',
            }}>
              <div style={{ position: 'absolute', top: 16, right: 20, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(129,236,255,0.25)', fontWeight: 700 }}>{step}</div>
              <div style={{ fontSize: 40, marginBottom: 16 }}>{icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700, marginBottom: 10 }}>{title}</div>
              <div style={{ fontSize: 13, color: 'var(--on-surface-variant)', lineHeight: 1.65 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{
        position: 'relative', zIndex: 1, padding: '100px 24px', textAlign: 'center',
      }}>
        <div style={{ fontSize: 12, color: '#81ecff', fontFamily: 'var(--font-label)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Pricing</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, marginBottom: 12 }}>Simple, transparent pricing</h2>
        <p style={{ color: 'var(--on-surface-variant)', fontSize: 15, marginBottom: 56, maxWidth: 480, margin: '0 auto 56px' }}>Start free, scale as you grow. No hidden fees.</p>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 940, margin: '0 auto' }}>
          <PricingCard plan="Starter" price="Free" period="forever" features={['Up to 25 developers', 'GitHub analytics', 'Basic leaderboard', 'Email support']} highlighted={false} />
          <PricingCard plan="Growth" price="₹5,000" period="per month" features={['Up to 500 developers', 'Hackathon manager', 'Anti-cheat system', 'Score explainability', 'Priority support']} highlighted={true} />
          <PricingCard plan="Enterprise" price="Custom" period="contact us" features={['Unlimited developers', 'Custom integrations', 'Dedicated SLA', 'White-label option', '24/7 support']} highlighted={false} />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{
        position: 'relative', zIndex: 1, padding: '100px 24px',
        background: 'rgba(129,236,255,0.02)', borderTop: '1px solid rgba(129,236,255,0.06)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ fontSize: 12, color: '#81ecff', fontFamily: 'var(--font-label)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>What People Say</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, margin: 0 }}>Loved by developers & teams</h2>
        </div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 960, margin: '0 auto' }}>
          <TestimonialCard name="Arjun S." role="Full-Stack Developer" quote="GitTracker made me take my open source contributions seriously. The score breakdown is incredibly motivating." avatar="A" />
          <TestimonialCard name="Priya M." role="Engineering Lead" quote="We use it for our entire team. The hackathon manager alone is worth every penny — seamless from registration to results." avatar="P" />
          <TestimonialCard name="Rahul K." role="CS Student" quote="Finally a platform that rewards actual code quality, not just commit count. The anti-cheat system is genius." avatar="R" />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{
        position: 'relative', zIndex: 1, padding: '100px 24px', textAlign: 'center',
        maxWidth: 720, margin: '0 auto',
      }}>
        <div style={{ fontSize: 12, color: '#81ecff', fontFamily: 'var(--font-label)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>About Us</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, marginBottom: 20 }}>Built by developers,<br />for developers</h2>
        <p style={{ fontSize: 15, color: 'var(--on-surface-variant)', lineHeight: 1.8, marginBottom: 20 }}>
          GitTracker was born from a simple frustration — resumes don't show who actually builds things. We created a platform that transforms raw GitHub activity into transparent, fair, and meaningful developer rankings.
        </p>
        <p style={{ fontSize: 15, color: 'var(--on-surface-variant)', lineHeight: 1.8 }}>
          Our mission is to make developer achievement visible, verifiable, and valuable. Whether you're a student proving your skills or a team running internal hackathons, GitTracker gives you the tools to measure what matters.
        </p>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{
        position: 'relative', zIndex: 1, padding: '120px 24px', textAlign: 'center',
        borderTop: '1px solid rgba(129,236,255,0.06)',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 700, height: 350, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(129,236,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 5vw, 56px)', fontWeight: 900, marginBottom: 16 }}>
          Ready to track your&nbsp;
          <span style={{ background: 'linear-gradient(135deg,#81ecff,#d674ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>progress?</span>
        </h2>
        <p style={{ fontSize: 16, color: 'var(--on-surface-variant)', marginBottom: 40, maxWidth: 460, margin: '0 auto 40px' }}>
          Join thousands of developers on GitTracker and start building your reputation today. Free to start, forever.
        </p>
        <button onClick={() => navigate('/login')} style={{
          padding: '18px 56px', borderRadius: 14, border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg, #81ecff, #00d4ec)',
          color: '#003840', fontWeight: 800, fontSize: 17, fontFamily: 'var(--font-label)',
          boxShadow: '0 0 48px rgba(129,236,255,0.4)',
          transition: 'transform 0.15s, box-shadow 0.15s',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)'; e.currentTarget.style.boxShadow = '0 0 64px rgba(129,236,255,0.55)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 48px rgba(129,236,255,0.4)'; }}
        >Start Free Today →</button>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{
        position: 'relative', zIndex: 1, padding: '80px 24px', textAlign: 'center',
        background: 'rgba(129,236,255,0.02)', borderTop: '1px solid rgba(129,236,255,0.06)',
      }}>
        <div style={{ fontSize: 12, color: '#81ecff', fontFamily: 'var(--font-label)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Contact & Support</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 800, marginBottom: 32 }}>We're here to help</h2>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { icon: '📧', label: 'Email Support', value: 'support@gittracker.io' },
            { icon: '💬', label: 'Live Chat', value: 'Available 9am – 6pm IST' },
            { icon: '📖', label: 'Documentation', value: 'docs.gittracker.io' },
          ].map(c => (
            <div key={c.label} style={{
              background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(129,236,255,0.1)',
              borderRadius: 16, padding: '24px 32px', backdropFilter: 'blur(12px)',
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{c.label}</div>
              <div style={{ fontSize: 12, color: 'var(--on-surface-variant)' }}>{c.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        position: 'relative', zIndex: 1, padding: '32px 48px',
        borderTop: '1px solid rgba(129,236,255,0.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: 'linear-gradient(135deg, #81ecff, #d674ff)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: 14, color: '#003840',
          }}>G</div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15 }}>GitTracker</span>
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {['Privacy Policy', 'Terms of Service', 'Security', 'Status'].map(l => (
            <a key={l} href="#" style={{ fontSize: 12, color: 'var(--on-surface-variant)', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
        <div style={{ fontSize: 12, color: 'var(--outline)', fontFamily: 'var(--font-label)' }}>
          © {new Date().getFullYear()} GitTracker, Inc. All rights reserved.
        </div>
      </footer>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>
    </div>
  );
}
