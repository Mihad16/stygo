// src/services/seller.js
import api from "./axios";

const API_BASE = "/api/sellers/";

// ✅ Get seller dashboard
export async function getDashboard() {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("No access token found");
  const res = await api.get(`${API_BASE}dashboard/`);
  return res.data;
}

export async function updateShop(shopData) {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("No access token found");

  const formData = new FormData();
  for (const key in shopData) {
    formData.append(key, shopData[key]);
  }

  const res = await api.put(`${API_BASE}shop/update/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

// Delete seller's shop
export async function deleteShop() {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("No access token found");
  
  const res = await api.delete(`${API_BASE}shop/delete/`);
  return res.data;
}

