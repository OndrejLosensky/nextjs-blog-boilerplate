"use client"

import { LogoutButton } from "@/components/LogoutButton"
import ThemeSwitch from "@/context/theme-switcher"
import { User } from "@prisma/client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaHome, FaCog } from 'react-icons/fa'
import { IoMdPin } from "react-icons/io"

interface DashboardSidebarProps {
  user: User
}

const navLinks = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: FaHome,
    role: 'ALL'
  },
  {
    href: '/dashboard/posts',
    label: 'Posts',
    icon: IoMdPin,
    role: 'ALL'
  }, 
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: FaCog,
    role: 'ALL'
  },
]

export function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full w-64 bg-white dark:bg-slate-950 border-r border-gray-200 dark:border-slate-800">
      <div className="p-6 border-b border-gray-200 dark:border-slate-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">DevBlog</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navLinks.map(link => (
          (link.role === 'ALL' || user.role === link.role) && (
            <Link
              key={link.href}
              href={link.href}
              className={`
                flex items-center px-4 py-3 text-sm font-medium rounded-lg
                transition-colors duration-150 ease-in-out
                ${pathname === link.href 
                  ? 'bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-400' 
                  : 'text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                }
              `}
            >
              <link.icon className={`w-5 h-5 mr-3 ${
                pathname === link.href ? 'text-blue-700 dark:text-blue-400' : 'text-gray-400 dark:text-slate-500'
              }`} />
              {link.label}
            </Link>
          )
        ))}
      </nav>

      <div className="border-t border-gray-200 dark:border-slate-800">
        <ThemeSwitch light="Light Mode" dark="Dark Mode" />
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-slate-800">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-800 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600 dark:text-slate-300">
              {user.name?.[0] || user.email[0].toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-slate-100 truncate">
              {user.name || user.email}
            </p>
            <p className="text-xs text-gray-500 dark:text-slate-400 truncate">
              {user.role.charAt(0) + user.role.slice(1).toLowerCase()}
            </p>
          </div>
        </div>
        <LogoutButton />
      </div>
    </div>
  )
} 