import React from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[420px] sm:min-h-[500px] md:min-h-[600px] flex flex-col items-center justify-center px-4 py-10 text-center relative overflow-hidden bg-neutral-50 border-b border-gray-200">
      {/* 3D-like floating elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-white rounded-full shadow-lg opacity-20"></div>
      <div className="absolute bottom-1/4 right-12 w-24 h-24 bg-white rounded-full shadow-lg opacity-20"></div>
      
      {/* Main content */}
      <div className="max-w-sm sm:max-w-md md:max-w-lg mx-auto px-2 relative z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4 [text-shadow:1px_1px_0px_rgba(255,255,255,0.8)]">
          Elevate Your Fashion Business
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-3 mb-6">
          Sell directly to customers through WhatsApp - no fees, no hassle
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/selling")} // Change to your route
            className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-6 rounded-lg transition-all shadow-sm hover:shadow-md border border-gray-200 active:scale-[0.98] text-sm sm:text-base"
          >
            Start Selling Free
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition-all shadow-sm hover:shadow-md active:scale-[0.98] text-sm sm:text-base">
            How It Works
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-500">
          <span>No credit card required</span>
          <span>•</span>
          <span>Set up in minutes</span>
        </div>
      </div>

      {/* Subtle floor gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-100/50 to-transparent"></div>
    </div>
  );
}
