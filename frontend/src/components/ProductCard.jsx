import React, { useEffect, useState } from "react";
import { getAllProducts } from "../services/product";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products", err);
      }
    }
    fetch();
  }, []);

  return (
     <div className="px-4 mt-6">
    {products.length > 0 && (
      <>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-900">🆕 New Arrival</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm p-2 relative"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="mt-2">
                <p className="text-sm font-semibold text-gray-800">
                  ₹{product.price}
                </p>
                <p className="text-xs text-gray-500 mt-1 leading-tight">
                  {product.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </>
    )}
  </div>
  );
}
