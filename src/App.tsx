import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { BookingProvider } from "./contexts/BookingContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SearchPage from "./pages/SearchPage";
import FlightDetailsPage from "./pages/FlightDetailsPage";
import HotelDetailsPage from "./pages/HotelDetailsPage";
import ActivityDetailsPage from "./pages/ActivityDetailsPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";
import ItineraryPage from "./pages/ItineraryPage";
import SupportPage from "./pages/SupportPage";
import LoyaltyPage from "./pages/LoyaltyPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import "../i18n"; // Import the i18n configuration

function App() {
  return (
    <Router>
      <AuthProvider>
        <BookingProvider>
          <NotificationProvider>
            <div className="flex flex-col min-h-screen w-full">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/flights/:id" element={<FlightDetailsPage />} />
                  <Route path="/hotels/:id" element={<HotelDetailsPage />} />
                  <Route
                    path="/activities/:id"
                    element={<ActivityDetailsPage />}
                  />
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <CheckoutPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/itinerary"
                    element={
                      <ProtectedRoute>
                        <ItineraryPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/support" element={<SupportPage />} />
                  <Route path="/loyalty" element={<LoyaltyPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </NotificationProvider>
        </BookingProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
