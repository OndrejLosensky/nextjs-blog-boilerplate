'use client'

import { logout } from "@/app/login/actions"

export function LogoutButton() {
  return (
    <button 
      onClick={() => logout()}
      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300"
    >
      Logout
    </button>
  )
} 