import React, { useEffect, useState } from "react";
import { fetchBuyerShops } from "../services/buyerShops";
import Search from "../components/Search";
import { MapPin, ChevronRight, Frown, ArrowRight } from "lucide-react";



const fashionCategories = [
  {
    name: 'Men',
    
    color: 'from-blue-100 to-blue-300 text-blue-900',
    image: '/images/men.png',
  },
  {
    name: 'Women',
    
    color: 'from-pink-100 to-pink-300 text-pink-900',
    image: '/images/women.png',
  },
  {
    name: 'Kids',
   
    color: 'from-yellow-100 to-yellow-300 text-yellow-900',
    image: '/images/kids.png',
  },
  {
    name: 'Beauty',
    
    color: 'from-purple-100 to-purple-300 text-purple-900',
    image: '/images/beauty.png',
  },
  {
    name: 'Accessories',
  
    color: 'from-green-100 to-green-300 text-green-900',
    image: '/images/accessories.png',
  },
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
  <div className="mb-10  p-6  border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="w-full lg:w-1/2">
            <Search
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search shops or locations..."
            />
          </div>
          <div className="w-full lg:w-1/2">
       
       
          </div>
        </div>
      </div>
      {/* Fashion Section */}
      <div className="space-y-10 mb-10">
        {/* Categories Grid */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Shop By Category</h2>
            <button className="text-orange-500 font-medium flex items-center">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {fashionCategories.map((cat, index) => (
              <div
                key={index}
                className={`rounded-xl bg-gradient-to-br ${cat.color} p-4 flex flex-col justify-between  h-15 shadow-sm hover:shadow-md transition`}
              >
                
                <div className=" text-center text-white ">
                  <h3 className="text-lg   font-bold ">{cat.name}</h3>
                  
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brands Grid */}
      
      </div>

      {/* Search and Categories */}
      

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