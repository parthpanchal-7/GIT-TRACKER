import { useState } from 'react';

const EVENTS = [
  { id: 'customize', icon: '🎨', label: 'Customize Your Event', desc: 'Design event branding, themes, rules, categories and schedule', color: '#81ecff' },
  { id: 'registration', icon: '📋', label: 'Gather Registration', desc: 'Collect participant sign-ups with custom registration forms', color: '#d674ff' },
  { id: 'ideas', icon: '💡', label: 'Gather Ideas', desc: 'Accept idea submissions, enable voting and community feedback', color: '#fbbf24' },
  { id: 'teams', icon: '👥', label: 'Form Teams', desc: 'Auto-match participants or let them self-form into squads', color: '#34d399' },
  { id: 'communication', icon: '💬', label: 'Enable Communication', desc: 'Announcements, team channels, mentor Q&A, and DMs', color: '#ff6b98' },
  { id: 'feedback', icon: '📝', label: 'Gather Feedback', desc: 'Post-event surveys, session ratings, and NPS collection', color: '#a78bfa' },
  { id: 'mentors', icon: '🧠', label: 'Involve Mentors', desc: 'Assign mentors to teams, schedule office hours, manage availability', color: '#f97316' },
  { id: 'results', icon: '🏆', label: 'Publish Results', desc: 'Announce winners, certificates, and share highlight reels', color: '#eab308' },
  { id: 'leaderboard', icon: '📊', label: 'Enable Leaderboard', desc: 'Real-time scoring, live rankings, and milestone tracking during the event', color: '#06b6d4' },
];

function GridButton({ item, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button onClick={() => onClick(item)}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `${item.color}0f` : 'rgba(255,255,255,0.025)',
        border: `1.5px solid ${hovered ? item.color + '55' : item.color + '20'}`,
        borderRadius: 20, padding: '32px 24px', cursor: 'pointer',
        textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
        transition: 'all 0.22s ease', backdropFilter: 'blur(12px)',
        transform: hovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: hovered ? `0 12px 40px ${item.color}20` : 'none',
        position: 'relative', overflow: 'hidden',
      }}>
      {hovered && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
        }} />
      )}
      <div style={{
        width: 64, height: 64, borderRadius: 18,
        background: `${item.color}18`, border: `1px solid ${item.color}35`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
        transition: 'transform 0.2s', transform: hovered ? 'scale(1.1)' : 'scale(1)',
      }}>{item.icon}</div>
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700,
        color: hovered ? item.color : 'var(--on-surface)', transition: 'color 0.2s', lineHeight: 1.3,
      }}>{item.label}</div>
      <div style={{ fontSize: 12, color: 'var(--on-surface-variant)', lineHeight: 1.6, maxWidth: 180 }}>{item.desc}</div>
      <div style={{
        marginTop: 4, fontSize: 11, fontFamily: 'var(--font-label)',
        color: item.color, opacity: hovered ? 1 : 0, transition: 'opacity 0.2s', letterSpacing: '0.04em',
      }}>CONFIGURE →</div>
    </button>
  );
}

function Modal({ item, onClose }) {
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(4,6,15,0.8)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'rgba(9,14,28,0.98)', border: `1px solid ${item.color}30`,
        borderRadius: 24, padding: '40px', maxWidth: 520, width: '100%',
        boxShadow: `0 0 80px ${item.color}20`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: `${item.color}18`, border: `1px solid ${item.color}35`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
          }}>{item.icon}</div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, margin: 0, color: item.color }}>{item.label}</h2>
            <p style={{ fontSize: 13, color: 'var(--on-surface-variant)', margin: '4px 0 0' }}>{item.desc}</p>
          </div>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 14, padding: '20px', fontSize: 14, color: 'var(--on-surface-variant)', lineHeight: 1.7,
        }}>
          🚧 <strong style={{ color: 'var(--on-surface)' }}>{item.label}</strong> module is coming soon in the next release. This is a preview of the feature scope — full configuration options, templates, and workflows will be available when launched.
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: '12px', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: 'rgba(255,255,255,0.06)', color: 'var(--on-surface)', fontWeight: 600, fontSize: 13,
            fontFamily: 'var(--font-label)',
          }}>Close</button>
          <button style={{
            flex: 2, padding: '12px', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: `linear-gradient(135deg, ${item.color}, ${item.color}bb)`,
            color: '#003840', fontWeight: 700, fontSize: 13, fontFamily: 'var(--font-label)',
          }}>Notify Me When Ready →</button>
        </div>
      </div>
    </div>
  );
}

export default function HackathonPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-header__title">🏆 Hackathon Manager</h1>
        <p className="page-header__subtitle">Design, run, and celebrate your next hackathon — end to end</p>
      </div>

      {/* Quick stats bar */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
        {[
          { label: 'Active Events', value: '0', icon: '🎯' },
          { label: 'Registered Teams', value: '0', icon: '👥' },
          { label: 'Submissions', value: '0', icon: '📦' },
          { label: 'Mentors Online', value: '0', icon: '🧠' },
        ].map(s => (
          <div key={s.label} style={{
            background: 'rgba(129,236,255,0.04)', border: '1px solid rgba(129,236,255,0.1)',
            borderRadius: 12, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 10,
            flex: '1 1 160px',
          }}>
            <span style={{ fontSize: 20 }}>{s.icon}</span>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#81ecff' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Create event prompt */}
      <div style={{
        background: 'rgba(129,236,255,0.04)', border: '1px dashed rgba(129,236,255,0.2)',
        borderRadius: 16, padding: '20px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 32, flexWrap: 'wrap', gap: 12,
      }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>No active hackathon yet</div>
          <div style={{ fontSize: 13, color: 'var(--on-surface-variant)' }}>Create your first event and configure it using the modules below</div>
        </div>
        <button style={{
          padding: '10px 24px', borderRadius: 10, border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg, #81ecff, #00d4ec)',
          color: '#003840', fontWeight: 700, fontSize: 13, fontFamily: 'var(--font-label)',
        }}>+ Create New Event</button>
      </div>

      {/* Grid of module buttons */}
      <div style={{ marginBottom: 16, fontSize: 12, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Event Management Modules
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {EVENTS.map(item => (
          <GridButton key={item.id} item={item} onClick={setSelected} />
        ))}
      </div>

      {selected && <Modal item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
