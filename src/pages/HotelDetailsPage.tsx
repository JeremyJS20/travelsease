"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useBooking } from "../contexts/BookingContext"
import { useNotification } from "../contexts/NotificationContext"
import { mockHotelDetails } from "../data/mockData"

const HotelDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [hotel, setHotel] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [checkInDate, setCheckInDate] = useState("")
  const [checkOutDate, setCheckOutDate] = useState("")
  const { addToCart } = useBooking()
  const { addNotification } = useNotification()

  useEffect(() => {
    // Simulate API call
    setIsLoading(true)
    setTimeout(() => {
      if (id && mockHotelDetails[id]) {
        setHotel(mockHotelDetails[id])
        if (mockHotelDetails[id].roomTypes.length > 0) {
          setSelectedRoom(mockHotelDetails[id].roomTypes[0].id)
        }
      }
      setIsLoading(false)
    }, 1000)
  }, [id])

  const handleAddToCart = () => {
    if (!hotel || !selectedRoom || !checkInDate || !checkOutDate) return

    const room = hotel.roomTypes.find((r: any) => r.id === selectedRoom)
    if (!room) return

    const nights = Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 3600 * 24))

    addToCart({
      id: `${hotel.id}-${selectedRoom}`,
      type: "hotel",
      title: `${hotel.name} - ${room.name}`,
      price: room.price * nights,
      date: checkInDate,
      quantity: 1,
      details: {
        ...hotel,
        selectedRoom: room,
        checkInDate,
        checkOutDate,
        nights,
        totalPrice: room.price * nights,
      },
    })

    addNotification({
      type: "success",
      title: "Hotel Added",
      message: `${room.name} at ${hotel.name} has been added to your cart.`,
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

  if (!hotel) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Hotel Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The hotel you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/search?type=hotel"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Search for Hotels
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to="/search?type=hotel"
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{hotel.name}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{hotel.address}</p>

          <div className="flex items-center mb-6">
            <div className="flex items-center mr-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(hotel.rating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">{hotel.rating.toFixed(1)}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <img
              src={hotel.images[0] || "/placeholder.svg"}
              alt={hotel.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="grid grid-cols-2 gap-4">
              {hotel.images.slice(1, 5).map((image: string, index: number) => (
                <img
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`${hotel.name} ${index + 2}`}
                  className="w-full h-28 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">About this hotel</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{hotel.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Amenities</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {hotel.amenities.map((amenity: string, index: number) => (
                <li key={index} className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
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

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Room Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hotel.roomTypes.map((room: any) => (
                <div
                  key={room.id}
                  className={`border rounded-lg p-4 cursor-pointer ${selectedRoom === room.id ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 dark:border-gray-700"}`}
                  onClick={() => setSelectedRoom(room.id)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">{room.name}</h3>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">${room.price}/night</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{room.capacity}</p>
                  <ul className="text-sm text-gray-600 dark:text-gray-300">
                    {room.amenities.map((amenity: string, index: number) => (
                      <li key={index} className="flex items-center mb-1">
                        <svg
                          className="w-4 h-4 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Policies</h2>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="mb-3">
                <span className="font-medium text-gray-900 dark:text-white">Check-in:</span>
                <p className="text-gray-600 dark:text-gray-300">{hotel.policies.checkIn}</p>
              </div>
              <div className="mb-3">
                <span className="font-medium text-gray-900 dark:text-white">Check-out:</span>
                <p className="text-gray-600 dark:text-gray-300">{hotel.policies.checkOut}</p>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Cancellation:</span>
                <p className="text-gray-600 dark:text-gray-300">{hotel.policies.cancellation}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Guest Reviews</h2>
            {hotel.reviews.map((review: any) => (
              <div key={review.id} className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <div className="flex items-center mb-2">
                  <div className="flex items-center mr-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < review.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{review.user}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{review.comment}</p>
                <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 w-full md:w-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="check-in" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    id="check-in"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="check-out"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    id="check-out"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ${selectedRoom ? hotel.roomTypes.find((r: any) => r.id === selectedRoom)?.price : 0}/night
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Plus taxes and fees</span>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleAddToCart}
              disabled={!selectedRoom || !checkInDate || !checkOutDate}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelDetailsPage

