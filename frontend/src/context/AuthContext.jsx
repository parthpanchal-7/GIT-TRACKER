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
    score: 7850,
    tierRank: 'Gold',
    githubConnected: true,
    githubUsername: 'parthpanchal-7',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    bio: 'CS Undergrad building developer tooling and real-time contribution scoring systems.',
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
    score: 9950,
    tierRank: 'Elite',
    githubConnected: true,
    githubUsername: 'parthpanchal-7',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    bio: 'Platform architect managing campus scoring rubrics, anti-cheat models, and event infrastructure.',
  },
  organizer: {
    _id: 'usr_organizer_mits',
    email: 'hackathon.organizer@mitsgwalior.in',
    name: 'MITS Hackathon Committee',
    role: 'organizer',
    enrollmentId: 'ORG-HACK-2026',
    branch: 'Events & Hackathons',
    year: 4,
    college: 'Madhav Institute of Technology & Science (MITS)',
    score: 8400,
    tierRank: 'Platinum',
    githubConnected: true,
    githubUsername: 'mits-hackathons',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
    bio: 'Official MITS Hackathon coordinating team managing real-time track authenticity and team repos.',
  },
  institution: {
    _id: 'usr_institution_dean',
    email: 'dean.academics@mitsgwalior.in',
    name: 'Dean of Academic Affairs',
    role: 'institution',
    enrollmentId: 'INST-DEAN-ACAD',
    branch: 'Academic Governance',
    year: 4,
    college: 'Madhav Institute of Technology & Science (MITS)',
    score: 8900,
    tierRank: 'Platinum',
    githubConnected: true,
    githubUsername: 'mits-academics',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    bio: 'Campus-wide academic benchmarking and branch cohort telemetry monitor.',
  },
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('gt_token'));
  const [user, setUser] = useState(() => {
    const cached = localStorage.getItem('gt_user');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        return null;
      }
    }
    return null;
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
        // Guarantee admin role assignment for parthpanchal1933@gmail.com
        if (student.email === 'parthpanchal1933@gmail.com') {
          student.role = 'admin';
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
        setUser(null);
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
  const completeOAuthLogin = useCallback((newToken, userData) => {
    if (userData.email === 'parthpanchal1933@gmail.com') {
      userData.role = 'admin';
    } else if (userData.email === 'parthpanchal1932@gmail.com') {
      userData.role = 'student';
    }
    localStorage.setItem('gt_token', newToken);
    localStorage.setItem('gt_user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  }, []);

  // Mentor Demo 1-Click Instant POV Switcher
  const switchPOV = useCallback(async (povKey) => {
    const targetProfile = DEMO_POVS[povKey] || DEMO_POVS.student;
    try {
      const res = await authAPI.demoSwitch(povKey);
      if (res.data?.token && res.data?.student) {
        completeOAuthLogin(res.data.token, res.data.student);
        return res.data.student;
      }
    } catch {
      // Offline fallback
    }

    const mockToken = 'mock_jwt_' + povKey + '_' + Date.now();
    completeOAuthLogin(mockToken, targetProfile);
    return targetProfile;
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
      setToken(null);
      setUser(null);
    }
  }, []);

  // Computed role helpers
  const isAdmin = useMemo(() => {
    return user?.role === 'admin' || user?.email === 'parthpanchal1933@gmail.com';
  }, [user]);

  const isStudent = useMemo(() => {
    return user?.role === 'student' || user?.email === 'parthpanchal1932@gmail.com';
  }, [user]);

  const isOrganizer = useMemo(() => {
    return user?.role === 'organizer' || isAdmin;
  }, [user, isAdmin]);

  const isInstitution = useMemo(() => {
    return user?.role === 'institution' || isAdmin;
  }, [user, isAdmin]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        completeOAuthLogin,
        switchPOV,
        updateUser,
        logout,
        refreshUser: fetchUser,
        isAdmin,
        isStudent,
        isOrganizer,
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
