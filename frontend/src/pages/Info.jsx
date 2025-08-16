// Info.jsx
import React, { useEffect } from "react";
import WhatsAppSubscribe from "../components/WhatsAppSubscribe";

export default function Info() {
  useEffect(() => {
    // Set page title
    document.title = "Stygo - Mobile-First Fashion Marketplace";

    // Set meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content =
      "Stygo connects local buyers and sellers in Kasaragod with a mobile-first fashion marketplace. Browse, book, and communicate via WhatsApp easily.";

    // Optionally, add structured data
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Stygo",
      "url": "https://stygo.in",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://stygo.in/shops?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    });
    document.head.appendChild(script);

    return () => {
      // Clean up the script if component unmounts
      document.head.removeChild(script);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <article className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Welcome to Stygo
          </h1>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
            Stygo.in is a mobile-first fashion marketplace connecting local sellers and buyers—without the hassle of WhatsApp group selling.
          </p>
        </header>

        {/* How It Works */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-2">
            How It Works
          </h2>

          <article className="mb-8">
            <h3 className="font-semibold text-gray-700 mb-2">For Buyers</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Browse fashion products by city and category.</li>
              <li>Explore local shops and their latest collections.</li>
              <li>
                Book or inquire via{" "}
                <a
                  href="https://wa.me"
                  className="text-green-600 underline hover:text-green-700"
                >
                  WhatsApp
                </a>{" "}
                —directly connecting with the seller.
              </li>
            </ul>
          </article>

          <article className="mb-8">
            <h3 className="font-semibold text-gray-700 mb-2">For Sellers</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Register your shop on Stygo.</li>
              <li>Upload fashion products with images, descriptions, and pricing.</li>
              <li>Reach local buyers and grow your visibility.</li>
              <li>Communicate and confirm bookings easily via WhatsApp.</li>
            </ul>
          </article>
        </section>

        {/* Why Stygo */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
            Why Stygo?
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Mobile-first: Optimized for quick browsing on smartphones.</li>
            <li>Local Focus: Start from Kasaragod, connecting local sellers to nearby buyers.</li>
            <li>Easy & Simple: WhatsApp handles all communication, no complex checkout.</li>
            <li>Expandable: Today fashion, tomorrow other categories.</li>
          </ul>
        </section>

        {/* Get Started */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
            Get Started
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            <span className="font-semibold">Buyers:</span> Start browsing and
            discover unique fashion items from your city.
            <br />
            <span className="font-semibold">Sellers:</span> Register your shop
            and showcase your products to a growing audience.
          </p>
        </section>

        {/* WhatsApp Subscription */}
        <section className="max-w-3xl mx-auto mt-16">
          <WhatsAppSubscribe />
        </section>
      </article>
    </main>
  );
}
