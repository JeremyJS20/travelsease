"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchForm from "../components/search/SearchForm";
import FlightCard from "../components/search/FlightCard";
import HotelCard from "../components/search/HotelCard";
import ActivityCard from "../components/search/ActivityCard";
import type { BookingType } from "../contexts/BookingContext";

// Mock data
import { mockFlights, mockHotels, mockActivities } from "../data/mockData";

const SearchPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchType = (queryParams.get("type") as BookingType) || "flight";
  const destination = queryParams.get("destination") || "";

  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 10000,
    rating: 0,
  });
  const [sortOption, setSortOption] = useState("recommended");

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      let results;
      switch (searchType) {
        case "flight":
          results = mockFlights;
          break;
        case "hotel":
          results = mockHotels;
          break;
        case "activity":
          results = mockActivities;
          break;
        default:
          results = [];
      }

      // Filter by destination if provided
      if (destination) {
        results = results.filter(
          (item) =>
            item.destination
              .toLowerCase()
              .includes(destination.toLowerCase()) ||
            (item.origin &&
              item.origin.toLowerCase().includes(destination.toLowerCase()))
        );
      }

      setSearchResults(results);
      setFilteredResults(results);
      setIsLoading(false);
    }, 1500);
  }, [searchType, destination]);

  useEffect(() => {
    // Apply filters and sorting
    let results = [...searchResults];

    // Apply price filter
    results = results.filter(
      (item) => item.price >= filters.priceMin && item.price <= filters.priceMax
    );

    // Apply rating filter for hotels and activities
    if (searchType !== "flight" && filters.rating > 0) {
      results = results.filter((item) => item.rating >= filters.rating);
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "duration":
        if (searchType === "flight") {
          results.sort((a, b) => a.duration - b.duration);
        }
        break;
      default:
        // Default "recommended" sorting
        break;
    }

    setFilteredResults(results);
  }, [searchResults, filters, sortOption, searchType]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: Number(value),
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {searchType === "flight" && "Flight Search Results"}
        {searchType === "hotel" && "Hotel Search Results"}
        {searchType === "activity" && "Activity Search Results"}
      </h1>

      {/* Search Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <SearchForm
          initialType={searchType as BookingType}
          initialDestination={destination || ""}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters */}
        <div className="w-full md:w-1/4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price Range (${filters.priceMin} - ${filters.priceMax})
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Min Price
                  </label>
                  <input
                    type="number"
                    name="priceMin"
                    value={filters.priceMin}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Max Price
                  </label>
                  <input
                    type="number"
                    name="priceMax"
                    value={filters.priceMax}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {searchType !== "flight" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Minimum Rating ({filters.rating}+)
                </label>
                <input
                  type="range"
                  name="rating"
                  min="0"
                  max="5"
                  step="0.5"
                  value={filters.rating}
                  onChange={handleFilterChange}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Any</span>
                  <span>5 Stars</span>
                </div>
              </div>
            )}

            {/* Additional filters based on search type */}
            {searchType === "flight" && (
              <div className="mb-4">
                <h3 className="font-medium mb-2">Airlines</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="airline-all"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600"
                      defaultChecked
                    />
                    <label htmlFor="airline-all" className="ml-2 text-sm">
                      All Airlines
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="airline-delta"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600"
                    />
                    <label htmlFor="airline-delta" className="ml-2 text-sm">
                      Delta Airlines
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="airline-united"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600"
                    />
                    <label htmlFor="airline-united" className="ml-2 text-sm">
                      United Airlines
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="airline-american"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600"
                    />
                    <label htmlFor="airline-american" className="ml-2 text-sm">
                      American Airlines
                    </label>
                  </div>
                </div>
              </div>
            )}

            {searchType === "hotel" && (
              <div className="mb-4">
                <h3 className="font-medium mb-2">Amenities</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="amenity-wifi"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600"
                    />
                    <label htmlFor="amenity-wifi" className="ml-2 text-sm">
                      Free WiFi
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="amenity-breakfast"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600"
                    />
                    <label htmlFor="amenity-breakfast" className="ml-2 text-sm">
                      Breakfast Included
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="amenity-pool"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600"
                    />
                    <label htmlFor="amenity-pool" className="ml-2 text-sm">
                      Swimming Pool
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="amenity-parking"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600"
                    />
                    <label htmlFor="amenity-parking" className="ml-2 text-sm">
                      Free Parking
                    </label>
                  </div>
                </div>
              </div>
            )}

            {searchType === "activity" && (
              <div className="mb-4">
                <h3 className="font-medium mb-2">Activity Type</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="type-all"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600"
                      defaultChecked
                    />
                    <label htmlFor="type-all" className="ml-2 text-sm">
                      All Types
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="type-tour"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600"
                    />
                    <label htmlFor="type-tour" className="ml-2 text-sm">
                      Tours
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="type-adventure"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600"
                    />
                    <label htmlFor="type-adventure" className="ml-2 text-sm">
                      Adventure
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="type-cultural"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600"
                    />
                    <label htmlFor="type-cultural" className="ml-2 text-sm">
                      Cultural
                    </label>
                  </div>
                  <label htmlFor="type-cultural" className="ml-2 text-sm">
                    Cultural
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="type-food"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600"
                  />
                  <label htmlFor="type-food" className="ml-2 text-sm">
                    Food & Drink
                  </label>
                </div>
              </div>
            )}

            <button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() =>
                setFilters({ priceMin: 0, priceMax: 10000, rating: 0 })
              }
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="w-full md:w-3/4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <p className="text-gray-600 dark:text-gray-300 mb-2 sm:mb-0">
                {filteredResults.length} results found
              </p>
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-sm">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={handleSortChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  {searchType !== "flight" && (
                    <option value="rating">Rating</option>
                  )}
                  {searchType === "flight" && (
                    <option value="duration">Duration</option>
                  )}
                </select>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
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
          ) : filteredResults.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                No results found. Try adjusting your filters.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredResults.map((item) => (
                <div key={item.id}>
                  {searchType === "flight" && <FlightCard flight={item} />}
                  {searchType === "hotel" && <HotelCard hotel={item} />}
                  {searchType === "activity" && (
                    <ActivityCard activity={item} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
