import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://gffzzhbvqorepaycpcqz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmZnp6aGJ2cW9yZXBheWNwY3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NTY2NDksImV4cCI6MjA5ODEzMjY0OX0.whvGvJMzJ-JCV0fhE8xfb9mAO4JuWZgMEVydXvpPE7I';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
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
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
    };
  };
}
