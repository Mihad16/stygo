import React from "react";
import { Shirt, Sparkles, Baby, Gem, Brush } from "lucide-react";

const categories = [
  { name: "Men", icon: Shirt },
  { name: "Women", icon: Sparkles },
  { name: "Kids", icon: Baby },
  { name: "Accessories", icon: Gem },
  { name: "Beauty", icon: Brush },
];

export function CategoryScroller() {
  return (
    <div className="overflow-x-auto whitespace-nowrap mt-4 px-2">
      {categories.map(({ name, icon: Icon }) => (
        <button
          key={name}
          className="inline-flex items-center bg-gray-100 text-sm rounded-full px-4 py-2 mr-2 hover:bg-green-100"
        >
          <Icon className="w-4 h-4 mr-2 text-green-600" />
          {name}
        </button>
      ))}
    </div>
  );
}
