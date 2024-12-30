import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Profile } from '../types/database';
import { User } from '@supabase/supabase-js';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProfileFormProps {
  user: User;
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    getProfile();
  }, [user.id]);

  async function getProfile() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, full_name, avatar_url')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        setUsername(data.username || '');
        setFullName(data.full_name || '');
        setAvatarUrl(data.avatar_url || '');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    try {
      setLoading(true);
      const updates = {
        id: user.id,
        username,
        full_name: fullName,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateProfile();
        }}
        className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
            type="text"
            value={user.email}
            disabled
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
            Full Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="avatar">
            Avatar URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="avatar"
            type="url"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-center"
            type="submit"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Update Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}