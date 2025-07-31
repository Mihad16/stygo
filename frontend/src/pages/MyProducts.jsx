import React, { useEffect, useState } from "react";
import { getMyProducts } from "../services/product";
import ProductCard from "../components/ProductCard";
import { Plus, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getMyProducts();
        setProducts(data);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="max-w-md mx-auto px-4 pb-20 pt-4 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Products</h1>
        <Link
          to="/products/new"
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-center">
          {error}
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 text-red-700 font-medium text-sm"
          >
            Retry
          </button>
        </div>
      ) : loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-3" />
          <p className="text-gray-500">Loading your products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-1">
            No products yet
          </h3>
          <p className="text-gray-500 mb-4">
            You haven't added any products to your store.
          </p>
          <Link
            to="/products/new"
            className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Your First Product
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              editable 
              className="border border-gray-200 hover:border-blue-200 transition-colors"
            />
          ))}
        </div>
      )}
    </div>
  );
}