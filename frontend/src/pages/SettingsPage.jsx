import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Avatar, TierBadge } from '../components/ui';

/* ─── Tab Button ─── */
function Tab({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 20px',
        borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
        cursor: 'pointer',
        background: active ? '#0F1117' : 'transparent',
        color: active ? 'var(--primary)' : 'var(--on-surface-variant)',
        fontFamily: 'var(--font-label)',
        fontSize: 13,
        fontWeight: active ? 700 : 500,
        border: '1px solid',
        borderColor: active ? 'var(--card-border) var(--card-border) transparent var(--card-border)' : 'transparent',
        borderBottom: active ? '2px solid var(--primary)' : '2px solid transparent',
        transition: 'all var(--transition-fast)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      {children}
    </button>
  );
}

/* ─── Reusable Field Row ─── */
function FieldRow({ label, field, type, placeholder, form, editing, setForm }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {label}
      </label>
      {editing ? (
        <input
          type={type || 'text'}
          value={form[field]}
          onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
          placeholder={placeholder || ''}
          className="input-field"
          style={{ padding: '10px 14px', fontSize: 13 }}
        />
      ) : (
        <div style={{
          fontSize: 14,
          color: form[field] ? '#FFFFFF' : 'var(--on-surface-variant)',
          padding: '8px 0',
          borderBottom: '1px solid var(--card-border)',
          fontFamily: field === 'enrollmentId' || field === 'mobile' ? 'var(--font-mono)' : 'var(--font-body)',
        }}>
          {form[field] || '—'}
        </div>
      )}
    </div>
  );
}

