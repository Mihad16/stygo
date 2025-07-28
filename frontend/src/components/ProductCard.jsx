import React from "react";

const products = [
  {
    id: 1,
    name: "UNISEX RELAXED-FIT SWEATSHIRT",
    price: 106,
    label: "SALE -40%",
    labelType: "sale",
    image: "https://via.placeholder.com/300x400", // replace with real image
  },
  {
    id: 2,
    name: "COTTON-TERRY HOODIE",
    price: 198,
    label: "NEW",
    labelType: "new",
    image: "https://via.placeholder.com/300x400",
  },
];

export default function ProductGrid() {
  return (
    <div className="px-4 mt-6">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-900">New Arrival</h2>
        <a href="#" className="text-sm text-green-600 hover:underline">
          See all
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm p-2">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              
            </div>
            <div className="mt-2">
              <p className="text-sm font-semibold text-gray-800">${product.price.toFixed(2)}</p>
              <p className="text-xs text-gray-500 mt-1 leading-tight">
                {product.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
