import React, { useState } from "react";
import axios from "axios";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2"; // npm install react-phone-input-2

export default function WhatsAppSubscribe() {
  const [formData, setFormData] = useState({
    phone_number: "",
    name: "",
    consent: false,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      phone_number: `+${value}`, // Always store with +
    }));
  };

  const handleNameChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleConsentChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      consent: e.target.checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      if (!formData.phone_number) {
        throw new Error("Phone number is required");
      }
      if (!formData.consent) {
        throw new Error("You must agree to receive WhatsApp updates");
      }

      const res = await axios.post(
        "http://localhost:8000/api/subscribe/",
        formData,
        { withCredentials: true }
      );

      setSuccess(true);
      setFormData({ phone_number: "", name: "", consent: false });
      setMessage(res.data.message || "Subscribed successfully!");
    } catch (err) {
      let errorMsg = err.response?.data?.message || err.message || "Something went wrong";
      setSuccess(false);
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-green-700 mb-1">
            📲 WhatsApp Updates
          </h2>
          <p className="text-gray-600 text-sm">
            Get exclusive offers and updates directly on WhatsApp
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {message && (
            <div
              className={`p-3 rounded-lg border-l-4 ${
                success
                  ? "bg-green-50 border-green-500 text-green-700"
                  : "bg-red-50 border-red-500 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          {/* Phone Number Input with Country Flags */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number*
            </label>
            <PhoneInput
              country={"in"}
              value={formData.phone_number}
              onChange={handleChange}
              inputStyle={{
                width: "100%",
                height: "48px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Optional"
              value={formData.name}
              onChange={handleNameChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
            />
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="consent"
              id="consent"
              checked={formData.consent}
              onChange={handleConsentChange}
              required
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="consent" className="ml-2 block text-sm text-gray-700">
              I agree to receive WhatsApp updates
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Processing..." : "Subscribe Now"}
          </button>
        </form>
      </div>
    </section>
  );
}
