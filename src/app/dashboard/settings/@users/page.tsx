// Remove any 'use client' directive from this file - it should be a server component
import { getSession } from "@/lib/sessions"
import { redirect } from 'next/navigation'
import { ManageUsersForm } from "../../../../features/ManageUsers/ManageUsersForm"
import { getUsers } from "@/features/ManageUsers/actions"

export default async function UsersPage() {
  const session = await getSession()
  
  if (!session) {
    redirect('/login')
  }  

  const users = await getUsers()

  return <ManageUsersForm users={users}/>
} 