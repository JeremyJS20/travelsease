import type React from "react"
import { Link } from "react-router-dom"
import { useBooking } from "../../contexts/BookingContext"
import { ShoppingCart } from "lucide-react"

const CartSummary: React.FC = () => {
  const { cartItemsCount, cartTotal } = useBooking()

  return (
    <Link
      to="/checkout"
      className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
    >
      <ShoppingCart className="w-6 h-6 mr-1" />
      <span className="text-sm font-medium">
        {cartItemsCount} {cartItemsCount === 1 ? "item" : "items"} | ${cartTotal.toFixed(2)}
      </span>
    </Link>
  )
}

export default CartSummary

