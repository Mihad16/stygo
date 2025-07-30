import React, { useEffect, useState } from "react";
import { getMyProducts } from "../services/product";
import ProductCard from "../components/ProductCard";

export default function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMyProducts();
        console.log("Fetched products:", data); // ✅ Debug: check if duplicates come from backend
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 pb-16">
      <h2 className="text-xl font-semibold mb-4">My Products</h2>

      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products listed yet.</p>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
