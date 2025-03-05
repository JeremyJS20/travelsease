import type React from "react";
import { useTranslation } from "react-i18next";
import { Award, Gift, Zap, CreditCard } from "lucide-react";

const LoyaltyPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        {t("loyalty.programTitle")}
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          {t("loyalty.howItWorks")}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {t("loyalty.programDesc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center">
            <Award className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t("loyalty.earnPoints")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t("loyalty.earnPointsDesc")}
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Gift className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t("loyalty.redeemRewards")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t("loyalty.redeemRewardsDesc")}
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Zap className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t("loyalty.exclusiveBenefits")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t("loyalty.exclusiveBenefitsDesc")}
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <CreditCard className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t("loyalty.noFees")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t("loyalty.noFeesDesc")}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          {t("loyalty.membershipTiers")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t("loyalty.silver")}
            </h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Earn 1 point per $1 spent</li>
              <li>10% discount on select bookings</li>
              <li>Priority customer support</li>
            </ul>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t("loyalty.gold")}
            </h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Earn 1.5 points per $1 spent</li>
              <li>15% discount on select bookings</li>
              <li>Free room upgrades (subject to availability)</li>
              <li>Early check-in and late check-out</li>
            </ul>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t("loyalty.platinum")}
            </h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
              <li>Earn 2 points per $1 spent</li>
              <li>20% discount on select bookings</li>
              <li>Complimentary airport lounge access</li>
              <li>Dedicated concierge service</li>
              <li>Exclusive access to member-only events</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyPage;
