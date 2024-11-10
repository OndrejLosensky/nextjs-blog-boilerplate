export enum Role {
    USER = 'USER',
    SUPER_USER = 'SUPER USER',  
    MANAGER = 'MANAGER',  
    ADMIN = 'ADMIN',
  }

  export type Settings = {
    id: string
    userId: string
    preferences: string
  }

  export type User = {
    id: string
    email: string
    name: string | null
    role: string
    createdAt: Date
    updatedAt: Date
    password?: string // Optional since we don't always want to expose this
    settings?: Settings | null
    theme: string
  }