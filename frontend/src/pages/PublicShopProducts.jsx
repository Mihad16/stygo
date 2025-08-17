import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBuyerShops } from "../services/buyerShops";
import { getProductsByShop } from "../services/product";
import { FiSearch, FiShoppingBag, FiStar, FiArrowRight, FiEye, FiArrowLeft, FiGrid, FiList } from "react-icons/fi";
import PublicTopNav from "../components/PublicTopNav";

export default function PublicShopProducts() {
  const { shopSlug } = useParams();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentShop, setCurrentShop] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("newest");

  const displayedProducts = useMemo(() => {
    let filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        (product.description &&
          product.description.toLowerCase().includes(query.toLowerCase()))
    );

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-high":
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // newest
        filtered.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    }

    return filtered;
  }, [products, query, sortBy]);

  // Fetch shop data
  useEffect(() => {
    if (!shopSlug) return;

    async function fetchShop() {
      try {
        const shopsData = await fetchBuyerShops();
        const foundShop = shopsData.find((shop) => shop.slug === shopSlug);
        setCurrentShop(foundShop || null);

        if (!foundShop) {
          navigate("/not-found", { replace: true });
        }
      } catch (error) {
        console.error("Error fetching shop:", error);
      }
    }

    fetchShop();
  }, [shopSlug, navigate]);

  // Fetch all products
  useEffect(() => {
    if (!shopSlug) return;

    async function fetchProducts() {
      setLoading(true);
      try {
        const data = await getProductsByShop(shopSlug);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [shopSlug]);

  const handleProductClick = (productSlug) => {
    navigate(`/${shopSlug}/product/${productSlug}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
    

      {/* Header Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            {/* Header Row */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate(`/${shopSlug}`)}
                className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FiArrowLeft className="mr-2 w-5 h-5" />
                <span className="hidden sm:inline">Back to Shop</span>
                <span className="sm:hidden">Back</span>
              </button>

              {/* View Toggle - Mobile Friendly */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Title Section */}
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
                <FiShoppingBag className="mr-2 sm:mr-3 text-blue-600" />
                All Products
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                {currentShop?.shop_name && `From ${currentShop.shop_name}`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400 w-5 h-5" />
              </div>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
              />
            </div>

            {/* Sort and Results Count */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <span className="text-sm text-gray-600 order-2 sm:order-1">
                {displayedProducts.length} of {products.length} products
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 order-1 sm:order-2"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-2" : "grid-cols-1"}`}>
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                <div className="bg-gray-200 h-64"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto h-32 w-32 text-gray-300 mb-8">
              <FiShoppingBag className="w-full h-full" />
            </div>
            <h3 className="text-3xl font-semibold text-gray-900 mb-4">
              No products found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto text-lg mb-6">
              {query ? "Try a different search term" : "This shop currently has no products available"}
            </p>
            {query && (
              <button
                onClick={() => setQuery("")}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-2" : "grid-cols-1"}`}>
            {displayedProducts.map((product) => (
              <div
                key={product.id}
                className={`bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group border border-gray-100 hover:border-blue-200 ${
                  viewMode === "list" ? "flex" : "hover:-translate-y-1"
                }`}
                onClick={() => handleProductClick(product.id)}
              >
                <div className={`relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden ${
                  viewMode === "list" ? "w-48 h-32" : "h-64"
                }`}>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <FiShoppingBag className="w-16 h-16 text-gray-300" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {product.category && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-white/95 text-gray-700 backdrop-blur-sm shadow-sm">
                        {product.category}
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                      <FiEye className="w-4 h-4 text-gray-700" />
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                      <div className="flex items-center mt-1">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <FiStar key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">(4.5)</span>
                      </div>
                    </div>
                    <button 
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-all duration-200 group-hover:scale-110 shadow-lg"
                      aria-label={`View ${product.name} details`}
                    >
                      <FiArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}