// Remove any 'use client' directive from this file - it should be a server component
import { getSession } from "@/lib/sessions"
import { prisma } from "@/lib/prisma"
import { redirect } from 'next/navigation'
import { DashboardNav } from "@/components/DashboardNav"
import { UsersClient } from "./users-client"

export default async function UsersPage() {
  const session = await getSession()
  
  if (!session) {
    redirect('/login')
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      password: true,
    }
  })

  if (!currentUser || currentUser.role !== 'ADMIN') {
    redirect('/dashboard')
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div className="p-6">
      <DashboardNav user={currentUser} />
      <UsersClient users={users} />
    </div>
  )
} 