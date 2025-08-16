import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchBuyerShops } from "../services/buyerShops";
import { getProductsByShop } from "../services/product";
import { FiSearch, FiMapPin, FiShoppingBag } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";

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
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        (product.description &&
          product.description.toLowerCase().includes(query.toLowerCase()))
    );
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
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3 max-w-7xl mx-auto">
          <div className="flex-shrink-0">
            {currentShop?.logo ? (
              <img
                src={currentShop.logo}
                alt={`${currentShop.shop_name} logo`}
                className="w-10 h-10 rounded-full object-cover border border-gray-200"
                loading="lazy"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-bold text-xl">
                {currentShop?.shop_name?.[0]?.toUpperCase() || "S"}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <h1 className="text-lg font-semibold truncate">
              {currentShop?.shop_name || "Shop"}
            </h1>
            {currentShop?.location && (
              <p className="text-xs text-gray-500 truncate flex items-center">
                <FiMapPin className="mr-1" />
                {currentShop.location}
              </p>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white px-4 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome to {currentShop?.shop_name || "our shop"}
          </h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base opacity-90 max-w-2xl mx-auto">
            {currentShop?.description || "Discover our quality products at great prices"}
          </p>
          
          {/* Search */}
          <div className="mt-6 max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-500" />
            </div>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="block w-full pl-10 pr-4 py-3 border-0 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-amber-600 focus:outline-none"
              aria-label="Search products"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 sm:px-6 max-w-7xl mx-auto w-full">
        {/* Products Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <FiShoppingBag className="mr-2 text-amber-600" />
              Our Products
            </h3>
            {displayedProducts.length > 0 && (
              <span className="text-sm text-gray-500">
                {displayedProducts.length} {displayedProducts.length === 1 ? "item" : "items"}
              </span>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
                  <div className="bg-gray-200 h-40 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
                </div>
              ))}
            </div>
          ) : displayedProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                <FiShoppingBag className="w-full h-full" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-1">
                No products found
              </h4>
              <p className="text-gray-500 max-w-md mx-auto">
                {query ? "Try a different search term" : "This shop currently has no products available"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {displayedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer group"
                  onClick={() => handleProductClick(product.id)}
                  aria-label={`View ${product.name}`}
                >
                  <div className="relative pt-[100%] bg-gray-100 overflow-hidden">
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                    {product.description && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-bold text-gray-900">₹{product.price}</span>
                      <button 
                        className="text-amber-600 hover:text-amber-700"
                        aria-label={`View ${product.name} details`}
                      >
                        <IoIosArrowForward />
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
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              {currentShop?.logo && (
                <img
                  src={currentShop.logo}
                  alt={`${currentShop.shop_name} logo`}
                  className="h-6 w-auto"
                />
              )}
              <p className="ml-2 text-sm text-gray-500">
                © {new Date().getFullYear()} {currentShop?.shop_name || "Our Shop"}. All rights reserved.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-xs text-gray-400">
                Powered by  Stygo
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}