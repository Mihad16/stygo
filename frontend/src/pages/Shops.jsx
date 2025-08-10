import React, { useEffect, useState } from "react";
import { fetchBuyerShops } from "../services/buyerShops";
import { MapPin, ChevronRight, Frown, ArrowRight, Search as SearchIcon, X } from "lucide-react";

// Updated Categories with new theme
const fashionCategories = [
  {
    name: 'Men',
    bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-800',
    hoverColor: 'hover:from-blue-100 hover:to-blue-200',
    icon: '👔',
  },
  {
    name: 'Women',
    bgColor: 'bg-gradient-to-br from-pink-50 to-pink-100',
    borderColor: 'border-pink-200',
    textColor: 'text-pink-800',
    hoverColor: 'hover:from-pink-100 hover:to-pink-200',
    icon: '👗',
  },
  {
    name: 'Kids',
    bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
    borderColor: 'border-green-200',
    textColor: 'text-green-800',
    hoverColor: 'hover:from-green-100 hover:to-green-200',
    icon: '👶',
  },
  {
    name: 'Beauty',
    bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-800',
    hoverColor: 'hover:from-purple-100 hover:to-purple-200',
    icon: '💄',
  },
  {
    name: 'Accessories',
    bgColor: 'bg-gradient-to-br from-amber-50 to-amber-100',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-800',
    hoverColor: 'hover:from-amber-100 hover:to-amber-200',
    icon: '👜',
  },
];

const Search = ({ value, onChange, placeholder, allShops }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const generateSuggestions = (query) => {
    if (!query || query.length < 2) return [];
    
    const lowerQuery = query.toLowerCase();
    
    const shopMatches = allShops.filter(shop => 
      shop.shop_name?.toLowerCase().includes(lowerQuery) ||
      shop.location?.toLowerCase().includes(lowerQuery) ||
      shop.category?.toLowerCase().includes(lowerQuery)
    ).slice(0, 5);
    
    return shopMatches.map(shop => ({
      type: 'shop',
      name: shop.shop_name,
      location: shop.location,
      category: shop.category,
      id: shop.id
    }));
  };

  useEffect(() => {
    if (value && isFocused) {
      setSuggestions(generateSuggestions(value));
    } else {
      setSuggestions([]);
    }
  }, [value, isFocused, allShops]);

  return (
    <div className="relative w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder}
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {value && (
          <button
            onClick={() => {
              onChange('');
              setSuggestions([]);
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
      
      {isFocused && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg py-1 border border-gray-200 max-h-60 overflow-auto">
          {suggestions.map((suggestion) => (
            <a
              key={suggestion.id}
              href={`/${suggestion.id}`}
              className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center block"
            >
              <div className="mr-3 bg-blue-100 p-2 rounded-full">
                <MapPin className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">{suggestion.name}</div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500 truncate">{suggestion.location}</span>
                  <span className="text-xs text-gray-400">{suggestion.category}</span>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400 ml-2" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

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
      ? shop.category?.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    const matchesSearch =
      shop.shop_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.location?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category) => {
    const foundCategory = fashionCategories.find(cat => 
      cat.name.toLowerCase() === category?.toLowerCase()
    );
    
    return foundCategory ? {
      bg: foundCategory.bgColor,
      text: foundCategory.textColor,
      border: foundCategory.borderColor
    } : {
      bg: "bg-gray-100",
      text: "text-gray-800",
      border: "border-gray-200"
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Discover <span className="text-blue-600">Local Boutiques</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore unique products from sellers in your community
        </p>
      </div>

      {/* Search Section */}
      <div className="mb-10 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="w-full">
            <Search
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search shops or locations..."
              allShops={shops}
            />
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
          {selectedCategory && (
            <button 
              onClick={() => setSelectedCategory("")}
              className="text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Clear filter
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {fashionCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category.name)}
              className={`rounded-xl border ${category.bgColor} ${category.borderColor} ${category.hoverColor} p-4 flex flex-col items-center transition-all duration-200 ${selectedCategory === category.name ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
            >
              <span className="text-3xl mb-3">{category.icon}</span>
              <h3 className={`font-semibold ${category.textColor}`}>{category.name}</h3>
            </button>
          ))}
        </div>
      </div>

      {/* Shop Grid */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-0">
            {selectedCategory
              ? `${selectedCategory} Boutiques`
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
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 animate-pulse"
              >
                <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-5 w-3/4 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredShops.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
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
            {filteredShops.map((shop) => {
              const categoryColors = getCategoryColor(shop.category);
              return (
                <a
                  href={`/${shop.id}`}
                  key={shop.id}
                  className="group bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-blue-200 overflow-hidden"
                >
                  <div className="flex items-start gap-4 mb-4">
                    {shop.logo ? (
                      <div className="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border border-gray-200">
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
                        className={`text-xs font-medium px-3 py-1 rounded-full ${categoryColors.bg} ${categoryColors.text} ${categoryColors.border} border`}
                      >
                        {shop.category}
                      </span>
                    )}
                    <span className="inline-flex items-center text-gray-600 text-sm font-medium group-hover:text-blue-600 transition-colors">
                      Visit Shop
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}