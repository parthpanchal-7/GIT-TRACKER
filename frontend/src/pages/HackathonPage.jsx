import { useState } from 'react';

const EVENTS = [
  { id: 'customize', num: '01', icon: '🎨', label: 'Customize Event', desc: 'Design event branding, themes, rules, evaluation categories, and scheduling tracks', pillar: 'Pillar 01' },
  { id: 'registration', num: '02', icon: '📋', label: 'Gather Registration', desc: 'Collect participant sign-ups with custom screening criteria and GitHub validation', pillar: 'Pillar 01' },
  { id: 'ideas', num: '03', icon: '💡', label: 'Idea Submissions', desc: 'Accept repository project briefs, enable peer upvoting and mentor review queues', pillar: 'Pillar 02' },
  { id: 'teams', num: '04', icon: '👥', label: 'Team Formation', desc: 'Auto-match complementary skills based on GitHub AST footprints or self-formed squads', pillar: 'Pillar 02' },
  { id: 'communication', num: '05', icon: '💬', label: 'Live Communication', desc: 'Broadcast announcements, team channels, mentor desk tickets, and direct messages', pillar: 'Pillar 02' },
  { id: 'mentors', num: '06', icon: '🧠', label: 'Mentor Matching', desc: 'Assign domain experts to teams, track office hour requests, and score checkpoints', pillar: 'Pillar 03' },
  { id: 'anticheat', num: '07', icon: '🛡', label: 'Codequiry Anti-Cheat', desc: 'Continuous repository plagiarism scans, AST entropy analysis, and AI synthesis audits', pillar: 'Pillar 03' },
  { id: 'leaderboard', num: '08', icon: '📊', label: 'Live Telemetry Leaderboard', desc: 'Real-time scoring, live rankings, and milestone tracking during hackathon build sprints', pillar: 'Pillar 03' },
  { id: 'results', num: '09', icon: '🏆', label: 'Publish Results', desc: 'Certificates of completion, winners announcement, and institutional recruiter exports', pillar: 'Pillar 03' },
];

