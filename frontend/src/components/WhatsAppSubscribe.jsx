import React, { useState } from "react";
import axios from "axios";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { FiShoppingBag, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

export default function ProductUpdatesSubscription() {
  const [formData, setFormData] = useState({
    phone_number: "",
    name: "",
  });

  const [notification, setNotification] = useState({ content: "", variant: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updatePhoneNumber = (value) => {
    setFormData(prev => ({
      ...prev,
      phone_number: `+${value}`,
    }));
  };

  const updateName = (e) => {
    setFormData(prev => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setNotification({ content: "", variant: "" });

    try {
      // Validate phone number
      if (!formData.phone_number || formData.phone_number.length < 8) {
        throw new Error("Please provide a valid phone number");
      }

      // API call to backend
      const response = await axios.post(
        "http://localhost:8000/api/subscribe/",
        {
          phone_number: formData.phone_number,
          name: formData.name || null,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setNotification({
        content: "Success! You'll receive product updates via WhatsApp.",
        variant: "success"
      });
      setIsSuccess(true);
    } catch (error) {
      let errorMessage = "This number is already subscribed to updates.";
      
      if (error.response) {
        if (error.response.data.phone_number) {
          errorMessage = error.response.data.phone_number[0];
        } else if (error.response.data.detail) {
          errorMessage = error.response.data.detail;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      setNotification({
        content: errorMessage,
        variant: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-8 text-center">
        <FiCheckCircle className="mx-auto h-14 w-14 text-emerald-500 mb-5" />
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Subscription Confirmed!</h3>
        <p className="text-gray-600">
          We'll send you exclusive product updates and special offers via WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-5 text-white text-center">
        <FiShoppingBag className="mx-auto h-9 w-9 mb-3" />
        <h3 className="text-2xl font-bold">Stay Updated</h3>
        <p className="text-blue-100 mt-1">
          Be the first to know about our latest products
        </p>
      </div>

      <div className="p-6">
        <form onSubmit={submitForm} className="space-y-5">
          {notification.content && (
            <div className={`p-3 rounded-lg flex items-start gap-3 text-sm ${
              notification.variant === "success" 
                ? "bg-emerald-50 text-emerald-800" 
                : "bg-rose-50 text-rose-800"
            }`}>
              {notification.variant === "success" ? (
                <FiCheckCircle className="mt-0.5 flex-shrink-0" />
              ) : (
                <FiAlertCircle className="mt-0.5 flex-shrink-0" />
              )}
              <span>{notification.content}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number *
            </label>
            <PhoneInput
              country={'in'}
              value={formData.phone_number.replace('+', '')}
              onChange={updatePhoneNumber}
              inputStyle={{
                width: '100%',
                height: '48px',
                borderRadius: '0.5rem',
                borderColor: notification.variant === 'error' ? '#EF4444' : '#D1D5DB',
              }}
              inputProps={{
                required: true,
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name (Optional)
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={updateName}
              placeholder="How should we address you?"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="text-xs text-gray-500">
            <p>
              By providing your number, you agree to receive product update messages.
              We'll never spam you or share your number.
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
              isLoading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Subscribing...
              </>
            ) : (
              'Subscribe via WhatsApp'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}