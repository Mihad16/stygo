import React, { useEffect, useState } from "react";
import { getProductsUnder599 } from "../services/product";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiLoader } from "react-icons/fi";

export default function Under599() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsUnder599();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Navigate to ProductDetail page
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header Section */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Go back"
            >
              <FiArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Products Under ₹599</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FiLoader className="h-12 w-12 text-gray-400 animate-spin mb-4" />
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">No products found in this range.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={() => handleProductClick(product.id)} 
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// Product Card Component
const ProductCard = ({ product, onClick }) => (
  <div 
    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col h-full cursor-pointer"
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === 'Enter' && onClick()}
  >
    <div className="relative pt-[100%] bg-gray-50">
      <img
        src={product.image}
        alt={product.name}
        className="absolute top-0 left-0 w-full h-full object-contain p-2"
        loading="lazy"
      />
    </div>
    <div className="p-3 flex-grow flex flex-col">
      <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">
        {product.name}
      </h3>
      <div className="mt-auto">
        <p className="text-base font-bold text-green-600">₹{product.price}</p>
        {product.originalPrice && (
          <p className="text-xs text-gray-500 line-through">
            ₹{product.originalPrice}
          </p>
        )}
      </div>
    </div>
  </div>
);