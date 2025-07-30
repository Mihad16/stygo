import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react"; // import icon

export default function TopNav() {
  const navigate = useNavigate();
  const isSellerLoggedIn = !!localStorage.getItem("access"); // check token

  return (
    <div className="bg-white shadow px-4 sm:px-6 md:px-8 py-3 flex items-center justify-between w-full max-w-md sm:max-w-lg md:max-w-3xl lg:max-w-5xl mx-auto">
      {/* Logo */}
      <h1
        className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Stygo
      </h1>

      {/* Right side: Button */}
      {isSellerLoggedIn ? (
        <button
          className="flex items-center gap-1 text-sm text-gray-700 hover:text-green-600"
          onClick={() => navigate("/dashboard")}
        >
          <User className="w-4 h-4" />
          <span>Seller Profile</span>
        </button>
      ) : (
        <button
          className="bg-green-600 text-white text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-6 py-1.5 rounded-xl hover:bg-green-700 transition-all"
          onClick={() => navigate("/login")}
        >
          Become a Seller
        </button>
      )}
    </div>
  );
}
