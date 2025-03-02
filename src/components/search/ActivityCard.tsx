import type React from "react"
import { Link } from "react-router-dom"
import { useBooking } from "../../contexts/BookingContext"
import { useNotification } from "../../contexts/NotificationContext"

interface Activity {
  id: string
  name: string
  location: string
  price: number
  rating: number
  image: string
  duration: string
  category: string
  description: string
}

interface ActivityCardProps {
  activity: Activity
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const { addToCart } = useBooking()
  const { addNotification } = useNotification()

  const handleAddToCart = () => {
    addToCart({
      id: activity.id,
      type: "activity",
      title: `${activity.name} - ${activity.location}`,
      price: activity.price,
      date: new Date().toISOString(),
      quantity: 1,
      details: activity,
    })

    addNotification({
      type: "success",
      title: "Activity Added",
      message: `${activity.name} in ${activity.location} has been added to your cart.`,
    })
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3">
          <img
            src={activity.image || "/placeholder.svg"}
            alt={activity.name}
            className="h-48 md:h-full w-full object-cover"
          />
        </div>
        <div className="p-6 md:w-2/3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <div className="flex items-center mb-1">
                <span className="px-2 py-1 mr-2 bg-green-100 text-green-800 text-xs font-medium rounded dark:bg-green-900 dark:text-green-300">
                  {activity.category}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{activity.duration}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{activity.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{activity.location}</p>
            </div>
            <div className="flex items-center mt-2 md:mt-0">
              <div className="flex items-center mr-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(activity.rating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{activity.rating.toFixed(1)}</span>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{activity.description}</p>

          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">${activity.price}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400"> / person</span>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Link
                to={`/activities/${activity.id}`}
                className="flex-1 sm:flex-initial text-center text-blue-600 hover:bg-blue-50 border border-blue-600 font-medium py-2 px-4 rounded-lg transition-colors dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700"
              >
                View Details
              </Link>
              <button
                onClick={handleAddToCart}
                className="flex-1 sm:flex-initial bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActivityCard

