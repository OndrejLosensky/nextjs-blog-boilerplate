'use client'

import { User } from "@prisma/client"
import { createContext, useContext } from "react"

const UserContext = createContext<User | null>(null)

export function UserProvider({ children, user }: { children: React.ReactNode, user: User }) {
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === null) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
} 