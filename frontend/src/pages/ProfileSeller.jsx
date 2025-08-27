import React, { useEffect, useState } from "react";
import { getDashboard, updateShop, deleteShop } from "../services/dashboard";
import { LogOut, Edit, Store, MapPin, Phone, Tag, Link as LinkIcon, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
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
      } finally {
        setIsLoading(false);
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
    if (!profile?.shop_name?.trim()) {
      alert("Shop name is required");
      return;
    }

    const slugRegex = /^[a-z0-9-]+$/;
    if (profile.slug && !slugRegex.test(profile.slug)) {
      alert("Store link can only contain lowercase letters, numbers, and hyphens.");
      return;
    }

    try {
      setIsLoading(true);
      await updateShop(profile);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to save profile:", err);
      alert(err.response?.data?.error || "Failed to save changes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteShop = async () => {
    if (!window.confirm("Are you sure you want to delete your shop? This action cannot be undone and all your products will be permanently removed.")) {
      return;
    }

    try {
      setIsDeleting(true);
      await deleteShop();
      alert("Your shop has been successfully deleted.");
      handleLogout();
    } catch (err) {
      console.error("Failed to delete shop:", err);
      alert(err.response?.data?.error || "Failed to delete shop. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isLoading && !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-gray-200"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Shop Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleDeleteShop}
              disabled={isDeleting}
              className="flex items-center space-x-2 text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Delete Shop"
            >
              <Trash2 className="h-5 w-5" />
              <span className="hidden sm:inline">Delete Shop</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200"
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-2xl font-bold">{profile.shop_name}</h2>
                <p className="text-blue-100 mt-1">Manage your shop details and preferences</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
              >
                <Edit size={16} className="mr-2" />
                {isEditing ? 'Cancel Editing' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <EditableField
                  icon={<Store size={18} />}
                  label="Shop Name"
                  value={profile.shop_name || ''}
                  isEditing={isEditing}
                  onChange={(val) => setProfile({ ...profile, shop_name: val })}
                />

                <EditableField
                  icon={<LinkIcon size={18} />}
                  label="Store Link"
                  value={profile.slug || ''}
                  isEditing={isEditing}
                  onChange={(val) => setProfile({ ...profile, slug: val })}
                  prefix="stygo.in/"
                />

                <EditableField
                  icon={<MapPin size={18} />}
                  label="Location"
                  value={profile.location || 'Not specified'}
                  isEditing={isEditing}
                  onChange={(val) => setProfile({ ...profile, location: val })}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <EditableField
                  icon={<Phone size={18} />}
                  label="Contact Number"
                  value={profile.phone_number || 'Not specified'}
                  isEditing={false}
                />

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-yellow-100 rounded-full text-yellow-600 mt-1">
                    <Tag size={18} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-500">Category</h3>
                    {isEditing ? (
                      <select
                        value={profile.category || ''}
                        onChange={(e) => setProfile({ ...profile, category: e.target.value })}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      >
                        <option value="">Select a category</option>
                        <option value="men">Men's Fashion</option>
                        <option value="women">Women's Fashion</option>
                        <option value="kids">Kids</option>
                        <option value="accessories">Accessories</option>
                        <option value="beauty">Beauty</option>
                      </select>
                    ) : (
                      <p className="text-gray-800 capitalize">
                        {profile.category || 'Not specified'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Save/Cancel Buttons */}
            {isEditing && (
              <div className="pt-4 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isLoading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Stats Overview */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Shop Overview</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard 
              title="Total Products" 
              value={profile.total_products || 0} 
              icon="📦"
              color="blue"
            />
            <StatCard 
              title="Total Orders" 
              value={profile.total_orders || 0}
              icon="🛒"
              color="green"
            />
            <StatCard 
              title="Total Views" 
              value={profile.total_views || 0}
              icon="👁️"
              color="purple"
            />
            <StatCard 
              title="Total Revenue" 
              value={`₹${(profile.total_revenue || 0).toLocaleString()}`}
              icon="💰"
              color="yellow"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

// Editable Field Component
const EditableField = ({ icon, label, value, isEditing, onChange, prefix }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="p-2 bg-gray-100 rounded-full text-gray-600 mt-1">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-500">{label}</h3>
        {isEditing ? (
          <div className="mt-1">
            {prefix && <span className="text-gray-500 mr-2">{prefix}</span>}
            <input
              type="text"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        ) : (
          <p className="text-gray-900 mt-1">
            {prefix && <span className="text-gray-500">{prefix}</span>}
            {value || 'Not specified'}
          </p>
        )}
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon, color = 'blue' }) => {
  const colorVariants = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-green-50 text-green-700',
    purple: 'bg-purple-50 text-purple-700',
    yellow: 'bg-yellow-50 text-yellow-700',
    red: 'bg-red-50 text-red-700',
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 rounded-md p-3 ${colorVariants[color]}`}>
            <span className="text-xl">{icon}</span>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold">{value}</div>
            </dd>
          </div>
        </div>
      </div>
    </div>
  );
};
