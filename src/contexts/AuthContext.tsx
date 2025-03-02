"use client"

import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulate API call
      // TODO: Replace with actual backend API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data - replace with actual authentication
      const mockUsers = JSON.parse(localStorage.getItem("users") || "[]")
      const foundUser = mockUsers.find((u: any) => u.email === email && u.password === password)

      if (!foundUser) {
        throw new Error("Invalid credentials")
      }

      const authenticatedUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        avatar: foundUser.avatar,
      }

      setUser(authenticatedUser)
      localStorage.setItem("user", JSON.stringify(authenticatedUser))
      setIsLoading(false)
      return true
    } catch (error) {
      console.error("Login error:", error)
      setIsLoading(false)
      return false
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulate API call
      // TODO: Replace with actual backend API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if user already exists
      const mockUsers = JSON.parse(localStorage.getItem("users") || "[]")
      if (mockUsers.some((u: any) => u.email === email)) {
        throw new Error("User already exists")
      }

      // Create new user
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        password, // In a real app, never store plain text passwords
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      }

      mockUsers.push(newUser)
      localStorage.setItem("users", JSON.stringify(mockUsers))

      // Auto login after registration
      const authenticatedUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
      }

      setUser(authenticatedUser)
      localStorage.setItem("user", JSON.stringify(authenticatedUser))
      setIsLoading(false)
      return true
    } catch (error) {
      console.error("Registration error:", error)
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

