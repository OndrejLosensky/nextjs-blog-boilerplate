'use client'

import { useUser } from "@/lib/context/user"

export default function DashboardPage() {
  const user = useUser()
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {user.role === 'ADMIN' ? (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Admin Controls</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Manage Users
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                System Settings
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">User Information</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Role:</span> {user.role}</p>
              {user.name && <p><span className="font-medium">Name:</span> {user.name}</p>}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Role:</span> {user.role}</p>
            {user.name && <p><span className="font-medium">Name:</span> {user.name}</p>}
          </div>
        </div>
      )}
    </div>
  )
}