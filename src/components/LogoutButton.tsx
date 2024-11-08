'use client'

import { logout } from "@/app/login/actions"

export function LogoutButton() {
  return (
    <button 
      onClick={() => logout()}
      className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150 ease-in-out"
    >
      Logout
    </button>
  )
} 