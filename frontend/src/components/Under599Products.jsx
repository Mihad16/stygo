import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tag, ArrowRight, IndianRupee } from "lucide-react";
import { latest_products } from "../services/product";

export default function Under599Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductsUnder599() {
      try {
        const productData = await latest_products();
        // Filter products under 599 and get first 6 for home page
        const filteredProducts = productData
          .filter(product => product.price < 600) // Under 600 to include 599.99
          .slice(0, 6); // Show only first 6 products on home page
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Failed to fetch products under ₹599:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProductsUnder599();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h3 className="text-3xl font-bold text-gray-900 flex items-center">
            <Tag className="w-6 h-6 mr-2 text-green-600" />
            Under ₹599
          </h3>
          <p className="mt-2 text-gray-600 flex items-center">
            <IndianRupee className="w-4 h-4 mr-1" />
            Amazing deals under ₹599
          </p>
        </div>
        <Link 
          to="/products?max_price=599" 
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          View all under ₹599 <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-3 border border-gray-100 animate-pulse">
              <div className="bg-gray-200 h-32 rounded-lg mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
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
                <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                  Under ₹599
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-medium text-sm text-gray-900 truncate mb-1">
                  {product.name}
                </h4>
                <p className="text-sm font-semibold text-green-700">
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
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No products found under ₹599. Check back soon for new deals!</p>
        </div>
      )}
    </div>
  );
}
