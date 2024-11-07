import { getSession } from '@/lib/sessions'
import { redirect } from 'next/navigation'
import { DashboardNav } from '@/components/DashboardNav'

// Add type definition
type User = {
  id: string
  name: string | null
  email: string
  password: string
  role: string
  createdAt: Date
  updatedAt: Date
}

type SessionPayload = {
  user?: User | null
}

export default async function SettingsPage() {
  const session = await getSession()
  
  if (!session) {
    redirect('/login')
  }

  const typedSession = session as SessionPayload
  
  if (!typedSession.user) {
    redirect('/login')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardNav user={typedSession.user} />
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <div className="space-y-6">
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input 
                  type="text" 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  defaultValue={typedSession.user.name || ''}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input 
                  type="email" 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  defaultValue={typedSession.user.email || ''}
                  disabled
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="emailNotifications"
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                />
                <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-900">
                  Receive email notifications
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button 
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}