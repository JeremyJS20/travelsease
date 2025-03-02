"use client"

import type React from "react"
import { useState } from "react"
import { useNotification } from "../contexts/NotificationContext"

const SupportPage: React.FC = () => {
  const { addNotification } = useNotification()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement support ticket submission logic
    addNotification({
      type: "success",
      title: "Support Ticket Submitted",
      message: "Your support ticket has been successfully submitted. We'll get back to you soon.",
    })
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Customer Support</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">How do I cancel my booking?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                You can cancel your booking by going to your Itinerary page and clicking the "Cancel Booking" button
                next to the booking you wish to cancel. Please note that cancellation policies may vary depending on the
                type of booking and how close to the travel date you are cancelling.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We accept all major credit cards, including Visa, MasterCard, American Express, and Discover. We also
                support PayPal for secure online payments.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                How can I change my reservation?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                To change your reservation, please contact our customer support team with your booking reference number.
                We'll do our best to accommodate your request, subject to availability and any applicable fees.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Is travel insurance included in my booking?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Travel insurance is not automatically included in your booking. However, we strongly recommend
                purchasing travel insurance to protect your trip. You can add travel insurance during the checkout
                process or contact our support team for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupportPage

