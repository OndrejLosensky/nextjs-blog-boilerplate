// Rename this file to UserForm.tsx
import { Role } from '@/lib/types'
import { UserFormContent } from './UserFormContent'

type User = {
  id: string
  email: string
  name: string | null
  role: string
}

type UserFormProps = {
  action: (formData: FormData) => Promise<{ success?: boolean; error?: string }>
  user?: User | null
  onClose: () => void
}

export function UserForm({ action, user = null, onClose }: UserFormProps) {
  return (
    <div className="w-full bg-white border rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            {user ? 'Edit User' : 'Add New User'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
        
        <UserFormContent 
          action={action}
          user={user}
          onClose={onClose}
          roles={Object.values(Role)}
        />
      </div>
    </div>
  )
} 