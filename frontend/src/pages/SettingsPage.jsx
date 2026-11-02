import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Avatar, TierBadge } from '../components/ui';
import { authAPI, studentAPI } from '../services/api';

/* ─── Tab button ─── */
function Tab({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      padding: '10px 24px', borderRadius: 10, border: 'none', cursor: 'pointer',
      background: active ? 'rgba(129,236,255,0.12)' : 'transparent',
      color: active ? '#81ecff' : 'var(--on-surface-variant)',
      fontFamily: 'var(--font-label)', fontSize: 13, fontWeight: active ? 700 : 500,
      borderBottom: active ? '2px solid #81ecff' : '2px solid transparent',
      transition: 'all 0.2s',
    }}>{children}</button>
  );
}

/* ─── Reusable field row ─── */
function FieldRow({ label, field, type, placeholder, form, editing, setForm }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {label}
      </label>
      {editing ? (
        <input
          type={type || 'text'}
          value={form[field] || ''}
          onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
          placeholder={placeholder || ''}
          style={{
            padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(129,236,255,0.2)', color: 'var(--on-surface)', fontSize: 14,
            outline: 'none', fontFamily: 'var(--font-body)', boxSizing: 'border-box',
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

/* ─── Profile Section ─── */
function ProfileSection({ user, updateUser }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: '', mobile: '', branch: '', year: '', semester: '',
    enrollmentId: '', linkedin: '', college: '', dob: '', bio: '',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        mobile: user.mobile || '',
        branch: user.branch || '',
        year: user.year || '',
        semester: user.semester || '',
        enrollmentId: user.enrollmentId || '',
        linkedin: user.linkedin || '',
        college: user.college || '',
        dob: user.dob || '',
        bio: user.bio || '',
      });
    }
  }, [user]);

  const handleSave = async () => {
    await updateUser(form);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="card fade-in stagger-1">
      <div className="card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="card__title">Developer Profile</span>
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
        <Avatar src={user?.avatar} alt={user?.name} size="lg" tier={user?.tierRank} />
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--on-surface)' }}>
            {user?.name || 'Developer'}
          </div>
          <div style={{ fontSize: 13, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <span>{user?.email}</span>
            <span style={{
              fontSize: 10, padding: '2px 8px', borderRadius: 999,
              background: 'rgba(66,133,244,0.15)', color: '#81ecff',
              border: '1px solid rgba(66,133,244,0.3)', fontWeight: 600,
            }}>
              ✓ Google Verified
            </span>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
            {user?.tierRank && <TierBadge tier={user.tierRank} />}
            {user?.githubUsername && (
              <span style={{
                padding: '3px 10px', borderRadius: 999, fontSize: 11,
                background: 'rgba(255,255,255,0.06)', color: 'var(--on-surface)',
                border: '1px solid rgba(255,255,255,0.12)', fontFamily: 'var(--font-mono)',
              }}>
                @{user.githubUsername}
              </span>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
        <FieldRow label="Full Name" field="name" placeholder="Your name" form={form} editing={editing} setForm={setForm} />
        <FieldRow label="College / Organization" field="college" placeholder="e.g. Stanford / IIT / Independent" form={form} editing={editing} setForm={setForm} />
        <FieldRow label="Discipline / Branch" field="branch" placeholder="e.g. Computer Science" form={form} editing={editing} setForm={setForm} />
        <FieldRow label="Academic / Cohort Year" field="year" placeholder="e.g. 3" form={form} editing={editing} setForm={setForm} />
        <FieldRow label="Student / Member ID" field="enrollmentId" placeholder="e.g. DEV-2026" form={form} editing={editing} setForm={setForm} />
        <FieldRow label="LinkedIn URL" field="linkedin" placeholder="https://linkedin.com/in/username" form={form} editing={editing} setForm={setForm} />
        <FieldRow label="Date of Birth" field="dob" type="date" form={form} editing={editing} setForm={setForm} />
        <FieldRow label="Phone / Mobile" field="mobile" placeholder="+91 ..." form={form} editing={editing} setForm={setForm} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: 'span 2' }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-label)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Bio / Developer Summary
          </label>
          {editing ? (
            <textarea
              value={form.bio || ''}
              onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
              placeholder="Share what you are building, top languages, or open-source interests..."
              rows={3}
              style={{
                padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(129,236,255,0.2)', color: 'var(--on-surface)', fontSize: 14,
                resize: 'vertical', outline: 'none', fontFamily: 'var(--font-body)',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(129,236,255,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(129,236,255,0.2)'}
            />
          ) : (
            <div style={{ fontSize: 14, color: form.bio ? 'var(--on-surface)' : 'var(--on-surface-variant)', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', lineHeight: 1.6 }}>
              {form.bio || 'No bio added yet.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Account & Integrations Section ─── */
function AccountSection({ user, logout, updateUser }) {
  const [connectingGithub, setConnectingGithub] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

  const handleConnectGithub = async () => {
    setConnectingGithub(true);
    setActionMessage('');
    try {
      const res = await authAPI.getGithubUrl();
      if (res.data?.authUrl) {
        window.location.href = res.data.authUrl;
        return;
      }
      throw new Error('OAuth URL not returned');
    } catch {
      // Direct mock connect for local sandbox
      const ghUsername = prompt('Enter your GitHub username to link:');
      if (ghUsername && ghUsername.trim()) {
        updateUser({ githubConnected: true, githubUsername: ghUsername.trim() });
        setActionMessage(`Connected @${ghUsername.trim()} successfully!`);
      }
    } finally {
      setConnectingGithub(false);
    }
  };

  const handleDisconnectGithub = async () => {
    if (!window.confirm('Are you sure you want to unlink your GitHub account? Contribution scoring will stop syncing.')) {
      return;
    }
    setDisconnecting(true);
    try {
      await studentAPI.disconnectGithub();
    } catch {
      // ignore
    } finally {
      updateUser({ githubConnected: false, githubUsername: '' });
      setDisconnecting(false);
      setActionMessage('GitHub account unlinked.');
    }
  };

  return (
    <>
      {actionMessage && (
        <div className="alert alert--success" style={{ marginBottom: 16 }}>
          ✓ {actionMessage}
        </div>
      )}

      {/* Google Account Status */}
      <div className="card fade-in stagger-1" style={{ marginBottom: 20 }}>
        <div className="card__header">
          <span className="card__title">Authentication Provider</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Google Account</div>
              <div style={{ fontSize: 13, color: 'var(--on-surface-variant)' }}>{user?.email}</div>
            </div>
          </div>
          <span style={{
            fontSize: 12, padding: '4px 12px', borderRadius: 999,
            background: 'rgba(52,211,153,0.12)', color: '#34d399', border: '1px solid rgba(52,211,153,0.25)',
            fontWeight: 700, fontFamily: 'var(--font-label)',
          }}>
            CONNECTED VIA GOOGLE OAUTH
          </span>
        </div>
      </div>

      {/* GitHub Integration */}
      <div className="card fade-in stagger-2" style={{ marginBottom: 20 }}>
        <div className="card__header">
          <span className="card__title">GitHub Code Tracking</span>
        </div>
        {user?.githubConnected ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 24 }}>🐙</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>Linked GitHub Account</div>
                  {user.githubUsername ? (
                    <a
                      href={`https://github.com/${user.githubUsername}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#81ecff', fontSize: 13, textDecoration: 'none', fontFamily: 'var(--font-mono)' }}
                    >
                      @{user.githubUsername} ↗
                    </a>
                  ) : (
                    <span style={{ fontSize: 13, color: 'var(--on-surface-variant)' }}>Active sync enabled</span>
                  )}
                </div>
              </div>

              <button
                className="btn btn--danger btn--sm"
                onClick={handleDisconnectGithub}
                disabled={disconnecting}
              >
                {disconnecting ? 'Unlinking...' : 'Disconnect GitHub'}
              </button>
            </div>
            <p style={{ fontSize: 13, color: 'var(--on-surface-variant)', lineHeight: 1.5, margin: 0 }}>
              Repositories, commits, PRs, and issues are continuously analyzed for your GitTracker score and ranking.
            </p>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: 14, color: 'var(--on-surface-variant)', marginBottom: 18, lineHeight: 1.5 }}>
              Link your GitHub profile to unlock automated contribution scoring, streak tracking, anti-cheat code audits, and leaderboard rankings.
            </p>
            <button
              className="btn btn--primary"
              onClick={handleConnectGithub}
              disabled={connectingGithub}
            >
              {connectingGithub ? 'Connecting...' : '🐙 Connect GitHub Profile'}
            </button>
          </div>
        )}
      </div>

      {/* Danger Zone */}
      <div className="card fade-in stagger-3" style={{ borderColor: 'rgba(255,113,108,0.2)' }}>
        <div className="card__header">
          <span className="card__title" style={{ color: 'var(--error)' }}>Session & Security</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Sign Out</div>
            <div style={{ fontSize: 13, color: 'var(--on-surface-variant)', marginTop: 2 }}>
              End your active session on this device.
            </div>
          </div>
          <button className="btn btn--danger btn--sm" onClick={logout}>
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}

/* ─── Preferences Section ─── */
function PreferencesSection() {
  const [prefs, setPrefs] = useState({
    leaderboardPublic: true,
    emailAlerts: false,
    syncNotifications: true,
  });

  return (
    <div className="card fade-in stagger-1">
      <div className="card__header">
        <span className="card__title">Platform Preferences</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Public Leaderboard Visibility</div>
            <div style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginTop: 2 }}>Display your developer profile and tier rank on public leaderboards.</div>
          </div>
          <input
            type="checkbox"
            checked={prefs.leaderboardPublic}
            onChange={e => setPrefs(p => ({ ...p, leaderboardPublic: e.target.checked }))}
            style={{ width: 18, height: 18, accentColor: '#81ecff', cursor: 'pointer' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Weekly Contribution Digests</div>
            <div style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginTop: 2 }}>Receive an email summary of commits, PR reviews, and score changes.</div>
          </div>
          <input
            type="checkbox"
            checked={prefs.emailAlerts}
            onChange={e => setPrefs(p => ({ ...p, emailAlerts: e.target.checked }))}
            style={{ width: 18, height: 18, accentColor: '#81ecff', cursor: 'pointer' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Real-Time Sync Notifications</div>
            <div style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginTop: 2 }}>Notify when GitHub webhooks successfully update your ranking stats.</div>
          </div>
          <input
            type="checkbox"
            checked={prefs.syncNotifications}
            onChange={e => setPrefs(p => ({ ...p, syncNotifications: e.target.checked }))}
            style={{ width: 18, height: 18, accentColor: '#81ecff', cursor: 'pointer' }}
          />
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const { user, logout, updateUser } = useAuth();
  const [tab, setTab] = useState('profile');

  const TABS = [
    { id: 'profile', label: '👤 Profile' },
    { id: 'account', label: '🔗 Account & Integrations' },
    { id: 'preferences', label: '⚙️ Preferences' },
  ];

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1 className="page-header__title">Settings</h1>
        <p className="page-header__subtitle">
          Manage your GitTracker developer account and connected services
        </p>
      </div>

      <div style={{
        display: 'flex', gap: 6, marginBottom: 24, flexWrap: 'wrap',
        borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 0,
      }}>
        {TABS.map(t => (
          <Tab key={t.id} active={tab === t.id} onClick={() => setTab(t.id)}>{t.label}</Tab>
        ))}
      </div>

      <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr' }}>
        {tab === 'profile' && <ProfileSection user={user} updateUser={updateUser} />}
        {tab === 'account' && <AccountSection user={user} logout={logout} updateUser={updateUser} />}
        {tab === 'preferences' && <PreferencesSection />}
      </div>
    </div>
  );
}
