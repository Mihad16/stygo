import React from "react";
import Hero from "../components/Hero";
import TrendingShop from "../components/TrendingShop";
import FeaturedCollections from "../components/FeaturedCollections";
import { FiShoppingBag, FiTruck, FiShield, FiGift } from "react-icons/fi";
import Footer from "../components/Footer";

export default function Home() {
  // SEO Metadata
  const pageTitle = "Stygo - Discover Unique Products from Local Shops";
  const pageDescription = "Explore handpicked collections from independent sellers. Find trending products, special deals, and unique items for every occasion.";

  React.useEffect(() => {
    document.title = pageTitle;
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = pageDescription;
    document.head.appendChild(metaDescription);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Stygo",
          "url": window.location.href,
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${window.location.origin}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        })}
      </script>

      <main className="w-full px-4 sm:px-6 md:px-8 mx-auto">
        {/* Hero Section with semantic heading */}
        <section 
          className="max-w-7xl mx-auto" 
          aria-labelledby="hero-heading"
          itemScope
          itemType="https://schema.org/WPHeader"
        >
          <h1 id="hero-heading" className="sr-only">Stygo Marketplace</h1>
          <Hero />
        </section>

    
   

        {/* Trending Products with semantic markup */}
        <section 
          className="max-w-7xl mx-auto mt-16" 
          aria-labelledby="trending-heading"
          itemScope
          itemType="https://schema.org/ItemList"
        >
          <div className="text-center mb-10">
            <h2 id="trending-heading" className="text-3xl md:text-4xl font-bold text-gray-900">
              Trending This Week
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Discover what other shoppers are loving right now
            </p>
          </div>
          <TrendingShop />
        </section>

        {/* Featured Collections */}
        <section 
          className="max-w-7xl mx-auto mt-24 py-12 rounded-xl"
          aria-labelledby="collections-heading"
        >
        
          <FeaturedCollections />
        </section>

      </main>

      {/* Footer with semantic markup */}
      <footer itemScope itemType="https://schema.org/WPFooter">
        <Footer />
      </footer>
    </div>
  );
}