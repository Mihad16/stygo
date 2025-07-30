import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getProductsByShop } from "../services/product"; // 👈 Make sure this function exists
import ProductCard from "../components/ProductCard"; // 👈 Reuse your existing product card

export default function ShopPage() {
  const { shop_name } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProductsByShop(shop_name);
        setProducts(data);
      } catch (err) {
        console.error("Error loading shop products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [shop_name]);

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      {/* ✅ Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-sm text-gray-500 hover:text-black mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back
      </button>

      {/* ✅ Shop Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Welcome to {shop_name}'s Store
      </h1>
      <p className="text-gray-500 mb-4">Thanks for visiting!</p>

      {/* ✅ Product List */}
      {loading ? (
        <div className="text-sm text-gray-400">Loading products...</div>
      ) : products.length > 0 ? (
        <div className="grid gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-sm text-gray-400">
          📦 No products found for this shop.
        </div>
      )}
    </div>
  );
}
