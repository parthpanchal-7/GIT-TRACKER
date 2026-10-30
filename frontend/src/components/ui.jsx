import { useEffect, useRef } from 'react';

/**
 * Geometric Concentric G Brand Mark
 * Concentric Git Topology: Rings reflect commit tracks and version branches
 * converging at the repository core.
 */
export function GeometricGMark({ size = 36, className = '', glow = false }) {
  return (
    <div
      className={`geometric-g-mark ${className}`}
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        filter: glow ? 'drop-shadow(0 0 12px rgba(191,245,73,0.4))' : 'none',
        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="14" fill="#04060F" stroke="#1F2937" strokeWidth="1" />
        {/* Outer Concentric Commit Ring */}
        <path
          d="M28 12 C18 12 11 18.5 11 26.5 C11 34.5 18 40 27 40 C34.5 40 39 34.5 39 27.5 L39 24.5 L24 24.5"
          stroke="#BFF549"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Inner Branch Track */}
        <path
          d="M27 18 C21.5 18 17.5 21.8 17.5 26.5 C17.5 31.2 21.5 34 26.5 34 C30 34 33 32 33.5 29"
          stroke="#BFF549"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* Center Commit Node */}
        <circle cx="24.5" cy="24.5" r="1.5" fill="#BFF549" />
      </svg>
    </div>
  );
}

/**
 * Dynamic Telemetry Canvas & Background
 * Interactive matrix of subtle coordinate nodes with pulse animations.
 */
export function CosmicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Grid nodes
    const nodes = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle telemetry lines between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(191, 245, 73, ${(1 - dist / 140) * 0.08})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(191, 245, 73, ${node.alpha * 0.4})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="telemetry-bg" aria-hidden="true">
      <div className="telemetry-grid-pattern" />
      <div className="telemetry-glow-orb telemetry-glow-orb--lime" />
      <div className="telemetry-glow-orb telemetry-glow-orb--dark" />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.65,
        }}
      />
    </div>
  );
}

export function TierBadge({ tier }) {
  const t = (tier || 'Bronze').toLowerCase();
  return <span className={`tier-badge tier-badge--${t}`}>{tier || 'Bronze'}</span>;
}

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

export function ProgressBar({ value, max = 100, size = 'default' }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={`progress-bar ${size === 'sm' ? 'progress-bar--sm' : ''}`}>
      <div className="progress-bar__fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

export function Avatar({ src, alt, size = 'default', tier }) {
  const sizeClass = size === 'lg' ? 'avatar--lg' : size === 'sm' ? 'avatar--sm' : 'avatar--default';
  const ringClass = tier === 'Elite' ? 'avatar-ring avatar-ring--elite' : '';

  const img = (
    <img
      className={`avatar ${sizeClass}`}
      src={
        src ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(alt || 'U')}&background=0F1117&color=BFF549&bold=true`
      }
      alt={alt || 'User avatar'}
    />
  );

  if (ringClass) {
    return <div className={ringClass}>{img}</div>;
  }
  return img;
}

export function StatPill({ label, value, icon }) {
  return (
    <div className="stat-pill">
      {icon && <div style={{ fontSize: 18, marginBottom: 4 }}>{icon}</div>}
      <div className="stat-pill__value">{value ?? '—'}</div>
      <div className="stat-pill__label">{label}</div>
    </div>
  );
}

export function EmptyState({ icon = '📭', title, text, children }) {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '48px 24px',
        background: '#0F1117',
        border: '1px solid #1F2937',
        borderRadius: 14,
      }}
    >
      <div style={{ fontSize: 36, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: 6 }}>
        {title}
      </div>
      <div style={{ fontSize: 13, color: 'var(--on-surface-variant)', maxWidth: 380, margin: '0 auto' }}>
        {text}
      </div>
      {children && <div style={{ marginTop: 20 }}>{children}</div>}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ height: 14, width: '40%', background: '#1F2937', borderRadius: 4 }} />
      <div style={{ height: 28, width: '70%', background: '#161922', borderRadius: 6 }} />
      <div style={{ height: 12, width: '90%', background: '#1F2937', borderRadius: 4 }} />
    </div>
  );
}

export function LoadingCards({ count = 4 }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function CircularProgress({ value, max = 1, size = 100 }) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(1, Math.max(0, value / max));
  const offset = circumference * (1 - pct);

  return (
    <div style={{ width: size, height: size, position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1F2937"
          strokeWidth="6"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#BFF549"
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="none"
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <span style={{ position: 'absolute', fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: 16, color: '#FFFFFF' }}>
        {(pct * 100).toFixed(0)}%
      </span>
    </div>
  );
}
