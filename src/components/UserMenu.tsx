'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { User } from '@prisma/client'
import { LogoutButton } from './LogoutButton'
import { FaCog } from 'react-icons/fa'
import { HiViewGrid } from 'react-icons/hi'

interface UserMenuProps {
  user: User
}

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-sm focus:outline-none group"
      >
        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-800 flex items-center justify-center">
          <span className="text-sm font-medium text-gray-600 dark:text-slate-300">
            {user.name?.[0] || user.email[0].toUpperCase()}
          </span>
        </div>
        <span className="text-gray-700 dark:text-slate-300 group-hover:text-gray-900 dark:group-hover:text-white">
          {user.name || user.email}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-gray-200 dark:border-slate-700">
          <Link
            href="/dashboard"
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
            onClick={() => setIsOpen(false)}
          >
            <HiViewGrid className="w-4 h-4 mr-2" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
            onClick={() => setIsOpen(false)}
          >
            <FaCog className="w-4 h-4 mr-2" />
            Settings
          </Link>
          <div className="border-t border-gray-200 dark:border-slate-700 my-1"></div>
          <div className="px-4 py-2">
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  )
} 