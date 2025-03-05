import type React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SearchForm from "../components/search/SearchForm";
import LoyaltyBanner from "../components/loyalty/LoyaltyBanner";

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const featuredDestinations = [
    {
      id: 1,
      name: "Paris",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      description: t("homePage.paris"),
    },
    {
      id: 2,
      name: "Tokyo",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
      description: t("homePage.tokyo"),
    },
    {
      id: 3,
      name: "New York",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9",
      description: t("homePage.newYork"),
    },
    {
      id: 4,
      name: "Sydney",
      image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9",
      description: t("homePage.sydney"),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        {t("homePage.welcome")}
      </h1>

      <LoyaltyBanner />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          {t("homePage.findYourTrip")}
        </h2>
        <SearchForm />
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          {t("homePage.featuredDestinations")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDestinations.map((destination) => (
            <div
              key={destination.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {destination.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {destination.description}
                </p>
                <Link
                  to={`/search?destination=${destination.name}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors inline-block"
                >
                  {t("homePage.explore")}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          {t("homePage.whyChooseUs")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t("homePage.bestPrices")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t("homePage.bestPricesDescription")}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t("homePage.easyBooking")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t("homePage.easyBookingDescription")}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t("homePage.customerSupport")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t("homePage.customerSupportDescription")}
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          {t("homePage.travelInspiration")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t("homePage.travelTips")}
            </h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
              <li>{t("homePage.travelTip1")}</li>
              <li>{t("homePage.travelTip2")}</li>
              <li>{t("homePage.travelTip3")}</li>
              <li>{t("homePage.travelTip4")}</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {t("homePage.popularExperiences")}
            </h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
              <li>{t("homePage.experience1")}</li>
              <li>{t("homePage.experience2")}</li>
              <li>{t("homePage.experience3")}</li>
              <li>{t("homePage.experience4")}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
