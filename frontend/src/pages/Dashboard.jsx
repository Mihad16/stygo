import React, { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboard";
import {
  Store,
  Plus,
  Box,
  Users,
  Settings,
  LogOut,
  ClipboardCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [shop, setShop] = useState(null);
  const [stats, setStats] = useState({
    products: 0,
    views: 0,
    orders: 0,
  });
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const data = await getDashboard();
        setShop(data);
        setStats({
          products: data?.product_count || 0,
          views: data?.views || 0,
          orders: data?.orders || 0,
        });
      } catch (err) {
        console.error("Dashboard error:", err.response?.data || err.message);
        if (err.response?.status === 401) {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          navigate("/login");
        } else {
          setError("Failed to load dashboard data");
        }
      }
    };
    fetchShop();
  }, []);

  const handleCopyLink = () => {
    const url = `http://localhost:5173/${shop.slug}`; // ✅ Correct Vite dev URL
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white border-r border-gray-200">
        <div className="flex-1 flex flex-col pt-5 pb-4">
          <div className="flex items-center justify-center px-4 mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Seller Hub</h1>
          </div>
          <nav className="flex-1 space-y-2 px-4">
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg bg-blue-50 text-blue-700">
              <Store className="h-5 w-5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => navigate("/products")}
              className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <Box className="h-5 w-5" />
              <span>Products</span>
            </button>
            <button
              onClick={() => navigate("/customers")}
              className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <Users className="h-5 w-5" />
              <span>Customers</span>
            </button>
            <button
              onClick={() => navigate("/settings")}
              className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </button>
          </nav>
        </div>
      </div>

      <div className="md:pl-64 flex flex-col">
        <main className="flex-1 p-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg mb-8">
            <h1 className="text-2xl font-bold mb-1">
              Welcome back, {shop?.shop_name || "Seller"}!
            </h1>
            <div className="flex items-center gap-3">
              <p className="text-sm opacity-90">
                Your shop link:{" "}
                <a
                  href={`http://localhost:5173/${shop?.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-medium"
                >
                  stygo.in/{shop?.slug}
                </a>
              </p>
              <button
                onClick={handleCopyLink}
                className="text-xs bg-white text-blue-700 font-medium px-3 py-1 rounded hover:bg-blue-100 transition"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
              <p>{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => navigate("/add-product")}
              className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Plus className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Add New Product</h3>
                  <p className="text-sm text-gray-500">
                    List a new item in your store
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate("/products")}
              className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:border-green-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Box className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Manage Products</h3>
                  <p className="text-sm text-gray-500">
                    Edit or remove existing items
                  </p>
                </div>
              </div>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Activity
              </h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                View All
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    New customer inquiry
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Box className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Product "Summer Dress" was viewed
                  </p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Store className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    New order received
                  </p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
