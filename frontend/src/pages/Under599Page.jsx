import React, { useEffect, useState } from "react";
import { getProductsUnder599 } from "../services/product";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiLoader, FiRefreshCw, FiAlertCircle } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";

export default function Under599() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setRefreshing(true);
      const data = await getProductsUnder599();
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleRefresh = () => {
    fetchProducts();
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header Section */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="Go back"
              >
                <FiArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Budget Finds (Under ₹599)</h1>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Refresh"
            >
              <FiRefreshCw className={`h-5 w-5 text-gray-600 ${refreshing ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FiLoader className="h-12 w-12 text-gray-400 animate-spin mb-4" />
            <p className="text-gray-500">Loading budget products...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="flex flex-col items-center">
              <FiAlertCircle className="h-12 w-12 text-red-400 mb-4" />
              <p className="text-red-500 mb-4 max-w-md">{error}</p>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
              >
                {refreshing ? (
                  <FiLoader className="animate-spin mr-2" />
                ) : (
                  <FiRefreshCw className="mr-2" />
                )}
                Try Again
              </button>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-6 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">Currently no products available under ₹599.</p>
              <p className="text-sm text-gray-400 mt-2">Check back later for new additions!</p>
              <button
                onClick={handleRefresh}
                className="mt-4 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Showing {products.length} {products.length === 1 ? "item" : "items"}
              </p>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
              >
                {refreshing ? (
                  <>
                    <FiLoader className="animate-spin mr-1" /> Refreshing...
                  </>
                ) : (
                  <>
                    <FiRefreshCw className="mr-1" /> Refresh
                  </>
                )}
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onClick={() => handleProductClick(product.id)} 
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

// Enhanced Product Card Component
const ProductCard = ({ product, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col h-full cursor-pointer group"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <div className="relative pt-[100%] bg-gray-50">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <FiLoader className="animate-spin text-gray-300" />
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`absolute top-0 left-0 w-full h-full object-contain p-4 transition-opacity duration-200 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div className="p-3 flex-grow flex flex-col border-t border-gray-100">
        <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">
          {product.name}
        </h3>
        <div className="mt-auto">
          <div className="flex items-center">
            <FaRupeeSign className="text-green-600 text-sm" />
            <p className="text-base font-bold text-green-600 ml-1">
              {product.price.toLocaleString('en-IN')}
            </p>
          </div>
          {product.original_price && (
            <div className="flex items-center">
              <FaRupeeSign className="text-gray-400 text-xs" />
              <p className="text-xs text-gray-500 line-through ml-1">
                {product.original_price.toLocaleString('en-IN')}
              </p>
              {product.discount_percent && (
                <span className="ml-2 text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
                  {product.discount_percent}% OFF
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};