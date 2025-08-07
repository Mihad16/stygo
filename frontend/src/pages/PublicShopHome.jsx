import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ChevronRight } from "lucide-react";


const PublicShopHome = () => {
  const navigate = useNavigate();
  


  return (
    <div className="flex flex-col min-h-screen bg-white">

 
      {/* Hero Banner with responsive height */}
      <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
      
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              New Season Collection
            </h1>
            <button 
              onClick={() => navigate("/shop")}
              className="mt-4 px-6 py-2 bg-white text-gray-900 rounded-full font-medium flex items-center mx-auto hover:bg-gray-100 transition-colors"
            >
              Shop Now <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 md:py-8">
        {/* Featured Products Section */}
        
        {/* Shop Info Section */}
        <section className="p-6 md:p-8 my-6 bg-gray-50 rounded-xl">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg md:text-xl font-bold mb-4 text-gray-900">About Our Shop</h2>
            <p className="text-sm md:text-base text-gray-600 mb-4">
              We offer high-quality fashion items at affordable prices. 
              Our collections are carefully curated to bring you the latest trends
              while maintaining exceptional quality standards.
            </p>

          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <img 
                src="/images/my_logo.png" 
                alt="Logo" 
                className="h-8 w-auto"
              />
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Terms</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">Contact</a>
            </div>
          </div>
          <div className="mt-4 text-center md:text-left">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Fashion Haven. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicShopHome;