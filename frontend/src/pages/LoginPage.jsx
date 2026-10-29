import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CosmicBackground } from '../components/ui';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    const result = login(email.trim(), password);
    if (result.success) {
      navigate('/dashboard', { replace: true });
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <>
      <CosmicBackground />
      <div style={{
        minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        padding: '24px', position: 'relative', zIndex: 1,
      }}>
        <div style={{ width: '100%', maxWidth: 440 }}>
          {/* Back button */}
          <div style={{ marginBottom: 20 }}>
            <Link
              to="/Home"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                borderRadius: 10,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(129,236,255,0.18)',
                color: '#81ecff',
                textDecoration: 'none',
                fontSize: 13,
                fontWeight: 600,
                fontFamily: 'var(--font-label)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(129,236,255,0.1)';
                e.currentTarget.style.borderColor = 'rgba(129,236,255,0.4)';
                e.currentTarget.style.transform = 'translateX(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.borderColor = 'rgba(129,236,255,0.18)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <span>←</span>
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Branding with clickable heading button */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Link
              to="/Home"
              title="Return to Home"
              style={{
                display: 'inline-block',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <div style={{
                width: 56, height: 56, borderRadius: 16, margin: '0 auto 14px',
                background: 'linear-gradient(135deg, #81ecff, #d674ff)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, fontSize: 28, color: '#003840',
                boxShadow: '0 0 32px rgba(129,236,255,0.35)',
              }}>G</div>
              <h1 style={{
                fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, margin: '0 0 4px',
                background: 'linear-gradient(135deg, #81ecff 30%, #d674ff)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>GitTracker</h1>
              <span style={{
                display: 'inline-block',
                fontSize: 11,
                color: '#81ecff',
                fontFamily: 'var(--font-label)',
                padding: '2px 8px',
                borderRadius: 999,
                background: 'rgba(129,236,255,0.08)',
                border: '1px solid rgba(129,236,255,0.2)',
                letterSpacing: '0.05em',
              }}>
                ⌂ HOME
              </span>
            </Link>
            <p style={{ fontSize: 14, color: 'var(--on-surface-variant)', margin: '10px 0 0' }}>Sign in to your account</p>
          </div>

          {/* Card */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(129,236,255,0.12)',
            borderRadius: 24, padding: '36px', backdropFilter: 'blur(24px)',
          }}>
            {/* Demo hint */}
            <div style={{
              background: 'rgba(129,236,255,0.06)', border: '1px solid rgba(129,236,255,0.15)',
              borderRadius: 10, padding: '10px 14px', marginBottom: 24, fontSize: 12,
              color: '#81ecff', fontFamily: 'var(--font-mono)',
            }}>
              <span style={{ opacity: 0.7 }}>Demo credentials: </span>
              <strong>admin@gmail.com</strong>
              <span style={{ opacity: 0.7 }}> / </span>
              <strong>1211</strong>
            </div>

            {error && (
              <div style={{
                background: 'rgba(255,113,108,0.1)', border: '1px solid rgba(255,113,108,0.25)',
                borderRadius: 10, padding: '10px 14px', marginBottom: 20, fontSize: 13, color: '#ff716c',
                display: 'flex', gap: 8, alignItems: 'center',
              }}>
                <span>⚠</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 18 }}>
                <label style={{
                  display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--on-surface-variant)',
                  marginBottom: 8, fontFamily: 'var(--font-label)', letterSpacing: '0.04em',
                }}>EMAIL ADDRESS</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com" autoComplete="email"
                  style={{
                    width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(129,236,255,0.15)', borderRadius: 10,
                    color: 'var(--on-surface)', fontSize: 14, outline: 'none', boxSizing: 'border-box',
                    fontFamily: 'var(--font-body)', transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(129,236,255,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(129,236,255,0.15)'}
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{
                  display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--on-surface-variant)',
                  marginBottom: 8, fontFamily: 'var(--font-label)', letterSpacing: '0.04em',
                }}>PASSWORD</label>
                <div style={{ position: 'relative' }}>
                  <input type={showPass ? 'text' : 'password'} value={password}
                    onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                    autoComplete="current-password"
                    style={{
                      width: '100%', padding: '12px 44px 12px 16px', background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(129,236,255,0.15)', borderRadius: 10,
                      color: 'var(--on-surface)', fontSize: 14, outline: 'none', boxSizing: 'border-box',
                      fontFamily: 'var(--font-body)', transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(129,236,255,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(129,236,255,0.15)'}
                  />
                  <button type="button" onClick={() => setShowPass(p => !p)} style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--on-surface-variant)', fontSize: 16, padding: '2px 4px',
                  }}>{showPass ? '🙈' : '👁'}</button>
                </div>
              </div>

              <button type="submit" disabled={loading} style={{
                width: '100%', padding: '14px', borderRadius: 12, border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                background: loading ? 'rgba(129,236,255,0.3)' : 'linear-gradient(135deg, #81ecff, #00d4ec)',
                color: '#003840', fontWeight: 800, fontSize: 15, fontFamily: 'var(--font-label)',
                boxShadow: loading ? 'none' : '0 0 28px rgba(129,236,255,0.3)',
                transition: 'opacity 0.2s, box-shadow 0.2s',
              }}>
                {loading ? 'Signing in...' : 'Sign In →'}
              </button>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
              <div style={{ height: 1, flex: 1, background: 'rgba(129,236,255,0.08)' }} />
              <span style={{ fontSize: 11, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)' }}>OR</span>
              <div style={{ height: 1, flex: 1, background: 'rgba(129,236,255,0.08)' }} />
            </div>

            <button type="button" disabled style={{
              width: '100%', padding: '12px', borderRadius: 12,
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(129,236,255,0.1)',
              color: 'var(--on-surface-variant)', fontWeight: 600, fontSize: 14,
              fontFamily: 'var(--font-label)', cursor: 'not-allowed', opacity: 0.6,
            }}>
              🔑 Continue with Google (disabled in demo)
            </button>
          </div>

          <div style={{
            textAlign: 'center', marginTop: 24, fontSize: 13,
            color: 'var(--on-surface-variant)',
            display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center',
          }}>
            <div>
              Don't have an account?&nbsp;
              <a href="#" style={{ color: '#81ecff', textDecoration: 'none' }}>Contact us</a>
            </div>
            <Link
              to="/Home"
              style={{
                color: 'var(--on-surface-variant)',
                fontSize: 12,
                textDecoration: 'none',
                fontFamily: 'var(--font-label)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#81ecff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--on-surface-variant)'; }}
            >
              ← Return to HOME page
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
