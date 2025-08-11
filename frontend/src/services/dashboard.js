// src/services/seller.js
import axios from "axios";

const API_BASE = "http://localhost:8000/api/sellers";

// ✅ Get seller dashboard
export async function getDashboard() {
  const token = localStorage.getItem("accessToken"); // ✅ corrected key

  if (!token) {
    throw new Error("No access token found");
  }

  const res = await axios.get(`${API_BASE}/dashboard/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

// ✅ Update seller profile
export async function updateShop(data) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("No access token found");
  }

  const res = await axios.patch(`${API_BASE}/shop/update/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return res.data;
}
