import { getSession } from "@/lib/sessions"
import { redirect } from 'next/navigation'
import { EditUserProfileForm } from "@/features/EditUserProfile/client/EditUserProfileForm"
import { getUser } from "@/lib/utils/getUser";

export default async function UserProfilePage() {
  const session = await getSession()
  
  if (!session) {
    redirect('/login')
  }  

  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  return <EditUserProfileForm user={user}/>
} 