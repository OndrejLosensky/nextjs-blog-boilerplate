import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/sessions"
import { redirect } from "next/navigation"

export async function getUsers() {
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
      theme: true,
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
      theme: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return users
}