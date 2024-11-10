import { getSession } from "./sessions"
import { prisma } from "./prisma"

export async function auth() {
  const session = await getSession()
  
  if (!session) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      email: true,
      role: true,
      name: true,
      theme: true,
      createdAt: true,
      updatedAt: true
    }
  })

  if (!user) {
    return null
  }

  return {
    user
  }
} 