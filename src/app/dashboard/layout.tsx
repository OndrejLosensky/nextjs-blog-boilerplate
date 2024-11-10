import { getUser } from "@/lib/utils/getUser"
import { DashboardSidebar } from "@/components/DashboardSidebar"
import { UserProvider } from "@/lib/context/user"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

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