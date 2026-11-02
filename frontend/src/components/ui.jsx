import { useTheme } from '../context/ThemeContext';

/* ─── Lime Geometric G Logo Mark ─── */
export function Logo({ size = 36, className = '', style = {} }) {
  return (
    <div
      className={`logo-container ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.28),
        background: '#04060F',
        border: '1px solid rgba(191, 245, 73, 0.25)',
        boxShadow: '0 0 16px rgba(191, 245, 73, 0.2)',
        overflow: 'hidden',
        flexShrink: 0,
        ...style,
      }}
    >
      <img
        src="/logo.png"
        alt="GitTracker Logo"
        width={size}
        height={size}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
        }}
        onError={(e) => {
          e.target.style.display = 'none';
          if (e.target.parentNode) {
            e.target.parentNode.innerHTML = `
              <svg viewBox="0 0 48 48" width="${size}" height="${size}" fill="none">
                <rect width="48" height="48" rx="14" fill="#04060F"/>
                <circle cx="24" cy="24" r="16" stroke="#BFF549" stroke-width="3" stroke-dasharray="14 6" stroke-linecap="round"/>
                <circle cx="24" cy="24" r="9" stroke="#BFF549" stroke-width="2.5" stroke-dasharray="8 4" stroke-linecap="round"/>
                <circle cx="24" cy="24" r="4.5" fill="#BFF549"/>
                <path d="M24 24H36" stroke="#BFF549" stroke-width="3" stroke-linecap="round"/>
              </svg>
            `;
          }
        }}
      />
    </div>
  );
}

/* ─── Theme Toggle Button (Dark Mode ↔ Light Mode) ─── */
export function ThemeToggle({ className = '', style = {}, compact = false }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`theme-toggle ${className}`}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
      aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: compact ? 6 : 10,
        padding: compact ? '6px 12px' : '8px 14px',
        borderRadius: 999,
        background: isDark ? 'rgba(19, 25, 43, 0.85)' : '#FFFFFF',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid #E2E8F0',
        color: isDark ? '#F8FAFC' : '#0F172A',
        fontFamily: 'var(--font-label)',
        fontSize: 12,
        fontWeight: 600,
        cursor: 'pointer',
        boxShadow: isDark ? '0 0 14px rgba(0, 0, 0, 0.4)' : '0 1px 4px rgba(15, 23, 42, 0.08)',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        ...style,
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 14 }}>{isDark ? '🌙' : '☀️'}</span>
        {!compact && <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>}
      </span>
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.04em',
          padding: '2px 7px',
          borderRadius: 999,
          background: isDark ? 'rgba(191, 245, 73, 0.16)' : '#04060F',
          color: isDark ? '#BFF549' : '#BFF549',
          border: isDark ? '1px solid rgba(191, 245, 73, 0.3)' : '1px solid #04060F',
        }}
      >
        {isDark ? 'DARK' : 'LIGHT'}
      </span>
    </button>
  );
}

/* ─── Shared Symmetric Card (h-full flex flex-col justify-between, 16px radius, 24px padding) ─── */
export function Card({
  children,
  header,
  title,
  subtitle,
  icon,
  action,
  footer,
  className = '',
  style = {},
  ...rest
}) {
  return (
    <div
      className={`card h-full flex flex-col justify-between ${className}`}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '16px',
        padding: '24px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        boxSizing: 'border-box',
        ...style,
      }}
      {...rest}
    >
      <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
        {(header || title || icon || action) && (
          <div
            className="card__header"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}
          >
            {header ? (
              header
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {icon && <span className="card__icon" style={{ fontSize: 20 }}>{icon}</span>}
                <div>
                  {title && (
                    <div
                      className="card__title"
                      style={{
                        fontFamily: 'var(--font-label)',
                        fontSize: 13,
                        fontWeight: 700,
                        color: 'var(--text-secondary, var(--on-surface-variant))',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {title}
                    </div>
                  )}
                  {subtitle && (
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                      {subtitle}
                    </div>
                  )}
                </div>
              </div>
            )}
            {action && <div>{action}</div>}
          </div>
        )}
        <div className="card__content flex-1" style={{ flex: '1 1 auto' }}>
          {children}
        </div>
      </div>
      {footer && (
        <div
          className="card__footer"
          style={{
            marginTop: 20,
            paddingTop: 16,
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}

/* ─── Shared Symmetric Stat Box ─── */
export function StatBox({
  label,
  value,
  icon,
  delta,
  subtext,
  className = '',
  style = {},
}) {
  return (
    <div
      className={`stat-box h-full flex flex-col justify-between ${className}`}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '16px',
        padding: '24px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <div
          style={{
            fontFamily: 'var(--font-label)',
            fontSize: 12,
            fontWeight: 700,
            color: 'var(--text-secondary, var(--on-surface-variant))',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          {label}
        </div>
        {icon && <div style={{ fontSize: 20 }}>{icon}</div>}
      </div>
      <div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 28,
            fontWeight: 800,
            color: 'var(--text-primary)',
            lineHeight: 1.1,
            marginBottom: 6,
          }}
        >
          {value ?? '—'}
        </div>
        {(subtext || delta !== undefined) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
            {delta !== undefined && <RankDelta delta={delta} />}
            {subtext && <span>{subtext}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Shared Symmetric Table Card ─── */
export function TableCard({
  title,
  subtitle,
  icon,
  action,
  headers = [],
  children,
  footer,
  className = '',
  style = {},
}) {
  return (
    <div
      className={`table-card card h-full flex flex-col justify-between ${className}`}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '16px',
        padding: '24px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        overflow: 'hidden',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <div style={{ flex: '1 1 auto' }}>
        {(title || icon || action) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {icon && <span style={{ fontSize: 20 }}>{icon}</span>}
              <div>
                {title && (
                  <span
                    style={{
                      fontFamily: 'var(--font-label)',
                      fontSize: 13,
                      fontWeight: 700,
                      color: 'var(--text-secondary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      display: 'block',
                    }}
                  >
                    {title}
                  </span>
                )}
                {subtitle && (
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    {subtitle}
                  </span>
                )}
              </div>
            </div>
            {action && <div>{action}</div>}
          </div>
        )}
        <div style={{ overflowX: 'auto' }}>
          <table className="glass-table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 6px' }}>
            {headers.length > 0 && (
              <thead>
                <tr>
                  {headers.map((h, i) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>{children}</tbody>
          </table>
        </div>
      </div>
      {footer && (
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border-subtle)' }}>
          {footer}
        </div>
      )}
    </div>
  );
}

/* ─── Symmetric Stat Pill ─── */
export function StatPill({ label, value, icon, className = '', style = {} }) {
  return (
    <div
      className={`stat-pill h-full flex flex-col justify-between ${className}`}
      style={{
        borderRadius: '16px',
        padding: '18px 16px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {icon && <div style={{ fontSize: 18, marginBottom: 6 }}>{icon}</div>}
      <div className="stat-pill__value" style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: 'var(--text-primary)' }}>
        {value ?? '—'}
      </div>
      <div className="stat-pill__label" style={{ fontFamily: 'var(--font-label)', fontSize: 11, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
        {label}
      </div>
    </div>
  );
}

/* ─── Ambient Cosmic Background ─── */
export function CosmicBackground() {
  return (
    <div className="cosmic-bg" aria-hidden="true">
      <div className="cosmic-orb cosmic-orb--cyan" />
      <div className="cosmic-orb cosmic-orb--purple" />
      <div className="cosmic-orb cosmic-orb--pink" />
    </div>
  );
}

/* ─── Tier Badge with White-theme #04060F + #BFF549 Pill Support ─── */
export function TierBadge({ tier }) {
  const t = (tier || 'Bronze').toLowerCase();
  return <span className={`tier-badge tier-badge--${t}`}>{tier || 'Bronze'}</span>;
}

/* ─── Rank Delta ─── */
export function RankDelta({ delta }) {
  if (delta === 0 || delta === undefined || delta === null) {
    return <span className="rank-delta rank-delta--neutral">—</span>;
  }
  const isUp = delta > 0;
  return (
    <span className={`rank-delta rank-delta--${isUp ? 'up' : 'down'}`}>
      {isUp ? '▲' : '▼'} {Math.abs(delta)}
    </span>
  );
}

/* ─── Progress Bar ─── */
export function ProgressBar({ value, max = 100, size = 'default' }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={`progress-bar ${size === 'sm' ? 'progress-bar--sm' : ''}`}>
      <div className="progress-bar__fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

/* ─── Avatar ─── */
export function Avatar({ src, alt, size = 'default', tier }) {
  const sizeClass = size === 'lg' ? 'avatar--lg' : size === 'sm' ? 'avatar--sm' : '';
  const ringClass = tier ? `avatar-ring avatar-ring--${tier.toLowerCase()}` : '';

  const img = (
    <img
      className={`avatar ${sizeClass}`}
      src={src || `https://ui-avatars.com/api/?name=${encodeURIComponent(alt || 'U')}&background=04060F&color=BFF549&bold=true`}
      alt={alt || 'User avatar'}
    />
  );

  if (ringClass) {
    return <div className={ringClass}>{img}</div>;
  }
  return img;
}

/* ─── Empty State ─── */
export function EmptyState({ icon = '📭', title, text, children }) {
  return (
    <div className="empty-state" style={{ borderRadius: '16px', padding: '36px 24px', textAlign: 'center' }}>
      <div className="empty-state__icon" style={{ fontSize: 36, marginBottom: 12 }}>{icon}</div>
      <div className="empty-state__title" style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{title}</div>
      <div className="empty-state__text" style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{text}</div>
      {children && <div style={{ marginTop: 20 }}>{children}</div>}
    </div>
  );
}

/* ─── Skeleton Card (Symmetric 16px radius, 24px padding) ─── */
export function SkeletonCard() {
  return (
    <div className="card h-full flex flex-col justify-between" style={{ borderRadius: '16px', padding: '24px' }}>
      <div>
        <div className="skeleton skeleton--text" style={{ width: '40%', marginBottom: 14 }} />
        <div className="skeleton skeleton--heading" style={{ marginBottom: 12 }} />
        <div className="skeleton skeleton--text" style={{ width: '80%', marginBottom: 8 }} />
      </div>
      <div className="skeleton skeleton--text" style={{ width: '50%' }} />
    </div>
  );
}

/* ─── Loading Cards Grid ─── */
export function LoadingCards({ count = 4 }) {
  return (
    <div className="dashboard-grid" style={{ alignItems: 'stretch' }}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

/* ─── Circular Progress ─── */
export function CircularProgress({ value, max = 1, size = 100 }) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(1, Math.max(0, value / max));
  const offset = circumference * (1 - pct);

  return (
    <div className="circular-progress" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id="gradient-progress" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BFF549" />
            <stop offset="100%" stopColor="#81ecff" />
          </linearGradient>
        </defs>
        <circle
          className="circular-progress__track"
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
        <circle
          className="circular-progress__fill"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="circular-progress__value" style={{ fontFamily: 'var(--font-mono)', fontWeight: 800 }}>
        {(pct * 100).toFixed(0)}%
      </span>
    </div>
  );
}
