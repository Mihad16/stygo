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
    <div className="px-4 sm:px-6 md:px-8 mt-4">
      <div className="flex gap-3 overflow-x-auto no-scrollbar">
        {categories.map(({ name, icon: Icon }) => (
          <div
            key={name}
            className="flex flex-col items-center justify-center min-w-[72px] sm:min-w-[80px] md:min-w-[96px] h-24 sm:h-28 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
          >
            <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-700" />
            <span className="text-xs sm:text-sm md:text-base mt-2 font-medium text-gray-800 text-center">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