/* ─── Profile Edit Section ─── */
function ProfileSection({ user, updateUser }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    mobile: user?.mobile || '',
    branch: user?.branch || '',
    year: user?.year || '',
    semester: user?.semester || '',
    enrollmentId: user?.enrollmentId || '',
    linkedin: user?.linkedin || '',
    college: user?.college || '',
    dob: user?.dob || '',
    bio: user?.bio || '',
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateUser(form);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="card fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <div className="overline overline--no-dot" style={{ fontSize: 10, marginBottom: 2 }}>
            CONTRIBUTOR IDENTITY
          </div>
          <h2 className="card-title">Profile Configuration</h2>
        </div>

        {!editing ? (
          <button className="btn btn--outline-lime btn--sm" onClick={() => setEditing(true)}>
            ✏️ Edit Profile
          </button>
        ) : (
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn--ghost btn--sm" onClick={() => setEditing(false)}>
              Cancel
            </button>
            <button className="btn btn--lime btn--sm" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        )}
      </div>

      {saved && (
        <div className="alert alert--success" style={{ marginBottom: 20 }}>
          ✓ Profile metadata updated and synchronized with GitTracker ledger.
        </div>
      )}

      {/* Contributor Avatar Banner */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28, padding: '16px 20px', background: '#04060F', borderRadius: 'var(--radius-md)', border: '1px solid var(--card-border)' }}>
        <Avatar src={user?.avatar} alt={user?.name} size="lg" tier={user?.tierRank || 'Elite'} />
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, fontFamily: 'var(--font-display)', color: '#FFFFFF' }}>
            {user?.name}
          </div>
          <div style={{ fontSize: 13, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-mono)' }}>
            {user?.email}
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            {user?.tierRank && <TierBadge tier={user.tierRank} />}
            {user?.role === 'admin' && (
              <span className="badge badge-lime">
                SYSTEM ADMIN
              </span>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
        <FieldRow label="Full Name" field="name" placeholder="Your full name" form={form} editing={editing} setForm={setForm} />
        <FieldRow label="Enrollment ID" field="enrollmentId" placeholder="e.g. 0901CS211001" form={form} editing={editing} setForm={setForm} />
        <FieldRow label="Branch" field="branch" placeholder="e.g. Computer Science" form={form} editing={editing} setForm={setForm} />
        <FieldRow label="Cohort Year" field="year" type="number" placeholder="1–4" form={form} editing={editing} setForm={setForm} />
        <FieldRow label="Semester" field="semester" type="number" placeholder="1–8" form={form} editing={editing} setForm={setForm} />
        <FieldRow label="Mobile Contact" field="mobile" placeholder="+91 ..." form={form} editing={editing} setForm={setForm} />
        <FieldRow label="Institution" field="college" placeholder="Your institution" form={form} editing={editing} setForm={setForm} />
        <FieldRow label="LinkedIn URL" field="linkedin" placeholder="https://linkedin.com/in/..." form={form} editing={editing} setForm={setForm} />
      </div>

      <div style={{ marginTop: 20 }}>
        <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
          Developer Bio & Focus
        </label>
        {editing ? (
          <textarea
            value={form.bio}
            onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
            placeholder="Describe your technical focus, core repositories, and open source interests..."
            rows={3}
            className="input-field"
            style={{ resize: 'vertical' }}
          />
        ) : (
          <div style={{
            fontSize: 14,
            color: form.bio ? '#FFFFFF' : 'var(--on-surface-variant)',
            padding: '10px 0',
            borderBottom: '1px solid var(--card-border)',
            lineHeight: 1.6,
          }}>
            {form.bio || 'Full stack engineer with a focus on developer tooling, system telemetry, and distributed architectures.'}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Admin: User Management ─── */
function UserManagementSection({ users, deleteUser, promoteUser }) {
  const [search, setSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    (u.enrollmentId || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <div className="overline overline--no-dot" style={{ fontSize: 10, marginBottom: 2 }}>
            ADMINISTRATION
          </div>
          <h2 className="card-title">User Directory & Roles</h2>
        </div>
        <span className="badge badge-spec">
          {users.length} REGISTERED CONTRIBUTORS
        </span>
      </div>

      <input
        placeholder="Filter by name, email, or enrollment ID..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="input-field"
        style={{ marginBottom: 16 }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map(u => (
          <div
            key={u._id}
            style={{
              background: '#04060F',
              border: '1px solid var(--card-border)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 14,
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar src={u.avatar} alt={u.name} size="sm" tier={u.tierRank} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#FFFFFF' }}>{u.name}</div>
                <div style={{ fontSize: 12, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-mono)' }}>
                  {u.email} · {u.enrollmentId}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <span className={`badge ${u.role === 'admin' ? 'badge-lime' : 'badge-spec'}`}>
                {(u.role || 'student').toUpperCase()}
              </span>
              {u.tierRank && <TierBadge tier={u.tierRank} />}
              <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--primary)', fontWeight: 700 }}>
                {u.score?.toLocaleString() ?? '—'} pts
              </span>

              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={() => promoteUser(u._id)}
                  className="btn btn--ghost btn--sm"
                  title={u.role === 'admin' ? 'Demote to student' : 'Promote to admin'}
                >
                  {u.role === 'admin' ? 'Demote' : 'Promote'}
                </button>
                <button
                  onClick={() => setConfirmDelete(u)}
                  className="btn btn--ghost btn--sm"
                  style={{ color: 'var(--error)' }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--on-surface-variant)', padding: '32px', fontSize: 13 }}>
            No users match the search criteria.
          </div>
        )}
      </div>

      {confirmDelete && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(4,6,15,0.85)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
        }}>
          <div className="card" style={{ maxWidth: 420, width: '100%', textAlign: 'center', border: '1px solid var(--error)' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>⚠️</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, margin: '0 0 8px', color: '#FFFFFF' }}>
              Confirm Account Removal
            </h3>
            <p style={{ fontSize: 13, color: 'var(--on-surface-variant)', marginBottom: 20 }}>
              Are you sure you want to remove <strong style={{ color: '#FFFFFF' }}>{confirmDelete.name}</strong> from the GitTracker institutional registry?
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn--ghost" style={{ flex: 1 }} onClick={() => setConfirmDelete(null)}>
                Cancel
              </button>
              <button
                className="btn btn--lime"
                style={{ flex: 1, background: 'var(--error)', borderColor: 'var(--error)', color: '#FFFFFF' }}
                onClick={() => { deleteUser(confirmDelete._id); setConfirmDelete(null); }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Admin: Activity Logs ─── */
function LogsSection({ logs }) {
  const LEVEL_STYLE = {
    info: { color: 'var(--primary)', bg: 'rgba(191,245,73,0.1)', label: 'INFO' },
    warn: { color: 'var(--warning)', bg: 'rgba(245,158,11,0.1)', label: 'WARN' },
    error: { color: 'var(--error)', bg: 'rgba(239,68,68,0.1)', label: 'ERROR' },
  };

  return (
    <div className="card fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <div className="overline overline--no-dot" style={{ fontSize: 10, marginBottom: 2 }}>
            SYSTEM AUDIT
          </div>
          <h2 className="card-title">Institutional Activity Logs</h2>
        </div>
        <span className="badge badge-spec">
          Last {logs.length} Platform Events
        </span>
      </div>

      <div className="code-terminal" style={{ maxHeight: 440, overflowY: 'auto' }}>
        {[...logs].reverse().map(log => {
          const s = LEVEL_STYLE[log.level] || LEVEL_STYLE.info;
          return (
            <div
              key={log.id}
              style={{
                padding: '8px 12px',
                display: 'flex',
                gap: 12,
                alignItems: 'flex-start',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
              }}
            >
              <span style={{
                padding: '1px 6px',
                borderRadius: 4,
                fontSize: 10,
                fontWeight: 800,
                background: s.bg,
                color: s.color,
                flexShrink: 0,
              }}>
                {s.label}
              </span>
              <span style={{ color: 'var(--on-surface-variant)', fontSize: 11, flexShrink: 0 }}>
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
              <span style={{ color: '#FFFFFF', flexShrink: 0, fontWeight: 700 }}>{log.user}</span>
              <span style={{ color: 'var(--primary)' }}>{log.action}</span>
              <span style={{ color: 'var(--on-surface-variant)' }}>— {log.detail}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Admin: Authorities Section ─── */
function AuthoritiesSection() {
  const AUTHORITIES = [
    { icon: '👥', label: 'User Management', desc: 'Create, update, demote and promote institutional users', enabled: true },
    { icon: '📊', label: 'Platform Analytics', desc: 'Access cohort distributions and telemetry stream rates', enabled: true },
    { icon: '🔄', label: 'Telemetry Force Sync', desc: 'Trigger manual GitHub AST sync for any contributor', enabled: true },
    { icon: '🏆', label: 'Manage Leaderboard', desc: 'Audit verified rankings and resolve flagged anomalies', enabled: true },
    { icon: '🔒', label: 'Forensic Security', desc: 'Manage Codequiry endpoints and webhook signing secrets', enabled: true },
    { icon: '📋', label: 'Audit Trail Logs', desc: 'Inspect non-repudiable logs of all scoring events', enabled: true },
    { icon: '🎯', label: 'Hackathon Operations', desc: 'Configure hackathon rounds and live evaluation tracks', enabled: true },
    { icon: '🔌', label: 'API Integrations', desc: 'Manage institutional OAuth and Codequiry tokens', enabled: true },
  ];

  return (
    <div className="card fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <div className="overline overline--no-dot" style={{ fontSize: 10, marginBottom: 2 }}>
            PRIVILEGED ACCESS
          </div>
          <h2 className="card-title">Administrative Authorities</h2>
        </div>
        <span className="badge badge-lime">
          ROLE: INSTITUTIONAL ADMIN
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
        {AUTHORITIES.map(a => (
          <div
            key={a.label}
            style={{
              background: '#04060F',
              border: '1px solid var(--card-border)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
            }}
          >
            <span style={{ fontSize: 22 }}>{a.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF', marginBottom: 2 }}>{a.label}</div>
              <div style={{ fontSize: 11, color: 'var(--on-surface-variant)', lineHeight: 1.4 }}>{a.desc}</div>
            </div>
            <span className="badge badge-lime" style={{ fontSize: 9 }}>
              ACTIVE
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── GitHub + Danger ─── */
function AccountSection({ user, logout }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="card fade-in">
        <div className="overline overline--no-dot" style={{ fontSize: 10, marginBottom: 4 }}>
          EXTERNAL PLATFORM
        </div>
        <h2 className="card-title" style={{ marginBottom: 16 }}>GitHub Integration</h2>

        {user?.githubConnected ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div className="sync-indicator">
                <span className="sync-indicator__dot" />
                Connected to GitHub API
              </div>
              {user.githubUsername && (
                <a
                  href={`https://github.com/${user.githubUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill pill--active"
                >
                  @{user.githubUsername} ↗
                </a>
              )}
            </div>
            <p style={{ fontSize: 13, color: 'var(--on-surface-variant)', marginBottom: 16 }}>
              Repository events, pull requests, and commit metadata are continuously tracked.
            </p>
            <button className="btn btn--ghost btn--sm" disabled>
              Disconnect GitHub (Disabled in Demo)
            </button>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: 13, color: 'var(--on-surface-variant)', marginBottom: 16 }}>
              Connect your GitHub account to begin tracking your 5-Factor Vector Score.
            </p>
            <button className="btn btn--lime" disabled>
              ⛓ Connect GitHub Account
            </button>
          </div>
        )}
      </div>

      <div className="card fade-in" style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}>
        <div className="overline overline--no-dot" style={{ fontSize: 10, color: 'var(--error)', marginBottom: 4 }}>
          TERMINATION
        </div>
        <h2 className="card-title" style={{ color: 'var(--error)', marginBottom: 12 }}>Danger Zone</h2>
        <p style={{ fontSize: 13, color: 'var(--on-surface-variant)', marginBottom: 16 }}>
          Terminate your active GitTracker session on this workstation.
        </p>
        <button className="btn btn--ghost" style={{ borderColor: 'var(--error)', color: 'var(--error)' }} onClick={logout}>
          Sign Out of GitTracker
        </button>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const { user, logout, updateUser, users, deleteUser, promoteUser, logs } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [tab, setTab] = useState('profile');

  const TABS = isAdmin
    ? [
        { id: 'profile', label: '👤 Profile' },
        { id: 'account', label: '🔗 Account' },
        { id: 'users', label: '👥 User Directory' },
        { id: 'logs', label: '📋 System Logs' },
        { id: 'authorities', label: '🔒 Authorities' },
      ]
    : [
        { id: 'profile', label: '👤 Profile' },
        { id: 'account', label: '🔗 Account' },
      ];

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <div className="overline">SYSTEM CONFIGURATION</div>
          <h1 className="page-header__title">Account & Administrative Settings</h1>
          <p className="page-header__subtitle">
            Manage your GitTracker developer credentials, authorities, and telemetry sync preferences
          </p>
        </div>

        {isAdmin && (
          <span className="badge badge-lime">
            ADMINISTRATOR MODE
          </span>
        )}
      </div>

      <div style={{ display: 'flex', gap: 4, marginBottom: 24, borderBottom: '1px solid var(--card-border)', paddingBottom: 0, overflowX: 'auto' }}>
        {TABS.map(t => (
          <Tab key={t.id} active={tab === t.id} onClick={() => setTab(t.id)}>
            {t.label}
          </Tab>
        ))}
      </div>

      <div>
        {tab === 'profile' && <ProfileSection user={user} updateUser={updateUser} />}
        {tab === 'account' && <AccountSection user={user} logout={logout} />}
        {tab === 'users' && isAdmin && <UserManagementSection users={users || []} deleteUser={deleteUser} promoteUser={promoteUser} />}
        {tab === 'logs' && isAdmin && <LogsSection logs={logs || []} />}
        {tab === 'authorities' && isAdmin && <AuthoritiesSection />}
      </div>
    </div>
  );
}
