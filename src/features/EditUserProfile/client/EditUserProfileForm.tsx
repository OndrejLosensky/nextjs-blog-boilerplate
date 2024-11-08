'use client'

import { useRef, useState } from 'react'
import { SubmitButton } from '@/components/SubmitButton'
import { updateProfile } from '../server/actions'
import { useRouter } from 'next/navigation'
import { User } from '@/lib/types'

export function EditUserProfileForm({ user }: { user: User }) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setError(null)
    const result = await updateProfile(formData)
    
    if (result.success) {
      router.refresh()
    } else if (result.error) {
      setError(result.error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-4 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      
      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      <form ref={formRef} action={handleSubmit}>
        <input type="hidden" name="id" value={user.id} />
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              defaultValue={user.email}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={user.name || ''}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Password (required for changes)
            </label>
            <input
              type="password"
              name="currentPassword"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password (optional)
            </label>
            <input
              type="password"
              name="newPassword"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => formRef.current?.reset()}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Reset
            </button>
            <SubmitButton
              defaultText="Update Profile"
              loadingText="Updating..."
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            />
          </div>
        </div>
      </form>
    </div>
  )
} 