import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function SupabaseError() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="flex items-center justify-center text-red-500 mb-4">
          <AlertCircle size={48} />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Supabase Connection Error
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Please click the "Connect to Supabase" button in the top right corner to set up your database connection.
        </p>
        <div className="flex justify-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md">
            ↗️ Connect to Supabase
          </div>
        </div>
      </div>
    </div>
  );
}