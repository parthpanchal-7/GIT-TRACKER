import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { authAPI, studentAPI } from '../services/api';

export const DEMO_POVS = {
  student: {
    _id: 'usr_student_parth',
    email: 'parthpanchal1932@gmail.com',
    name: 'Parth Panchal',
    role: 'student',
    enrollmentId: 'BTCS24O1089',
    branch: 'Computer Science',
    year: 2,
    college: 'Madhav Institute of Technology & Science (MITS)',
    score: 0,
    tierRank: 'Unranked',
    githubConnected: false,
    githubUsername: '',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    bio: 'CS Undergrad building developer tooling and real-time contribution scoring systems.',
  },
  organizer: {
    _id: 'usr_organizer_mits',
    email: 'parthpanchal1933@gmail.com',
    name: 'Parth Panchal (Organizer & Institute Lead)',
    role: 'organizer',
    enrollmentId: 'ORG-INST-2026',
    branch: 'Events & Academic Governance',
    year: 4,
    college: 'Madhav Institute of Technology & Science (MITS)',
    score: 0,
    tierRank: 'Unranked',
    githubConnected: false,
    githubUsername: '',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
    bio: 'Merged Hackathon Organizer and Institution Dean managing event integrity and cohort telemetry.',
  },
  mentor: {
    _id: 'usr_mentor_sharma',
    email: 'dr.sharma@mits.ac.in',
    name: 'Dr. S. K. Sharma (Senior Technical Mentor)',
    role: 'mentor',
    enrollmentId: 'MTR-TECH-04',
    branch: 'Computer Science & Engineering',
    year: 4,
    college: 'MITS Evaluation Committee',
    score: 0,
    tierRank: 'Unranked',
    githubConnected: false,
    githubUsername: '',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    bio: 'Senior Technical Evaluator inspecting team AST regularity, commit timelines, and rubric scoring.',
  },
  admin: {
    _id: 'usr_admin_parth',
    email: 'parthpanchal1933@gmail.com',
    name: 'Parth Panchal (Lead Admin)',
    role: 'admin',
    enrollmentId: 'ADMIN-SUPER',
    branch: 'System Architecture',
    year: 4,
    college: 'MITS Gwalior / Central Administration',
    score: 0,
    tierRank: 'Unranked',
    githubConnected: false,
    githubUsername: '',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    bio: 'Platform architect managing campus scoring rubrics, anti-cheat models, and event infrastructure.',
  },
  // Backward compatibility alias for institution
  institution: {
    _id: 'usr_organizer_mits',
    email: 'parthpanchal1933@gmail.com',
    name: 'Parth Panchal (Organizer & Institute Lead)',
    role: 'organizer',
    enrollmentId: 'ORG-INST-2026',
    branch: 'Events & Academic Governance',
    year: 4,
    college: 'Madhav Institute of Technology & Science (MITS)',
    score: 0,
    tierRank: 'Unranked',
    githubConnected: false,
    githubUsername: '',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
    bio: 'Merged Hackathon Organizer and Institution Dean managing event integrity and cohort telemetry.',
  },
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('gt_token'));
  const [activePov, setActivePov] = useState(() => localStorage.getItem('gt_active_pov') || 'student');
  const [user, setUser] = useState(() => {
    const cached = localStorage.getItem('gt_user');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        return null;
      }
    }
    return DEMO_POVS.student;
  });
  const [loading, setLoading] = useState(true);

  // Sync with backend session if token is present
  const fetchUser = useCallback(async () => {
    const currentToken = localStorage.getItem('gt_token');
    if (!currentToken) {
      setLoading(false);
      return;
    }

    try {
      const res = await authAPI.me();
      if (res.data?.student) {
        const student = res.data.student;
        if (student.email === 'parthpanchal1933@gmail.com') {
          // If parthpanchal1933@gmail.com, respect the active POV if set to organizer or admin
          const savedPov = localStorage.getItem('gt_active_pov');
          if (savedPov === 'organizer') {
            student.role = 'organizer';
          } else {
            student.role = 'admin';
          }
        } else if (student.email === 'parthpanchal1932@gmail.com') {
          student.role = 'student';
        }
        setUser(student);
        localStorage.setItem('gt_user', JSON.stringify(student));
      }
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('gt_token');
        localStorage.removeItem('gt_user');
        setToken(null);
        setUser(DEMO_POVS.student);
      } else {
        const cached = localStorage.getItem('gt_user');
        if (cached) {
          try {
            setUser(JSON.parse(cached));
          } catch {
            // ignore
          }
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Complete Google OAuth login
  const completeOAuthLogin = useCallback((newToken, userData, povKey = null) => {
    const cleanEmail = (userData.email || '').toLowerCase();
    let assignedRole = userData.role || 'student';
    let targetPov = povKey;

    if (cleanEmail === 'parthpanchal1933@gmail.com') {
      assignedRole = povKey === 'organizer' ? 'organizer' : 'admin';
      targetPov = targetPov || (assignedRole === 'organizer' ? 'organizer' : 'admin');
    } else if (cleanEmail === 'parthpanchal1932@gmail.com') {
      assignedRole = 'student';
      targetPov = 'student';
    } else if (userData.role === 'mentor' || cleanEmail.includes('mentor') || cleanEmail.includes('dr.sharma')) {
      assignedRole = 'mentor';
      targetPov = 'mentor';
    } else {
      targetPov = targetPov || assignedRole;
    }

    const enrichedUser = { ...userData, role: assignedRole };
    localStorage.setItem('gt_token', newToken);
    localStorage.setItem('gt_user', JSON.stringify(enrichedUser));
    if (targetPov) {
      localStorage.setItem('gt_active_pov', targetPov);
      setActivePov(targetPov);
    }

    setToken(newToken);
    setUser(enrichedUser);
  }, []);

  // Demo 1-Click Instant POV Switcher (Student, Organizer & Institute, Mentor, Admin)
  const switchPOV = useCallback(async (povKey) => {
    const resolvedKey = povKey === 'institution' ? 'organizer' : povKey;
    const targetProfile = DEMO_POVS[resolvedKey] || DEMO_POVS.student;
    setActivePov(resolvedKey);
    localStorage.setItem('gt_active_pov', resolvedKey);

    let activeUser = targetProfile;
    try {
      const res = await authAPI.demoSwitch(resolvedKey);
      if (res.data?.token && res.data?.student) {
        completeOAuthLogin(res.data.token, res.data.student, resolvedKey);
        activeUser = res.data.student;
      } else {
        const mockToken = 'mock_jwt_' + resolvedKey + '_' + Date.now();
        completeOAuthLogin(mockToken, targetProfile, resolvedKey);
      }
    } catch {
      const mockToken = 'mock_jwt_' + resolvedKey + '_' + Date.now();
      completeOAuthLogin(mockToken, targetProfile, resolvedKey);
    }

    // Always dispatch global POV switch event so all listening pages reset immediately to zero
    window.dispatchEvent(new CustomEvent('gt_pov_switched', { detail: { pov: resolvedKey, user: activeUser } }));
    return activeUser;
  }, [completeOAuthLogin]);

  // Update profile
  const updateUser = useCallback(async (updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('gt_user', JSON.stringify(updated));
      return updated;
    });

    try {
      const res = await studentAPI.updateProfile(updates);
      if (res.data?.student) {
        setUser(res.data.student);
        localStorage.setItem('gt_user', JSON.stringify(res.data.student));
      }
    } catch (err) {
      console.warn('Profile update saved locally (backend sync skipped)', err.message);
    }
  }, []);

  // Logout
  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } catch {
      // ignore
    } finally {
      localStorage.removeItem('gt_token');
      localStorage.removeItem('gt_user');
      localStorage.removeItem('gt_active_pov');
      setToken(null);
      setUser(null);
    }
  }, []);

  // Computed role helpers based on strict active POV
  const isStudent = useMemo(() => {
    return activePov === 'student' || (!['admin', 'organizer', 'mentor'].includes(activePov) && user?.role === 'student');
  }, [activePov, user]);

  const isOrganizer = useMemo(() => {
    return activePov === 'organizer' || activePov === 'institution' || user?.role === 'organizer';
  }, [activePov, user]);

  const isMentor = useMemo(() => {
    return activePov === 'mentor' || user?.role === 'mentor';
  }, [activePov, user]);

  const isAdmin = useMemo(() => {
    return activePov === 'admin' || user?.role === 'admin';
  }, [activePov, user]);

  const isInstitution = useMemo(() => {
    return isOrganizer || isAdmin;
  }, [isOrganizer, isAdmin]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        activePov,
        completeOAuthLogin,
        switchPOV,
        updateUser,
        logout,
        refreshUser: fetchUser,
        isStudent,
        isOrganizer,
        isMentor,
        isAdmin,
        isInstitution,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
