import React from "react";

const shops = [
  {
    name: "Trendy Threads",
    location: "Mumbai",
    category: "Women’s Fashion",
    link: "https://stygo.in/trendythreads",
  },
  {
    name: "Urban Look",
    location: "Delhi",
    category: "Men’s Wear",
    link: "https://stygo.in/urbanlook",
  },
  {
    name: "Kidzy Closet",
    location: "Bangalore",
    category: "Kids Fashion",
    link: "https://stygo.in/kidzycloset",
  },
  // Add more shops here as needed
];

export default function Shops() {
  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Featured Shops</h1>

      {shops.map((shop, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow mb-4 p-4 hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold text-gray-800">{shop.name}</h2>
          <p className="text-sm text-gray-500">{shop.category}</p>
          <p className="text-sm text-gray-400 mb-2">{shop.location}</p>
          <a
            href={shop.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 text-sm font-medium hover:underline"
          >
            Visit Shop →
          </a>
        </div>
      ))}

      <div className="text-center text-xs text-gray-400 mt-6">
        More shops coming soon!
      </div>
    </div>
  );
}
