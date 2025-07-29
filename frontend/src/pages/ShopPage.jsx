import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // Optional: lucide icon

export default function ShopPage() {
  const { shop_name } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      {/* ✅ Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-sm text-gray-500 hover:text-black mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back
      </button>

      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Welcome to {shop_name}'s Store
      </h1>
      <p className="text-gray-500 mb-4">Thanks for visiting!</p>

      <div className="text-sm text-gray-400">
        📦 Products coming soon. Stay tuned!
      </div>
    </div>
  );
}
