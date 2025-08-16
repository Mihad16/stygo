import React, { useEffect, useState } from "react";
import { getDashboard, updateShop } from "../services/dashboard";
import { LogOut, Edit, Store, MapPin, Phone, Tag, Link } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // Load profile
  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getDashboard();
        setProfile(data);
      } catch (err) {
        setError("Failed to load profile data");
        console.error("Profile error:", err);
      }
    }
    loadProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const handleSave = async () => {
    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(profile.slug)) {
      alert("Store link can only contain lowercase letters, numbers, and hyphens.");
      return;
    }

    try {
      await updateShop(profile);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to save profile:", err);
      alert("Failed to save changes. Try again.");
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-md w-full mx-4">
          <p className="text-red-700">{error}</p>
          <button onClick={() => window.location.reload()} className="mt-2 text-red-600 hover:text-red-500">
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="h-12 w-12 rounded-full bg-gray-200"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-gray-600 hover:text-red-600">
            <LogOut size={18} /> <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{profile.shop_name}</h2>
              </div>
              <button onClick={() => setIsEditing(!isEditing)} className="p-2 bg-white/20 hover:bg-white/30 rounded-full">
                <Edit size={18} />
              </button>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6 space-y-5">
            {/* Shop Name */}
            <EditableField
              icon={<Store size={18} />}
              label="Shop Name"
              value={profile.shop_name}
              isEditing={isEditing}
              onChange={(val) => setProfile({ ...profile, shop_name: val })}
            />

            {/* Your Store Link */}
            <EditableField
              icon={<Link size={18} />}
              label="Your Store Link"
              value={profile.slug}
              isEditing={isEditing}
              onChange={(val) => setProfile({ ...profile, slug: val })}
              prefix="Stygo.in/"
            />

            {/* Location */}
            <EditableField
              icon={<MapPin size={18} />}
              label="Location"
              value={profile.location}
              isEditing={isEditing}
              onChange={(val) => setProfile({ ...profile, location: val })}
            />

            {/* Phone Number */}
            <EditableField
              icon={<Phone size={18} />}
              label="Phone Number"
              value={profile.phone_number}
              isEditing={false} // phone is not editable
            />

            {/* Category */}
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-yellow-100 rounded-full text-yellow-600">
                <Tag size={18} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500">Category</h3>
                {isEditing ? (
                  <select
                    value={profile.category}
                    onChange={(e) => setProfile({ ...profile, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="men">Men's Fashion</option>
                    <option value="women">Women's Fashion</option>
                    <option value="kids">Kids</option>
                    <option value="accessories">Accessories</option>
                    <option value="beauty">Beauty</option>
                  </select>
                ) : (
                  <p className="text-gray-800 capitalize">{profile.category}</p>
                )}
              </div>
            </div>
          </div>

          {/* Edit Actions */}
          {isEditing && (
            <div className="px-6 pb-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          )}
        </motion.div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard title="Products" value={profile.total_products || 0} />
          <StatCard title="Views" value={profile.total_views || 0} />
          <StatCard title="Orders" value={profile.total_orders || 0} />
        </div>
      </div>
    </div>
  );
}

// Editable Field Component
const EditableField = ({ icon, label, value, isEditing, onChange, prefix }) => (
  <div className="flex items-start space-x-4">
    <div className="p-2 bg-gray-100 rounded-full text-gray-600">{icon}</div>
    <div className="flex-1">
      <h3 className="text-sm font-medium text-gray-500">{label}</h3>
      {isEditing ? (
        <div className="flex items-center">
          {prefix && <span className="mr-1 text-gray-600">{prefix}</span>}
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ) : (
        <p className="text-gray-800">{prefix ? `${prefix}${value}` : value || "Not specified"}</p>
      )}
    </div>
  </div>
);

// Stat Card
const StatCard = ({ title, value }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
    <p className="text-gray-500 text-sm">{title}</p>
    <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
  </div>
);
