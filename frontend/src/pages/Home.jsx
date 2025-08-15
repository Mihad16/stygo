import React from "react";
import Hero from "../components/Hero";
import TrendingShop from "../components/TrendingShop";
import FeaturedCollections from "../components/FeaturedCollections";
import WhatsAppSubscribe from "../components/WhatsAppSubscribe";
import { FiShoppingBag, FiTruck, FiShield, FiGift } from "react-icons/fi";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="w-full px-4 sm:px-6 md:px-8 mx-auto">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto" aria-labelledby="hero-heading">
          <Hero />
        </section>

        

        {/* Trending Products */}
        <section className="max-w-7xl mx-auto mt-16" aria-labelledby="trending-products">
          <div className="text-center mb-10">
           
            <p className="mt-3  max-w-2xl mx-auto">
       
            </p>
          </div>
          <TrendingShop />
        </section>

        {/* Featured Collections */}
        <section className="max-w-7xl mx-auto mt-24 py-12  rounded-xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Shop By Collection
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Curated selections for every style and occasion
            </p>
          </div>
          <FeaturedCollections />
        </section>

        

        {/* WhatsApp CTA */}
        <section className="max-w-7xl mx-auto mt-24">
          <WhatsAppSubscribe />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}