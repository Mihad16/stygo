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
            <h2 id="trending-products" className="text-3xl md:text-4xl font-bold text-gray-900">
              Our Bestsellers
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Discover what everyone is loving this season
            </p>
          </div>
          <TrendingShop />
        </section>

        {/* Featured Collections */}
        <section className="max-w-7xl mx-auto mt-24 py-12 bg-gray-100 rounded-xl">
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

        {/* Testimonials */}
        <section className="max-w-7xl mx-auto mt-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The quality exceeded my expectations! Will definitely shop here again.",
                author: "Sarah J.",
                rating: "★★★★★"
              },
              {
                quote: "Fast shipping and excellent customer service. Highly recommend!",
                author: "Michael T.",
                rating: "★★★★★"
              },
              {
                quote: "Beautiful products at reasonable prices. My new favorite store.",
                author: "Emma L.",
                rating: "★★★★☆"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-yellow-400 mb-3">{testimonial.rating}</div>
                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                <p className="font-medium text-gray-900">— {testimonial.author}</p>
              </div>
            ))}
          </div>
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