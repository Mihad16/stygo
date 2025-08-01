// src/pages/ShopPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Loader2 } from "lucide-react";
import { getProductsByShop } from "../services/product";
import { motion } from "framer-motion";

export default function ShopPage() {
  const { shop_name } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <div className="w-5"></div>
      </div>

      {/* Welcome Note */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4 mb-6">
        <p className="text-gray-700 text-center">
          Thanks for visiting our store! Browse our collection below.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-3" />
          <p className="text-gray-500">Loading products...</p>
        </div>
      )}

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

      {/* Products */}
      {!loading && !error && (
        <>
          {products.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover"
                      loading="lazy"
                    />
                    {product.isNew && (
                      <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-gray-800 text-sm line-clamp-2 mb-1">
                      {product.name}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-green-600 font-bold">
                        ₹{product.price}
                      </span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {product.size.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-gray-700 font-medium mb-1">
                No Products Available
              </h3>
              <p className="text-gray-500 text-sm">
                This shop hasn't added any products yet.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
