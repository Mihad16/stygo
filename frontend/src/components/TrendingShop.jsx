import React, { useEffect, useState } from "react";
import { Star, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchBuyerShops } from "../services/buyerShops"; // ✅ Correct API

export default function TrendingShop() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShops() {
      try {
        const data = await fetchBuyerShops();
        console.log("Fetched Shops:", data); // ✅ Check slug here

        const latestShops = data
          // .filter((shop) => shop.is_active) // optional if needed
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 6); // Show latest 6 shops

        setShops(latestShops);
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
    <div className="px-4 mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-pink-500" />
          Latest Shops
        </h2>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <SkeletonLoader key={i} />
          ))}
        </div>
      ) : shops.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shops.map((shop,index) => (
            <Link
              to={`${shop.slug}`} // ✅ uses slug for public shop page
              key={shop.id || index}

              className="bg-white shadow-sm p-4 rounded-lg hover:shadow-md transition cursor-pointer block"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={shop.logo || "/placeholder-shop.png"}
                  alt={shop.shop_name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    {shop.shop_name}
                  </h3>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Star className="w-3 h-3 mr-1 text-yellow-500" fill="#f59e0b" />
                    {shop.rating || "No rating"}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {shop.total_products || 0} products
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-gray-500">No shops found.</div>
      )}
    </div>
  );
}
