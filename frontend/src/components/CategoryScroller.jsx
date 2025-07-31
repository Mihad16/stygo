import React, { useState } from "react";
import { motion } from "framer-motion";

const categories = [
  { name: "Men" },
  { name: "Women" },
  { name: "Kids" },
  { name: "Accessories" },
  { name: "Beauty" },
];

export function CategoryScroller() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="w-full mt-6 px-4 sm:px-6 md:px-8">
      <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
        {categories.map(({ name }) => (
          <motion.button
            key={name}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(name)}
            className={`flex items-center justify-center min-w-[80px] sm:min-w-[100px] h-10 px-4
              ${
                selectedCategory === name
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-200"
              }
              rounded-full transition-all duration-200 flex-shrink-0 text-sm sm:text-base font-medium`}
          >
            {name}
          </motion.button>
        ))}
      </div>
    </div>
  );
}