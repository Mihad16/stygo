import React, { useEffect, useState } from "react";
import { getMyProducts } from "../services/product";
import ProductCard from "../components/ProductCard";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MyProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const data = await getMyProducts();
        if (isMounted) {
          setProducts(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading products:", error);
        setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="max-w-md mx-auto px-4 pb-24 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">My Products</h1>
        <button
          onClick={() => navigate("/add-product")}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-xl text-sm"
        >
          <PlusCircle size={18} />
          Add Product
        </button>
      </div>

      {/* Product List */}
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-sm">No products yet. Add your first one!</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
