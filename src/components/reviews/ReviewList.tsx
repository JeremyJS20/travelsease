import type React from "react"
import { Star } from "lucide-react"

interface Review {
  id: string
  user: string
  rating: number
  date: string
  comment: string
}

interface ReviewListProps {
  reviews: Review[]
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center mb-2">
            <div className="flex items-center mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{review.user}</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-2">{review.comment}</p>
          <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
        </div>
      ))}
    </div>
  )
}

export default ReviewList

