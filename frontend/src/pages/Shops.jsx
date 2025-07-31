import React, { useEffect, useState } from "react";
import { fetchBuyerShops } from "../services/buyerShops";
import { Link } from "react-router-dom";
import Search from "../components/Search";

const categories = [
  { label: "All", value: "", icon: "🛍️" },
  { label: "Men", value: "men", icon: "👔" },
  { label: "Women", value: "women", icon: "👗" },
  { label: "Kids", value: "kids", icon: "👶" },
  { label: "Accessories", value: "accessories", icon: "🕶️" },
  { label: "Beauty", value: "beauty", icon: "💄" },
];

export default function Shops() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadShops() {
      try {
        const data = await fetchBuyerShops();
        setShops(data);
      } catch (error) {
        console.error("Failed to load shops:", error);
      } finally {
        setLoading(false);
      }
    }

    loadShops();
  }, []);

  const filteredShops = shops.filter((shop) => {
    const matchesCategory = selectedCategory
      ? shop.category === selectedCategory
      : true;
    const matchesSearch = shop.shop_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
      shop.location.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">Discover Shops</h1>
        <p className="text-gray-500 text-sm sm:text-base">Find your favorite local sellers</p>
      </div>

      {/* Search and Categories Container */}
      <div className="lg:flex lg:items-center lg:justify-between lg:gap-6 mb-6">
        {/* Search - Takes full width on mobile, constrained on larger screens */}
        <div className="mb-5 lg:mb-0 lg:flex-1">
          <Search 
            value={searchTerm} 
            onChange={setSearchTerm} 
            placeholder="Search shops or locations..."
          />
        </div>

        {/* Categories - Scrollable on mobile, full width on desktop */}
        <div className="lg:flex-1">
          <h2 className="text-sm sm:text-base font-medium text-gray-500 mb-2">Categories</h2>
          <div className="flex overflow-x-auto space-x-3 pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`flex flex-col items-center justify-center min-w-[70px] sm:min-w-[80px] px-3 py-2 rounded-xl ${
                  selectedCategory === cat.value
                    ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200"
                }`}
              >
                <span className="text-lg sm:text-xl mb-1">{cat.icon}</span>
                <span className="text-xs sm:text-sm font-medium">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Shops List */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            {selectedCategory || "All"} Shops
          </h2>
          <span className="text-xs sm:text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
            {filteredShops.length} {filteredShops.length === 1 ? "shop" : "shops"}
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow animate-pulse">
                <div className="h-5 w-3/4 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
              </div>
            ))}
          </div>
        ) : filteredShops.length === 0 ? (
          <div className="text-center py-10">
            <div className="text-gray-400 mb-2 text-3xl">🔍</div>
            <p className="text-gray-500 font-medium text-lg">No shops found</p>
            <p className="text-gray-400 text-sm sm:text-base mt-1">
              Try a different search or category
            </p>
            <button
              onClick={() => {
                setSelectedCategory("");
                setSearchTerm("");
              }}
              className="mt-4 text-blue-500 hover:text-blue-700 text-sm sm:text-base"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredShops.map((shop, index) => (
              <Link
                to={`/shop/${encodeURIComponent(shop.shop_name)}`}
                key={index}
                className="group block bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-blue-100"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition">
                      {shop.shop_name}
                    </h2>
                    <div className="flex items-center mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <p className="text-sm sm:text-base text-gray-500">
                        {shop.location || "Location not specified"}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-medium px-2 py-1 rounded-full ${
                      shop.category === "men"
                        ? "bg-blue-100 text-blue-800"
                        : shop.category === "women"
                        ? "bg-pink-100 text-pink-800"
                        : shop.category === "kids"
                        ? "bg-green-100 text-green-800"
                        : shop.category === "accessories"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {shop.category.charAt(0).toUpperCase() + shop.category.slice(1)}
                  </span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center">
                    {/* Additional shop info can go here */}
                  </div>
                  <span className="text-blue-600 text-sm sm:text-base font-medium flex items-center">
                    View Shop
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 sm:h-5 sm:w-5 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="text-center text-sm sm:text-base text-gray-400 mt-6">
        <p>More shops coming soon!</p>
        
      </div>
    </div>
  );
}