import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/sessions"
import { redirect } from 'next/navigation'

export async function getUser() {
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
      theme: true,
      password: true,
      createdAt: true,
      updatedAt: true,
    }
  })

  if (!user) {
    redirect('/login')
  }

  return user
} 