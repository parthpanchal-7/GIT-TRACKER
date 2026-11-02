import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { HackathonProvider } from './context/HackathonContext';
import { CosmicBackground } from './components/ui';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import GoogleOAuthCallbackPage from './pages/GoogleOAuthCallbackPage';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import HackathonPage from './pages/HackathonPage';
import AntiCheatPage from './pages/AntiCheatPage';

function ProtectedLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <>
        <CosmicBackground />
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          minHeight: '100vh', position: 'relative', zIndex: 1,
        }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700,
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            GitTracker
          </div>
        </div>
      </>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <CosmicBackground />
      <div className="app-layout">
        <Sidebar />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}

function PublicRoute() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <HackathonProvider>
            <Routes>
              {/* Landing page — public at /Home, /home, and / */}
              <Route path="/Home" element={<LandingPage />} />
              <Route path="/home" element={<Navigate to="/Home" replace />} />
              <Route path="/" element={<Navigate to="/Home" replace />} />

              {/* Google OAuth callback */}
              <Route path="/login/google/callback" element={<GoogleOAuthCallbackPage />} />

              {/* Public routes */}
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<LoginPage />} />
              </Route>

              {/* Protected routes */}
              <Route element={<ProtectedLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/hackathon" element={<HackathonPage />} />
                <Route path="/anti-cheat" element={<AntiCheatPage />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/Home" replace />} />
            </Routes>
          </HackathonProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
