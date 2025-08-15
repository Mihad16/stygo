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


