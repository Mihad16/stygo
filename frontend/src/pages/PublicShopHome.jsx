// src/components/PublicShopHome.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // ✅ to get slug from URL
import { getProductsByShop } from "../services/product";

const categories = ["Hoodi", "Mens", "Womens"];
   
export default function PublicShopHome() {
  const { shopSlug } = useParams(); // ✅ "my-shop-name" from /shop/:shopSlug
  const [activeTab, setActiveTab] = useState(categories[0]);
  const [query, setQuery] = useState("");
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch products from this shop
  useEffect(() => {
    if (!shopSlug) return; // prevent undefined fetch

    async function fetchProducts() {
      try {
        setLoading(true);
        const data = await getProductsByShop(shopSlug);
        setPopular(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [shopSlug]);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Header */}
      <header className="px-5 pt-6 pb-4">
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight">
          Discover our new items
        </h1>

        {/* Search */}
        <div className="mt-5">
          <label htmlFor="search" className="sr-only">Search</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
              </svg>
            </span>
            <input
              id="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full pl-11 pr-4 py-3 bg-gray-100 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
        </div>

        {/* Tabs */}
        <nav className="mt-5">
          <ul className="flex gap-6 border-b">
            {categories.map((cat) => {
              const active = activeTab === cat;
              return (
                <li key={cat} className="pb-3">
                  <button
                    onClick={() => setActiveTab(cat)}
                    className={`text-sm font-medium ${active ? "text-gray-900" : "text-gray-500"} focus:outline-none`}
                  >
                    {cat}
                  </button>
                  {active && <div className="h-0.5 bg-black mt-3 rounded-full w-10" />}
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      {/* Main content */}
      <main className="px-5 pb-6 flex-1">
        {/* Popular products */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Popular Products</h2>

          {loading ? (
            <p className="mt-4 text-gray-500">Loading...</p>
          ) : popular.length === 0 ? (
            <p className="mt-4 text-gray-500">No products found.</p>
          ) : (
            <div className="mt-4 flex gap-4 overflow-x-auto py-3 -mx-1">
              {popular.map((p) => (
                <div key={p.id} className="min-w-[160px] max-w-[220px] bg-white rounded-2xl shadow-sm p-3 flex-shrink-0">
                  <div className="w-full h-[160px] rounded-lg overflow-hidden bg-gray-100 mb-3">
                    <img
                      src={p.image || "https://via.placeholder.com/220x220?text=No+Image"}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">₹{p.price}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

    

    </div>
  );
}
