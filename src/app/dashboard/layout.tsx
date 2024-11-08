import { getSession } from "@/lib/sessions"
import { prisma } from "@/lib/prisma"
import { redirect } from 'next/navigation'
import { UserProvider } from "@/lib/context/user"
import { DashboardSidebar } from "@/components/DashboardSidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
    <div className="flex h-screen bg-gray-100"> 
      <DashboardSidebar user={user} />
      <div className="flex-1 overflow-auto">
        <UserProvider user={user}>
          {children}
        </UserProvider>
      </div>
    </div>
  )
} 