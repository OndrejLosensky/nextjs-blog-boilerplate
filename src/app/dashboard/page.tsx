'use client'

import { useUser } from "@/lib/context/user"
import { FiUsers, FiDollarSign, FiBarChart2, FiActivity } from 'react-icons/fi'

export default function DashboardPage() {
  const user = useUser()
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {user.role === 'ADMIN' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Total Users</p>
                  <h3 className="text-2xl font-bold">1,482</h3>
                </div>
                <FiUsers className="text-blue-500 text-2xl" />
              </div>
              <p className="text-green-500 text-sm mt-2">↑ 12% from last month</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Revenue</p>
                  <h3 className="text-2xl font-bold">$23,482</h3>
                </div>
                <FiDollarSign className="text-green-500 text-2xl" />
              </div>
              <p className="text-green-500 text-sm mt-2">↑ 8% from last month</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Active Projects</p>
                  <h3 className="text-2xl font-bold">32</h3>
                </div>
                <FiBarChart2 className="text-purple-500 text-2xl" />
              </div>
              <p className="text-red-500 text-sm mt-2">↓ 2% from last month</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Task Completion</p>
                  <h3 className="text-2xl font-bold">78%</h3>
                </div>
                <FiActivity className="text-orange-500 text-2xl" />
              </div>
              <p className="text-green-500 text-sm mt-2">↑ 5% from last month</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
              <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                <p className="text-gray-400">Chart Placeholder</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { text: "New user registration", time: "2 minutes ago" },
                  { text: "Project 'X' completed", time: "1 hour ago" },
                  { text: "Server maintenance", time: "3 hours ago" },
                  { text: "System update", time: "5 hours ago" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                    <p className="text-sm text-gray-600">{activity.text}</p>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Manage Users
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Create Project
              </button>
              <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                View Reports
              </button>
              <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                System Settings
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Your Activity</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Tasks Completed:</span> 12</p>
                <p><span className="font-medium">Active Projects:</span> 3</p>
                <p><span className="font-medium">Hours Logged:</span> 24h</p>
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
        </div>
      )}
    </div>
  )
}