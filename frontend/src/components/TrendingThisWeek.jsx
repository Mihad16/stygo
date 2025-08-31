import React, { useEffect, useState } from "react";
import { Clock, ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { latest_products } from "../services/product";

export default function TrendingThisWeek() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestProducts() {
      try {
        const productData = await latest_products();
        // Get the 6 most recent products
        setProducts(productData.slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch trending products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLatestProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h3 className="text-3xl font-bold text-gray-900 flex items-center">
            <Zap className="w-6 h-6 mr-2 text-pink-500" />
            New Arrivals
          </h3>
          <p className="mt-2 text-gray-600 flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            Freshly added to our collection
          </p>
        </div>
        <Link 
          to="/products" 
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          View all products <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-3 border border-gray-100 animate-pulse">
              <div className="bg-gray-200 h-32 rounded-lg mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {products.map((product) => (
            <Link 
              key={product.id} 
              to={`/product/${product.id}`}
              className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <img
                  src={product.image_url || "/placeholder.png"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder.png";
                  }}
                />
                {/* New badge for recent products */}
                <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  New
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-medium text-sm text-gray-900 truncate mb-1">
                  {product.name}
                </h4>
                <p className="text-sm font-semibold text-pink-600">
                  ₹{product.price?.toLocaleString() || '0'}
                </p>
                {product.original_price && product.original_price > product.price && (
                  <p className="text-xs text-gray-500 line-through">
                    ₹{product.original_price.toLocaleString()}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}