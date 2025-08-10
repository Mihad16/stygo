import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductsByShop } from "../services/product";
import { fetchBuyerShops } from "../services/buyerShops";

export default function PublicShopHome() {
  const { shopSlug } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  const [shops, setShops] = useState([]);
  const [currentShop, setCurrentShop] = useState(null);

  useEffect(() => {
    if (!shopSlug) return;

    async function fetchShops() {
      try {
        const shopsData = await fetchBuyerShops();
        setShops(shopsData);

        const foundShop = shopsData.find((shop) => shop.slug === shopSlug);
        setCurrentShop(foundShop || null);
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    }

    fetchShops();
  }, [shopSlug]);

  useEffect(() => {
    if (!shopSlug) return;

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

  const displayedProducts = popular.slice(0, 5); // Only 5 latest products

  const handleMoreShopClick = () => {
    navigate(`/${shopSlug}/products`);
  };



  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Header */}
      <header className="px-5 pt-6 pb-4 flex items-center gap-4">
        {/* Shop logo */}
        {currentShop?.logo ? (
          <img
            src={currentShop.logo}
            alt={`${currentShop.name} logo`}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
            {currentShop?.name?.[0] || "S"}
          </div>
        )}

        {/* Shop name and location */}
        <div>
          <h1 className="text-2xl font-bold">{currentShop?.name || "Shop"}</h1>
          {currentShop?.location && (
            <p className="text-sm text-gray-500">{currentShop.location}</p>
          )}
        </div>

        {/* WhatsApp Button */}
       
      </header>

      {/* Search */}
      <header className="px-5 pt-0 pb-4">
        <h2 className="mt-6 text-3xl font-extrabold tracking-tight">
          Discover our new items
        </h2>

        <div className="mt-5">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
                />
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
      </header>

      {/* Latest Products */}
      <main className="px-5 pb-6 flex-1">
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Latest Products</h2>

          {loading ? (
            <p className="mt-4 text-gray-500">Loading...</p>
          ) : popular.length === 0 ? (
            <p className="mt-4 text-gray-500">No products found.</p>
          ) : (
            <>
              <div className="mt-4 flex gap-4 overflow-x-auto py-3 -mx-1">
                {displayedProducts.map((p) => (
                  <div
                    key={p.id}
                    className="min-w-[160px] max-w-[220px] bg-white rounded-2xl shadow-sm p-3 flex-shrink-0"
                  >
                    <div className="w-full h-[160px] rounded-lg overflow-hidden bg-gray-100 mb-3">
                      <img
                        src={
                          p.image || "https://via.placeholder.com/220x220?text=No+Image"
                        }
                        alt={p.title || p.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-900">{p.name}</p>
                    <p className="text-sm text-gray-500 mt-1">₹{p.price}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-6">
                <button
                  onClick={handleMoreShopClick}
                  className="px-6 py-2 bg-amber-400 rounded-full text-white font-semibold hover:bg-amber-500 transition"
                >
                  More Shop
                </button>
              </div>
            </>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 mt-auto text-center text-gray-700">
        <p>
          © {new Date().getFullYear()} {currentShop?.name || "Our Shop"}. All
          rights reserved.
        </p>
      </footer>
    </div>
  );
}
