import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboard } from "../services/dashboard";
import {
  Store,
  Plus,
  Box,
  Users,
  Settings,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [shop, setShop] = useState(null);
  const [stats, setStats] = useState({ products: 0, views: 0, orders: 0 });
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getDashboard();
        setShop(data);
        setStats({
          products: data?.product_count || 0,
          views: data?.views || 0,
          orders: data?.orders || 0,
        });
      } catch (err) {
        const status = err.response?.status;
        if (status === 401) {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          navigate("/login");
        } else {
          setError("Failed to load dashboard data");
        }
      }
    })();
  }, [navigate]);

  const handleCopyLink = () => {
    const url = `http://localhost:5173/${shop?.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar (only on desktop) */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white border-r border-gray-200">
        <div className="flex flex-col pt-5 pb-4 px-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">Seller Hub</h1>
          <nav className="space-y-2">
            <SidebarButton icon={<Store />} label="Dashboard" active />
            <SidebarButton icon={<Box />} label="Products" onClick={() => navigate("/products")} />
            <SidebarButton icon={<Users />} label="Customers" onClick={() => navigate("/customers")} />
            <SidebarButton icon={<Settings />} label="Settings" onClick={() => navigate("/settings")} />
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="md:pl-64 flex-1 p-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow mb-8">
          <h1 className="text-2xl font-bold mb-2">
            Welcome back, {shop?.shop_name || "Seller"}!
          </h1>
          <div className="flex items-center gap-3 text-sm">
            <span>
              Your shop link:{" "}
              <a
                href={`http://localhost:5173/${shop?.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-medium"
              >
                stygo.in/{shop?.slug}
              </a>
            </span>
            <button
              onClick={handleCopyLink}
              className="bg-white text-blue-700 px-3 py-1 rounded text-xs font-medium hover:bg-blue-100 transition"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* Error display */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p>{error}</p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <ActionCard
            icon={<Plus className="h-5 w-5 text-blue-600" />}
            title="Add New Product"
            description="List a new item in your store"
            bg="bg-blue-100"
            onClick={() => navigate("/add-product")}
          />
          <ActionCard
            icon={<Box className="h-5 w-5 text-green-600" />}
            title="Manage Products"
            description="Edit or remove existing items"
            bg="bg-green-100"
            onClick={() => navigate("/products")}
          />
        </div>

        {/* Recent Activity */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
          </div>
          <div className="space-y-4">
            <ActivityItem
              icon={<Users className="h-4 w-4 text-blue-600" />}
              bg="bg-blue-100"
              title="New customer inquiry"
              time="2 hours ago"
            />
            <ActivityItem
              icon={<Box className="h-4 w-4 text-green-600" />}
              bg="bg-green-100"
              title='Product "Summer Dress" was viewed'
              time="5 hours ago"
            />
            <ActivityItem
              icon={<Store className="h-4 w-4 text-purple-600" />}
              bg="bg-purple-100"
              title="New order received"
              time="1 day ago"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

// Reusable Components
const SidebarButton = ({ icon, label, onClick, active }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition ${
      active
        ? "bg-blue-50 text-blue-700"
        : "text-gray-700 hover:bg-gray-100"
    }`}
  >
    <div className="h-5 w-5">{icon}</div>
    <span>{label}</span>
  </button>
);

const ActionCard = ({ icon, title, description, onClick, bg }) => (
  <button
    onClick={onClick}
    className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:shadow-md hover:border-blue-300 transition"
  >
    <div className="flex items-center space-x-3">
      <div className={`${bg} p-2 rounded-lg`}>{icon}</div>
      <div>
        <h3 className="font-medium text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  </button>
);

const ActivityItem = ({ icon, title, time, bg }) => (
  <div className="flex items-start space-x-3">
    <div className={`${bg} p-2 rounded-full`}>{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-800">{title}</p>
      <p className="text-xs text-gray-500">{time}</p>
    </div>
  </div>
);
