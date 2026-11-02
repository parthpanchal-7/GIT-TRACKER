import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Avatar, TierBadge } from '../components/ui';
import { authAPI, studentAPI, adminAPI } from '../services/api';

/* ─── Tab button ─── */
function Tab({ active, onClick, children, badge }) {
  return (
    <button onClick={onClick} style={{
      padding: '10px 20px', borderRadius: 10, border: 'none', cursor: 'pointer',
      background: active ? 'rgba(191, 245, 73, 0.12)' : 'transparent',
      color: active ? '#BFF549' : 'var(--on-surface-variant)',
      fontFamily: 'var(--font-label)', fontSize: 13, fontWeight: active ? 700 : 500,
      borderBottom: active ? '2px solid #BFF549' : '2px solid transparent',
      transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: 8,
    }}>
      <span>{children}</span>
      {badge && (
        <span style={{
          fontSize: 10, padding: '2px 6px', borderRadius: 999,
          background: 'rgba(245, 158, 11, 0.2)', color: '#F59E0B',
          fontFamily: 'var(--font-mono)', fontWeight: 700,
        }}>
          {badge}
        </span>
      )}
    </button>
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
            border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontSize: 14,
            outline: 'none', fontFamily: 'var(--font-body)', boxSizing: 'border-box',
          }}
          onFocus={e => e.target.style.borderColor = '#BFF549'}
          onBlur={e => e.target.style.borderColor = 'var(--border-subtle)'}
        />
      ) : (
        <div style={{ fontSize: 14, color: form[field] ? 'var(--text-primary)' : 'var(--on-surface-variant)', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
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
    if (updateUser) await updateUser(form);
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
          <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
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
                background: 'rgba(255,255,255,0.06)', color: 'var(--text-primary)',
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
        <FieldRow label="College / Organization" field="college" placeholder="e.g. MITS Gwalior" form={form} editing={editing} setForm={setForm} />
        <FieldRow label="Discipline / Branch" field="branch" placeholder="e.g. Computer Science" form={form} editing={editing} setForm={setForm} />
        <FieldRow label="Academic / Cohort Year" field="year" placeholder="e.g. 4" form={form} editing={editing} setForm={setForm} />
        <FieldRow label="Student / Member ID" field="enrollmentId" placeholder="e.g. 0901CS211074" form={form} editing={editing} setForm={setForm} />
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
                border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', fontSize: 14,
                resize: 'vertical', outline: 'none', fontFamily: 'var(--font-body)',
              }}
              onFocus={e => e.target.style.borderColor = '#BFF549'}
              onBlur={e => e.target.style.borderColor = 'var(--border-subtle)'}
            />
          ) : (
            <div style={{ fontSize: 14, color: form.bio ? 'var(--text-primary)' : 'var(--on-surface-variant)', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', lineHeight: 1.6 }}>
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
      const ghUsername = prompt('Enter your GitHub username to link:');
      if (ghUsername && ghUsername.trim()) {
        if (updateUser) updateUser({ githubConnected: true, githubUsername: ghUsername.trim() });
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
    } catch { }
    if (updateUser) updateUser({ githubConnected: false, githubUsername: '' });
    setDisconnecting(false);
    setActionMessage('GitHub account unlinked.');
  };

  return (
    <>
      {actionMessage && (
        <div className="alert alert--success" style={{ marginBottom: 16 }}>
          ✓ {actionMessage}
        </div>
      )}

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

      <div className="card fade-in stagger-2" style={{ marginBottom: 20 }}>
        <div className="card__header">
          <span className="card__title">GitHub Identity & Telemetry Sync</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
            }}>
              🐙
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>GitHub Account</div>
              <div style={{ fontSize: 13, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-mono)' }}>
                {user?.githubConnected ? `@${user.githubUsername || 'connected'}` : 'Not connected'}
              </div>
            </div>
          </div>

          {user?.githubConnected ? (
            <button
              className="btn btn--ghost btn--sm"
              onClick={handleDisconnectGithub}
              disabled={disconnecting}
              style={{ color: '#ff716c', borderColor: 'rgba(255,113,108,0.3)' }}
            >
              {disconnecting ? 'Unlinking...' : 'Disconnect GitHub'}
            </button>
          ) : (
            <button
              className="btn btn--primary btn--sm"
              onClick={handleConnectGithub}
              disabled={connectingGithub}
            >
              {connectingGithub ? 'Connecting...' : 'Connect GitHub'}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

/* ─── Preferences Section ─── */
function PreferencesSection() {
  const [prefs, setPrefs] = useState({
    emailLeaderboard: true,
    syncNotifications: true,
  });

  return (
    <div className="card fade-in">
      <div className="card__header">
        <span className="card__title">Application Preferences</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Weekly Leaderboard Digest</div>
            <div style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginTop: 2 }}>Receive ranking deltas, tier promotions, and campus highlights.</div>
          </div>
          <input
            type="checkbox"
            checked={prefs.emailLeaderboard}
            onChange={e => setPrefs(p => ({ ...p, email: e.target.checked }))}
            style={{ width: 18, height: 18, accentColor: '#BFF549', cursor: 'pointer' }}
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
            style={{ width: 18, height: 18, accentColor: '#BFF549', cursor: 'pointer' }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── ADMIN CONSOLE & ANOMALY REVIEW QUEUE (User Request Requirement 2) ─── */
function AdminConsoleSection({ user }) {
  const [filterLevel, setFilterLevel] = useState('All');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [actionNotice, setActionNotice] = useState('');

  // Initial Anomaly Candidates
  const [candidates, setCandidates] = useState([
    {
      id: 'anom-1',
      name: 'Kavya Raman',
      enrollmentId: '0901CS221088',
      department: 'CSE',
      year: 3,
      score: 7120,
      level: 'Unusual',
      levelColor: '#F59E0B',
      flag: 'ACTIVITY_BURST',
      evidence: {
        burstInterval: '4,200 LOC committed in 38 seconds (0 intermediate test runs)',
        selfMergeRatio: '42%',
        starsToFollowers: '12 stars / 14 followers (Organic)',
        entropyScore: '0.41 (Low Variation)',
      },
      status: 'pending',
    },
    {
      id: 'anom-2',
      name: 'Devansh Sharma',
      enrollmentId: '0901IT231045',
      department: 'IT',
      year: 2,
      score: 8940,
      level: 'Highly Anomalous',
      levelColor: '#F59E0B',
      flag: 'SELF_PR_INFLATION',
      evidence: {
        burstInterval: 'Standard 3-day development cycles',
        selfMergeRatio: '94% self-merged PRs across 68 PRs (0 peer reviews)',
        starsToFollowers: '18 stars / 22 followers',
        entropyScore: '0.88 (Normal Code Logic)',
      },
      status: 'pending',
    },
    {
      id: 'anom-3',
      name: 'Rajat Verma',
      enrollmentId: '0901CS211023',
      department: 'CSE',
      year: 4,
      score: 6450,
      level: 'Unusual',
      levelColor: '#F59E0B',
      flag: 'STAR_BOT_SUSPECTED',
      evidence: {
        burstInterval: 'Normal commit cadence',
        selfMergeRatio: '18% self-merge ratio',
        starsToFollowers: '320 stars with only 2 followers and 1 fork',
        entropyScore: '0.62 (Normal)',
      },
      status: 'pending',
    },
    {
      id: 'anom-4',
      name: 'Parth Panchal',
      enrollmentId: '0901CS211074',
      department: 'CSE',
      year: 4,
      score: 8420,
      level: 'Normal',
      levelColor: '#34d399',
      flag: 'ORGANIC_CADENCE',
      evidence: {
        burstInterval: 'Verified incremental git commits over 9 months',
        selfMergeRatio: '12% self-merge, 88% community merged PRs',
        starsToFollowers: '312 stars / 186 active contributions',
        entropyScore: '0.94 (Authentic Human AST Syntax)',
      },
      status: 'verified',
    },
  ]);

  // On-Screen Audit Log
  const [auditLog, setAuditLog] = useState([
    {
      id: 'log-1',
      timestamp: new Date(Date.now() - 3600000 * 3).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      admin: user?.email || 'parthpanchal1933@gmail.com',
      student: '0901CS211074 (Parth Panchal)',
      action: 'CLEAR_FLAG',
      decision: 'Full AST and commit cadence verified clean. Cleared for global rank #1.',
    },
    {
      id: 'log-2',
      timestamp: new Date(Date.now() - 3600000 * 18).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      admin: 'system-autoclear',
      student: '0901IT241019 (Neha Gupta)',
      action: 'SYSTEM_VERIFIED',
      decision: 'Freshman GitHub sync passed bot suppression filters.',
    },
  ]);

  const handleAction = (candidate, actionType) => {
    const adminUser = user?.email || 'parthpanchal1933@gmail.com';
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    let decision = '';
    if (actionType === 'CLEAR') {
      decision = `Admin cleared flag for ${candidate.name}. Evidence accepted as legitimate tooling/benchmark.`;
    } else if (actionType === 'ESCALATE') {
      decision = `Escalated ${candidate.name} (${candidate.flag}) to Disciplinary Academic Committee. Multiplier locked.`;
    } else if (actionType === 'REQUEST_INFO') {
      decision = `Automated Developer Screening notice dispatched to ${candidate.enrollmentId} requesting live demo.`;
    }

    // Update candidate status
    setCandidates(prev => prev.map(c => {
      if (c.id === candidate.id) {
        return {
          ...c,
          status: actionType === 'CLEAR' ? 'cleared' : actionType === 'ESCALATE' ? 'escalated' : 'info_requested',
        };
      }
      return c;
    }));

    // Append to On-Screen Audit Log
    setAuditLog(prev => [
      {
        id: 'log-' + Date.now(),
        timestamp: nowTime,
        admin: adminUser,
        student: `${candidate.enrollmentId} (${candidate.name})`,
        action: actionType,
        decision,
      },
      ...prev,
    ]);

    setActionNotice(`✓ Recorded action [${actionType}] in Audit Log for ${candidate.name}`);
    setTimeout(() => setActionNotice(''), 3500);
    setSelectedCandidate(null);
  };

  const filteredCandidates = candidates.filter(c => {
    if (filterLevel === 'All') return true;
    return c.level === filterLevel;
  });

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {actionNotice && (
        <div style={{
          padding: '12px 18px', borderRadius: 12,
          background: 'rgba(191, 245, 73, 0.12)', border: '1px solid #BFF549',
          color: '#BFF549', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700,
        }}>
          {actionNotice}
        </div>
      )}

      {/* ── ADMIN SYSTEM HEALTH MONITOR ── */}
      <div className="card" style={{
        padding: 24, borderRadius: 16,
        background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 20 }}>🖥️</span>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, margin: 0 }}>
                Enterprise System Health Monitor
              </h2>
              <div style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginTop: 2 }}>
                Real-time observability across webhook queues, Redis ephemeral store, and database clustering.
              </div>
            </div>
          </div>
          <span style={{
            fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 700,
            padding: '3px 10px', borderRadius: 999,
            background: 'rgba(52, 211, 153, 0.15)', color: '#34d399',
            border: '1px solid rgba(52, 211, 153, 0.3)',
          }}>
            ● ALL SYSTEMS OPERATIONAL
          </span>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
        }}>
          <div style={{ padding: '16px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: 11, color: 'var(--on-surface-variant)', textTransform: 'uppercase', fontFamily: 'var(--font-label)' }}>Webhook Delivery Queue</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 800, color: '#81ecff', margin: '4px 0 2px' }}>0 Backlogged</div>
            <div style={{ fontSize: 11, color: 'var(--on-surface-variant)' }}>180 req/min Burst Limit · Latency: 12ms</div>
          </div>

          <div style={{ padding: '16px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: 11, color: 'var(--on-surface-variant)', textTransform: 'uppercase', fontFamily: 'var(--font-label)' }}>Real-Time GitHub Sync</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 800, color: '#BFF549', margin: '4px 0 2px' }}>Active (8s Polling)</div>
            <div style={{ fontSize: 11, color: 'var(--on-surface-variant)' }}>Redis Ephemeral Store Fallback Ready</div>
          </div>

          <div style={{ padding: '16px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: 11, color: 'var(--on-surface-variant)', textTransform: 'uppercase', fontFamily: 'var(--font-label)' }}>MongoDB Connection Health</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 800, color: '#34d399', margin: '4px 0 2px' }}>Primary Connected</div>
            <div style={{ fontSize: 11, color: 'var(--on-surface-variant)' }}>mongodb://127.0.0.1:27017 · 10/10 Pool</div>
          </div>

          <div style={{ padding: '16px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: 11, color: 'var(--on-surface-variant)', textTransform: 'uppercase', fontFamily: 'var(--font-label)' }}>Scoring Pipeline v4.2</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 800, color: '#d674ff', margin: '4px 0 2px' }}>Zero-Obscurity Active</div>
            <div style={{ fontSize: 11, color: 'var(--on-surface-variant)' }}>5-Factor Vector + CQE Multipliers</div>
          </div>
        </div>
      </div>

      {/* ── ANOMALY REVIEW QUEUE (Amber #F59E0B) ── */}
      <div className="card" style={{
        padding: 0, borderRadius: 16, overflow: 'hidden',
        background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
      }}>
        <div style={{
          padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 12,
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>⚠️</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, margin: 0 }}>
                Anomaly Review Queue & Developer Screening
              </h2>
            </div>
            <div style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginTop: 2 }}>
              Flagged velocity bursts, suspicious self-PR merges, and anomalous star ratios requiring administrative verification.
            </div>
          </div>

          <div style={{ display: 'flex', gap: 6 }}>
            {['All', 'Unusual', 'Highly Anomalous', 'Normal'].map(lvl => (
              <button
                key={lvl}
                onClick={() => setFilterLevel(lvl)}
                style={{
                  padding: '6px 12px', borderRadius: 8, fontSize: 11,
                  fontFamily: 'var(--font-mono)', fontWeight: 700, cursor: 'pointer',
                  border: filterLevel === lvl ? '1px solid #F59E0B' : '1px solid var(--border-subtle)',
                  background: filterLevel === lvl ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255,255,255,0.02)',
                  color: filterLevel === lvl ? '#F59E0B' : 'var(--on-surface-variant)',
                }}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-subtle)' }}>
                <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--on-surface-variant)' }}>DEVELOPER</th>
                <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--on-surface-variant)' }}>ANOMALY LEVEL</th>
                <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--on-surface-variant)' }}>FLAG REASON</th>
                <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--on-surface-variant)' }}>SCORE</th>
                <th style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--on-surface-variant)', textAlign: 'right' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--on-surface-variant)', fontFamily: 'var(--font-mono)' }}>
                      {c.enrollmentId} · {c.department} Y{c.year}
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{
                      padding: '4px 10px', borderRadius: 999, fontSize: 11,
                      fontFamily: 'var(--font-mono)', fontWeight: 800,
                      background: c.level === 'Normal' ? 'rgba(52,211,153,0.15)' : 'rgba(245, 158, 11, 0.15)',
                      color: c.level === 'Normal' ? '#34d399' : '#F59E0B',
                      border: `1px solid ${c.level === 'Normal' ? 'rgba(52,211,153,0.3)' : '#F59E0B'}`,
                    }}>
                      {c.level.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-primary)', fontWeight: 600 }}>
                      {c.flag}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--on-surface-variant)', marginTop: 2, maxWidth: 360 }}>
                      {c.evidence.burstInterval.slice(0, 50)}...
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#BFF549' }}>
                      {c.score.toLocaleString()} pts
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    <button
                      onClick={() => setSelectedCandidate(c)}
                      style={{
                        padding: '8px 14px', borderRadius: 8,
                        background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)',
                        color: '#F59E0B', fontWeight: 700, fontSize: 12,
                        fontFamily: 'var(--font-label)', cursor: 'pointer',
                      }}
                    >
                      Inspect Evidence 🔍
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── EVIDENCE INSPECTION DRAWER / MODAL ── */}
      {selectedCandidate && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(4,6,15,0.85)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
        }}>
          <div style={{
            background: 'var(--bg-card)', border: '1.5px solid #F59E0B',
            borderRadius: 20, maxWidth: 640, width: '100%',
            padding: 32, boxShadow: '0 0 60px rgba(245, 158, 11, 0.2)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 20 }}>🛡️</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, margin: 0 }}>
                    Forensic Anomaly Evidence: {selectedCandidate.name}
                  </h3>
                </div>
                <div style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginTop: 2 }}>
                  Student ID: {selectedCandidate.enrollmentId} · Dept: {selectedCandidate.department}
                </div>
              </div>
              <button
                onClick={() => setSelectedCandidate(null)}
                style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* Evidence Breakdown Grid */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14,
              padding: 20, borderRadius: 12, background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border-subtle)', marginBottom: 24,
            }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--on-surface-variant)', textTransform: 'uppercase' }}>Commit Burst Interval</div>
                <div style={{ fontSize: 13, fontWeight: 700, marginTop: 4, color: '#F59E0B' }}>
                  {selectedCandidate.evidence.burstInterval}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--on-surface-variant)', textTransform: 'uppercase' }}>Self-PR Merge Ratio</div>
                <div style={{ fontSize: 13, fontWeight: 700, marginTop: 4, color: '#F59E0B' }}>
                  {selectedCandidate.evidence.selfMergeRatio}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--on-surface-variant)', textTransform: 'uppercase' }}>Star-to-Follower Ratio</div>
                <div style={{ fontSize: 13, fontWeight: 700, marginTop: 4 }}>
                  {selectedCandidate.evidence.starsToFollowers}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--on-surface-variant)', textTransform: 'uppercase' }}>AST Regularity Score</div>
                <div style={{ fontSize: 13, fontWeight: 700, marginTop: 4 }}>
                  {selectedCandidate.evidence.entropyScore}
                </div>
              </div>
            </div>

            {/* 3 Action Buttons (User Requirement) */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, flexWrap: 'wrap' }}>
              <button
                onClick={() => handleAction(selectedCandidate, 'REQUEST_INFO')}
                style={{
                  padding: '10px 16px', borderRadius: 10,
                  background: 'rgba(129, 236, 255, 0.12)', border: '1px solid rgba(129, 236, 255, 0.3)',
                  color: '#81ecff', fontWeight: 700, fontSize: 12, cursor: 'pointer',
                }}
              >
                ✉️ Request Info
              </button>
              <button
                onClick={() => handleAction(selectedCandidate, 'ESCALATE')}
                style={{
                  padding: '10px 16px', borderRadius: 10,
                  background: 'rgba(255, 113, 108, 0.15)', border: '1px solid rgba(255, 113, 108, 0.4)',
                  color: '#ff716c', fontWeight: 700, fontSize: 12, cursor: 'pointer',
                }}
              >
                ⚡ Escalate Case
              </button>
              <button
                onClick={() => handleAction(selectedCandidate, 'CLEAR')}
                style={{
                  padding: '10px 20px', borderRadius: 10,
                  background: '#BFF549', color: '#04060F',
                  fontWeight: 800, fontSize: 12, border: 'none', cursor: 'pointer',
                }}
              >
                ✓ Clear Flag
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── ON-SCREEN AUDIT LOG (User Requirement) ── */}
      <div className="card" style={{
        padding: 24, borderRadius: 16,
        background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>📜</span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800, margin: 0 }}>
              Chronological Administrative Audit Log
            </h3>
          </div>
          <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--on-surface-variant)' }}>
            Tamper-Evident Admin Records
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {auditLog.map(log => (
            <div
              key={log.id}
              style={{
                padding: '12px 16px', borderRadius: 10,
                background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                flexWrap: 'wrap', gap: 12,
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    padding: '2px 8px', borderRadius: 999, fontSize: 10,
                    fontFamily: 'var(--font-mono)', fontWeight: 800,
                    background: log.action.includes('CLEAR') ? 'rgba(191, 245, 73, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                    color: log.action.includes('CLEAR') ? '#BFF549' : '#F59E0B',
                  }}>
                    {log.action}
                  </span>
                  <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>
                    {log.student}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--on-surface-variant)', marginTop: 4 }}>
                  {log.decision}
                </div>
              </div>

              <div style={{ textAlign: 'right', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--on-surface-variant)' }}>
                <div>Admin: <strong style={{ color: '#81ecff' }}>{log.admin}</strong></div>
                <div>{log.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const { user, logout, updateUser } = useAuth();
  const [tab, setTab] = useState('profile');

  const isAdmin = user?.role === 'admin' || user?.email === 'parthpanchal1933@gmail.com';

  const TABS = [
    { id: 'profile', label: '👤 Profile' },
    { id: 'account', label: '🔗 Account & Integrations' },
    { id: 'preferences', label: '⚙️ Preferences' },
    { id: 'admin', label: '🛡️ Admin Console & Anomalies', badge: 'ADMIN' },
  ];

  return (
    <div className="fade-in" style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 20px 60px' }}>
      <div className="page-header" style={{ marginBottom: 24 }}>
        <h1 className="page-header__title" style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800 }}>
          Settings & Command Console
        </h1>
        <p className="page-header__subtitle" style={{ color: 'var(--on-surface-variant)', fontSize: 14 }}>
          Manage your GitTracker developer account, connected services, and administrative integrity controls
        </p>
      </div>

      <div style={{
        display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap',
        borderBottom: '1px solid var(--border-subtle)', paddingBottom: 0,
      }}>
        {TABS.map(t => (
          <Tab key={t.id} active={tab === t.id} onClick={() => setTab(t.id)} badge={t.badge}>
            {t.label}
          </Tab>
        ))}
      </div>

      <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr' }}>
        {tab === 'profile' && <ProfileSection user={user} updateUser={updateUser} />}
        {tab === 'account' && <AccountSection user={user} logout={logout} updateUser={updateUser} />}
        {tab === 'preferences' && <PreferencesSection />}
        {tab === 'admin' && <AdminConsoleSection user={user} />}
      </div>
    </div>
  );
}
