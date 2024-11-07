"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'  
import { User } from '@prisma/client'

export function DashboardNav({ user }: { user: User }) {
  const pathname = usePathname()

  const navLinks = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      role: 'ALL'
    },
    {
        href: '/dashboard/settings',
        label: 'Settings',
        role: 'ALL'
      },
    {
      href: '/dashboard/users',
      label: 'Manage Users',
      role: 'ADMIN'
    }
  ]
  
  return (
    <nav className="bg-neutral-100 shadow mb-6 rounded-lg border border-black/10">
      <div className="mx-auto px-4">
        <div className="flex space-x-4 py-2 items-center">
          {navLinks.map(link => (
            (link.role === 'ALL' || user.role === link.role) && (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === link.href 
                    ? 'text-blue-600 bg-blue-600/10' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200'
                }`}
              >
                {link.label}
              </Link>
            )
          ))}
        </div>
      </div>
    </nav>
  )
} 