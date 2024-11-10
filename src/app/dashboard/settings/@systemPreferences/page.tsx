import { getSession } from "@/lib/sessions"
import { redirect } from 'next/navigation'
import { EditSystemPreferencesForm } from "@/features/EditSystemPreferences/EditSystemPreferencesForm"
import { prisma } from "@/lib/prisma"

export default async function SystemPreferencesPage() {
  const session = await getSession()
  
  if (!session) {
    redirect('/login')
  }  

  const user = await prisma.user.findUnique({
    where: { id: session.userId },     
  })

  if (!user) {
    redirect('/login')
  }

  return <EditSystemPreferencesForm user={user} />
}
