import type React from "react"
import { Link } from "react-router-dom"

const NotFoundPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404 - Page Not Found</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Oops! The page you're looking for doesn't exist.</p>
      <img src="/placeholder.svg?height=200&width=200" alt="404 Illustration" className="mb-8" />
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
      >
        Go back to Homepage
      </Link>
    </div>
  )
}

export default NotFoundPage

