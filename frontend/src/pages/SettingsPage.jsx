import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Avatar, TierBadge } from '../components/ui';

/* ─── Tab button ─── */
function Tab({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer',
      background: active ? 'rgba(129,236,255,0.12)' : 'transparent',
      color: active ? '#81ecff' : 'var(--on-surface-variant)',
      fontFamily: 'var(--font-label)', fontSize: 13, fontWeight: active ? 700 : 500,
      borderBottom: active ? '2px solid #81ecff' : '2px solid transparent',
      transition: 'all 0.2s',
    }}>{children}</button>
  );
}

/* ─── Reusable field row (module-scope to avoid react-hooks/static-components) ─── */
function FieldRow({ label, field, type, placeholder, form, editing, setForm }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</label>
      {editing ? (
        <input type={type || 'text'} value={form[field]}
          onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
          placeholder={placeholder || ''}
          style={{
            padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(129,236,255,0.2)', color: 'var(--on-surface)', fontSize: 14,
            outline: 'none', fontFamily: 'var(--font-body)',
          }}
          onFocus={e => e.target.style.borderColor = 'rgba(129,236,255,0.5)'}
          onBlur={e => e.target.style.borderColor = 'rgba(129,236,255,0.2)'}
        />
      ) : (
        <div style={{ fontSize: 14, color: form[field] ? 'var(--on-surface)' : 'var(--on-surface-variant)', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
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
    name: user?.name || '', mobile: user?.mobile || '', branch: user?.branch || '',
    year: user?.year || '', semester: user?.semester || '', enrollmentId: user?.enrollmentId || '',
    linkedin: user?.linkedin || '', college: user?.college || '', dob: user?.dob || '', bio: user?.bio || '',
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateUser(form);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="card fade-in stagger-1">
      <div className="card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="card__title">Profile</span>
        {!editing ? (
          <button className="btn btn--ghost btn--sm" onClick={() => setEditing(true)}>✏️ Edit Profile</button>
        ) : (
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn--ghost btn--sm" onClick={() => setEditing(false)}>Cancel</button>
            <button className="btn btn--primary btn--sm" onClick={handleSave}>Save Changes</button>
          </div>
        )}
      </div>

      {saved && <div className="alert alert--success" style={{ marginBottom: 16 }}>✓ Profile updated successfully</div>}

      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
        <div style={{ position: 'relative' }}>
          <Avatar src={user?.avatar} alt={user?.name} size="lg" tier={user?.tierRank} />
          {editing && (
            <button style={{
              position: 'absolute', bottom: 0, right: 0,
              background: 'rgba(129,236,255,0.9)', border: 'none', borderRadius: '50%',
              width: 24, height: 24, cursor: 'pointer', fontSize: 12,
            }}>📷</button>
          )}
        </div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-display)' }}>{user?.name}</div>
          <div style={{ fontSize: 13, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-mono)' }}>{user?.email}</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            {user?.tierRank && <TierBadge tier={user.tierRank} />}
            {user?.role === 'admin' && (
              <span style={{
                padding: '2px 10px', borderRadius: 999, fontSize: 11,
                background: 'rgba(214,116,255,0.15)', color: '#d674ff',
                border: '1px solid rgba(214,116,255,0.3)', fontWeight: 700, fontFamily: 'var(--font-label)',
              }}>ADMIN</span>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
        <FieldRow label="Full Name" field="name" placeholder="Your full name" form={form} editing={editing} setForm={setForm} />
        <FieldRow label="Enrollment ID" field="enrollmentId" placeholder="e.g. 0901CS211001" form={form} editing={editing} setForm={setForm} />
        <FieldRow label="Branch" field="branch" placeholder="e.g. Computer Science" form={form} editing={editing} setForm={setForm} />
        <FieldRow label="Year" field="year" type="number" placeholder="1–4" form={form} editing={editing} setForm={setForm} />
        <FieldRow label="Semester" field="semester" type="number" placeholder="1–8" form={form} editing={editing} setForm={setForm} />
        <FieldRow label="Mobile" field="mobile" placeholder="+91 ..." form={form} editing={editing} setForm={setForm} />
        <FieldRow label="Date of Birth" field="dob" type="date" form={form} editing={editing} setForm={setForm} />
        <FieldRow label="College / Institution" field="college" placeholder="Your college name" form={form} editing={editing} setForm={setForm} />
        <FieldRow label="LinkedIn URL" field="linkedin" placeholder="https://linkedin.com/in/..." form={form} editing={editing} setForm={setForm} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: 'span 2' }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Bio</label>
          {editing ? (
            <textarea value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
              placeholder="Tell us about yourself..." rows={3}
              style={{
                padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(129,236,255,0.2)', color: 'var(--on-surface)', fontSize: 14,
                resize: 'vertical', outline: 'none', fontFamily: 'var(--font-body)',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(129,236,255,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(129,236,255,0.2)'}
            />
          ) : (
            <div style={{ fontSize: 14, color: form.bio ? 'var(--on-surface)' : 'var(--on-surface-variant)', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              {form.bio || '—'}
            </div>
          )}
        </div>
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

  const TIER_COLORS = { Elite: '#d674ff', Platinum: '#81ecff', Gold: '#fbbf24', Silver: '#94a3b8', Bronze: '#cd7c3b' };

  return (
    <div className="card fade-in stagger-2">
      <div className="card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="card__title">User Management</span>
        <span style={{ fontSize: 12, color: 'var(--on-surface-variant)' }}>{users.length} total users</span>
      </div>

      <input placeholder="Search by name, email, or ID..." value={search} onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%', padding: '10px 14px', borderRadius: 10, marginBottom: 16,
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(129,236,255,0.15)',
          color: 'var(--on-surface)', fontSize: 13, outline: 'none', fontFamily: 'var(--font-body)', boxSizing: 'border-box',
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map(u => (
          <div key={u._id} style={{
            background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(129,236,255,0.07)',
            borderRadius: 12, padding: '14px 18px',
            display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'linear-gradient(135deg, #81ecff33, #d674ff33)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, flexShrink: 0,
            }}>{u.name[0]}</div>
            <div style={{ flex: 1, minWidth: 140 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{u.name}</div>
              <div style={{ fontSize: 12, color: 'var(--on-surface-variant)' }}>{u.email} · {u.enrollmentId}</div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{
                padding: '2px 10px', borderRadius: 999, fontSize: 11,
                background: u.role === 'admin' ? 'rgba(214,116,255,0.12)' : 'rgba(129,236,255,0.08)',
                color: u.role === 'admin' ? '#d674ff' : '#81ecff',
                border: `1px solid ${u.role === 'admin' ? 'rgba(214,116,255,0.25)' : 'rgba(129,236,255,0.15)'}`,
                fontWeight: 700, fontFamily: 'var(--font-label)',
              }}>{(u.role || 'student').toUpperCase()}</span>
              {u.tierRank && (
                <span style={{
                  padding: '2px 10px', borderRadius: 999, fontSize: 11,
                  color: TIER_COLORS[u.tierRank] || '#94a3b8',
                  background: `${TIER_COLORS[u.tierRank] || '#94a3b8'}14`,
                  border: `1px solid ${TIER_COLORS[u.tierRank] || '#94a3b8'}30`,
                  fontWeight: 600, fontFamily: 'var(--font-label)',
                }}>{u.tierRank}</span>
              )}
              <span style={{ fontSize: 12, color: 'var(--on-surface-variant)' }}>Score: {u.score ?? '—'}</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => promoteUser(u._id)} className="btn btn--ghost btn--sm"
                title={u.role === 'admin' ? 'Demote to student' : 'Promote to admin'}>
                {u.role === 'admin' ? '⬇ Demote' : '⬆ Promote'}
              </button>
              <button onClick={() => setConfirmDelete(u)} className="btn btn--danger btn--sm">Delete</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--on-surface-variant)', padding: '24px', fontSize: 13 }}>No users found.</div>
        )}
      </div>

      {confirmDelete && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(4,6,15,0.8)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
        }}>
          <div style={{
            background: 'rgba(9,14,28,0.98)', border: '1px solid rgba(255,113,108,0.25)',
            borderRadius: 20, padding: '36px 32px', maxWidth: 400, width: '100%', textAlign: 'center',
          }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, margin: '0 0 10px', color: 'var(--error)' }}>Delete User?</h3>
            <p style={{ fontSize: 14, color: 'var(--on-surface-variant)', marginBottom: 24 }}>
              Are you sure you want to delete <strong style={{ color: 'var(--on-surface)' }}>{confirmDelete.name}</strong>? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn--ghost" style={{ flex: 1 }} onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="btn btn--danger" style={{ flex: 1 }}
                onClick={() => { deleteUser(confirmDelete._id); setConfirmDelete(null); }}>Yes, Delete</button>
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
    info: { color: '#81ecff', bg: 'rgba(129,236,255,0.08)', label: 'INFO' },
    warn: { color: '#fbbf24', bg: 'rgba(251,191,36,0.08)', label: 'WARN' },
    error: { color: '#ff716c', bg: 'rgba(255,113,108,0.08)', label: 'ERROR' },
  };

  return (
    <div className="card fade-in stagger-3">
      <div className="card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="card__title">Activity Logs</span>
        <span style={{ fontSize: 12, color: 'var(--on-surface-variant)' }}>Last {logs.length} events</span>
      </div>

      <div style={{
        background: 'rgba(0,0,0,0.3)', borderRadius: 12, padding: '4px 0',
        fontFamily: 'var(--font-mono)', fontSize: 12, maxHeight: 420, overflowY: 'auto',
      }}>
        {[...logs].reverse().map(log => {
          const s = LEVEL_STYLE[log.level] || LEVEL_STYLE.info;
          return (
            <div key={log.id} style={{
              padding: '10px 16px', display: 'flex', gap: 12, alignItems: 'flex-start',
              borderBottom: '1px solid rgba(255,255,255,0.03)',
            }}>
              <span style={{
                padding: '1px 6px', borderRadius: 4, fontSize: 10, fontWeight: 700,
                background: s.bg, color: s.color, flexShrink: 0, marginTop: 1,
              }}>{s.label}</span>
              <span style={{ color: 'rgba(129,236,255,0.4)', fontSize: 11, flexShrink: 0 }}>
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
              <span style={{ color: 'rgba(129,236,255,0.6)', flexShrink: 0 }}>{log.user}</span>
              <span style={{ color: 'var(--on-surface-variant)' }}>{log.action}</span>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>— {log.detail}</span>
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
    { icon: '👥', label: 'User Management', desc: 'Create, update, delete and promote users', enabled: true },
    { icon: '📊', label: 'View All Analytics', desc: 'Access platform-wide metrics and statistics', enabled: true },
    { icon: '🔄', label: 'Force Sync', desc: 'Trigger GitHub sync for any user anytime', enabled: true },
    { icon: '🏆', label: 'Manage Leaderboard', desc: 'Override scores, remove flagged entries', enabled: true },
    { icon: '🔒', label: 'Security Controls', desc: 'View threat model, manage webhooks secrets', enabled: true },
    { icon: '📋', label: 'Activity Logs', desc: 'Full audit trail of all platform actions', enabled: true },
    { icon: '🎯', label: 'Hackathon Management', desc: 'Create and manage hackathon events', enabled: true },
    { icon: '📧', label: 'Email Broadcasts', desc: 'Send announcements to all users', enabled: false },
    { icon: '🔌', label: 'API Management', desc: 'Manage integrations and API keys', enabled: false },
    { icon: '💰', label: 'Billing Controls', desc: 'Manage subscriptions and invoices', enabled: false },
  ];

  return (
    <div className="card fade-in stagger-1">
      <div className="card__header"><span className="card__title">Admin Authorities</span></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
        {AUTHORITIES.map(a => (
          <div key={a.label} style={{
            background: a.enabled ? 'rgba(129,236,255,0.04)' : 'rgba(255,255,255,0.02)',
            border: `1px solid ${a.enabled ? 'rgba(129,236,255,0.15)' : 'rgba(255,255,255,0.05)'}`,
            borderRadius: 12, padding: '14px 16px',
            display: 'flex', alignItems: 'flex-start', gap: 12, opacity: a.enabled ? 1 : 0.5,
          }}>
            <span style={{ fontSize: 20 }}>{a.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{a.label}</div>
              <div style={{ fontSize: 11, color: 'var(--on-surface-variant)' }}>{a.desc}</div>
            </div>
            <span style={{
              fontSize: 10, padding: '2px 8px', borderRadius: 999, fontFamily: 'var(--font-label)', fontWeight: 700,
              background: a.enabled ? 'rgba(52,211,153,0.12)' : 'rgba(255,255,255,0.05)',
              color: a.enabled ? '#34d399' : 'var(--on-surface-variant)',
            }}>{a.enabled ? 'ACTIVE' : 'SOON'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── GitHub + Danger ─── */
function AccountSection({ user, logout }) {
  return (
    <>
      <div className="card fade-in stagger-1">
        <div className="card__header"><span className="card__title">GitHub Integration</span></div>
        {user?.githubConnected ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div className="sync-indicator"><div className="sync-indicator__dot" />Connected</div>
              {user.githubUsername && (
                <a href={`https://github.com/${user.githubUsername}`} target="_blank" rel="noopener noreferrer"
                  className="pill pill--active" style={{ textDecoration: 'none' }}>
                  @{user.githubUsername} ↗
                </a>
              )}
            </div>
            <button className="btn btn--danger btn--sm" disabled>Disconnect GitHub (demo)</button>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: 14, color: 'var(--on-surface-variant)', marginBottom: 16 }}>Connect your GitHub account to start tracking contributions.</p>
            <button className="btn btn--primary" disabled>⛓ Connect GitHub (demo)</button>
          </div>
        )}
      </div>

      <div className="card fade-in stagger-2" style={{ borderColor: 'rgba(255,113,108,0.15)' }}>
        <div className="card__header"><span className="card__title" style={{ color: 'var(--error)' }}>Danger Zone</span></div>
        <p style={{ fontSize: 13, color: 'var(--on-surface-variant)', marginBottom: 12 }}>Sign out of your GitTracker session.</p>
        <button className="btn btn--danger" onClick={logout}>Sign Out</button>
      </div>
    </>
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
        { id: 'users', label: '👥 Users' },
        { id: 'logs', label: '📋 Logs' },
        { id: 'authorities', label: '🔒 Authorities' },
      ]
    : [
        { id: 'profile', label: '👤 Profile' },
        { id: 'account', label: '🔗 Account' },
      ];

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-header__title">Settings</h1>
        <p className="page-header__subtitle">
          Manage your GitTracker account
          {isAdmin && <span style={{
            marginLeft: 10, padding: '2px 10px', borderRadius: 999, fontSize: 11,
            background: 'rgba(214,116,255,0.12)', color: '#d674ff',
            border: '1px solid rgba(214,116,255,0.25)', fontWeight: 700,
          }}>ADMIN</span>}
        </p>
      </div>

      <div style={{
        display: 'flex', gap: 4, marginBottom: 24, flexWrap: 'wrap',
        borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 0,
      }}>
        {TABS.map(t => (
          <Tab key={t.id} active={tab === t.id} onClick={() => setTab(t.id)}>{t.label}</Tab>
        ))}
      </div>

      <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr' }}>
        {tab === 'profile' && <ProfileSection user={user} updateUser={updateUser} />}
        {tab === 'account' && <AccountSection user={user} logout={logout} />}
        {tab === 'users' && isAdmin && <UserManagementSection users={users || []} deleteUser={deleteUser} promoteUser={promoteUser} />}
        {tab === 'logs' && isAdmin && <LogsSection logs={logs || []} />}
        {tab === 'authorities' && isAdmin && <AuthoritiesSection />}
      </div>
    </div>
  );
}
