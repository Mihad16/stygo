// src/services/seller.js

import axios from "axios";

export async function getDashboard() {
  const token = localStorage.getItem("accessToken"); // ✅ corrected key

  if (!token) {
    throw new Error("No access token found");
  }

  const res = await axios.get("http://localhost:8000/api/sellers/dashboard/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
