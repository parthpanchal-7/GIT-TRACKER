import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Avatar, Logo, ThemeToggle } from './ui';

export default function Sidebar() {
  const { user, logout, switchPOV } = useAuth();

  const navItems = [
    { to: '/Home', label: 'Home', icon: '⌂', end: true },
    { to: '/dashboard', label: 'Dashboard', icon: '◈' },
    { to: '/leaderboard', label: 'Leaderboard', icon: '⬡' },
    { to: '/profile', label: 'Score Details', icon: '◎' },
    { to: '/hackathon', label: 'Hackathon Manager', icon: '🏆' },
    { to: '/anti-cheat', label: 'Anti-Cheat', icon: '🛡️' },
    { to: '/settings', label: 'Settings', icon: '⚙' },
  ];

  return (
    <nav className="sidebar">
      {/* Brand & Lime Geometric G Logo Mark */}
      <NavLink to="/Home" className="sidebar__logo" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Logo size={36} />
        <div className="sidebar__logo-text">GitTracker</div>
      </NavLink>

      {/* ── MENTOR DEMO 1-CLICK INSTANT POV QUICK-SWITCH ── */}
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
              fontSize: 9, fontWeight: 800, padding: '1px 6px', borderRadius: 4,
              background: '#04060F', color: '#BFF549', border: '1px solid rgba(191,245,73,0.3)',
              fontFamily: 'var(--font-mono)',
            }}>
              {user?.role?.toUpperCase() || 'STUDENT'}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
            <button
              type="button"
              onClick={() => switchPOV('student')}
              title="Student POV: parthpanchal1932@gmail.com"
              style={{
                padding: '6px 2px', borderRadius: 6, border: 'none', cursor: 'pointer',
                background: user?.email === 'parthpanchal1932@gmail.com' ? '#BFF549' : 'rgba(255,255,255,0.06)',
                color: user?.email === 'parthpanchal1932@gmail.com' ? '#04060F' : 'var(--text-secondary)',
                fontSize: 10, fontWeight: 800, fontFamily: 'var(--font-label)', textAlign: 'center',
                transition: 'all 0.15s ease',
              }}
            >
              STD
            </button>

            <button
              type="button"
              onClick={() => switchPOV('organizer')}
              title="Hackathon Organizer POV"
              style={{
                padding: '6px 2px', borderRadius: 6, border: 'none', cursor: 'pointer',
                background: user?.role === 'organizer' ? '#81ecff' : 'rgba(255,255,255,0.06)',
                color: user?.role === 'organizer' ? '#003840' : 'var(--text-secondary)',
                fontSize: 10, fontWeight: 800, fontFamily: 'var(--font-label)', textAlign: 'center',
                transition: 'all 0.15s ease',
              }}
            >
              ORG
            </button>

            <button
              type="button"
              onClick={() => switchPOV('institution')}
              title="Institution POV"
              style={{
                padding: '6px 2px', borderRadius: 6, border: 'none', cursor: 'pointer',
                background: user?.role === 'institution' ? '#d674ff' : 'rgba(255,255,255,0.06)',
                color: user?.role === 'institution' ? '#390050' : 'var(--text-secondary)',
                fontSize: 10, fontWeight: 800, fontFamily: 'var(--font-label)', textAlign: 'center',
                transition: 'all 0.15s ease',
              }}
            >
              INST
            </button>

            <button
              type="button"
              onClick={() => switchPOV('admin')}
              title="Admin POV: parthpanchal1933@gmail.com"
              style={{
                padding: '6px 2px', borderRadius: 6, border: 'none', cursor: 'pointer',
                background: user?.email === 'parthpanchal1933@gmail.com' ? '#ff716c' : 'rgba(255,255,255,0.06)',
                color: user?.email === 'parthpanchal1933@gmail.com' ? '#5a0c0a' : 'var(--text-secondary)',
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
