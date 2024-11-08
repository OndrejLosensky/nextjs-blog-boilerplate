'use server'

import { getSession } from "@/lib/sessions"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { revalidatePath } from "next/cache"

const updateProfileSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  currentPassword: z.string().min(4),
  newPassword: z.string().min(4).optional().or(z.string().length(0)),
})

export async function updateProfile(formData: FormData) {
  try {
    const session = await getSession()
    if (!session) {
      return { error: 'Unauthorized' }
    }

    const parsed = Object.fromEntries(formData.entries())
    const validation = updateProfileSchema.safeParse(parsed)

    if (!validation.success) {
      return { error: 'Invalid input' }
    }

    const { id, email, name, currentPassword, newPassword } = validation.data

    // Verify user is updating their own profile
    if (session.userId !== id) {
      return { error: 'Unauthorized' }
    }

    // Verify current password
    const user = await prisma.user.findUnique({
      where: { id },
      select: { password: true }
    })

    if (!user || !await bcrypt.compare(currentPassword, user.password)) {
      return { error: 'Current password is incorrect' }
    }

    // Check if email is already taken by another user
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        NOT: {
          id
        }
      }
    })

    if (existingUser) {
      return { error: 'Email is already taken' }
    }

    // Update user profile
    const updateData: {
      email: string
      name?: string | null
      password?: string
    } = {
      email,
      name: name || null
    }

    if (newPassword && newPassword.length > 0) {
      updateData.password = await bcrypt.hash(newPassword, 12)
    }

    await prisma.user.update({
      where: { id },
      data: updateData
    })

    revalidatePath('/dashboard/settings')
    return { success: true }
  } catch (error) {
    console.error('Profile update error:', error)
    return { error: 'Failed to update profile' }
  }
}