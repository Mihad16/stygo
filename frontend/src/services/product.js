// src/services/product.js
import axios from "./axios";

// ✅ Add Product
export const addProduct = async (formData) => {
  // Log form data for debugging
  console.log('FormData contents:');
  for (let pair of formData.entries()) {
    console.log(pair[0] + ': ', pair[1]);
  }

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  
  try {
    const res = await axios.post("/api/products/create/", formData, config);
    return res.data;
  } catch (error) {
    console.error('Error in addProduct:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ Get My Products (seller dashboard)
export const getMyProducts = async () => {
  const res = await axios.get("/api/products/my/");
  return res.data;
};

// ✅ Get all products (public)
export const getAllProducts = async () => {
  const res = await axios.get("/api/products/all/");
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
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const res = await axios.patch(`/api/products/${productId}/update/`, formData, config);
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
