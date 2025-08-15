import React from "react";
import Hero from "../components/Hero";
import TrendingShop from "../components/TrendingShop";

import FeaturedCollections from "../components/FeaturedCollections";
import WhatsAppSubscribe from "../components/WhatsAppSubscribe";
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="w-full px-4 sm:px-6 md:px-8 mx-auto pb-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto">
          <Hero />
        </section>

        {/* Category Scroll */}
       
        {/* Trending Products */}
        <section className="max-w-7xl mx-auto mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 px-4">
            Trending Now
          </h2>
          <TrendingShop />
        </section>

        {/* Featured Collections */}
        <section className="max-w-7xl mx-auto mt-16">
          <FeaturedCollections />
        </section>

 
        

        {/* Newsletter */}
       <section className="max-w-7xl mx-auto mt-16">
          <WhatsAppSubscribe />
        </section>
      </main>
    </div>
  );
}