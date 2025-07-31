import React, { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboard";
import { Store, Plus, Box, Users, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [shop, setShop] = useState(null);
  const [stats, setStats] = useState({
    products: 0,
    views: 0,
    orders: 0
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const data = await getDashboard();
        setShop(data);
        // Mock stats - replace with actual API data
        setStats({
          products: data?.product_count || 0,
          views: data?.views || 0,
          orders: data?.orders || 0
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

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Navigation - Hidden on mobile */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white border-r border-gray-200">
        <div className="flex-1 flex flex-col pt-5 pb-4">
          <div className="flex items-center justify-center px-4 mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Seller Hub</h1>
          </div>
          <nav className="flex-1 space-y-2 px-4">
            <button
              className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg bg-blue-50 text-blue-700"
            >
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
        <div className="px-4 py-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"
          >
            <LogOut className="h-5 w-5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:pl-64 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg mb-8">
            <h1 className="text-2xl font-bold mb-1">Welcome back, {shop?.shop_name || "Seller"}!</h1>
            <p className="opacity-90">Here's what's happening with your store today</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
              <p>{error}</p>
            </div>
          )}

          {/* Stats Cards */}
         
          {/* Quick Actions */}
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
                  <p className="text-sm text-gray-500">List a new item in your store</p>
                </div>
              </div>
              <div className="text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
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
                  <p className="text-sm text-gray-500">Edit or remove existing items</p>
                </div>
              </div>
              <div className="text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </button>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">New customer inquiry</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Box className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Product "Summer Dress" was viewed</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Store className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">New order received</p>
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