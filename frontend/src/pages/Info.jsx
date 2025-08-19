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
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 text-xs font-semibold ring-1 ring-emerald-200">
                Mobile‑first • Local • WhatsApp‑driven
              </span>
              <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                The local fashion marketplace that works the way you chat
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Stygo connects buyers and sellers in Kasaragod through a simple, chat‑first shopping flow. Browse, message, and buy — all via WhatsApp.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a href="/shops" className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-5 py-3 text-white font-semibold hover:bg-gray-800">
                  Explore Shops
                </a>
                <a href="/Become-a-patner" className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-gray-900 font-semibold ring-1 ring-gray-200 hover:bg-gray-50">
                  Become a Seller
                </a>
              </div>
              <p className="mt-3 text-xs text-gray-500">
                We don’t process payments or deliveries. You and the seller arrange everything directly.
              </p>
            </div>
            <div className="relative">
              <div className="rounded-3xl bg-white shadow-xl ring-1 ring-gray-100 p-6">
                <img
                  src="/images/mihad.jpg"
                  alt="Stygo Community"
                  className="w-full h-64 object-cover rounded-2xl"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='256' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='1.5'%3E%3Crect x='3' y='4' width='18' height='14' rx='2'/%3E%3Cpath d='M3 8h18'/%3E%3Ccircle cx='8' cy='11' r='2'/%3E%3Cpath d='M15 12h6'/%3E%3C/svg%3E";
                  }}
                />
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-gray-50 py-3">
                    <p className="text-xl font-bold text-gray-900">0% Fee</p>
                    <p className="text-xs text-gray-500">We don’t take cuts</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 py-3">
                    <p className="text-xl font-bold text-gray-900">WhatsApp</p>
                    <p className="text-xs text-gray-500">Direct messaging</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 py-3">
                    <p className="text-xl font-bold text-gray-900">Local</p>
                    <p className="text-xs text-gray-500">Community‑first</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Multi‑vendor in one place",
              desc: "Discover multiple shops and products without hopping apps.",
            },
            {
              title: "Chat to buy",
              desc: "Ask, negotiate, and confirm directly with sellers on WhatsApp.",
            },
            {
              title: "Mobile‑first speed",
              desc: "Designed for fast scrolling, quick filters, and clear photos.",
            },
          ].map((f, i) => (
            <div key={i} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-2 text-gray-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">How it works</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <h3 className="font-semibold text-gray-800">For Buyers</h3>
            <ol className="mt-3 list-decimal pl-5 text-gray-600 space-y-2 text-sm">
              <li>Browse shops and products by city, category, or trends.</li>
              <li>Tap WhatsApp to chat with the seller about price and availability.</li>
              <li>Arrange payment and delivery/pickup directly.</li>
            </ol>
            <p className="mt-3 text-xs text-amber-700 bg-amber-50 rounded-lg p-3">
              Note: Stygo does not process payments or deliveries.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <h3 className="font-semibold text-gray-800">For Sellers</h3>
            <ol className="mt-3 list-decimal pl-5 text-gray-600 space-y-2 text-sm">
              <li>Create a shop and add your products with photos and details.</li>
              <li>Receive buyer messages on WhatsApp — respond fast and convert.</li>
              <li>Handle pricing, payment, and delivery on your terms.</li>
            </ol>
            <p className="mt-3 text-xs text-blue-700 bg-blue-50 rounded-lg p-3">
              You control customer comms, payments, and fulfillment.
            </p>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { k: "No middleman", v: "Direct buyer ↔ seller" },
            { k: "Keep 100%", v: "We charge 0%" },
            { k: "Local first", v: "Built for community" },
            { k: "Fast", v: "Lightweight & simple" },
          ].map((b, i) => (
            <div key={i} className="rounded-xl bg-white p-5 text-center ring-1 ring-gray-100">
              <p className="text-sm font-semibold text-gray-900">{b.k}</p>
              <p className="mt-1 text-xs text-gray-500">{b.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team card */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="rounded-3xl bg-gradient-to-r from-blue-50 to-purple-50 p-6 md:p-10 ring-1 ring-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src="/images/mihad.jpg"
              alt="Mihad - Founder & Developer"
              className="w-28 h-28 rounded-full object-cover ring-4 ring-white shadow"
              onError={(e) => {
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='1.5'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E";
              }}
            />
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900">Mihad</h3>
              <p className="text-blue-700 font-semibold">Founder & Developer</p>
              <p className="mt-2 text-gray-700 text-sm max-w-2xl">
                Building simple tools that help local shops reach more customers. Stygo is designed to be practical, fast, and community‑focused.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">React</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">Django</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Product</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">FAQs</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {[
            {
              q: "Does Stygo take payment?",
              a: "No. You and the seller arrange payment directly (UPI, cash, etc.).",
            },
            {
              q: "Who delivers the product?",
              a: "Delivery or pickup is arranged between you and the seller.",
            },
            {
              q: "Is there a fee for sellers?",
              a: "Stygo takes 0% — list products and keep 100% of sales.",
            },
            {
              q: "Where is Stygo available?",
              a: "We are starting in Kasaragod with plans to expand.",
            },
          ].map((f, i) => (
            <details key={i} className="group rounded-xl bg-white p-5 ring-1 ring-gray-100 open:ring-emerald-200">
              <summary className="cursor-pointer list-none font-semibold text-gray-900">
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-gray-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA + WhatsApp subscribe */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
            <h3 className="text-xl font-bold text-gray-900">Stay in the loop</h3>
            <p className="mt-2 text-sm text-gray-600">Get new shop drops and offers on WhatsApp.</p>
            <div className="mt-4">
              <WhatsAppSubscribe />
            </div>
          </div>
          <div className="rounded-3xl bg-gray-900 text-white p-8">
            <h3 className="text-xl font-bold">Are you a seller?</h3>
            <p className="mt-2 text-sm text-gray-200">
              Open your Stygo shop in minutes. Add products, get WhatsApp leads, and keep 100% of your sales.
            </p>
            <a href="/Become-a-patner" className="mt-5 inline-flex rounded-xl bg-white px-5 py-3 font-semibold text-gray-900 hover:bg-gray-100">
              Create a Store
            </a>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-gray-500">
          Marketplace notice: Stygo provides discovery and messaging only. Read our <a className="underline" href="/privacy">Privacy Policy</a> and <a className="underline" href="/terms">Terms of Service</a>.
        </p>
      </section>
    </main>
  );
}