function GridButton({ item, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={() => onClick(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="card card--interactive"
      style={{
        padding: '24px 20px',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        border: hovered ? '1px solid var(--primary)' : '1px solid var(--card-border)',
        transform: hovered ? 'translateY(-3px)' : 'none',
        transition: 'all var(--transition-normal)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 200,
      }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 'var(--radius-md)',
            background: hovered ? 'rgba(191, 245, 73, 0.15)' : '#04060F',
            border: `1px solid ${hovered ? 'var(--primary)' : 'var(--card-border)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            transition: 'all var(--transition-fast)',
          }}>
            {item.icon}
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: hovered ? 'var(--primary)' : 'var(--on-surface-variant)', fontWeight: 700 }}>
            MODULE {item.num}
          </span>
        </div>

        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 15,
          fontWeight: 700,
          color: hovered ? 'var(--primary)' : '#FFFFFF',
          marginBottom: 6,
          transition: 'color var(--transition-fast)',
        }}>
          {item.label}
        </div>
        <p style={{ fontSize: 12, color: 'var(--on-surface-variant)', lineHeight: 1.5, margin: 0 }}>
          {item.desc}
        </p>
      </div>

      <div style={{
        marginTop: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: 'var(--font-label)',
        fontSize: 11,
        color: hovered ? 'var(--primary)' : 'var(--on-surface-variant)',
        letterSpacing: '0.06em',
      }}>
        <span>{item.pillar}</span>
        <span>CONFIGURE →</span>
      </div>
    </button>
  );
}

function Modal({ item, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(4, 6, 15, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="card"
        style={{
          maxWidth: 520,
          width: '100%',
          border: '1px solid var(--primary)',
          boxShadow: '0 0 40px rgba(191, 245, 73, 0.15)',
          padding: '36px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <div style={{
            width: 52,
            height: 52,
            borderRadius: 'var(--radius-md)',
            background: 'rgba(191, 245, 73, 0.12)',
            border: '1px solid var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 26,
          }}>
            {item.icon}
          </div>
          <div>
            <div className="overline overline--no-dot" style={{ fontSize: 10, marginBottom: 2 }}>
              MODULE {item.num} · {item.pillar}
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
              {item.label}
            </h2>
          </div>
        </div>

        <p style={{ fontSize: 13, color: 'var(--on-surface-variant)', lineHeight: 1.6, marginBottom: 20 }}>
          {item.desc}
        </p>

        <div style={{
          background: '#04060F',
          border: '1px solid var(--card-border)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          fontSize: 13,
          color: 'var(--on-surface-variant)',
          lineHeight: 1.6,
          marginBottom: 24,
        }}>
          <strong style={{ color: '#FFFFFF' }}>System Spec 2.0 Hackathon Pipeline:</strong> This module connects to the GitTracker event dispatcher. Participants submit repository links, which are continuously indexed by Codequiry anti-cheat scanners and scored against the 5-Factor Vector metric.
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            className="btn btn--ghost"
            style={{ flex: 1 }}
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="btn btn--lime"
            style={{ flex: 2 }}
            onClick={() => {
              alert(`Module ${item.num} (${item.label}) selected for configuration.`);
              onClose();
            }}
          >
            Launch Configuration →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HackathonPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="fade-in">
      {/* ── Page Header ── */}
      <div className="page-header">
        <div>
          <div className="overline">EVENT OPERATIONS</div>
          <h1 className="page-header__title">Hackathon Event Intelligence Suite</h1>
          <p className="page-header__subtitle">
            Autonomous registration, team formation, Codequiry anti-cheat integrity, and real-time live telemetry
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="badge badge-lime">
            EVENT EDITION · ₹5,000 / EVENT
          </span>
        </div>
      </div>

      {/* ── Quick Stats Bar ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Active Hackathons', value: '1', icon: '🎯', sub: 'Fall 2026 CodeFest' },
          { label: 'Registered Teams', value: '48', icon: '👥', sub: '192 participants' },
          { label: 'Verified Submissions', value: '34', icon: '📦', sub: '71% submission rate' },
          { label: 'Codequiry Scans Run', value: '112', icon: '🛡', sub: '0 false positives' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: '18px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <span className="score-label">{s.label}</span>
              <span style={{ fontSize: 18 }}>{s.icon}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 26, fontWeight: 800, color: 'var(--primary)', marginBottom: 2 }}>
              {s.value}
            </div>
            <div style={{ fontSize: 11, color: 'var(--on-surface-variant)' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Active Event Banner ── */}
      <div className="card" style={{
        padding: '24px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
        marginBottom: 32,
        background: '#0B0E17',
        border: '1px solid rgba(191, 245, 73, 0.3)',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span className="badge badge-lime" style={{ fontSize: 10 }}>ACTIVE EVENT IN PROGRESS</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--on-surface-variant)' }}>ID: HK-2026-F9</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
            National Developer Sprint 2026
          </h2>
          <p style={{ fontSize: 13, color: 'var(--on-surface-variant)', margin: '4px 0 0' }}>
            Sprint closes in 14 hours · Real-time AST telemetry stream and Codequiry anti-cheat running
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            className="btn btn--outline-lime"
            onClick={() => alert('Exporting full hackathon telemetry report to CSV / PDF.')}
          >
            Export Standings
          </button>
          <button
            className="btn btn--lime"
            onClick={() => alert('New hackathon creation wizard initiated.')}
          >
            + Create New Event
          </button>
        </div>
      </div>

      {/* ── 9 Modules Section ── */}
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="overline overline--no-dot" style={{ fontSize: 11 }}>
          EVENT MANAGEMENT MODULES (9 SPECIALIZED PIPELINES)
        </div>
        <span style={{ fontSize: 12, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-mono)' }}>
          Click any module to configure
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {EVENTS.map(item => (
          <GridButton key={item.id} item={item} onClick={setSelected} />
        ))}
      </div>

      {selected && <Modal item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
