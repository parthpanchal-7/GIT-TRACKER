import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI, studentAPI } from '../services/api';

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
        setUser(res.data.student);
        localStorage.setItem('gt_user', JSON.stringify(res.data.student));
      }
    } catch (err) {
      // If 401 Unauthorized, token expired
      if (err.response?.status === 401) {
        localStorage.removeItem('gt_token');
        localStorage.removeItem('gt_user');
        setToken(null);
        setUser(null);
      } else {
        // If network error/backend offline, keep cached user session for resilience
        const cached = localStorage.getItem('gt_user');
        if (cached) {
          try {
            setUser(JSON.parse(cached));
          } catch {
            // ignore parse error
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
    localStorage.setItem('gt_token', newToken);
    localStorage.setItem('gt_user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  }, []);

  // Auxiliary fallback for Google sign-in when backend OAuth is in offline development
  const loginWithGoogleMock = useCallback((googleProfile) => {
    const mockToken = 'mock_jwt_' + Math.random().toString(36).substring(2);
    const mockUser = {
      _id: 'usr_' + Date.now(),
      name: googleProfile.name || 'Google Developer',
      email: googleProfile.email || 'developer@gmail.com',
      avatar: googleProfile.avatar || null,
      enrollmentId: (googleProfile.name ? googleProfile.name.replace(/\s+/g, '').slice(0, 8).toUpperCase() : 'DEV') + '2026',
      branch: googleProfile.branch || 'Computer Science',
      year: '3',
      semester: '6',
      mobile: '+91 9876543210',
      githubUsername: googleProfile.githubUsername || '',
      githubConnected: Boolean(googleProfile.githubConnected),
      tierRank: 'Gold',
      score: 4850,
      linkedin: '',
      college: googleProfile.college || 'Engineering Institute',
      dob: '',
      bio: 'Full-stack builder passionate about open source and developer analytics.',
    };
    completeOAuthLogin(mockToken, mockUser);
    return { success: true };
  }, [completeOAuthLogin]);

  // Update profile
  const updateUser = useCallback(async (updates) => {
    // Optimistic UI update
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('gt_user', JSON.stringify(updated));
      return updated;
    });

    // Send update to backend if authenticated
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

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        completeOAuthLogin,
        loginWithGoogleMock,
        updateUser,
        logout,
        refreshUser: fetchUser,
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
