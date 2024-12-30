import { createClient } from '@supabase/supabase-js';
import { checkSupabaseConfig } from '../utils/supabase-config';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!checkSupabaseConfig()) {
  throw new Error('Please click the "Connect to Supabase" button in the top right corner to set up your database connection.');
}

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);