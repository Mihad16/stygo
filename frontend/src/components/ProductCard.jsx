import React from "react";
import { ShoppingBag } from "lucide-react";

export default function ProductCard({ product }) {
  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in your product: ${product.name}`
  );
  const whatsappLink = `https://wa.me/${product.whatsapp}?text=${whatsappMessage}`;

  return (
    <div className="bg-white rounded-xl shadow p-3 mb-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg mb-2"
        loading="lazy"
      />
      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      <p className="text-sm text-gray-500">Size: {product.size}</p>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-green-600 font-bold text-base">₹{product.price}</span>
        <ShoppingBag className="w-5 h-5 text-black" aria-label="Shopping bag" />
      </div>
      <p className="text-xs text-gray-400 mt-1">
        {product.seller} • {product.location}
      </p>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-green-600 text-white text-center mt-3 py-2 rounded-xl hover:bg-green-700 transition"
        aria-label={`Buy ${product.name} on WhatsApp`}
      >
        Buy on WhatsApp
      </a>
    </div>
  );
}
