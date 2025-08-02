// src/pages/ShopPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Zap, ShoppingBag, Heart, Star, Loader2 } from "lucide-react";
import { getProductsByShop } from "../services/product";
import { motion } from "framer-motion";

export default function ShopPage() {
  const { shop_name } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductsByShop(shop_name);
        setProducts(data);
      } catch (err) {
        console.error("Error loading shop products:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [shop_name]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="text-sm font-medium">Back</span>
        </button>
        <h1 className="text-xl font-bold text-gray-800 text-center flex-grow">
          {shop_name}'s Store
        </h1>
        <div className="w-5" />
      </div>

      {/* Info */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4 mb-6 text-center">
        <p className="text-gray-700">Thanks for visiting our store! Browse our collection below.</p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-center mb-6">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-red-700 font-medium text-sm"
          >
            Retry
          </button>
        </div>
      )}

      {/* Section Title */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <Zap className="w-5 h-5 text-yellow-500 mr-2" fill="#f59e0b" />
          New Arrivals
        </h2>
        {!loading && (
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {products.length} items
          </span>
        )}
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-3 relative transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm"
                aria-label={favorites.includes(product.id) ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    favorites.includes(product.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-300"
                  }`}
                />
              </button>

              {/* New Badge */}
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full z-10">
                  New
                </span>
              )}

              {/* Image */}
              <div className="relative mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg aspect-square"
                  loading="lazy"
                  onClick={() => navigate(`/product/${product.id}`)}
                />
              </div>

              {/* Info */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    ₹{product.price.toLocaleString()}
                  </p>
                  {product.originalPrice && (
                    <p className="text-xs text-gray-400 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-3">
                    {product.description}
                  </p>
                </div>

                {product.rating && (
                  <div className="flex items-center bg-gray-100 px-1.5 py-0.5 rounded text-xs">
                    <Star className="w-3 h-3 text-yellow-500 mr-0.5" fill="#f59e0b" />
                    {product.rating}
                  </div>
                )}
              </div>

              {/* Discount Badge */}
              {product.discount && (
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-tr-xl rounded-bl-xl">
                  {product.discount}% OFF
                </div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <div className="text-gray-400 mb-3 text-3xl">🛒</div>
          <p className="text-gray-500 font-medium">No products available</p>
          <p className="text-gray-400 text-sm mt-1">
            Check back later for new arrivals
          </p>
        </div>
      )}
    </div>
  );
}
