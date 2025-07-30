import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../services/product";

export default function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", price: "", size: "", image: null });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("size", form.size);
    formData.append("image", form.image);

    try {
      await addProduct(formData);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("❌ Failed to add product");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" type="text" placeholder="Name" onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="price" type="number" placeholder="Price" onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="size" type="text" placeholder="Size" onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="image" type="file" accept="image/*" onChange={handleChange} className="w-full border p-2 rounded" required />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-xl w-full hover:bg-green-700">
          Add Product
        </button>
      </form>
    </div>
  );
}

