import React, { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboard";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getDashboard();
        setProfile(data);
      } catch (err) {
        setError("Could not fetch profile");
      }
    }
    loadProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10 font-medium">
        {error}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center text-gray-600 mt-10 font-medium">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        👤 Seller Profile
      </h1>

      <div className="bg-white rounded-2xl shadow-md p-5 space-y-4 text-left">
        <div>
          <span className="font-semibold text-gray-700">Shop:</span>{" "}
          {profile.shop_name}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Location:</span>{" "}
          {profile.location}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Phone:</span>{" "}
          {profile.phone_number}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Category:</span>{" "}
          {profile.category}
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl shadow-md"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}
