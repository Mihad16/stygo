import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addProduct,
  updateProduct,
  getProductById,
} from "../services/product";
import { getDashboard } from "../services/dashboard";
import Toast from "../components/Toast";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [shopCategory, setShopCategory] = useState("");
  const [availableSubcategories, setAvailableSubcategories] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const editId = queryParams.get("edit");

  // Subcategory mapping based on shop's main category
  const subcategoryMapping = {
    men: [
      { value: 'men_shirts', label: 'Shirts' },
      { value: 'men_tshirts', label: 'T-Shirts' },
      { value: 'men_pants', label: 'Pants' },
      { value: 'men_jeans', label: 'Jeans' },
      { value: 'men_shorts', label: 'Shorts' },
      { value: 'men_jackets', label: 'Jackets' },
      { value: 'men_shoes', label: 'Shoes' },
      { value: 'men_accessories', label: 'Accessories' },
    ],
    women: [
      { value: 'women_tops', label: 'Tops' },
      { value: 'women_dresses', label: 'Dresses' },
      { value: 'women_pants', label: 'Pants' },
      { value: 'women_jeans', label: 'Jeans' },
      { value: 'women_skirts', label: 'Skirts' },
      { value: 'women_jackets', label: 'Jackets' },
      { value: 'women_shoes', label: 'Shoes' },
      { value: 'women_bags', label: 'Bags' },
      { value: 'women_jewelry', label: 'Jewelry' },
    ],
    kids: [
      { value: 'kids_boys_clothing', label: 'Boys Clothing' },
      { value: 'kids_girls_clothing', label: 'Girls Clothing' },
      { value: 'kids_shoes', label: 'Kids Shoes' },
      { value: 'kids_toys', label: 'Toys' },
      { value: 'kids_accessories', label: 'Kids Accessories' },
    ],
    accessories: [
      { value: 'accessories_bags', label: 'Bags' },
      { value: 'accessories_jewelry', label: 'Jewelry' },
      { value: 'accessories_watches', label: 'Watches' },
      { value: 'accessories_sunglasses', label: 'Sunglasses' },
      { value: 'accessories_belts', label: 'Belts' },
      { value: 'accessories_hats', label: 'Hats' },
    ],
    beauty: [
      { value: 'beauty_skincare', label: 'Skincare' },
      { value: 'beauty_makeup', label: 'Makeup' },
      { value: 'beauty_haircare', label: 'Hair Care' },
      { value: 'beauty_fragrances', label: 'Fragrances' },
      { value: 'beauty_tools', label: 'Beauty Tools' },
    ],
  };

  // Fetch shop category and set available subcategories
  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const dashboardData = await getDashboard();
        const category = dashboardData.category;
        setShopCategory(category);
        setAvailableSubcategories(subcategoryMapping[category] || []);
      } catch (error) {
        console.error("Failed to fetch shop data:", error);
      }
    };
    fetchShopData();
  }, []);

  useEffect(() => {
    if (editId) {
      const fetchProduct = async () => {
        try {
          const data = await getProductById(editId);
          setName(data.name);
          setPrice(data.price);
          setOriginalPrice(data.original_price);
          setSize(data.size);
          setCategory(data.category);
          setDescription(data.description);
          setPreviewImage(data.image_url || data.image);
        } catch (error) {
          console.error("Failed to load product for editing:", error);
        }
      };
      fetchProduct();
    }
  }, [editId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setErrorMsg("");

  // Image is required for creating a new product (model ImageField required)
  if (!editId && !image) {
    setLoading(false);
    setErrorMsg("Please select a product image.");
    return;
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append(
    "original_price",
    originalPrice || price // fallback if empty
  );
  formData.append("price", price);
  formData.append("size", size);
  formData.append("category", category);
  formData.append("description", description);
  if (image) {
    formData.append("image", image);
  }

  try {
    if (editId) {
      await updateProduct(editId, formData);
    } else {
      await addProduct(formData);
    }
    navigate("/my-products");
  } catch (err) {
    // Try to extract validation errors from backend
    let msg = "Failed to save product.";
    const data = err?.response?.data;
    if (data) {
      if (typeof data === "string") msg = data;
      else if (data.detail) msg = data.detail;
      else if (data.error) msg = data.error;
      else {
        // Collect field errors
        const parts = Object.entries(data).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`);
        if (parts.length) msg = parts.join(" | ");
      }
    }
    setErrorMsg(msg);
    console.error("Error saving product:", err);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        {editId ? "Edit Product" : "Add New Product"}
      </h1>

      <Toast
        open={!!errorMsg}
        message={errorMsg}
        type="error"
        onClose={() => setErrorMsg("")}
      />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
            <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">
      Original Price
    </label>
    <input
      type="number"
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      value={originalPrice}
      onChange={(e) => setOriginalPrice(e.target.value)}
      required
    />
  </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Size
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Category Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Product Category
            {shopCategory && (
              <span className="text-sm text-gray-500 ml-2">
                (Available for {shopCategory.charAt(0).toUpperCase() + shopCategory.slice(1)} shops)
              </span>
            )}
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={category || ""}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {availableSubcategories.map((subcat) => (
              <option key={subcat.value} value={subcat.value}>
                {subcat.label}
              </option>
            ))}
          </select>
          {availableSubcategories.length === 0 && shopCategory && (
            <p className="text-sm text-gray-500">
              Loading categories for {shopCategory} shops...
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Product Image
          </label>
          <div className="flex items-center space-x-4">
            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 transition-colors">
              Choose File
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-md border border-gray-200"
              />
            )}
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? editId
                ? "Updating..."
                : "Submitting..."
              : editId
              ? "Update Product"
              : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}