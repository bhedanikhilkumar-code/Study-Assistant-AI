import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { User } from '../types';

const SESSION_KEY = 'study-assistant-demo-session';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  loginAsUser: () => void;
  loginAsAdmin: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const DEMO_USER: User = {
  id: 'user-1',
  name: 'Demo Student',
  email: 'student@example.com',
  role: 'user',
};

const DEMO_ADMIN: User = {
  id: 'admin-1',
  name: 'Demo Admin',
  email: 'admin@example.com',
  role: 'admin',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) {
      setUser(JSON.parse(saved) as User);
    }
  }, []);

  const setSession = (nextUser: User | null) => {
    setUser(nextUser);
    if (nextUser) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(nextUser));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      loginAsUser: () => setSession(DEMO_USER),
      loginAsAdmin: () => setSession(DEMO_ADMIN),
      logout: () => setSession(null),
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used inside AuthProvider');
  }
  return context;
}
