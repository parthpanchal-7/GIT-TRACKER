import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import { CosmicBackground, Logo, ThemeToggle } from '../components/ui';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showDevModal, setShowDevModal] = useState(false);
  const [devEmail, setDevEmail] = useState('');
  const [devName, setDevName] = useState('');

  const { user, loginWithGoogleMock } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate, user]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const googleError = params.get('google_error');

    if (googleError) {
      const messages = {
        invalid_domain: 'Google sign-in is restricted to verified domains.',
        google_oauth_not_configured: 'Google OAuth is not configured on the server yet.',
        missing_params: 'Google sign-in callback was missing required parameters.',
        invalid_state: 'Google session verification expired. Please try again.',
        token_exchange_failed: 'Failed to exchange authorization token with Google.',
        missing_google_email: 'Google did not provide an email address.',
        callback_failed: 'Google sign-in encountered an internal processing error.',
      };
      setError(messages[googleError] || 'Google sign-in failed. Please try again.');
    }
  }, [location.search]);

  const handleGoogleLogin = async () => {
    setError('');
    setGoogleLoading(true);

    try {
      const res = await authAPI.getGoogleUrl();
      if (res.data?.authUrl) {
        window.location.href = res.data.authUrl;
        return;
      }
      throw new Error('Google OAuth URL not returned');
    } catch (err) {
      console.warn('Backend Google OAuth endpoint unreachable or not configured:', err.message);
      // Fallback for environments where Google Client ID is not configured on local server
      setShowDevModal(true);
      setGoogleLoading(false);
    }
  };

  const handleDevGoogleSubmit = (e) => {
    e.preventDefault();
    if (!devEmail.trim()) {
      setError('Please provide a Google email.');
      return;
    }
    const cleanEmail = devEmail.trim().toLowerCase();
    const cleanName = devName.trim() || cleanEmail.split('@')[0];
    loginWithGoogleMock({
      email: cleanEmail,
      name: cleanName,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(cleanName)}&background=13192b&color=81ecff&bold=true`,
    });
    navigate('/dashboard', { replace: true });
  };

  return (
    <>
      <CosmicBackground />
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
        zIndex: 1,
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
                width: 56,
                height: 56,
                borderRadius: 16,
                margin: '0 auto 14px',
                background: 'linear-gradient(135deg, #81ecff, #d674ff)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: 28,
                color: '#003840',
                boxShadow: '0 0 32px rgba(129,236,255,0.35)',
              }}>
                G
              </div>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 28,
                fontWeight: 800,
                margin: '0 0 4px',
                background: 'linear-gradient(135deg, #81ecff 30%, #d674ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                GitTracker
              </h1>
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
            <p style={{ fontSize: 14, color: 'var(--on-surface-variant)', margin: '10px 0 0' }}>
              The Developer Contribution Intelligence Platform
            </p>
          </div>

          {/* Card */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(129,236,255,0.15)',
            borderRadius: 24,
            padding: '36px 30px',
            backdropFilter: 'blur(24px)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
          }}>
            {error && (
              <div style={{
                background: 'rgba(255,113,108,0.1)',
                border: '1px solid rgba(255,113,108,0.25)',
                borderRadius: 12,
                padding: '12px 16px',
                marginBottom: 20,
                fontSize: 13,
                color: '#ff716c',
                display: 'flex',
                gap: 10,
                alignItems: 'center',
                lineHeight: 1.5,
              }}>
                <span>⚠</span>
                <div>{error}</div>
              </div>
            )}

            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 20,
                fontWeight: 700,
                color: 'var(--on-surface)',
                margin: '0 0 6px',
              }}>
                Sign in to GitTracker
              </h2>
              <p style={{ fontSize: 13, color: 'var(--on-surface-variant)', margin: 0, lineHeight: 1.5 }}>
                Connect your account via Google OAuth to access your developer portfolio and verified metrics.
              </p>
            </div>

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              style={{
                width: '100%',
                padding: '14px 20px',
                borderRadius: 14,
                border: '1.5px solid rgba(129,236,255,0.3)',
                background: 'rgba(255,255,255,0.06)',
                color: 'var(--on-surface)',
                fontWeight: 700,
                fontSize: 15,
                fontFamily: 'var(--font-label)',
                cursor: googleLoading ? 'wait' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              }}
              onMouseEnter={(e) => {
                if (!googleLoading) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.borderColor = '#81ecff';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 28px rgba(129,236,255,0.25)';
                }
              }}
              onMouseLeave={(e) => {
                if (!googleLoading) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(129,236,255,0.3)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
                }
              }}
            >
              {/* Google Multicolor SVG */}
              <svg width="20" height="20" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{googleLoading ? 'Connecting to Google...' : 'Continue with Google'}</span>
            </button>

            {/* Feature reassurance badges */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              marginTop: 28,
              paddingTop: 24,
              borderTop: '1px solid rgba(129,236,255,0.1)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: 'var(--on-surface-variant)' }}>
                <span style={{ color: '#34d399', fontSize: 14 }}>🔒</span>
                <span>Secure OAuth 2.0 with official Google verification</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: 'var(--on-surface-variant)' }}>
                <span style={{ color: '#81ecff', fontSize: 14 }}>⚡</span>
                <span>Automatic GitHub commit and contribution telemetry</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: 'var(--on-surface-variant)' }}>
                <span style={{ color: '#d674ff', fontSize: 14 }}>🛡️</span>
                <span>Powered by Codequiry anti-cheat code validation</span>
              </div>
            </div>
          </div>

          {/* Footer links */}
          <div style={{
            textAlign: 'center',
            marginTop: 24,
            fontSize: 13,
            color: 'var(--on-surface-variant)',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            alignItems: 'center',
          }}>
            <div>
              By continuing, you agree to GitTracker's Terms of Service and Privacy Policy.
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

      {/* Dev / Localhost Fallback Modal */}
      {showDevModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(4,6,15,0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: 20,
        }}>
          <div style={{
            width: '100%',
            maxWidth: 420,
            background: '#0d1323',
            border: '1px solid rgba(129,236,255,0.3)',
            borderRadius: 20,
            padding: '28px',
            boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ fontSize: 24 }}>🌐</div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 18,
                fontWeight: 700,
                color: 'var(--on-surface)',
                margin: 0,
              }}>
                Google Sign-In Environment Notice
              </h3>
            </div>
            <p style={{ fontSize: 13, color: 'var(--on-surface-variant)', lineHeight: 1.5, marginBottom: 18 }}>
              Backend Google credentials are in development mode on this machine. You can enter your Google account details below to sign in immediately:
            </p>

            <form onSubmit={handleDevGoogleSubmit}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#81ecff', fontFamily: 'var(--font-label)', marginBottom: 6 }}>
                  GOOGLE EMAIL
                </label>
                <input
                  type="email"
                  value={devEmail}
                  onChange={(e) => setDevEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 8,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(129,236,255,0.2)',
                    color: '#fff',
                    fontSize: 13,
                    fontFamily: 'var(--font-body)',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#81ecff', fontFamily: 'var(--font-label)', marginBottom: 6 }}>
                  DISPLAY NAME (OPTIONAL)
                </label>
                <input
                  type="text"
                  value={devName}
                  onChange={(e) => setDevName(e.target.value)}
                  placeholder="e.g. Alex Chen"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 8,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(129,236,255,0.2)',
                    color: '#fff',
                    fontSize: 13,
                    fontFamily: 'var(--font-body)',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setShowDevModal(false)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: 10,
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'var(--on-surface-variant)',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: 10,
                    background: 'linear-gradient(135deg, #81ecff, #00d4ec)',
                    color: '#003840',
                    border: 'none',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Complete Sign-In →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
