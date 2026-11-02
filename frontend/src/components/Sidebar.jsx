import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Avatar, Logo, ThemeToggle } from './ui';

export default function Sidebar() {
  const { user, logout } = useAuth();

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
