import { toast } from 'react-hot-toast';

export const checkSupabaseConfig = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url) {
    console.error('Missing VITE_SUPABASE_URL');
    toast.error('Supabase URL is not configured');
    return false;
  }

  if (!key) {
    console.error('Missing VITE_SUPABASE_ANON_KEY');
    toast.error('Supabase Anonymous Key is not configured');
    return false;
  }

  return true;
};