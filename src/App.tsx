import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { User } from '@supabase/supabase-js';
import AuthForm from './components/AuthForm';
import ProfileForm from './components/ProfileForm';
import SupabaseError from './components/SupabaseError';
import { LogOut } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { checkSupabaseConfig } from './utils/supabase-config';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [supabaseError, setSupabaseError] = useState(!checkSupabaseConfig());

  useEffect(() => {
    if (supabaseError) return;

    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for changes on auth state (sign in, sign out, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabaseError]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (supabaseError) {
    return <SupabaseError />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-800">User Management</h1>
            </div>
            {user && (
              <div className="flex items-center">
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <LogOut className="mr-2" size={20} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center px-4 py-8">
          {user ? <ProfileForm user={user} /> : <AuthForm />}
        </div>
      </main>
    </div>
  );
}

export default App;