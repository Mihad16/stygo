import React, { useEffect, useMemo, useState } from "react";
import { fetchBuyerShops } from "../services/buyerShops";
import Search from "../components/Search";
import { MapPin, ChevronRight, Frown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";


export default function Shops() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("relevance"); // relevance | name-asc | name-desc | location-asc | location-desc
  const pageTitle = "Discover Local Shops | Stygo";
  const pageDescription = "Browse verified shops across categories like Men, Women, Kids, Beauty, and Accessories. Find locations, explore products, and visit shop pages on Stygo.";

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

  // Basic SEO setup
  useEffect(() => {
    document.title = pageTitle;
    const meta = document.querySelector('meta[name="description"]') || document.createElement('meta');
    meta.name = 'description';
    meta.content = pageDescription;
    document.head.appendChild(meta);
  }, []);

  const filteredShops = shops.filter((shop) => {
    const matchesCategory = selectedCategory ? shop.category === selectedCategory : true;
    const matchesSearch =
      shop.shop_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.location?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedShops = useMemo(() => {
    const arr = [...filteredShops];
    switch (sortOption) {
      case "name-asc":
        return arr.sort((a, b) => String(a.shop_name || "").localeCompare(String(b.shop_name || "")));
      case "name-desc":
        return arr.sort((a, b) => String(b.shop_name || "").localeCompare(String(a.shop_name || "")));
      case "location-asc":
        return arr.sort((a, b) => String(a.location || "").localeCompare(String(b.location || "")));
      case "location-desc":
        return arr.sort((a, b) => String(b.location || "").localeCompare(String(a.location || "")));
      default:
        return arr; // relevance (API order)
    }
  }, [filteredShops, sortOption]);

  const categoriesWithCounts = useMemo(() => {
    const map = new Map();
    shops.forEach((s) => {
      const key = s.category || "other";
      map.set(key, (map.get(key) || 0) + 1);
    });
    return Array.from(map.entries())
      .map(([key, count]) => ({ key, count }))
      .sort((a, b) => a.key.localeCompare(b.key));
  }, [shops]);

  const getCategoryColor = (category) => {
    switch (category) {
      case "men": return { bg: "bg-blue-100", text: "text-blue-800" };
      case "women": return { bg: "bg-pink-100", text: "text-pink-800" };
      case "kids": return { bg: "bg-green-100", text: "text-green-800" };
      case "accessories": return { bg: "bg-purple-100", text: "text-purple-800" };
      case "beauty": return { bg: "bg-yellow-100", text: "text-yellow-800" };
      default: return { bg: "bg-gray-100", text: "text-gray-800" };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: pageTitle,
          description: pageDescription,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: shops.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Store",
                name: s.shop_name,
                address: s.location,
                url: `${window.location.origin}/${s.slug}`,
              },
            })),
          },
        })}
      </script>

      {/* Hero */}
      <header className="mb-8 relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-blue-50" aria-hidden></div>
        <div className="relative p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            Discover Shops Near You
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl">
            Browse categories, search by name or location, and visit shop pages.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-600">

          </div>
        </div>
      </header>

      {/* Search + Quick filters */}
      <div className="mb-10 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="w-full lg:w-2/3">
            <Search
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search shops or locations..."
              aria-label="Search shops or locations"
            />
          </div>
          <div className="w-full lg:w-1/3 flex items-center justify-between lg:justify-end gap-3">
            <div className="flex items-center gap-2">
              <label htmlFor="sortShops" className="text-sm text-gray-600">Sort</label>
              <select
                id="sortShops"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-2 py-2 bg-white"
                aria-label="Sort shops"
              >
                <option value="relevance">Relevance</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="location-asc">Location: A to Z</option>
                <option value="location-desc">Location: Z to A</option>
              </select>
            </div>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory("")}
                className="inline-flex items-center text-sm px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                aria-label="Clear category filter"
              >
                Clear filter
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-6 mb-10">
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold">Shop by Category</h2>
            <button
              onClick={() => setSelectedCategory("")}
              className="text-orange-600 hover:text-orange-700 font-medium flex items-center"
              aria-label="View all categories"
            >
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {categoriesWithCounts.map(({ key, count }) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-3 py-1.5 rounded-full text-sm border transition ${
                  selectedCategory === key
                    ? "bg-orange-50 text-orange-700 border-orange-200"
                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                }`}
                aria-pressed={selectedCategory === key}
                aria-label={`Filter by ${key} category`}
              >
                <span className="font-medium mr-1">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                <span className="text-gray-500">({count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Shops List */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-0">
            {selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Shops` : "All Shops"}
          </h2>
          <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
            {filteredShops.length} {filteredShops.length === 1 ? "Shop" : "Shops"} Found
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-5 w-3/4 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredShops.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100" role="status" aria-live="polite">
            <div className="mx-auto w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <Frown className="h-10 w-10 text-blue-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No shops found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
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
            {sortedShops.map((shop, index) => (
              <Link
                to={`/${shop.slug}`}
                key={index}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-100 overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-start gap-4 mb-4">
                    {shop.logo ? (
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                        <img
                          src={shop.logo}
                          alt={`${shop.shop_name} logo`}
                          className="w-full h-full object-cover"
                          onError={(e) => (e.target.style.display = "none")}
                        />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400" aria-hidden>
                        🏪
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                        {shop.shop_name}
                      </h2>
                      <div className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 text-gray-400 mr-1.5 flex-shrink-0" />
                        <p className="text-sm text-gray-500 truncate">{shop.location || "Location not specified"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    {shop.category && (
                      <span
                        className={`text-xs sm:text-sm font-medium px-2 py-1 rounded-full ${getCategoryColor(shop.category).bg} ${getCategoryColor(shop.category).text}`}
                      >
                        {shop.category.charAt(0).toUpperCase() + shop.category.slice(1)}
                      </span>
                    )}
                    <span className="inline-flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
                      Visit Shop
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
