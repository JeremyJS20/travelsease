"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useBooking } from "../contexts/BookingContext"
import { useNotification } from "../contexts/NotificationContext"
import { mockFlightDetails } from "../data/mockData"

const FlightDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [flight, setFlight] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedClass, setSelectedClass] = useState("mainCabin")
  const [passengers, setPassengers] = useState(1)
  const { addToCart } = useBooking()
  const { addNotification } = useNotification()

  useEffect(() => {
    // Simulate API call
    setIsLoading(true)
    setTimeout(() => {
      if (id && mockFlightDetails[id]) {
        setFlight(mockFlightDetails[id])
      }
      setIsLoading(false)
    }, 1000)
  }, [id])

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString)
    return {
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date: date.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" }),
    }
  }

  const handleAddToCart = () => {
    if (!flight) return

    const classPrice = flight.seatMap[selectedClass].price

    addToCart({
      id: flight.id,
      type: "flight",
      title: `${flight.airline} ${flight.flightNumber} - ${flight.origin.city} to ${flight.destination.city}`,
      price: classPrice,
      date: flight.departureTime,
      quantity: passengers,
      details: {
        ...flight,
        selectedClass,
        totalPrice: classPrice * passengers,
      },
    })

    addNotification({
      type: "success",
      title: "Flight Added",
      message: `${flight.airline} flight from ${flight.origin.city} to ${flight.destination.city} has been added to your cart.`,
    })
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }

  if (!flight) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Flight Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The flight you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/search?type=flight"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Search for Flights
          </Link>
        </div>
      </div>
    )
  }

  const departure = formatDateTime(flight.departureTime)
  const arrival = formatDateTime(flight.arrivalTime)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to="/search?type=flight"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Search Results
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <img
                src={flight.logo || "/placeholder.svg"}
                alt={flight.airline}
                className="w-16 h-16 mr-4 object-contain"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{flight.airline}</h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Flight {flight.flightNumber} • {flight.aircraft}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm text-gray-500 dark:text-gray-400">Starting from</span>
              <span className="text-3xl font-bold text-gray-900 dark:text-white">${flight.price}</span>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{departure.time}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{departure.date}</span>
                <span className="text-lg font-medium text-gray-900 dark:text-white mt-2">{flight.origin.code}</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">{flight.origin.city}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {flight.origin.terminal}, Gate {flight.origin.gate}
                </span>
              </div>

              <div className="flex flex-col items-center mb-6 md:mb-0">
                <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">{formatDuration(flight.duration)}</span>
                <div className="relative w-32 md:w-64 h-0.5 bg-gray-300 dark:bg-gray-600 my-2">
                  <div className="absolute top-1/2 left-0 w-2 h-2 -mt-1 rounded-full bg-blue-600"></div>
                  {flight.stops > 0 && (
                    <div className="absolute top-1/2 left-1/2 w-2 h-2 -mt-1 -ml-1 rounded-full bg-blue-600"></div>
                  )}
                  <div className="absolute top-1/2 right-0 w-2 h-2 -mt-1 rounded-full bg-blue-600"></div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {flight.stops === 0 ? "Nonstop" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
                </span>
              </div>

              <div className="flex flex-col items-center md:items-end">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{arrival.time}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{arrival.date}</span>
                <span className="text-lg font-medium text-gray-900 dark:text-white mt-2">
                  {flight.destination.code}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-300">{flight.destination.city}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {flight.destination.terminal}, Gate {flight.destination.gate}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Baggage Information</h2>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-start mb-3">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Carry-on:</span>
                    <p className="text-gray-600 dark:text-gray-300">{flight.baggage.carryOn}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Checked baggage:</span>
                    <p className="text-gray-600 dark:text-gray-300">{flight.baggage.checked}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Amenities</h2>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <ul className="grid grid-cols-2 gap-2">
                  {flight.amenities.map((amenity: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <svg
                        className="w-4 h-4 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600 dark:text-gray-300">{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Fare Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className={`border rounded-lg p-4 cursor-pointer ${selectedClass === "mainCabin" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 dark:border-gray-700"}`}
                onClick={() => setSelectedClass("mainCabin")}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">Economy</h3>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    ${flight.seatMap.mainCabin.price}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Standard seating with basic amenities</p>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {flight.seatMap.mainCabin.available} seats available
                </span>
              </div>

              <div
                className={`border rounded-lg p-4 cursor-pointer ${selectedClass === "comfortPlus" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 dark:border-gray-700"}`}
                onClick={() => setSelectedClass("comfortPlus")}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">Comfort+</h3>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    ${flight.seatMap.comfortPlus.price}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Extra legroom and premium amenities</p>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {flight.seatMap.comfortPlus.available} seats available
                </span>
              </div>

              <div
                className={`border rounded-lg p-4 cursor-pointer ${selectedClass === "firstClass" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 dark:border-gray-700"}`}
                onClick={() => setSelectedClass("firstClass")}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">First Class</h3>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    ${flight.seatMap.firstClass.price}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Luxury seating with premium service</p>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {flight.seatMap.firstClass.available} seats available
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Policies</h2>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="mb-3">
                <span className="font-medium text-gray-900 dark:text-white">Cancellation:</span>
                <p className="text-gray-600 dark:text-gray-300">{flight.policies.cancellation}</p>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Changes:</span>
                <p className="text-gray-600 dark:text-gray-300">{flight.policies.changes}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number of Passengers
              </label>
              <select
                id="passengers"
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num}>
                    {num} Passenger{num > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ${(flight.seatMap[selectedClass].price * passengers).toFixed(2)}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Total for {passengers} passenger{passengers > 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlightDetailsPage

