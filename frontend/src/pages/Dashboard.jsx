import React, { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboard";
import { Store } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [shop, setShop] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const data = await getDashboard();
        setShop(data);
      } catch (err) {
        console.error("Dashboard error:", err.response?.data || err.message);
        if (err.response?.status === 401) {
          // Token invalid or expired
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          navigate("/login"); // redirect to login
        } else {
          setError("⚠️ Could not fetch your shop info.");
        }
      }
    };
    fetchShop();
  }, []);

  return (
    <div className="max-w-md mx-auto px-4 py-10 pb-28">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">👋 Hello Seller!</h1>
      <h2 className="text-xl text-gray-700 font-medium mb-4">
        Welcome, {shop?.shop_name || "Your Shop"}!
      </h2>
      <p className="text-sm text-gray-500 mb-6">Here's your shop dashboard</p>

      {error ? (
        <div className="bg-red-100 text-red-700 p-3 rounded-xl font-medium shadow">
          {error}
        </div>
      ) : (
        <div className="bg-green-50 text-green-800 flex items-center justify-center gap-2 px-4 py-4 rounded-2xl text-lg font-semibold shadow">
          <Store size={22} />
          {shop?.shop_name || "Loading..."}
        </div>
      )}

      <button
        onClick={() => navigate("/add-product")}
        className="bg-green-600 text-white font-semibold py-2 px-4 rounded-xl shadow hover:bg-green-700 transition duration-200 w-full mt-6"
      >
        ➕ Add Product
      </button>
    </div>

    <div className="mt-10">
      <div className="bg-white rounded-xl shadow p-5 text-center text-gray-500 text-sm">
        📦 Your products will appear here.
      </div>
    </div>
  </div>
  );
}
