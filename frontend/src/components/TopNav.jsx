import React from "react";
import { useNavigate } from "react-router-dom";

export default function TopNav() {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow px-4 sm:px-6 md:px-8 py-3 flex items-center justify-between w-full max-w-md sm:max-w-lg md:max-w-3xl lg:max-w-5xl mx-auto">
      {/* Logo / Brand Name */}
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
        Stygo
      </h1>

      {/* Button */}
      <button
        className="bg-green-600 text-white text-xs sm:text-sm md:text-base lg:text-lg px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2 rounded-xl hover:bg-green-700 transition-all"
        onClick={() => navigate("/login")}
      >
        Become a Seller
      </button>
    </div>
  );
}
