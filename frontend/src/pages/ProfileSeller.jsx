import React, { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboard";
import { LogOut, Edit, Store, MapPin, Phone, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

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
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSave = () => {
    // Add your save logic here
    setIsEditing(false);
    // Typically you would call an API to save changes
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-md w-full mx-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-2 text-sm text-red-600 hover:text-red-500"
              >
                Try again
              </button>
            </div>
          </div>
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
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
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
                <p className="text-blue-100">{profile.category}</p>
              </div>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              >
                <Edit size={18} />
              </button>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6 space-y-5">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                <Store size={18} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500">Shop Name</h3>
                {isEditing ? (
                  <input 
                    type="text" 
                    defaultValue={profile.shop_name} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-800">{profile.shop_name}</p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-2 bg-green-100 rounded-full text-green-600">
                <MapPin size={18} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                {isEditing ? (
                  <input 
                    type="text" 
                    defaultValue={profile.location} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-800">{profile.location || "Not specified"}</p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-2 bg-purple-100 rounded-full text-purple-600">
                <Phone size={18} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                {isEditing ? (
                  <input 
                    type="tel" 
                    defaultValue={profile.phone_number} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-800">{profile.phone_number}</p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-2 bg-yellow-100 rounded-full text-yellow-600">
                <Tag size={18} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-500">Category</h3>
                {isEditing ? (
                  <select 
                    defaultValue={profile.category}
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

          {/* Edit Mode Actions */}
          {isEditing && (
            <div className="px-6 pb-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          )}
        </motion.div>

        {/* Stats Section */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
            <p className="text-gray-500 text-sm">Products</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">24</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
            <p className="text-gray-500 text-sm">Views</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">1.2K</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
            <p className="text-gray-500 text-sm">Orders</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">56</p>
          </div>
        </div>
      </div>
    </div>
  );
}