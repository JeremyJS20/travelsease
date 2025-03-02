import type React from "react"
import { Link } from "react-router-dom"
import SearchForm from "../components/search/SearchForm"
import LoyaltyBanner from "../components/loyalty/LoyaltyBanner"

const HomePage: React.FC = () => {
  const featuredDestinations = [
    {
      id: 1,
      name: "Paris",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      description: "The City of Light",
    },
    {
      id: 2,
      name: "Tokyo",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
      description: "Where tradition meets future",
    },
    {
      id: 3,
      name: "New York",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9",
      description: "The Big Apple",
    },
    {
      id: 4,
      name: "Sydney",
      image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9",
      description: "Harbor city paradise",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Welcome to TravelEase</h1>

      <LoyaltyBanner />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Find Your Perfect Trip</h2>
        <SearchForm />
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Featured Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDestinations.map((destination) => (
            <div key={destination.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <img
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{destination.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{destination.description}</p>
                <Link
                  to={`/search?destination=${destination.name}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors inline-block"
                >
                  Explore
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Why Choose TravelEase</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Best Prices Guaranteed</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We offer competitive prices on our 100 million plus product range.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Easy Booking Process</h3>
            <p className="text-gray-600 dark:text-gray-300">Book your trip with just a few clicks. It's that simple!</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">24/7 Customer Support</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our team is here to assist you at any time, day or night.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Travel Inspiration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Travel Tips</h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
              <li>Pack light and smart</li>
              <li>Learn basic phrases in the local language</li>
              <li>Always have a backup of important documents</li>
              <li>Try local cuisines</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Popular Experiences</h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
              <li>Hot air balloon ride in Cappadocia</li>
              <li>Northern Lights tour in Iceland</li>
              <li>Safari in Serengeti National Park</li>
              <li>Cooking class in Tuscany</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

