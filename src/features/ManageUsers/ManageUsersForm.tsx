'use client'

import { useState } from 'react'
import { UserFormModal } from '@/components/UserFormModal'
import { createUser, updateUser } from "@/app/_actions/users"
import { User } from '@/lib/types'
interface ManageUsersFormProps {
  users: User[]
}

export function ManageUsersForm({ users }: ManageUsersFormProps) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  return (
    <div className="mx-auto bg-white dark:bg-slate-950 p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">User Management</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Add New User
        </button>
      </div>

      {showAddModal && (
        <UserFormModal 
          action={createUser}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {editingUser && (
        <UserFormModal 
          action={updateUser}
          user={editingUser}
          onClose={() => setEditingUser(null)}
        />
      )}

      <div className="bg-white dark:bg-slate-950 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
          <thead className="bg-gray-50 dark:bg-slate-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-950 divide-y divide-gray-200 dark:divide-slate-700">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-slate-900">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-slate-100">
                  {user.name || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-slate-100">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${user.role === 'ADMIN' 
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200' 
                      : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-slate-400">
                  <button 
                    onClick={() => setEditingUser(user)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 font-medium"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 