import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

/* ── Dummy user database ── */
const DEMO_USERS = [
  {
    _id: '1', name: 'Admin User', email: 'admin@gmail.com', password: '1211',
    role: 'admin', enrollmentId: '0901CS211001', branch: 'Computer Science',
    year: '3', semester: '6', mobile: '+91 9876543210',
    githubUsername: 'admin-dev', githubConnected: true,
    avatar: null, tierRank: 'Elite', score: 8420,
    linkedin: '', college: '', dob: '', bio: '',
  },
  {
    _id: '2', name: 'Arjun Singh', email: 'arjun@example.com', password: 'pass',
    role: 'student', enrollmentId: '0901CS211002', branch: 'Computer Science',
    year: '3', semester: '6', mobile: '+91 9876543211',
    githubUsername: 'arjun-codes', githubConnected: true,
    avatar: null, tierRank: 'Platinum', score: 6210,
    linkedin: '', college: '', dob: '', bio: '',
  },
  {
    _id: '3', name: 'Priya Mehta', email: 'priya@example.com', password: 'pass',
    role: 'student', enrollmentId: '0901EC211003', branch: 'Electronics',
    year: '2', semester: '4', mobile: '+91 9876543212',
    githubUsername: 'priya-m', githubConnected: true,
    avatar: null, tierRank: 'Gold', score: 4850,
    linkedin: '', college: '', dob: '', bio: '',
  },
  {
    _id: '4', name: 'Rahul Kumar', email: 'rahul@example.com', password: 'pass',
    role: 'student', enrollmentId: '0901CS211004', branch: 'Computer Science',
    year: '4', semester: '8', mobile: '+91 9876543213',
    githubUsername: 'rahulk-dev', githubConnected: true,
    avatar: null, tierRank: 'Gold', score: 4230,
    linkedin: '', college: '', dob: '', bio: '',
  },
  {
    _id: '5', name: 'Sneha Patel', email: 'sneha@example.com', password: 'pass',
    role: 'student', enrollmentId: '0901IT211005', branch: 'Information Technology',
    year: '2', semester: '3', mobile: '+91 9876543214',
    githubUsername: 'sneha-p', githubConnected: true,
    avatar: null, tierRank: 'Silver', score: 2710,
    linkedin: '', college: '', dob: '', bio: '',
  },
  {
    _id: '6', name: 'Vikram Joshi', email: 'vikram@example.com', password: 'pass',
    role: 'student', enrollmentId: '0901CS211006', branch: 'Computer Science',
    year: '1', semester: '2', mobile: '+91 9876543215',
    githubUsername: 'vik-j', githubConnected: false,
    avatar: null, tierRank: 'Bronze', score: 980,
    linkedin: '', college: '', dob: '', bio: '',
  },
];

const INITIAL_LOGS = [
  { id: 1, timestamp: Date.now() - 3600000 * 5, user: 'system', action: 'Platform started', detail: 'GitTracker v2.1 initialized', level: 'info' },
  { id: 2, timestamp: Date.now() - 3600000 * 4, user: 'admin@gmail.com', action: 'Login', detail: 'Admin logged in via email', level: 'info' },
  { id: 3, timestamp: Date.now() - 3600000 * 3, user: 'system', action: 'GitHub Sync', detail: 'Synced 6 user profiles', level: 'info' },
  { id: 4, timestamp: Date.now() - 3600000 * 2, user: 'arjun@example.com', action: 'Profile Update', detail: 'Updated LinkedIn URL', level: 'info' },
  { id: 5, timestamp: Date.now() - 3600000, user: 'system', action: 'Anti-Cheat Scan', detail: 'No suspicious activity detected', level: 'info' },
  { id: 6, timestamp: Date.now() - 1800000, user: 'system', action: 'Score Recalc', detail: 'Recalculated scores for 6 users', level: 'info' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('gt_demo_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [allUsers, setAllUsers] = useState(() => {
    const saved = localStorage.getItem('gt_demo_users');
    return saved ? JSON.parse(saved) : [...DEMO_USERS];
  });
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const loading = false; // no async loading needed

  const addLog = useCallback((action, detail, level = 'info') => {
    setLogs(prev => [...prev, {
      id: Date.now(),
      timestamp: Date.now(),
      user: user?.email || 'system',
      action,
      detail,
      level,
    }]);
  }, [user]);

  const login = useCallback((email, password) => {
    const found = allUsers.find(u => u.email === email && u.password === password);
    if (!found) return { success: false, error: 'Invalid email or password' };
    const { password: _, ...safeUser } = found;
    localStorage.setItem('gt_demo_user', JSON.stringify(safeUser));
    setUser(safeUser);
    return { success: true };
  }, [allUsers]);

  const logout = useCallback(() => {
    localStorage.removeItem('gt_demo_user');
    setUser(null);
  }, []);

  const updateUser = useCallback((updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('gt_demo_user', JSON.stringify(updated));
      setAllUsers(prev2 => {
        const next = prev2.map(u => u._id === updated._id ? { ...u, ...updates } : u);
        localStorage.setItem('gt_demo_users', JSON.stringify(next));
        return next;
      });
      addLog('Profile Update', `Updated profile fields`);
      return updated;
    });
  }, [addLog]);

  const deleteUser = useCallback((id) => {
    setAllUsers(prev => {
      const next = prev.filter(u => u._id !== id);
      localStorage.setItem('gt_demo_users', JSON.stringify(next));
      return next;
    });
    addLog('User Deleted', `Removed user ID ${id}`, 'warn');
  }, [addLog]);

  const promoteUser = useCallback((id) => {
    setAllUsers(prev => {
      const next = prev.map(u =>
        u._id === id ? { ...u, role: u.role === 'admin' ? 'student' : 'admin' } : u
      );
      localStorage.setItem('gt_demo_users', JSON.stringify(next));
      return next;
    });
    addLog('Role Changed', `Toggled role for user ID ${id}`);
  }, [addLog]);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      updateUser,
      users: allUsers,
      deleteUser,
      promoteUser,
      logs,
      addLog,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
