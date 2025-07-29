import React, { useEffect, useState } from "react";
import { fetchBuyerShops } from "../services/buyerShops";
import { Link } from "react-router-dom";
import Search from "../components/Search";

const categories = [
  { label: "All", value: "" },
  { label: "Men", value: "men" },
  { label: "Women", value: "women" },
  { label: "Kids", value: "kids" },
  { label: "Accessories", value: "accessories" },
  { label: "Beauty", value: "beauty" },
];

export default function Shops() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadShops() {
      const data = await fetchBuyerShops();
      setShops(data);
      setLoading(false);
    }

    loadShops();
  }, []);

  const filteredShops = shops.filter((shop) => {
    const matchesCategory = selectedCategory
      ? shop.category === selectedCategory
      : true;
    const matchesSearch = shop.shop_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
      shop.location.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Featured Shops</h1>

      {/* 🔍 Search */}
      <Search value={searchTerm} onChange={setSearchTerm} />

      {/* ✅ Category filter */}
      <div className="flex overflow-x-auto space-x-2 mb-4 pb-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`text-sm px-3 py-1 rounded-full border ${
              selectedCategory === cat.value
                ? "bg-black text-white border-black"
                : "text-gray-600 border-gray-300"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading shops...</p>
      ) : filteredShops.length === 0 ? (
        <p className="text-center text-gray-400">No shops found.</p>
      ) : (
        filteredShops.map((shop, index) => (
          <Link
            to={`/shop/${encodeURIComponent(shop.shop_name)}`}
            key={index}
            className="block bg-white rounded-xl shadow mb-4 p-4 hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-gray-800">{shop.shop_name}</h2>
            <p className="text-sm text-gray-500">{shop.location || "No location"}</p>
            <div className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full mt-2">
              {shop.category.charAt(0).toUpperCase() + shop.category.slice(1)}
            </div>
            <p className="text-blue-600 text-sm font-medium mt-2">View Shop →</p>
          </Link>
        ))
      )}

      <div className="text-center text-xs text-gray-400 mt-6">
        More shops coming soon!
      </div>
    </div>
  );
}
