import React from "react";
import { CategoryScroller } from "../components/CategoryScroller";
import Hero from "../components/Hero";
import TopNav from "../components/TopNav";
import ProductCard from "../components/ProductCard";

export default function Home() {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 pb-24 mx-auto max-w-md sm:max-w-lg md:max-w-2xl">
      {/* Top Navigation */}
      <TopNav />

      {/* Hero Section */}
      <Hero />

      {/* Category Scroll */}
      <CategoryScroller />

      {/* Product List */}
      <div className="mt-4">
        <ProductCard />
        
      </div>
    </div>
  );
}
