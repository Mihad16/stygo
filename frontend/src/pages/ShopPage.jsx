import React from "react";
import { useParams } from "react-router-dom";

export default function ShopPage() {
  const { shop_name } = useParams();

  return (
    <div className="max-w-md mx-auto px-4 py-8 text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Welcome to {shop_name}'s Store
      </h1>
      <p className="text-gray-500 mb-4">Thanks for visiting!</p>

      <div className="text-sm text-gray-400">
        📦 Products coming soon. Stay tuned!
      </div>
    </div>
  );
}
