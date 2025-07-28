import React, { useEffect, useState } from "react";
import { fetchBuyerShops } from "../services/buyerShops";
import { Link } from "react-router-dom";

export default function Shops() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadShops() {
      const data = await fetchBuyerShops();
      setShops(data);
      setLoading(false);
    }

    loadShops();
  }, []);

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Featured Shops</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading shops...</p>
      ) : shops.length === 0 ? (
        <p className="text-center text-gray-400">No shops found.</p>
      ) : (
        shops.map((shop, index) => (
          <Link
            to={`/shop/${encodeURIComponent(shop.shop_name)}`} // Use shop_name in URL
            key={index}
            className="block bg-white rounded-xl shadow mb-4 p-4 hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{shop.shop_name}</h2>
            <p className="text-sm text-gray-500">{shop.location || "No location"}</p>
            <p className="text-blue-600 text-sm font-medium">View Shop →</p>
          </Link>
        ))
      )}

      <div className="text-center text-xs text-gray-400 mt-6">
        More shops coming soon!
      </div>
    </div>
  );
}
