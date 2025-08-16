import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor';
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Demo users - In production, this would be handled by your backend
  const demoUsers = [
    {
      id: '1',
      email: 'admin@mdrrmo.gov.ph',
      password: 'admin123',
      username: 'admin',
      role: 'admin' as const,
      name: 'MDRRMO Administrator'
    },
    {
      id: '2',
      email: 'editor@mdrrmo.gov.ph',
      password: 'editor123',
      username: 'editor',
      role: 'editor' as const,
      name: 'Content Editor'
    }
  ];

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          // Map Supabase user to our user format
          const demoUser = demoUsers.find(u => u.email === session.user.email);
          if (demoUser) {
            setUser({
              id: demoUser.id,
              username: demoUser.username,
              email: demoUser.email,
              role: demoUser.role,
              name: demoUser.name
            });
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Error checking user session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const demoUser = demoUsers.find(u => u.email === session.user.email);
        if (demoUser) {
          setUser({
            id: demoUser.id,
            username: demoUser.username,
            email: demoUser.email,
            role: demoUser.role,
            name: demoUser.name
          });
          setIsAuthenticated(true);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Check demo credentials
      const demoUser = demoUsers.find(u => u.email === email && u.password === password);
      if (!demoUser) {
        return false;
      }

      // Sign in with Supabase (using email as both email and password for demo)
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) {
        // If user doesn't exist, create them
        const { error: signUpError } = await supabase.auth.signUp({
          email: email,
          password: password
        });
        
        if (signUpError) {
          console.error('Auth error:', signUpError);
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};