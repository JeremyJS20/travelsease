"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"

export type BookingType = "flight" | "hotel" | "activity"

export interface BookingItem {
  id: string
  type: BookingType
  title: string
  price: number
  date: string
  quantity: number
  details: any // Specific details based on type
}

interface CartItem extends BookingItem {
  cartId: string
}

interface Booking {
  id: string
  userId: string
  items: BookingItem[]
  totalPrice: number
  bookingDate: string
  status: "confirmed" | "pending" | "cancelled" | "completed"
  paymentInfo: {
    method: string
    transactionId: string
    paid: boolean
  }
}

interface BookingContextType {
  cart: CartItem[]
  bookings: Booking[]
  addToCart: (item: BookingItem) => void
  removeFromCart: (cartId: string) => void
  updateCartItemQuantity: (cartId: string, quantity: number) => void
  clearCart: () => void
  checkout: (paymentMethod: string) => Promise<Booking>
  cancelBooking: (bookingId: string) => Promise<boolean>
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export const useBooking = () => {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider")
  }
  return context
}

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])

  // Load cart and bookings from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    const storedBookings = localStorage.getItem("bookings")

    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }

    if (storedBookings) {
      setBookings(JSON.parse(storedBookings))
    }
  }, [])

  // Save cart and bookings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings))
  }, [bookings])

  const addToCart = (item: BookingItem) => {
    const cartId = `cart-${Date.now()}`
    setCart([...cart, { ...item, cartId }])
  }

  const removeFromCart = (cartId: string) => {
    setCart(cart.filter((item) => item.cartId !== cartId))
  }

  const updateCartItemQuantity = (cartId: string, quantity: number) => {
    setCart(cart.map((item) => (item.cartId === cartId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCart([])
  }

  const checkout = async (paymentMethod: string): Promise<Booking> => {
    // TODO: Replace with actual backend API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const user = JSON.parse(localStorage.getItem("user") || "{}")

    if (!user.id) {
      throw new Error("User not authenticated")
    }

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      userId: user.id,
      items: [...cart],
      totalPrice,
      bookingDate: new Date().toISOString(),
      status: "confirmed",
      paymentInfo: {
        method: paymentMethod,
        transactionId: `txn-${Date.now()}`,
        paid: true,
      },
    }

    setBookings([...bookings, newBooking])
    clearCart()

    return newBooking
  }

  const cancelBooking = async (bookingId: string): Promise<boolean> => {
    // TODO: Replace with actual backend API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setBookings(bookings.map((booking) => (booking.id === bookingId ? { ...booking, status: "cancelled" } : booking)))

    return true
  }

  return (
    <BookingContext.Provider
      value={{
        cart,
        bookings,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        checkout,
        cancelBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

