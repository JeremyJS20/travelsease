"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"

export interface Notification {
  id: string
  type: "info" | "success" | "warning" | "error"
  message: string
  title?: string
  read: boolean
  createdAt: string
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "read" | "createdAt">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAllNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Load notifications from localStorage
  useEffect(() => {
    const storedNotifications = localStorage.getItem("notifications")
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications))
    }
  }, [])

  // Save notifications to localStorage when they change
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications))
  }, [notifications])

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const addNotification = (notification: Omit<Notification, "id" | "read" | "createdAt">) => {
    const newNotification: Notification = {
      ...notification,
      id: `notification-${Date.now()}`,
      read: false,
      createdAt: new Date().toISOString(),
    }

    setNotifications((prev) => [newNotification, ...prev])

    // Show browser notification if supported
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(notification.title || "New Notification", {
        body: notification.message,
      })
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

