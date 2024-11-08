'use client'

import { useState } from 'react';
import { useUser } from "@/lib/context/user";

export default function SettingsLayout({
    users,
    userProfile,
    systemPreferences,
  }: {
    users: React.ReactNode;
    userProfile: React.ReactNode;
    systemPreferences: React.ReactNode;
  }) {
    const user = useUser();
    // Set default active tab based on user role
    const [activeTab, setActiveTab] = useState(user.role === 'ADMIN' ? 'users' : 'profile');
    
    return (
      <div className="p-4">
        <div className="flex space-x-4 mb-4">
          {/* Only show Users tab for admin */}         
          <button 
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${
              activeTab === 'profile' 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Profile
          </button>
          <button 
            onClick={() => setActiveTab('system-preferences')}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${
              activeTab === 'system-preferences' 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            System Preferences
          </button>
          {user.role === 'ADMIN' && (
            <button 
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                activeTab === 'users' 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Users
            </button>
          )}
        </div>
        
        <div>
          {activeTab === 'users' 
            ? users 
            : activeTab === 'system-preferences'
              ? systemPreferences
              : userProfile}
        </div>
      </div>
    );
  }