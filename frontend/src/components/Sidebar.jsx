import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Avatar, Logo, ThemeToggle } from './ui';

export default function Sidebar() {
  const { user, logout, switchPOV, activePov, isStudent, isOrganizer, isMentor, isAdmin } = useAuth();

  // Strict role-gated navigation items based on active POV
  const getNavItems = () => {
    if (activePov === 'student') {
      return [
        { to: '/Home', label: 'Home', icon: '⌂', end: true },
        { to: '/dashboard', label: 'Dashboard', icon: '◈' },
        { to: '/leaderboard', label: 'Leaderboard', icon: '⬡' },
        { to: '/hackathon', label: 'Hackathon Portal', icon: '🏆' },
        { to: '/profile', label: 'Score Details', icon: '◎' },
        { to: '/settings', label: 'Settings', icon: '⚙' },
      ];
    }

    if (activePov === 'organizer') {
      return [
        { to: '/Home', label: 'Home', icon: '⌂', end: true },
        { to: '/dashboard', label: 'Institution Overview', icon: '🏛️' },
        { to: '/hackathon', label: 'Organizer Console (9-Mod)', icon: '🏆' },
        { to: '/leaderboard', label: 'Campus Leaderboard', icon: '⬡' },
        { to: '/settings', label: 'Settings', icon: '⚙' },
      ];
    }

    if (activePov === 'mentor') {
      return [
        { to: '/Home', label: 'Home', icon: '⌂', end: true },
        { to: '/hackathon', label: 'Mentor Evaluation', icon: '🧠' },
        { to: '/leaderboard', label: 'Campus Leaderboard', icon: '⬡' },
        { to: '/settings', label: 'Settings', icon: '⚙' },
      ];
    }

    // Admin POV: Full Platform Access
    return [
      { to: '/Home', label: 'Home', icon: '⌂', end: true },
      { to: '/dashboard', label: 'Dashboard', icon: '◈' },
      { to: '/leaderboard', label: 'Leaderboard', icon: '⬡' },
      { to: '/profile', label: 'Score Details', icon: '◎' },
      { to: '/hackathon', label: 'Hackathon Manager', icon: '🏆' },
      { to: '/anti-cheat', label: 'Anti-Cheat', icon: '🛡️' },
      { to: '/settings', label: 'Admin & Health', icon: '⚙' },
    ];
  };

  const navItems = getNavItems();

  const getRoleBadge = () => {
    switch (activePov) {
      case 'organizer':
        return { label: 'ORGANIZER & INST', color: '#81ecff', bg: 'rgba(129,236,255,0.15)' };
      case 'mentor':
        return { label: 'MENTOR JURY', color: '#d674ff', bg: 'rgba(214,116,255,0.15)' };
      case 'admin':
        return { label: 'LEAD ADMIN', color: '#ff716c', bg: 'rgba(255,113,108,0.15)' };
      case 'student':
      default:
        return { label: 'STUDENT DEV', color: '#BFF549', bg: 'rgba(191,245,73,0.15)' };
    }
  };

  const badge = getRoleBadge();

  return (
    <nav className="sidebar">
      {/* Brand & Lime Geometric G Logo Mark */}
      <NavLink to="/Home" className="sidebar__logo" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Logo size={36} />
        <div className="sidebar__logo-text">GitTracker</div>
      </NavLink>

      {/* ── MENTOR DEMO 1-CLICK INSTANT POV QUICK-SWITCH (4 POVs) ── */}
      <div style={{ padding: '0 14px 16px' }}>
        <div style={{
          background: 'rgba(191, 245, 73, 0.05)',
          border: '1px solid rgba(191, 245, 73, 0.25)',
          borderRadius: 12,
          padding: '8px 10px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--brand-lime, #BFF549)', fontFamily: 'var(--font-label)', letterSpacing: '0.04em' }}>
              ⚡ DEMO POV
            </span>
            <span style={{
              fontSize: 9, fontWeight: 800, padding: '2px 6px', borderRadius: 4,
              background: '#04060F', color: badge.color, border: `1px solid ${badge.color}40`,
              fontFamily: 'var(--font-mono)',
            }}>
              {badge.label}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
            <button
              type="button"
              onClick={() => switchPOV('student')}
              title="Student POV: parthpanchal1932@gmail.com"
              style={{
                padding: '6px 2px', borderRadius: 6, border: 'none', cursor: 'pointer',
                background: activePov === 'student' ? '#BFF549' : 'rgba(255,255,255,0.06)',
                color: activePov === 'student' ? '#04060F' : 'var(--text-secondary)',
                fontSize: 10, fontWeight: 800, fontFamily: 'var(--font-label)', textAlign: 'center',
                transition: 'all 0.15s ease',
              }}
            >
              STD
            </button>

            <button
              type="button"
              onClick={() => switchPOV('organizer')}
              title="Organizer & Institute POV (Merged): parthpanchal1933@gmail.com"
              style={{
                padding: '6px 2px', borderRadius: 6, border: 'none', cursor: 'pointer',
                background: activePov === 'organizer' ? '#81ecff' : 'rgba(255,255,255,0.06)',
                color: activePov === 'organizer' ? '#003840' : 'var(--text-secondary)',
                fontSize: 10, fontWeight: 800, fontFamily: 'var(--font-label)', textAlign: 'center',
                transition: 'all 0.15s ease',
              }}
            >
              ORG
            </button>

            <button
              type="button"
              onClick={() => switchPOV('mentor')}
              title="Mentor POV: dr.sharma@mits.ac.in"
              style={{
                padding: '6px 2px', borderRadius: 6, border: 'none', cursor: 'pointer',
                background: activePov === 'mentor' ? '#d674ff' : 'rgba(255,255,255,0.06)',
                color: activePov === 'mentor' ? '#390050' : 'var(--text-secondary)',
                fontSize: 10, fontWeight: 800, fontFamily: 'var(--font-label)', textAlign: 'center',
                transition: 'all 0.15s ease',
              }}
            >
              MTR
            </button>

            <button
              type="button"
              onClick={() => switchPOV('admin')}
              title="Admin POV: parthpanchal1933@gmail.com"
              style={{
                padding: '6px 2px', borderRadius: 6, border: 'none', cursor: 'pointer',
                background: activePov === 'admin' ? '#ff716c' : 'rgba(255,255,255,0.06)',
                color: activePov === 'admin' ? '#5a0c0a' : 'var(--text-secondary)',
                fontSize: 10, fontWeight: 800, fontFamily: 'var(--font-label)', textAlign: 'center',
                transition: 'all 0.15s ease',
              }}
            >
              ADM
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sidebar__nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
            }
          >
            <span className="sidebar__link-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* Visible Theme Toggle Button */}
      <div style={{ padding: '0 16px 14px' }}>
        <ThemeToggle style={{ width: '100%' }} />
      </div>

      {/* User section */}
      {user && (
        <div className="sidebar__user">
          <Avatar
            src={user.avatar}
            alt={user.name}
            size="sm"
          />
          <div className="sidebar__user-info">
            <div className="sidebar__user-name">{user.name || 'Developer'}</div>
            <div className="sidebar__user-id" title={user.email}>
              {user.email || user.enrollmentId || 'Google Account'}
            </div>
          </div>
          <button
            className="btn btn--ghost btn--sm"
            onClick={logout}
            title="Sign out"
            style={{ padding: '6px 8px', fontSize: 13 }}
          >
            ↗
          </button>
        </div>
      )}
    </nav>
  );
}
