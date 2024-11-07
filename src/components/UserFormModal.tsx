'use client'

import { useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { Role } from '@/lib/types'

type User = {
  id: string
  email: string
  name: string | null
  role: string
}

type UserFormModalProps = {
  action: (formData: FormData) => Promise<{ success?: boolean; error?: string }>
  user?: User | null
  onClose: () => void
}

export function UserFormModal({ action, user = null, onClose }: UserFormModalProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const { pending } = useFormStatus()

  const handleSubmit = async (formData: FormData) => {
    const result = await action(formData)
    if (result.success) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">
          {user ? 'Edit User' : 'Add New User'}
        </h2>
        
        <form ref={formRef} action={handleSubmit}>
          {user && <input type="hidden" name="id" value={user.id} />}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue={user?.email || ''}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={user?.name || ''}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            
            {!user && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                name="role"
                defaultValue={user?.role || Role.USER}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              >
                {Object.values(Role).map((role) => (
                  <option key={role} value={role}>
                    {role.charAt(0) + role.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={pending}
            >
              {pending ? 'Submitting...' : user ? 'Update User' : 'Add User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 