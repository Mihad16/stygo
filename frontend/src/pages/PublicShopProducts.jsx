import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductsByShop } from "../services/product";
import { ShoppingBag, Loader2, AlertCircle } from "lucide-react";

function PublicShopProducts() {
  const { shopSlug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!shopSlug) return;

    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductsByShop(shopSlug);

        // Sort descending by created_at, get latest 5
        const latestFive = data
          .slice()
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 5);

        setProducts(latestFive);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [shopSlug]);

  const calculateDiscountPercentage = (originalPrice, salePrice) => {
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <p className="mt-4 text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <AlertCircle className="h-8 w-8 text-red-500" />
        <p className="mt-4 text-gray-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center mb-6 px-2 sm:px-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Latest Products</h1>
       
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg mx-2 sm:mx-0">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No products available</h3>
          <p className="mt-1 text-gray-500">This shop hasn't added any products yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 sm:gap-6 px-2 sm:px-0">
          {products.map((product) => {
            const hasDiscount = product.original_price && product.original_price > product.price;
            const discountPercentage = hasDiscount
              ? calculateDiscountPercentage(product.original_price, product.price)
              : 0;

            return (
              <Link
                key={product.id || product.slug}
                to={`/${shopSlug}/product/${product.slug || product.id}`}
                className="group relative bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
              >
                {hasDiscount && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                    {discountPercentage}% OFF
                  </span>
                )}

                <div className="aspect-square w-full bg-gray-100 overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <ShoppingBag className="h-10 w-10 sm:h-12 sm:w-12" />
                    </div>
                  )}
                </div>

                <div className="p-3 sm:p-4">
                  <h2 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                    {product.name}
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-gray-600 line-clamp-2 min-h-[40px]">
                    {product.description || "No description available"}
                  </p>

                  <div className="mt-2 sm:mt-3 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Size: {product.size || "N/A"}
                    </span>
                    <div className="text-right">
                      {hasDiscount ? (
                        <>
                          <span className="text-sm sm:text-base text-gray-900 font-bold">
                            ₹{product.price}
                          </span>
                          <span className="block text-xs text-gray-500 line-through">
                            ₹{product.original_price}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm sm:text-base text-gray-900 font-bold">
                          ₹{product.price}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="mt-1 sm:mt-2 text-xs text-gray-400">
                    Added {new Date(product.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PublicShopProducts;