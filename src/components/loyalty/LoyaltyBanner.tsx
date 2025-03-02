import type React from "react"
import { Link } from "react-router-dom"
import { Award } from "lucide-react"

const LoyaltyBanner: React.FC = () => {
  return (
    <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 mb-6">
      <div className="flex items-center">
        <Award className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
        <div>
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">Join Our Loyalty Program</h3>
          <p className="text-blue-600 dark:text-blue-300">Earn points on every booking and enjoy exclusive benefits!</p>
        </div>
        <Link
          to="/loyalty"
          className="ml-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Learn More
        </Link>
      </div>
    </div>
  )
}

export default LoyaltyBanner

