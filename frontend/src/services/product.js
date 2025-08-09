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

export const getProductsByShop = async (shopSlug) => {
  const res = await axios.get(`/api/products/shop/${shopSlug}/`);
  return res.data;
};

// ✅ Get single product by ID
export const getProductById = async (id) => {
  const res = await axios.get(`/api/products/${id}/`);
  return res.data;
};




export const deleteProduct = async (productId) => {
  const res = await axios.delete(`/api/products/${productId}/delete/`);
  return res.data;
};


export const updateProduct = async (productId, formData) => {
  const res = await axios.patch(`/api/products/${productId}/update/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
