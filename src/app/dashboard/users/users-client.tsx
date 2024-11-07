'use client'

import { useState } from 'react'
import { UserFormModal } from '@/components/UserFormModal'
import { createUser, updateUser } from "@/app/actions/users"

type User = {
  id: string
  email: string
  name: string | null
  role: string
  createdAt: Date
}

export function UsersClient({ users }: { users: User[] }) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
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

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          {/* ... table header ... */}
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button 
                    onClick={() => setEditingUser(user)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </button>
               
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
} 