import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
  const displayedProducts = useMemo(() => {
    return popular
      .filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5);
  }, [popular, query]);

  // Fetch shops data
  useEffect(() => {
    if (!shopSlug) return;

    async function fetchShops() {
      try {
        const shopsData = await fetchBuyerShops();
        setShops(shopsData);
        const foundShop = shopsData.find(shop => shop.slug === shopSlug);
        setCurrentShop(foundShop || null);
        
        if (!foundShop) {
          navigate('/not-found', { replace: true });
        }
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    }

    fetchShops();
  }, [shopSlug, navigate]);

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

    fetchProducts();
  }, [shopSlug]);

  const handleMoreShopClick = () => {
    navigate(`/${shopSlug}/products`);
  };

  const handleProductClick = (productSlug) => {
    navigate(`/${shopSlug}/product/${productSlug}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-amber-10 to-amber-100 text-gray-900 flex flex-col">
      {/* Header Section */}
      <header className="px-5 pt-6 pb-4 flex items-center gap-4 border-b border-gray-100">
        <div className="flex-shrink-0">
          {currentShop?.logo ? (
            <img
              src={currentShop.logo}
              alt={`${currentShop.shop_name} logo`}
              className="w-12 h-12 rounded-full object-cover border border-gray-200"
              loading="lazy"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xl">
              {currentShop?.shop_name?.[0]?.toUpperCase() || "S"}
            </div>
          )}
        </div>

        <div className="min-w-0">
          <h1 className="text-2xl font-bold truncate">
            {currentShop?.shop_name || "Shop"}
          </h1>
          {currentShop?.location && (
            <p className="text-sm text-gray-500 truncate">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 inline-block mr-1"
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
              {currentShop.location}
            </p>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-5 pt-6 pb-4 ">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Welcome to {currentShop?.shop_name || "our shop"}
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            {currentShop?.description || "Discover our latest products and offers"}
          </p>
        </div>

        {/* Search with better accessibility */}
        <div className="mt-6 max-w-md mx-auto">
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
              className="block w-full pl-10 pr-3 py-3 border border-transparent bg-white rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent sm:text-sm shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <main className="px-5 pb-6 flex-1">
        <section className="mt-8 max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            {displayedProducts.length > 0 && (
              <button
                onClick={handleMoreShopClick}
                className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center"
              >
                View all
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
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
                  strokeWidth={1}
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
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {displayedProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.slug || product.id)}
                    className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer border border-gray-100 hover:border-amber-200"
                  >
                    <div className="aspect-square bg-gray-100 overflow-hidden relative">
                      <img
                        src={product.image || "https://via.placeholder.com/300?text=No+Image"}
                        alt={product.title || product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        loading="lazy"
                      />
                      {product.original_price && product.original_price > product.price && (
                        <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          {Math.round((1 - product.price / product.original_price) * 100)}% OFF
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-900 truncate mb-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div>
                          {product.original_price && product.original_price > product.price ? (
                            <div className="flex items-baseline">
                              <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                              <span className="ml-2 text-xs text-gray-500 line-through">₹{product.original_price}</span>
                            </div>
                          ) : (
                            <span className="text-lg font-bold text-gray-900">₹{product.price}</span> 
                          )}<br/>

                               <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {product.size}
                          </span>
                           <p className="text-xs text-gray-400 mt-1 line-clamp-3">
                  {product.description}
                </p>
                        </div>
                            
                        
                      
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {displayedProducts.length > 0 && (
                <div className="mt-8 text-center">
                  <button
                    onClick={handleMoreShopClick}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 transition-colors duration-200"
                  >
                    Browse All Products
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-6 mt-auto border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              {currentShop?.logo && (
                <img
                  src={currentShop.logo}
                  alt={`${currentShop.shop_name} logo`}
                  className="h-8 w-auto"
                />
              )}
              <p className="ml-2 text-sm text-gray-500">
                © {new Date().getFullYear()} {currentShop?.shop_name || "Our Shop"}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                to={`/${shopSlug}/products`}
                className="text-sm text-gray-500 hover:text-gray-700 mr-4"
              >
                All Products
              </Link>
              <Link
                to="/contact"
                className="text-sm text-gray-500 hover:text-gray-700 mr-4"
              >
                Contact
              </Link>
              <Link
                to="/about"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}