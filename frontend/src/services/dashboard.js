// src/services/seller.js
import axios from "axios";

const API_BASE = "http://localhost:8000/api/sellers/";

// ✅ Get seller dashboard
export async function getDashboard() {
  const token = localStorage.getItem("accessToken"); // ✅ corrected key

  if (!token) {
    throw new Error("No access token found");
  }

  const res = await axios.get(`${API_BASE}dashboard/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function updateShop(shopData) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("No access token found");
  }

  const formData = new FormData();
  for (const key in shopData) {
    formData.append(key, shopData[key]);
  }

  const res = await axios.put(`${API_BASE}shop/update/`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}

