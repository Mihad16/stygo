import React from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          Stygo Fashion Marketplace
        </h1>
        
        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
          Local fashion sellers and buyers in Kasaragod. Chat via WhatsApp.
        </p>

        <div className="flex gap-3 sm:gap-4 justify-center">
          <button
            onClick={() => navigate("/products")}
            className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Browse Products
          </button>
          <button
            onClick={() => navigate("/create-shop")}
            className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Create Your Shop
          </button>
        </div>
      </div>
    </section>
  );
}
