// src/components/TrendingShop.jsx
import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchBuyerShops } from "../services/buyerShops";
import { getProductsByShop } from "../services/product";

export default function TrendingShop() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShops() {
      try {
        const shopData = await fetchBuyerShops();

        const latestShops = shopData
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 3);

        const shopsWithProducts = await Promise.all(
          latestShops.map(async (shop) => {
            if (!shop.slug) {
              console.warn("Shop slug missing for", shop);
              return { ...shop, latestProducts: [] };
            }

            let products = [];
            try {
              products = await getProductsByShop(shop.slug);
            } catch (err) {
              console.error(`Failed to fetch products for shop ${shop.slug}`, err);
            }

            const latestProducts = (products || [])
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .slice(0, 3);

            return { ...shop, latestProducts };
          })
        );

        setShops(shopsWithProducts);
      } catch (error) {
        console.error("Failed to fetch trending shops", error);
      } finally {
        setLoading(false);
      }
    }

    fetchShops();
  }, []);

  const SkeletonLoader = () => (
    <div className="p-4 rounded-lg bg-gray-100 animate-pulse h-40"></div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-pink-500" />
          Latest Shops
        </h2>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[...Array(3)].map((_, i) => (
            <SkeletonLoader key={i} />
          ))}
        </div>
      ) : shops.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {shops.map((shop, index) => (
            <div
              key={shop.slug || `shop-index-${index}`}
              className="bg-white shadow-sm p-4 rounded-lg hover:shadow-md transition hover:translate-y-[-2px]"
            >
              <Link
                to={`/${shop.slug || "#"}`}
                className="flex items-center space-x-3 sm:space-x-4 mb-4"
              >
                <img
                  src={shop.logo || "/placeholder-shop.png"}
                  alt={shop.shop_name || "Shop"}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-1">
                    {shop.shop_name || "Unknown Shop"}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    {shop.total_products || 0} products
                  </p>
                </div>
              </Link>

              {/* Latest Products */}
              <div className="grid grid-cols-3 gap-2">
                {shop.latestProducts && shop.latestProducts.length > 0 ? (
                  shop.latestProducts.map((product, i) => (
                    <Link
                      key={product.id || `product-${index}-${i}`}
                      to={`/product/${product.slug || product.id || ""}`}
                      className="block hover:opacity-90 transition"
                    >
                      <img
                        src={product.image || "/placeholder.png"}
                        alt={product.name || "Product"}
                        className="w-full h-16 sm:h-20 object-cover rounded"
                      />
                    </Link>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 col-span-3 py-4 text-center">
                    No products available
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No shops found. Check back later!
        </div>
      )}
    </div>
  );
}