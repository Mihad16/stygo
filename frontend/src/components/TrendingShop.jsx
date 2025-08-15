import React, { useEffect, useState } from "react";
import { TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchBuyerShops } from "../services/buyerShops";
import { top_products_by_shop } from "../services/product";

export default function TrendingShop() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShopsAndProducts() {
      try {
        const shopData = await fetchBuyerShops();
        const latestShops = shopData
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 3);

        const shopsWithProducts = await Promise.all(
          latestShops.map(async (shop) => {
            const products = await top_products_by_shop(shop.slug);
            return { 
              ...shop, 
              products: products.slice(0, 3) 
            };
          })
        );

        setShops(shopsWithProducts);
      } catch (error) {
        console.error("Failed to fetch trending shops or products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchShopsAndProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-medium text-gray-500 mb-1">Discover</h2>
          <h3 className="text-3xl font-bold text-gray-900 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-pink-500" />
            Newest Shops
          </h3>
        </div>
        <Link 
          to="/shops" 
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          View all shops <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 animate-pulse">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="bg-gray-100 h-24 rounded"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops.map((shop) => (
            <div 
              key={shop.slug} 
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              <Link 
                to={`/${shop.slug}`} 
                className="flex items-center space-x-4 p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-full overflow-hidden border border-gray-200">
                  <img
                    src={shop.logo || "/placeholder-shop.png"}
                    alt={shop.shop_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder-shop.png";
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{shop.shop_name}</h3>
                  <p className="text-sm text-gray-500">New Arrivals</p>
                </div>
              </Link>

              <div className="px-6 pb-6 grid grid-cols-3 gap-3">
                {shop.products.length > 0 ? (
                  shop.products.map((product) => (
                    <Link 
                      key={product.id} 
                      to={`/product/${product.slug}`}
                      className="group"
                    >
                      <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
                        <img
                          src={product.image || "/placeholder.png"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/placeholder.png";
                          }}
                        />
                      </div>
                      <div className="mt-2">
                        <p className="text-xs font-medium text-gray-900 truncate">{product.name}</p>
                        <p className="text-xs text-gray-600">₹{product.price.toLocaleString()}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-4 text-sm text-gray-500">
                    No products available
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}