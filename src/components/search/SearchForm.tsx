"use client";

import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

type SearchType = "flight" | "hotel" | "activity";

interface SearchFormProps {
  initialType?: SearchType;
  initialDestination?: string;
  initialDates?: {
    departure?: string;
    return?: string;
    checkIn?: string;
    checkOut?: string;
  };
}

const SearchForm: React.FC<SearchFormProps> = ({
  initialType = "flight",
  initialDestination = "",
  initialDates = {},
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState<SearchType>(initialType);
  const [destination, setDestination] = useState(initialDestination);
  const [origin, setOrigin] = useState("");
  const [departureDate, setDepartureDate] = useState(
    initialDates.departure || ""
  );
  const [returnDate, setReturnDate] = useState(initialDates.return || "");
  const [checkInDate, setCheckInDate] = useState(initialDates.checkIn || "");
  const [checkOutDate, setCheckOutDate] = useState(initialDates.checkOut || "");
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [activityDate, setActivityDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("type", searchType);

    if (destination) {
      params.append("destination", destination);
    }

    if (searchType === "flight") {
      if (origin) params.append("origin", origin);
      if (departureDate) params.append("departureDate", departureDate);
      if (returnDate) params.append("returnDate", returnDate);
      params.append("passengers", guests.toString());
    } else if (searchType === "hotel") {
      if (checkInDate) params.append("checkIn", checkInDate);
      if (checkOutDate) params.append("checkOut", checkOutDate);
      params.append("guests", guests.toString());
      params.append("rooms", rooms.toString());
    } else if (searchType === "activity") {
      if (activityDate) params.append("date", activityDate);
      params.append("participants", guests.toString());
    }

    navigate(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center me-4">
            <input
              id="flight-radio"
              type="radio"
              name="search-type"
              value="flight"
              checked={searchType === "flight"}
              onChange={() => setSearchType("flight")}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="flight-radio"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {t("searchForm.flights")}
            </label>
          </div>
          <div className="flex items-center me-4">
            <input
              id="hotel-radio"
              type="radio"
              name="search-type"
              value="hotel"
              checked={searchType === "hotel"}
              onChange={() => setSearchType("hotel")}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="hotel-radio"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {t("searchForm.hotels")}
            </label>
          </div>
          <div className="flex items-center me-4">
            <input
              id="activity-radio"
              type="radio"
              name="search-type"
              value="activity"
              checked={searchType === "activity"}
              onChange={() => setSearchType("activity")}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="activity-radio"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {t("searchForm.activities")}
            </label>
          </div>
        </div>
      </div>

      <div className="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
        {searchType === "flight" && (
          <>
            <div>
              <label
                htmlFor="origin"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {t("searchForm.from")}
              </label>
              <input
                type="text"
                id="origin"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={t("searchForm.cityOrAirport")}
                required
              />
            </div>
            <div>
              <label
                htmlFor="destination"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {t("searchForm.to")}
              </label>
              <input
                type="text"
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={t("searchForm.cityOrAirport")}
                required
              />
            </div>
            <div>
              <label
                htmlFor="departure-date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {t("searchForm.departureDate")}
              </label>
              <input
                type="date"
                id="departure-date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="return-date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {t("searchForm.returnDate")}
              </label>
              <input
                type="date"
                id="return-date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </>
        )}

        {searchType === "hotel" && (
          <>
            <div>
              <label
                htmlFor="hotel-destination"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {t("searchForm.destination")}
              </label>
              <input
                type="text"
                id="hotel-destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={t("searchForm.cityOrHotelName")}
                required
              />
            </div>
            <div>
              <label
                htmlFor="check-in-date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {t("searchForm.checkIn")}
              </label>
              <input
                type="date"
                id="check-in-date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="check-out-date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {t("searchForm.checkOut")}
              </label>
              <input
                type="date"
                id="check-out-date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="guests"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("searchForm.guests")}
                </label>
                <input
                  type="number"
                  id="guests"
                  value={guests}
                  onChange={(e) => setGuests(Number.parseInt(e.target.value))}
                  min="1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="rooms"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("searchForm.rooms")}
                </label>
                <input
                  type="number"
                  id="rooms"
                  value={rooms}
                  onChange={(e) => setRooms(Number.parseInt(e.target.value))}
                  min="1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </>
        )}

        {searchType === "activity" && (
          <>
            <div>
              <label
                htmlFor="activity-destination"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {t("searchForm.destination")}
              </label>
              <input
                type="text"
                id="activity-destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={t("searchForm.cityOrActivityType")}
                required
              />
            </div>
            <div>
              <label
                htmlFor="activity-date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {t("searchForm.date")}
              </label>
              <input
                type="date"
                id="activity-date"
                value={activityDate}
                onChange={(e) => setActivityDate(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="participants"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {t("searchForm.participants")}
              </label>
              <input
                type="number"
                id="participants"
                value={guests}
                onChange={(e) => setGuests(Number.parseInt(e.target.value))}
                min="1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </>
        )}
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {t("searchForm.search")}
      </button>
    </form>
  );
};

export default SearchForm;
