import { createContext, useContext, useEffect, useState, ReactNode } from 'react';


interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  coreDomain: string;
  coreSkills: string[];
  supportingSkills?: string[];
  commonSkills?: string[];
}

interface AuthContextType {
  user: UserType | null;
  token: string | null;
  loading: boolean;
  signUp: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    country: string,
    coreDomain: string,
    coreSkills: string[],
    supportingSkills?: string[],
    commonSkills?: string[]
  ) => Promise<{ error: string | null }>;

  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: string | null }>;

  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/users';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storeUser = localStorage.getItem('user');
    const storeToken = localStorage.getItem('token');

    if(storeUser && storeToken) {
      setUser(JSON.parse(storeUser));
      setToken(storeToken);
    }
    setLoading(false);
  }, []);



  const signUp = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    country: string,
    coreDomain: string,
    coreSkills: string[],
    supportingSkills?: string[],
    commonSkills?: string[]
  ) => {
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          country,
          coreDomain,
          coreSkills,
          supportingSkills,
          commonSkills,
        })
      });

      const data = await res.json();
      if(!res.ok) return { error: data.message || 'Registration failed.'};

      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setToken(data.token);

      return { error: null };

    } catch (err: unknown) {
      if(err instanceof Error) {
        return { error: err.message };
      }
      return {error: 'An unexpected error occurred.'}
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if(!res.ok) return { error: data.message || 'Login failed.'};

      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setToken(data.token);

      return { error: null };

    } catch (err: unknown) {
      if(err instanceof Error) {
        return {error: err.message}
      }
      return {error: 'An unexpected error occurred.'}

    }
  }

  const signOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };


  return (
    <AuthContext.Provider value={{ user, token, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
