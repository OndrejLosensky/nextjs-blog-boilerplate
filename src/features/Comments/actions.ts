'use server'

import { getSession } from "@/lib/sessions"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const commentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty").max(1000),
  postId: z.string(),
  slug: z.string()
})

type ActionResponse = {
  success?: boolean
  error?: string
}

export async function createComment(formData: FormData): Promise<ActionResponse> {
  try {
    const session = await getSession()
    if (!session) {
      return { error: "Unauthorized" }
    }

    const rawData = {
      content: formData.get('content'),
      postId: formData.get('postId'),
      slug: formData.get('slug')
    }

    // Validate all required fields are present
    if (!rawData.content || !rawData.postId || !rawData.slug) {
      return { error: "Missing required fields" }
    }

    const validatedData = commentSchema.parse(rawData)

    // Verify the post exists
    const post = await prisma.post.findUnique({
      where: { id: validatedData.postId }
    })

    if (!post) {
      return { error: "Post not found" }
    }

    await prisma.comment.create({
      data: {
        content: validatedData.content,
        postId: validatedData.postId,
        authorId: session.userId,
      },
    })

    revalidatePath(`/posts/${validatedData.slug}`)
    return { success: true }
  } catch (error) {
    console.error('Comment creation error:', error)
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    return { error: 'Failed to create comment' }
  }
}

export async function deleteComment(commentId: string, slug: string): Promise<ActionResponse> {
  try {
    const session = await getSession()
    if (!session) {
      return { error: "Unauthorized" }
    }

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { authorId: true, postId: true },
    })

    if (!comment) {
      return { error: "Comment not found" }
    }

    if (comment.authorId !== session.userId) {
      return { error: "Unauthorized" }
    }

    await prisma.comment.delete({
      where: { id: commentId },
    })

    revalidatePath(`/posts/${slug}`)
    return { success: true }
  } catch (error) {
    console.error('Comment deletion error:', error)
    return { error: 'Failed to delete comment' }
  }
}

export async function getComments(postId: string) {
  try {
    return await prisma.comment.findMany({
      where: { postId },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  } catch (error) {
    console.error('Error fetching comments:', error)
    return []
  }
} 