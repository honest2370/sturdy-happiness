import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface Profile {
  id: string;
  email: string;
  full_name: string;
  username: string;
  phone: string;
  country: string;
  avatar_url: string | null;
  bio: string | null;
  whatsapp: string | null;
  role: 'buyer' | 'seller' | 'admin';
}

interface AuthState {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      profile: null,
      loading: true,

      setUser: (user) => set({ user }),
      
      setProfile: (profile) => set({ profile }),

      signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null, profile: null });
      },

      initialize: async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            set({ user: session.user });
            
            // Fetch profile
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            
            if (profile) {
              set({ profile });
            }
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: 'sellizi-auth',
      partialize: (state) => ({
        user: state.user,
        profile: state.profile,
      }),
    }
  )
);
