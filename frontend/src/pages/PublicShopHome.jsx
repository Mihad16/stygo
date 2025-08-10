import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductsByShop } from "../services/product";
import { fetchBuyerShops } from "../services/buyerShops";

export default function PublicShopHome() {
  const { shopSlug } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shops, setShops] = useState([]);
  const [currentShop, setCurrentShop] = useState(null);

  // Memoize displayed products to avoid recalculating on every render
  const displayedProducts = useMemo(() => popular.slice(0, 5), [popular]);

  // Fetch shops data
  useEffect(() => {
    if (!shopSlug) return;

    async function fetchShops() {
      try {
        const shopsData = await fetchBuyerShops();
        setShops(shopsData);
        setCurrentShop(shopsData.find(shop => shop.slug === shopSlug) || null);
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    }

    fetchShops();
  }, [shopSlug]);

  // Fetch products data
  useEffect(() => {
    if (!shopSlug) return;

    async function fetchProducts() {
      try {
        setLoading(true);
        const data = await getProductsByShop(shopSlug);
        setPopular(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    const debounceTimer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(debounceTimer);
  }, [shopSlug]);

  const handleMoreShopClick = () => {
    navigate(`/${shopSlug}/products`);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Header Section */}
      <header className="px-5 pt-6 pb-4 flex items-center gap-4">
        {/* Shop logo with better loading state */}
        <div className="flex-shrink-0">
          {currentShop?.logo ? (
            <img
              src={currentShop.logo}
              alt={`${currentShop.name} logo`}
              className="w-12 h-12 rounded-full object-cover border border-gray-200"
              loading="lazy"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xl">
              {currentShop?.name?.[0]?.toUpperCase() || "S"}
            </div>
          )}
        </div>

        <div className="min-w-0">
          <h1 className="text-2xl font-bold truncate">
            {currentShop?.name || "Shop"}
          </h1>
          {currentShop?.location && (
            <p className="text-sm text-gray-500 truncate">{currentShop.location}</p>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-5 pt-0 pb-4">
        <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900">
          Discover our new items
        </h2>

        {/* Search with better accessibility */}
        <div className="mt-5">
          <label htmlFor="search" className="sr-only">
            Search products
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              id="search"
              name="search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="block w-full pl-10 pr-3 py-3 border border-transparent bg-gray-100 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent sm:text-sm"
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <main className="px-5 pb-6 flex-1">
        <section className="mt-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Latest Products</h2>
            {displayedProducts.length > 0 && (
              <button
                onClick={handleMoreShopClick}
                className="text-sm font-medium text-amber-600 hover:text-amber-700"
              >
                View all
              </button>
            )}
          </div>

          {loading ? (
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-40 bg-gray-200 rounded-lg"></div>
                  <div className="mt-3 h-4 bg-gray-200 rounded"></div>
                  <div className="mt-2 h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : popular.length === 0 ? (
            <div className="mt-8 text-center py-12 bg-gray-50 rounded-xl">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No products available
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Check back later for new items
              </p>
            </div>
          ) : (
            <>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {displayedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      <img
                        src={product.image || "https://via.placeholder.com/300?text=No+Image"}
                        alt={product.title || product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        ₹{product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={handleMoreShopClick}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 transition-colors duration-200"
                >
                  Browse All Products
                </button>
              </div>
            </>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {currentShop?.name || "Our Shop"}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}