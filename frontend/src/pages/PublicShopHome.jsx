import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FiShoppingBag,
  FiStar,
  FiMapPin,
  FiPhone,
  FiHeart,
  FiShare2,
} from "react-icons/fi";
import { fetchShop, fetchShopProducts } from "../services/public";


export default function PublicShopHome() {
  const { shopSlug } = useParams();
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadShopData() {
      try {
        setLoading(true);

        const shopRes = await fetchShop(shopSlug);
        const productsRes = await fetchShopProducts(shopSlug);

        if (isMounted) {
          setShop(shopRes.data);
          setProducts(Array.isArray(productsRes.data) ? productsRes.data : []);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error loading shop data:", err);
          setError("Failed to load shop data. Please try again later.");
          setShop(null);
          setProducts([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadShopData();
    return () => {
      isMounted = false;
    };
  }, [shopSlug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md text-center">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Shop not found
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white min-h-screen">
      {/* New Shop Header Design */}
      <div className="relative bg-gray-800 text-white pb-16">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Shop Logo - New Design */}
            <div className="w-28 h-28 rounded-xl border-2 border-white shadow-lg overflow-hidden bg-white flex-shrink-0">
              <img
                src={
                  shop.logo?.startsWith("http")
                    ? shop.logo
                    : `http://127.0.0.1:8000${shop.logo}`
                }
                alt={shop.shop_name}
                onError={(e) => {
                  e.target.src = "/default-shop-logo.png";
                }}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Shop Info - New Layout */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{shop.shop_name}</h1>
              
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mb-4">
                <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                  <FiStar className="text-yellow-400 fill-current mr-1" />
                  <span>4.5 (120 reviews)</span>
                </div>
                <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                  <FiShoppingBag className="mr-1" />
                  <span>{products.length} {products.length === 1 ? "item" : "items"}</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                {shop.location && (
                  <div className="flex items-center">
                    <FiMapPin className="mr-2 text-gray-300" />
                    <span>{shop.location}</span>
                  </div>
                )}
                {shop.phone_number && (
                  <div className="flex items-center">
                    <FiPhone className="mr-2 text-gray-300" />
                    <a href={`tel:${shop.phone_number}`} className="hover:underline">
                      {shop.phone_number}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons - New Position */}
            <div className="flex space-x-3 mt-4 md:mt-0">
              <button
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Add to favorites"
              >
                <FiHeart className="text-xl" />
              </button>
              <button
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Share shop"
              >
                <FiShare2 className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section - New Layout */}
    
    </div>
  );
}