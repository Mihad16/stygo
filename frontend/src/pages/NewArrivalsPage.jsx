// src/pages/NewArrivalsPage.jsx
import React from "react";

export default function NewArrivalsPage() {
  const products = [
    {
      id: 1,
      name: "Summer Cotton Shirt",
      price: 499,
      image: "https://images.unsplash.com/photo-1520975922131-a52c6e6d4d4a?w=500"
    },
    {
      id: 2,
      name: "Trendy Handbag",
      price: 899,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
      id: 3,
      name: "Sneakers",
      price: 1199,
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500"
    },
    {
      id: 4,
      name: "Elegant Dress",
      price: 1599,
      image: "https://images.unsplash.com/photo-1520974735194-49b55e0b6b77?w=500"
    }
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🆕 New Arrivals</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg shadow p-2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-600">₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
