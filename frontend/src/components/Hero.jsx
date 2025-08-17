import React from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Stygo Fashion Marketplace
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Local fashion sellers and buyers in Kasaragod. Chat via WhatsApp.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Browse Products
          </button>
          <button
            onClick={() => navigate("/Become-a-patner")}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
          >
            Become Seller
          </button>
        </div>
      </div>
    </section>
  );
}
