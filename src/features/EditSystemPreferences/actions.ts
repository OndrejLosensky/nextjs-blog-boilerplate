'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function updateSystemPreferences({ theme }: { theme: string }) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: 'Unauthorized' }
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { theme }
    })

    // Revalidate the settings page to reflect changes
    revalidatePath('/dashboard/settings')
    return { success: true }
  } catch (err) {
    console.error('Failed to update theme:', err)
    return { error: 'Failed to update preferences' }
  }
}
