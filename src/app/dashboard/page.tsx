import { getSession } from "@/lib/sessions"
import { prisma } from "@/lib/prisma"
import { LogoutButton } from "@/components/LogoutButton"
import { redirect } from 'next/navigation'
import { DashboardNav } from "@/components/DashboardNav"

export default async function DashboardPage() {
  const session = await getSession()
  
  if (!session) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      email: true,
      role: true,
      name: true,
      password: true,
      createdAt: true,
      updatedAt: true,
    }
  })

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="p-6">
      <DashboardNav user={user} />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <LogoutButton />
      </div>
      
      {user.role === 'ADMIN' ? (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Admin Controls</h2>
            <div className="space-y-4">
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