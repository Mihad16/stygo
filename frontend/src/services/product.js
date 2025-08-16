// src/services/product.js
import axios from "./axios";

// ✅ Add Product
export const addProduct = async (formData) => {
  const res = await axios.post("/api/products/create/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// ✅ Get My Products (seller dashboard)
export const getMyProducts = async () => {
  const res = await axios.get("/api/products/my/");
  return res.data;
};

// ✅ Get products from specific shop

export const getProductsByShop = async (sellerSlug) => {
  const res = await axios.get(`/api/products/products/seller/${sellerSlug}/`);
  return res.data;
};


// ✅ Latest top 3 products by shop
export const top_products_by_shop = async (shopSlug) => {
  const res = await axios.get(`/api/products/shop/${shopSlug}/latest-products/`);
  return res.data;
};

// ✅ Get single product by ID
export const getProductById = async (id) => {
  const res = await axios.get(`/api/products/${id}/`);
  return res.data;
};

// ✅ Delete product
export const deleteProduct = async (productId) => {
  const res = await axios.delete(`/api/products/${productId}/delete/`);
  return res.data;
};

// ✅ Update product
export const updateProduct = async (productId, formData) => {
  const res = await axios.patch(`/api/products/${productId}/update/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// ✅ Get products under 599
export const getProductsUnder599 = async () => {
  const res = await axios.get("/api/products/products/under-599/");
  return res.data;
};

// ✅ Get latest products
export const latest_products = async () => {
  const res = await axios.get("/api/products/products/latest/");
  return res.data;
};
