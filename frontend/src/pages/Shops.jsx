import React, { useEffect, useState } from "react";
import { fetchBuyerShops } from "../services/buyerShops";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import { MapPin, ChevronRight, Frown } from "lucide-react";

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
    const matchesSearch =
      shop.shop_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.location?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category) => {
    switch (category) {
      case "men":
        return { bg: "bg-blue-100", text: "text-blue-800" };
      case "women":
        return { bg: "bg-pink-100", text: "text-pink-800" };
      case "kids":
        return { bg: "bg-green-100", text: "text-green-800" };
      case "accessories":
        return { bg: "bg-purple-100", text: "text-purple-800" };
      case "beauty":
        return { bg: "bg-yellow-100", text: "text-yellow-800" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-800" };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Discover <span className="text-blue-600">Local Shops</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto md:mx-0">
          Explore unique products from sellers in your community
        </p>
      </div>

      {/* Search and Categories */}
      <div className="mb-10 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="w-full lg:w-1/2">
            <Search
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search shops or locations..."
            />
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-sm font-medium text-gray-700 mb-3">
              SHOP BY CATEGORY
            </h2>
            <div className="flex overflow-x-auto space-x-3 pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`flex flex-col items-center justify-center min-w-[70px] sm:min-w-[80px] px-3 py-2 rounded-xl transition-colors ${
                    selectedCategory === cat.value
                      ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-blue-200"
                  }`}
                >
                  <span className="text-lg sm:text-xl mb-1">{cat.icon}</span>
                  <span className="text-xs sm:text-sm font-medium">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Shop Grid */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-0">
            {selectedCategory
              ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Shops`
              : "All Shops"}
          </h2>
          <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
            {filteredShops.length} {filteredShops.length === 1 ? "Shop" : "Shops"} Found
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 animate-pulse"
              >
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-5 w-3/4 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredShops.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="mx-auto w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <Frown className="h-10 w-10 text-blue-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No shops found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSelectedCategory("");
                setSearchTerm("");
              }}
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredShops.map((shop, index) => (
            <a
  href={`/${shop.slug}`}
  target="_blank"
  rel="noopener noreferrer"
  key={index}
  className="group bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-100 overflow-hidden"
>

                <div className="flex items-start gap-4 mb-4">
                  {shop.logo ? (
                    <div className="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                      <img
                        src={shop.logo}
                        alt={`${shop.shop_name} logo`}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    </div>
                  ) : (
                    <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                      🏪
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                      {shop.shop_name}
                    </h2>
                    <div className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 text-gray-400 mr-1.5 flex-shrink-0" />
                      <p className="text-sm text-gray-500 truncate">
                        {shop.location || "Location not specified"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  {shop.category && (
                    <span
                      className={`text-xs sm:text-sm font-medium px-2 py-1 rounded-full ${
                        getCategoryColor(shop.category).bg
                      } ${getCategoryColor(shop.category).text}`}
                    >
                      {shop.category.charAt(0).toUpperCase() + shop.category.slice(1)}
                    </span>
                  )}
                  <span className="inline-flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
                    Visit Shop
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}