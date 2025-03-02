import type React from "react"
import { Link } from "react-router-dom"
import { useBooking } from "../../contexts/BookingContext"
import { useNotification } from "../../contexts/NotificationContext"

interface Flight {
  id: string
  airline: string
  flightNumber: string
  origin: string
  destination: string
  departureTime: string
  arrivalTime: string
  duration: number
  price: number
  stops: number
  logo: string
}

interface FlightCardProps {
  flight: Flight
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  const { addToCart } = useBooking()
  const { addNotification } = useNotification()

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const handleAddToCart = () => {
    addToCart({
      id: flight.id,
      type: "flight",
      title: `${flight.airline} ${flight.flightNumber} - ${flight.origin} to ${flight.destination}`,
      price: flight.price,
      date: flight.departureTime,
      quantity: 1,
      details: flight,
    })

    addNotification({
      type: "success",
      title: "Flight Added",
      message: `${flight.airline} flight from ${flight.origin} to ${flight.destination} has been added to your cart.`,
    })
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div className="flex items-center mb-4 md:mb-0">
            <img
              src={flight.logo || "/placeholder.svg"}
              alt={flight.airline}
              className="w-12 h-12 mr-4 object-contain"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{flight.airline}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Flight {flight.flightNumber}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">${flight.price}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">per person</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <span className="text-xl font-semibold text-gray-900 dark:text-white">
              {new Date(flight.departureTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
            <span className="text-gray-600 dark:text-gray-300">{flight.origin}</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">{formatDuration(flight.duration)}</span>
            <div className="relative w-32 md:w-64 h-0.5 bg-gray-300 my-2">
              <div className="absolute top-1/2 left-0 w-2 h-2 -mt-1 rounded-full bg-blue-600"></div>
              {flight.stops > 0 && (
                <div className="absolute top-1/2 left-1/2 w-2 h-2 -mt-1 -ml-1 rounded-full bg-blue-600"></div>
              )}
              <div className="absolute top-1/2 right-0 w-2 h-2 -mt-1 rounded-full bg-blue-600"></div>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {flight.stops === 0 ? "Nonstop" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
            </span>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <span className="text-xl font-semibold text-gray-900 dark:text-white">
              {new Date(flight.arrivalTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
            <span className="text-gray-600 dark:text-gray-300">{flight.destination}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Link
            to={`/flights/${flight.id}`}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-center sm:text-left"
          >
            View Details
          </Link>
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Add to Cart
            </button>
            <Link
              to={`/checkout?flightId=${flight.id}`}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlightCard

