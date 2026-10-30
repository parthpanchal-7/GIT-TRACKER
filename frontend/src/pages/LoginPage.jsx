import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CosmicBackground, GeometricGMark } from '../components/ui';

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
    await new Promise((r) => setTimeout(r, 400));
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
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
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
                background: '#0F1117',
                border: '1px solid #1F2937',
                color: '#BFF549',
                textDecoration: 'none',
                fontSize: 13,
                fontWeight: 600,
                fontFamily: 'var(--font-label)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#BFF549';
                e.currentTarget.style.transform = 'translateX(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1F2937';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <span>←</span>
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Branding with clickable heading button */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <Link
              to="/Home"
              title="Return to Home"
              style={{
                display: 'inline-block',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <GeometricGMark size={52} glow />
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 26,
                  fontWeight: 900,
                  margin: '12px 0 4px',
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                }}
              >
                GitTracker
              </h1>
              <span className="badge badge-lime" style={{ fontSize: 10, padding: '2px 8px' }}>
                SPEC 2.0 • AUTH
              </span>
            </Link>
            <p style={{ fontSize: 13, color: '#9CA3AF', margin: '10px 0 0' }}>
              Developer Intelligence with Forensic Precision
            </p>
          </div>

          {/* Login Card */}
          <div
            style={{
              background: '#0F1117',
              border: '1px solid #1F2937',
              borderRadius: 16,
              padding: '32px 28px',
            }}
          >
            {/* Demo credentials hint */}
            <div
              style={{
                background: '#04060F',
                border: '1px solid rgba(191,245,73,0.3)',
                borderRadius: 8,
                padding: '10px 14px',
                marginBottom: 20,
                fontSize: 12,
                color: '#BFF549',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <span style={{ opacity: 0.7 }}>Demo credentials: </span>
              <strong>admin@gmail.com</strong>
              <span style={{ opacity: 0.7 }}> / </span>
              <strong>1211</strong>
            </div>

            {error && (
              <div
                style={{
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.25)',
                  borderRadius: 8,
                  padding: '10px 14px',
                  marginBottom: 18,
                  fontSize: 13,
                  color: '#EF4444',
                  display: 'flex',
                  gap: 8,
                  alignItems: 'center',
                }}
              >
                <span>⚠</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 18 }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#9CA3AF',
                    marginBottom: 8,
                    fontFamily: 'var(--font-label)',
                    letterSpacing: '0.08em',
                  }}
                >
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gmail.com"
                  autoComplete="email"
                  className="input-field"
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#9CA3AF',
                    marginBottom: 8,
                    fontFamily: 'var(--font-label)',
                    letterSpacing: '0.08em',
                  }}
                >
                  PASSWORD
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="input-field"
                    style={{ paddingRight: 44 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((p) => !p)}
                    style={{
                      position: 'absolute',
                      right: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#9CA3AF',
                      fontSize: 16,
                      padding: '2px 4px',
                    }}
                  >
                    {showPass ? '🙈' : '👁'}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn--lime"
                style={{
                  width: '100%',
                  padding: '13px',
                  fontSize: 14,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading ? 'Authenticating...' : 'Sign In to Console →'}
              </button>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '22px 0' }}>
              <div style={{ height: 1, flex: 1, background: '#1F2937' }} />
              <span style={{ fontSize: 11, color: '#6B7280', fontFamily: 'var(--font-label)' }}>OR</span>
              <div style={{ height: 1, flex: 1, background: '#1F2937' }} />
            </div>

            <button
              type="button"
              disabled
              style={{
                width: '100%',
                padding: '11px',
                borderRadius: 10,
                background: '#04060F',
                border: '1px solid #1F2937',
                color: '#6B7280',
                fontWeight: 600,
                fontSize: 13,
                fontFamily: 'var(--font-label)',
                cursor: 'not-allowed',
                opacity: 0.6,
              }}
            >
              🔑 Continue with GitHub (OAuth Telemetry)
            </button>
          </div>

          {/* Footer note */}
          <div
            style={{
              textAlign: 'center',
              marginTop: 20,
              fontSize: 12,
              color: '#9CA3AF',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              alignItems: 'center',
            }}
          >
            <div>
              Don't have an organization account?&nbsp;
              <a href="#" style={{ color: '#BFF549' }}>Contact team</a>
            </div>
            <Link
              to="/Home"
              style={{
                color: '#6B7280',
                fontSize: 12,
                fontFamily: 'var(--font-label)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#BFF549')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#6B7280')}
            >
              ← Return to Home page
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
