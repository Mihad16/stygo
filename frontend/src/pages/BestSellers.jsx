// src/pages/BestSellers.jsx
import React, { useState } from "react";

export default function BestSellers() {
  const [sort, setSort] = useState("popular");

  // Dummy product data
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      image: "https://via.placeholder.com/300x300?text=Headphones",
      price: 199.99,
      discount: 249.99,
      rating: 4.5,
    },
    {
      id: 2,
      name: "Smart Watch",
      image: "https://via.placeholder.com/300x300?text=Smart+Watch",
      price: 99.99,
      discount: null,
      rating: 4.0,
    },
    {
      id: 3,
      name: "Gaming Laptop",
      image: "https://via.placeholder.com/300x300?text=Gaming+Laptop",
      price: 1299.99,
      discount: 1499.99,
      rating: 4.8,
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      image: "https://via.placeholder.com/300x300?text=Speaker",
      price: 49.99,
      discount: 69.99,
      rating: 4.3,
    },
    {
      id: 5,
      name: "DSLR Camera",
      image: "https://via.placeholder.com/300x300?text=Camera",
      price: 899.99,
      discount: 999.99,
      rating: 4.7,
    },
    {
      id: 6,
      name: "Fitness Tracker",
      image: "https://via.placeholder.com/300x300?text=Fitness+Tracker",
      price: 59.99,
      discount: null,
      rating: 4.1,
    },
  ];

  // Optionally sort products based on selection
  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "price_low_high") return a.price - b.price;
    if (sort === "price_high_low") return b.price - a.price;
    if (sort === "new") return b.id - a.id; // assume higher id = new
    return b.rating - a.rating; // default = popular
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Best Sellers</h1>

      {/* Sort Dropdown */}
      <div className="mb-6 flex justify-end">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="popular">Most Popular</option>
          <option value="price_low_high">Price: Low → High</option>
          <option value="price_high_low">Price: High → Low</option>
          <option value="new">New Arrivals</option>
        </select>
      </div>

     <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {products.map((product) => (
    <div
      key={product.id}
      className="border rounded shadow hover:shadow-lg transition p-4 flex flex-col"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover mb-3 rounded"
      />
      <h2 className="text-md font-semibold mb-1">{product.name}</h2>
      <p className="text-gray-600 mb-1">
        ${product.price.toFixed(2)}
        {product.discount && (
          <span className="line-through text-gray-400 ml-2">
            ${product.discount.toFixed(2)}
          </span>
        )}
      </p>
      <p className="mb-2">⭐ {product.rating}</p>
      <button className="mt-auto bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
        Add to Cart
      </button>
    </div>
  ))}
</div>
    </div>
  );
}
