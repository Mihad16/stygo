import React, { Suspense, lazy } from "react";
import Hero from "../components/Hero";
import TrendingThisWeek from "../components/TrendingThisWeek";
import TrendingShop from "../components/TrendingShop";
import FeaturedCollections from "../components/FeaturedCollections";
import Footer from "../components/Footer";

// Lazy load components for better performance
const LazyTrendingThisWeek = lazy(() => import("../components/TrendingThisWeek"));
const LazyTrendingShop = lazy(() => import("../components/TrendingShop"));
const LazyFeaturedCollections = lazy(() => import("../components/FeaturedCollections"));

export default function Home() {
  // SEO Metadata
  const pageTitle = "Stygo - Discover Unique Products from Local Shops";
  const pageDescription = "Explore handpicked collections from independent sellers. Find trending products and unique items.";

  React.useEffect(() => {
    document.title = pageTitle;
    
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = pageDescription;

    // Set viewport meta tag
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      viewportMeta.content = 'width=device-width, initial-scale=1.0';
      document.head.appendChild(viewportMeta);
    }

    document.documentElement.lang = 'en';
  }, [pageTitle, pageDescription]);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="w-full px-4 sm:px-6 md:px-8 mx-auto">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto">
          <Hero />
        </section>

        {/* Trending Products */}
        <section className="max-w-7xl mx-auto mt-16">
        
          <Suspense fallback={
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-3 border border-gray-100 animate-pulse">
                  <div className="bg-gray-200 h-32 rounded-lg mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          }>
            <LazyTrendingThisWeek />
          </Suspense>
        </section>

        {/* Trending Shops */}
        <section className="max-w-7xl mx-auto mt-24">
         
          <Suspense fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 animate-pulse">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gray-200"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="bg-gray-100 h-20 rounded"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          }>
            <LazyTrendingShop />
          </Suspense>
        </section>

        {/* Featured Collections */}
        <section className="max-w-7xl mx-auto mt-24 py-12 rounded-xl">
          
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          }>
            <LazyFeaturedCollections />
          </Suspense>
        </section>
      </main>

      <Footer />
    </div>
  );
}