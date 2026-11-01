import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CosmicBackground } from '../components/ui';

function readCallbackData(hash, search) {
  const cleanHash = hash.startsWith('#') ? hash.slice(1) : hash;
  const hashParams = new URLSearchParams(cleanHash);
  const searchParams = new URLSearchParams(search);

  // Check for serialized payload
  const payloadStr = hashParams.get('payload') || searchParams.get('payload');
  if (payloadStr) {
    try {
      return JSON.parse(decodeURIComponent(payloadStr));
    } catch (e) {
      console.error('Failed to parse OAuth payload', e);
    }
  }

  // Check for token + user directly in query/hash
  const token = hashParams.get('token') || searchParams.get('token');
  if (token) {
    const email = hashParams.get('email') || searchParams.get('email');
    const name = hashParams.get('name') || searchParams.get('name');
    return { token, student: { email, name } };
  }

  // Check for errors
  const error = hashParams.get('error') || searchParams.get('error') || searchParams.get('google_error');
  if (error) {
    return { error };
  }

  return null;
}

export default function GoogleOAuthCallbackPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { completeOAuthLogin } = useAuth();
  const [status, setStatus] = useState('processing'); // processing | success | error
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const data = readCallbackData(location.hash, location.search);

    if (!data) {
      setStatus('error');
      setErrorMessage('No authentication response received from Google. Please try logging in again.');
      return;
    }

    if (data.error) {
      setStatus('error');
      const errMap = {
        invalid_domain: 'Google sign-in is restricted by domain policy.',
        invalid_state: 'Security verification failed (state mismatch or expired). Please try again.',
        missing_params: 'OAuth callback was missing authorization code or parameters.',
        token_exchange_failed: 'Failed to exchange authorization token with Google servers.',
        missing_google_email: 'Google did not return a valid email address.',
        callback_failed: 'Google sign-in encountered an internal processing error.',
      };
      setErrorMessage(errMap[data.error] || `Sign-in error: ${data.error}`);
      return;
    }

    if (data.token && (data.student || data.user)) {
      const userObj = data.student || data.user;
      completeOAuthLogin(data.token, userObj);
      setStatus('success');
      const timer = setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 700);
      return () => clearTimeout(timer);
    }

    setStatus('error');
    setErrorMessage('Authentication response incomplete. Please try again.');
  }, [location.hash, location.search, completeOAuthLogin, navigate]);

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
        <div style={{
          width: '100%',
          maxWidth: 440,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(129,236,255,0.18)',
          borderRadius: 24,
          padding: '40px 32px',
          backdropFilter: 'blur(24px)',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        }}>
          {/* Logo */}
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            margin: '0 auto 20px',
            background: 'linear-gradient(135deg, #81ecff, #d674ff)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: 26,
            color: '#003840',
            boxShadow: '0 0 32px rgba(129,236,255,0.35)',
          }}>
            G
          </div>

          {status === 'processing' && (
            <>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 22,
                fontWeight: 800,
                color: 'var(--on-surface)',
                margin: '0 0 10px',
              }}>
                Verifying Google Account...
              </h2>
              <p style={{ fontSize: 14, color: 'var(--on-surface-variant)', margin: '0 0 24px' }}>
                Securing your session and loading your GitTracker profile.
              </p>
              <div style={{
                width: 48,
                height: 48,
                margin: '0 auto',
                border: '3px solid rgba(129,236,255,0.15)',
                borderTopColor: '#81ecff',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </>
          )}

          {status === 'success' && (
            <>
              <div style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: 'rgba(52,211,153,0.15)',
                border: '1px solid rgba(52,211,153,0.3)',
                color: '#34d399',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                margin: '0 auto 16px',
              }}>
                ✓
              </div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 22,
                fontWeight: 800,
                color: '#34d399',
                margin: '0 0 10px',
              }}>
                Signed In Successfully!
              </h2>
              <p style={{ fontSize: 14, color: 'var(--on-surface-variant)', margin: 0 }}>
                Redirecting to your dashboard...
              </p>
            </>
          )}

          {status === 'error' && (
            <>
              <div style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: 'rgba(255,113,108,0.15)',
                border: '1px solid rgba(255,113,108,0.3)',
                color: '#ff716c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                margin: '0 auto 16px',
              }}>
                ⚠
              </div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 20,
                fontWeight: 800,
                color: '#ff716c',
                margin: '0 0 10px',
              }}>
                Authentication Failed
              </h2>
              <p style={{ fontSize: 13, color: 'var(--on-surface-variant)', lineHeight: 1.5, margin: '0 0 24px' }}>
                {errorMessage}
              </p>
              <Link
                to="/login"
                className="btn btn--primary"
                style={{
                  display: 'inline-flex',
                  justifyContent: 'center',
                  width: '100%',
                  textDecoration: 'none',
                  padding: '12px',
                }}
              >
                Back to Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
