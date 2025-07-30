// src/services/product.js
import axios from "./axios";

// ✅ Add Product
export const addProduct = async (formData) => {
  const res = await axios.post("/api/products/create/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// ✅ Get My Products (seller dashboard)
export const getMyProducts = async () => {
  const res = await axios.get("/api/products/my/");
  return res.data;
};

// ✅ Get All Products (public homepage)
export const getAllProducts = async () => {
  const res = await axios.get("/api/products/all/");
  return res.data;
};

// ✅ Get products from specific shop
export const getProductsByShop = async (shopName) => {
  const res = await axios.get(`/api/products/shop/${shopName}/`);
  return res.data;
};
