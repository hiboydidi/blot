export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  updated_at: string;
  created_at: string;
}

export interface AuthError {
  message: string;
}