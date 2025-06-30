import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  name: string;
  email: string;
  ikigai: string;
  skills: string[];
  interests: string[];
  intent: 'cofounder' | 'client' | 'teammate';
  portfolio_url?: string;
  linkedin?: string;
  twitter?: string;
  working_style: string;
  availability: string;
  created_at: string;
};

export type Message = {
  id: string;
  from_email: string;
  to_email: string;
  message: string;
  timestamp: string;
};