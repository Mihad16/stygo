import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchBuyerShops } from "../services/buyerShops";
import { getProductsByShop } from "../services/product";
import { FiSearch, FiMapPin, FiShoppingBag, FiStar, FiPhone, FiArrowRight, FiEye } from "react-icons/fi";
import { BsWhatsapp } from "react-icons/bs";
import PublicTopNav from "../components/PublicTopNav";

export default function PublicShopHome() {
  const { shopSlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shops, setShops] = useState([]);
  const [currentShop, setCurrentShop] = useState(null);

  const displayedProducts = useMemo(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        (product.description &&
          product.description.toLowerCase().includes(query.toLowerCase()))
    );
    // Show only 6 products on home page
    return filtered.slice(0, 6);
  }, [products, query]);

  // Fetch shops data
  useEffect(() => {
    if (!shopSlug) return;

    async function fetchShops() {
      try {
        const shopsData = await fetchBuyerShops();
        setShops(shopsData);
        const foundShop = shopsData.find((shop) => shop.slug === shopSlug);
        setCurrentShop(foundShop || null);

        if (!foundShop) {
          navigate("/not-found", { replace: true });
        }
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    }

    fetchShops();
  }, [shopSlug, navigate]);

  // Fetch products
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
    

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
        {/* Modern Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-600/20"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Shop Logo & Name */}
            <div className="flex flex-col items-center mb-8">
              {currentShop?.logo ? (
                <div className="relative">
                  <img
                    src={currentShop.logo}
                    alt={`${currentShop.shop_name} logo`}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white/30 shadow-2xl"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-3xl border-4 border-white/30 shadow-2xl">
                  {currentShop?.shop_name?.[0]?.toUpperCase() || "S"}
                </div>
              )}
              <h1 className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight">
                {currentShop?.shop_name || "Our Shop"}
              </h1>
              {currentShop?.location && (
                <p className="mt-2 flex items-center justify-center text-white/80 text-lg">
                  <FiMapPin className="mr-2" />
                  {currentShop.location}
                </p>
              )}
            </div>
            
            {/* Description */}
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
              {currentShop?.description || "Discover our amazing collection of quality products"}
            </p>
            
            {/* Contact Buttons */}
            {currentShop?.phone && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <a
                  href={`tel:${currentShop.phone}`}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 hover:scale-105 shadow-lg"
                >
                  <FiPhone className="mr-3 w-5 h-5" />
                  Call Now
                </a>
                <a
                  href={`https://wa.me/${currentShop.phone.replace(/[^0-9]/g, '')}?text=Hi! I'm interested in your products from ${currentShop.shop_name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <BsWhatsapp className="mr-3 w-5 h-5" />
                  WhatsApp
                </a>
              </div>
            )}
            
            {/* Search Bar */}
            <div className="max-w-lg mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400 w-5 h-5" />
                </div>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search our products..."
                  className="block w-full pl-12 pr-4 py-4 border-0 rounded-2xl bg-white/95 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:bg-white focus:outline-none shadow-xl transition-all duration-300 text-lg"
                  aria-label="Search products"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Products Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                <FiShoppingBag className="mr-3 text-blue-600" />
                Featured Products
              </h2>
              <p className="text-gray-600 mt-2 text-lg">Discover our top picks just for you</p>
            </div>
            <div className="flex items-center gap-4">
              {displayedProducts.length > 0 && (
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Showing {displayedProducts.length} of {products.length} products
                </span>
              )}
              <button
                onClick={() => navigate(`/${shopSlug}/products`)}
                className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                View All
                <FiArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-t-2xl"></div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer group border border-gray-100 hover:border-blue-200 hover:-translate-y-2"
                  onClick={() => handleProductClick(product.id)}
                  aria-label={`View ${product.name}`}
                >
                  <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                    <img
                      src={product.image_url || "/placeholder.png"}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {product.category && (
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-gray-700 backdrop-blur-sm shadow-sm">
                          {product.category}
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                        <FiEye className="w-5 h-5 text-gray-700" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 text-xl mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                        <div className="flex items-center mt-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <FiStar key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">(4.5)</span>
                        </div>
                      </div>
                      <button 
                        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-all duration-200 group-hover:scale-110 shadow-lg"
                        aria-label={`View ${product.name} details`}
                      >
                        <FiArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Shop Info */}
            <div className="space-y-4">
              <div className="flex items-center">
                {currentShop?.logo ? (
                  <img
                    src={currentShop.logo}
                    alt={`${currentShop.shop_name} logo`}
                    className="h-10 w-10 rounded-full object-cover border-2 border-white/20"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
                    {currentShop?.shop_name?.[0]?.toUpperCase() || "S"}
                  </div>
                )}
                <h4 className="ml-3 text-xl font-bold">{currentShop?.shop_name || "Our Shop"}</h4>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {currentShop?.description || "Quality products at great prices"}
              </p>
              {currentShop?.location && (
                <p className="flex items-center text-gray-300">
                  <FiMapPin className="mr-2" />
                  {currentShop.location}
                </p>
              )}
            </div>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Contact Us</h4>
              {currentShop?.phone && (
                <div className="space-y-3">
                  <a
                    href={`tel:${currentShop.phone}`}
                    className="flex items-center text-gray-300 hover:text-white transition-colors"
                  >
                    <FiPhone className="mr-3" />
                    {currentShop.phone}
                  </a>
                  <a
                    href={`https://wa.me/${currentShop.phone.replace(/[^0-9]/g, '')}?text=Hi! I'm interested in your products`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-green-400 hover:text-green-300 transition-colors"
                  >
                    <BsWhatsapp className="mr-3" />
                    WhatsApp
                  </a>
                </div>
              )}
            </div>
            
            {/* Quick Stats */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Shop Stats</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">Total Products:</span>
                  <span className="font-semibold">{products.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Categories:</span>
                  <span className="font-semibold">{new Set(products.map(p => p.category).filter(Boolean)).size || 1}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-300 mr-2">Rating:</span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="ml-1 font-semibold">4.5</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              {new Date().getFullYear()} {currentShop?.shop_name || "Our Shop"}. All rights reserved.
            </p>
            <p className="text-gray-500 mt-4 md:mt-0">
              Powered by <span className="text-amber-400 font-semibold">Stygo</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}