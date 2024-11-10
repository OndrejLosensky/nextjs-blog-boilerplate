'use server'

import { getSession } from "@/lib/sessions"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

type ActionResponse = {
  success?: boolean
  error?: string
}

export async function toggleLike(postId: string): Promise<ActionResponse> {
  try {
    const session = await getSession()
    if (!session) {
      return { error: "Unauthorized" }
    }

    const existingLike = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId: session.userId,
        },
      },
    })

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      })
    } else {
      await prisma.like.create({
        data: {
          postId,
          userId: session.userId,
        },
      })
    }

    revalidatePath('/posts/[slug]')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Like toggle error:', error)
    return { error: 'Failed to toggle like' }
  }
}

export async function getLikeCount(postId: string): Promise<number> {
  try {
    const count = await prisma.like.count({
      where: { postId }
    })
    return count
  } catch (error) {
    console.error('Error getting like count:', error)
    return 0
  }
}

export async function getPostLikes(postId: string) {
  try {
    const likes = await prisma.like.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return likes
  } catch (error) {
    console.error('Error getting post likes:', error)
    return []
  }
}

export async function hasUserLiked(postId: string): Promise<boolean> {
  const session = await getSession()
  if (!session) return false

  try {
    const like = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId: session.userId,
        },
      },
    })

    return !!like
  } catch (error) {
    console.error('Error checking user like:', error)
    return false
  }
} 