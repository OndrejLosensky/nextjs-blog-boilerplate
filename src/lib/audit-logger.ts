import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"

export type AuditLogAction = 
  | 'LOGIN'
  | 'LOGOUT'
  | 'CREATE_USER'
  | 'UPDATE_USER'
  | 'DELETE_USER'
  | 'CREATE_POST'
  | 'UPDATE_POST'
  | 'DELETE_POST'
  | 'PUBLISH_POST'
  | 'UNPUBLISH_POST'

export async function createAuditLog({
  action,
  userId,
  details
}: {
  action: AuditLogAction
  userId: string
  details?: Record<string, unknown>
}) {
  try {
    const headersList = await headers()
    
    await prisma.auditLog.create({
      data: {
        action,
        userId,
        details: JSON.stringify(details || {}),
        ipAddress: headersList.get('x-forwarded-for') || headersList.get('x-real-ip'),
        userAgent: headersList.get('user-agent'),
      }
    })
  } catch (error) {
    console.error('Failed to create audit log:', error)
  }
} 