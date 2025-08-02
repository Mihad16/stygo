import React, { useEffect, useState } from "react";
import { getAllProducts } from "../services/product";
import { Heart, Star, Zap } from "lucide-react";

export default function ProductCard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getAllProducts();
        const latest = data
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 4); // ✅ Only latest 6
        setProducts(latest);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const SkeletonLoader = () => (
    <div className="bg-gray-100 rounded-xl p-3 animate-pulse">
      <div className="bg-gray-200 h-40 rounded-lg mb-2"></div>
      <div className="bg-gray-200 h-4 w-3/4 mb-2 rounded"></div>
      <div className="bg-gray-200 h-3 w-1/2 rounded"></div>
    </div>
  );

  return (
    <div className="px-4 mt-6">
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

      {loading ? (
        <div className="grid grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <SkeletonLoader key={i} />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm p-3 relative transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
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

              {product.isNew && (
                <span className="absolute top-4 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full z-10">
                  New
                </span>
              )}

              <div className="relative mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg aspect-square"
                  loading="lazy"
                />
              </div>

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

              {product.discount && (
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-tr-xl rounded-bl-xl">
                  {product.discount}% OFF
                </div>
              )}
            </div>
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
