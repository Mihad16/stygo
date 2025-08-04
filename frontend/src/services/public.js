// src/api.js
import axios from "axios";

// 👇 You can set this to your backend base URL
const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Replace with your production URL when deploying
});

// ✅ Fetch single shop detail by slug
export const fetchShop = (slug) => API.get(`/sellers/${slug}/`);

// ✅ Fetch products for a specific shop by slug
export const fetchShopProducts = (slug) => API.get(`/products/shop/${slug}/`);

// ✅ Optional: Add more APIs here as needed
// export const fetchAllShops = () => API.get(`/sellers/shops/`);
// export const fetchShopCategories = (slug) => API.get(`/products/shop/${slug}/categories/`);
