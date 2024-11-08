import { getSession } from "@/lib/sessions"
import { redirect } from 'next/navigation'
import { EditUserProfileForm } from "@/features/EditUserProfile/client/EditUserProfileForm"
import { prisma } from "@/lib/prisma"

export default async function UserProfilePage() {
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
    <div className="p-4">
      <EditUserProfileForm user={user}/>
    </div>
  )
} 