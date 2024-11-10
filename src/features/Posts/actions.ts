'use server'

import { getSession } from "@/lib/sessions"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { writeFile } from 'fs/promises'
import path from 'path'

const postSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  content: z.string().min(1, "Content is required"),
  published: z.boolean().optional(),
})

type ActionResponse = {
  success?: boolean
  error?: string
}

export async function createPost(formData: FormData): Promise<ActionResponse> {
  try {
    const session = await getSession()
    if (!session) {
      return { error: "Unauthorized" }
    }

    // Get form data
    const rawData = {
      title: formData.get('title'),
      content: formData.get('content'),
      published: formData.get('published') === 'on',
    }

    // Validate the data
    const validatedData = postSchema.parse(rawData)

    // Generate slug from title
    const slug = validatedData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    // Handle image upload
    let imagePath = null
    const imageFile = formData.get('image')
    
    if (imageFile instanceof File && imageFile.size > 0) {
      try {
        const bytes = await imageFile.arrayBuffer()
        const buffer = Buffer.from(bytes)
        
        // Create a safe filename
        const filename = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
        const uploadDir = path.join(process.cwd(), 'public', 'uploads')
        const uploadPath = path.join(uploadDir, filename)
        
        await writeFile(uploadPath, buffer)
        imagePath = `/uploads/${filename}`
      } catch (error) {
        console.error('Image upload error:', error)
        return { error: 'Failed to upload image' }
      }
    }

    // Create the post
    await prisma.post.create({
      data: {
        ...validatedData,
        slug,
        authorId: session.userId,
        imagePath,
      },
    })

    revalidatePath('/dashboard/posts')
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    console.error('Failed to create post:', error)
    return { error: 'Failed to create post' }
  }
}

export async function getPosts() {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  })
  
  return posts.map(post => ({
    ...post,
    slug: post.title.toLowerCase().replace(/\s+/g, '-'),
  }))
}

export async function updatePostStatus(postId: string, published: boolean): Promise<ActionResponse> {
  try {
    const session = await getSession()
    if (!session) {
      return { error: "Unauthorized" }
    }

    // Verify post ownership
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    })

    if (!post || post.authorId !== session.userId) {
      return { error: "Unauthorized" }
    }

    // Update post status
    await prisma.post.update({
      where: { id: postId },
      data: { published },
    })

    revalidatePath('/dashboard/posts')
    return { success: true }
  } catch (error) {
    console.error('Failed to update post status:', error)
    return { error: 'Failed to update post status' }
  }
}

export async function deletePost(postId: string): Promise<ActionResponse> {
  try {
    const session = await getSession()
    if (!session) {
      return { error: "Unauthorized" }
    }

    // Verify post ownership
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    })

    if (!post || post.authorId !== session.userId) {
      return { error: "Unauthorized" }
    }

    // Delete the post
    await prisma.post.delete({
      where: { id: postId },
    })

    revalidatePath('/dashboard/posts')
    return { success: true }
  } catch (error) {
    console.error('Failed to delete post:', error)
    return { error: 'Failed to delete post' }
  }
}

export async function getPublishedPosts() {
  const session = await getSession()
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
      comments: {
        select: {
          id: true,
        },
      },
      likes: {
        select: {
          userId: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return posts.map(post => ({
    ...post,
    commentCount: post.comments.length,
    likeCount: post.likes.length,
    isLiked: session ? post.likes.some(like => like.userId === session.userId) : false,
    comments: undefined,
    likes: undefined,
  }));
}

export async function getPost(id: string) {
  const post = await prisma.post.findUnique({
    where: {
      id,
      published: true,
    },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return post;
}

export async function getPostBySlug(slug: string) {
  const post = await prisma.post.findUnique({
    where: {
      slug,
      published: true,
    },
    select: {
      id: true,
      title: true,
      content: true,
      imagePath: true,
      createdAt: true,
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return post;
}

export async function updatePost(postId: string, formData: FormData): Promise<ActionResponse> {
  try {
    const session = await getSession()
    if (!session) {
      return { error: "Unauthorized" }
    }

    // Verify post ownership
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true, imagePath: true },
    })

    if (!existingPost || existingPost.authorId !== session.userId) {
      return { error: "Unauthorized" }
    }

    // Get form data
    const rawData = {
      title: formData.get('title'),
      content: formData.get('content'),
      published: formData.get('published') === 'on',
    }

    // Validate the data
    const validatedData = postSchema.parse(rawData)

    // Generate slug from title
    const slug = validatedData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    // Handle image upload
    let imagePath = existingPost.imagePath
    const imageFile = formData.get('image')
    
    if (imageFile instanceof File && imageFile.size > 0) {
      try {
        const bytes = await imageFile.arrayBuffer()
        const buffer = Buffer.from(bytes)
        
        // Create a safe filename
        const filename = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
        const uploadDir = path.join(process.cwd(), 'public', 'uploads')
        const uploadPath = path.join(uploadDir, filename)
        
        await writeFile(uploadPath, buffer)
        imagePath = `/uploads/${filename}`
      } catch (error) {
        console.error('Image upload error:', error)
        return { error: 'Failed to upload image' }
      }
    }

    // Update the post
    await prisma.post.update({
      where: { id: postId },
      data: {
        ...validatedData,
        slug,
        imagePath,
      },
    })

    revalidatePath('/dashboard/posts')
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    console.error('Failed to update post:', error)
    return { error: 'Failed to update post' }
  }
} 