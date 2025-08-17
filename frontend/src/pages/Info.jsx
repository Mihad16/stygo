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
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-4">
            Stygo.in is a mobile-first multi-vendor fashion marketplace connecting local sellers and buyers directly through WhatsApp.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-amber-800 font-medium text-sm">
              <strong>Important:</strong> Stygo is a marketplace platform only. We don't handle payments or deliveries. 
              All transactions and arrangements are made directly between buyers and sellers via WhatsApp.
            </p>
          </div>
        </header>

        {/* How It Works */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-2">
            How It Works
          </h2>

          <article className="mb-8">
            <h3 className="font-semibold text-gray-700 mb-2">For Buyers</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Browse fashion products from multiple vendors by city and category.</li>
              <li>Explore local shops and their latest collections on our marketplace.</li>
              <li>
                Contact sellers directly via{" "}
                <a
                  href="https://wa.me"
                  className="text-green-600 underline hover:text-green-700"
                >
                  WhatsApp
                </a>{" "}
                to inquire about products, pricing, and availability.
              </li>
              <li className="text-red-600 font-medium">
                <strong>Note:</strong> Negotiate prices, payment methods, and delivery directly with sellers. 
                Stygo doesn't handle transactions or shipping.
              </li>
            </ul>
          </article>

          <article className="mb-8">
            <h3 className="font-semibold text-gray-700 mb-2">For Sellers</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Register your shop on Stygo's multi-vendor platform.</li>
              <li>Upload fashion products with images, descriptions, and pricing.</li>
              <li>Reach local buyers and grow your visibility in the marketplace.</li>
              <li>Receive direct WhatsApp messages from interested buyers.</li>
              <li className="text-blue-600 font-medium">
                <strong>You handle:</strong> Customer communication, pricing negotiations, 
                payments, and product delivery/pickup arrangements.
              </li>
            </ul>
          </article>
        </section>

        {/* Why Stygo */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
            Why Stygo?
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li><strong>Multi-Vendor Marketplace:</strong> Multiple sellers showcase their products in one platform.</li>
            <li><strong>Mobile-first:</strong> Optimized for quick browsing on smartphones.</li>
            <li><strong>Local Focus:</strong> Starting from Kasaragod, connecting local sellers to nearby buyers.</li>
            <li><strong>Direct Communication:</strong> WhatsApp handles all buyer-seller communication - no middleman.</li>
            <li><strong>No Transaction Fees:</strong> We don't process payments, so sellers keep 100% of their earnings.</li>
            <li><strong>Flexible Arrangements:</strong> Buyers and sellers arrange their own delivery, pickup, or meeting points.</li>
            <li><strong>Expandable:</strong> Today fashion, tomorrow other categories.</li>
          </ul>
        </section>

        {/* Our Team */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-2">
            Our Team
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <div className="flex-shrink-0">
              <img
                src="/images/mihad.jpg"
                alt="Mihad - Founder & Developer"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='1.5'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E";
                }}
              />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Mihad</h3>
              <p className="text-blue-600 font-semibold mb-3">Founder & Developer</p>
              <p className="text-gray-600 leading-relaxed">
                The visionary behind Stygo, Mihad is passionate about connecting local businesses 
                with their communities through technology. With expertise in full-stack development 
                and a deep understanding of local market needs, he created Stygo to revolutionize 
                how fashion businesses operate in smaller cities.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  React Developer
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  Django Expert
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Entrepreneur
                </span>
              </div>
            </div>
          </div>
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
