import React, { useEffect, useState } from "react";
import { TrendingUp, ArrowRight, Star, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchBuyerShops } from "../services/buyerShops";
import { getProductsByShop } from "../services/product";

export default function TrendingShop() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrendingShops() {
      try {
        const shopData = await fetchBuyerShops();
        
        // Fetch products for each shop
        const shopsWithProducts = await Promise.all(
          shopData.map(async (shop) => {
            try {
              const products = await getProductsByShop(shop.slug);
              return {
                ...shop,
                products: products.slice(0, 3), // Take 3 products
                totalProducts: products.length
              };
            } catch (error) {
              console.error(`Failed to fetch products for shop ${shop.slug}:`, error);
              return {
                ...shop,
                products: [],
                totalProducts: 0
              };
            }
          })
        );
        
        // Sort shops by creation date (newest first) and take top 5
        const sortedShops = shopsWithProducts
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 5);
        
        setShops(sortedShops);
      } catch (error) {
        console.error("Failed to fetch trending shops:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTrendingShops();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h3 className="text-3xl font-bold text-gray-900 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-pink-500" />
            Trending Shops
          </h3>
          <p className="mt-2 text-gray-600">Discover the most popular shops</p>
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
            <div key={i} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 animate-pulse">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gray-200"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="bg-gray-100 h-20 rounded"></div>
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
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              {/* Shop Header */}
              <Link 
                to={`/${shop.slug}`}
                className="flex items-center space-x-4 p-6 hover:bg-gray-50 transition-colors border-b border-gray-100"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
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
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1 group-hover:text-pink-600 transition-colors">
                    {shop.shop_name}
                  </h3>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm text-gray-600">Trending</span>
                    </div>
                    <div className="flex items-center">
                      <Package className="w-4 h-4 text-blue-500 mr-1" />
                      <span className="text-sm text-gray-600">
                        {shop.totalProducts} {shop.totalProducts === 1 ? 'Product' : 'Products'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Shop Products */}
              <div className="p-6">
                <div className="grid grid-cols-3 gap-3">
                  {shop.products && shop.products.length > 0 ? (
                    shop.products.map((product) => (
                      <Link 
                        key={product.id} 
                        to={`/product/${product.id}`}
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
                          <p className="text-xs text-gray-600">₹{product.price?.toLocaleString() || '0'}</p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="col-span-3 text-center py-4 text-sm text-gray-500">
                      No products available
                    </div>
                  )}
                </div>
                
                {/* View More Products Link */}
                {shop.totalProducts > 3 && (
                  <div className="mt-4 text-center">
                    <Link 
                      to={`/${shop.slug}`}
                      className="text-sm text-pink-600 hover:text-pink-700 font-medium"
                    >
                      View all {shop.totalProducts} products →
                    </Link>
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