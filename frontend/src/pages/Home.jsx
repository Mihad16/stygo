import React from "react";
import { CategoryScroller } from "../components/CategoryScroller";
import Hero from "../components/Hero";
import TopNav from "../components/TopNav";
import ProductCard from "../components/ProductCard";

const sampleProduct = {
  name: "Floral Kurti",
  price: 799,
  size: "M",
  seller: "Priya Fashion",
  location: "Delhi",
  whatsapp: "9605111666"
};

export default function Home() {
  return (
    <div className="max-w-md mx-auto pb-20 px-4">
      {/* Top Navigation */}
      <TopNav />

      {/* Hero Section */}
      <Hero />

      {/* Category Scroll */}
      <CategoryScroller />

      {/* Product List */}
      <div className="mt-4 space-y-4">
        <ProductCard product={sampleProduct} />
        <ProductCard product={sampleProduct} />
        <ProductCard product={sampleProduct} />
      </div>
    </div>
  );
}
