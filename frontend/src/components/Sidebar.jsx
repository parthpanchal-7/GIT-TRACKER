import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Avatar } from './ui';

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
      {/* Logo */}
      <NavLink to="/Home" className="sidebar__logo" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="sidebar__logo-icon">G</div>
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
