import React from "react";
import Hero from "../components/Hero";

import TrendingShop from "../components/TrendingShop";
import CategoryScrolling from "../components/CategoryScrolling";
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation (already responsive) */}
    

      <main className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl px-4 sm:px-6 md:px-8 mx-auto pb-28">
        {/* Hero Section */}
        <Hero />

        {/* Category Scroll */}
      <CategoryScrolling/>

        {/* Product List */}
        <TrendingShop />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* You can map multiple <ProductCard /> like below */}
       
    
        </div>
      </main>
    </div>
  );
}
