import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Avatar, GeometricGMark } from './ui';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';

  const navItems = [
    { to: '/Home', label: 'Home', icon: '⌂', end: true },
    { to: '/dashboard', label: 'Dashboard', icon: '◈' },
    { to: '/leaderboard', label: 'Leaderboard', icon: '⬡' },
    { to: '/profile', label: 'Score Details', icon: '◎' },
    { to: '/hackathon', label: 'Hackathon Manager', icon: '🏆' },
    { to: '/anti-cheat', label: 'Anti-Cheat Forensics', icon: '🛡️' },
    { to: '/settings', label: 'Settings', icon: '⚙' },
  ];

  return (
    <nav className="sidebar">
      {/* Brand Logo & Spec Marker */}
      <NavLink to="/Home" className="sidebar__logo" title="Return to Home">
        <GeometricGMark size={36} glow />
        <div>
          <div className="sidebar__logo-text">GitTracker</div>
          <div className="sidebar__logo-sub">SYSTEM SPEC 2.0</div>
        </div>
      </NavLink>

      {/* Navigation Links */}
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
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      {/* Admin Telemetry Badge */}
      {isAdmin && (
        <div
          style={{
            margin: '8px 12px',
            padding: '8px 12px',
            background: 'rgba(191,245,73,0.08)',
            border: '1px solid rgba(191,245,73,0.25)',
            borderRadius: 8,
            fontSize: 10,
            fontWeight: 800,
            color: '#BFF549',
            fontFamily: 'var(--font-mono)',
            textAlign: 'center',
            letterSpacing: '0.08em',
          }}
        >
          ⚡ ADMIN MODE ACTIVE
        </div>
      )}

      {/* User Session Footer */}
      {user && (
        <div className="sidebar__user">
          <Avatar
            src={user.avatar}
            alt={user.name}
            size="sm"
            tier={user.tier}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="sidebar__user-name">{user.name}</div>
            <div className="sidebar__user-id">{user.enrollmentId || 'CONTRIBUTOR'}</div>
          </div>
          <button
            className="btn-ghost btn-sm"
            onClick={logout}
            title="Sign out of session"
            style={{ padding: '4px 8px', fontSize: 13, color: '#9CA3AF' }}
          >
            ↗
          </button>
        </div>
      )}
    </nav>
  );
}
