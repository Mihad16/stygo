import React from "react";
import { useNavigate } from "react-router-dom";

export default function TopNav() {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow px-4 py-3 flex items-center justify-between max-w-md mx-auto">
      <div>
        <h1 className="text-lg font-semibold text-gray-800">Stygo</h1>
      </div>
      <button
        className="bg-green-600 text-white text-sm px-3 py-1 rounded-xl hover:bg-green-700"
        onClick={() => navigate("/login")}
      >
        Become a Seller
      </button>
    </div>
  );
}
