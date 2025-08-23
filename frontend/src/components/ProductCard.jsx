// src/components/ProductCard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../services/product";
import { Heart, Zap } from "lucide-react";

export default function ProductCard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const productData = await getAllProducts();

        // Latest 4 products
        const latestProducts = productData
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 4);

        setProducts(latestProducts);
      } catch (error) {
        console.error("❌ Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="px-4 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <Zap className="w-5 h-5 text-yellow-500 mr-2" fill="#f59e0b" />
          New Arrivals
        </h2>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
          {products.length} items
        </span>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-10">
          <div className="text-gray-400 mb-3 text-3xl">🛒</div>
          <p className="text-gray-500 font-medium">No products available</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="bg-white rounded-xl shadow-sm p-3 relative transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer"
            >
              {/* Favorite button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(product.id);
                }}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm"
                aria-label={
                  favorites.includes(product.id)
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    favorites.includes(product.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-300"
                  }`}
                />
              </button>

              {/* Product image */}
              <div className="relative mb-3">
                <img
                  src={product.image_url || product.image || "/placeholder.png"}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg aspect-square"
                  loading="lazy"
                />
              </div>

              {/* Product info */}
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  ₹{product.price?.toLocaleString()}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
