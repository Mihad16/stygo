import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  FiShoppingBag,
  FiStar,
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiHeart,
  FiShare2,
} from "react-icons/fi";
import ProductCard from "../components/ProductCard";

export default function PublicShopHome() {
  const { shopId } = useParams();
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadShopData() {
      try {
        setLoading(true);

        const [shopRes, productsRes, buyerShopRes] = await Promise.all([
          axios.get(`/api/sellers/${shopId}`),
          axios.get(`/api/shops/${shopId}/products`),
          axios.get(`/api/buyer/shops/${shopId}`),
        ]);

        if (isMounted) {
          setShop(shopRes.data);

          const productsData = Array.isArray(productsRes.data)
            ? productsRes.data
            : [];
          setProducts(productsData);

          const categoryList = buyerShopRes.data.categories || [];
          setCategories(["All", ...categoryList]);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error loading shop data:", err);
          setError("Failed to load shop data. Please try again later.");
          setProducts([]);
          setCategories(["All"]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadShopData();
    return () => {
      isMounted = false;
    };
  }, [shopId]);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

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
    <div className="bg-gray-50 min-h-screen">
      {/* Shop Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Shop Logo */}
            <div className="w-32 h-32 rounded-full border border-gray-200 overflow-hidden bg-white flex-shrink-0">
              <img
                src={shop.logo || "/default-shop-logo.png"}
                alt={shop.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/default-shop-logo.png";
                }}
              />
            </div>

            {/* Shop Info */}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {shop.name}
                  </h1>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center">
                      <FiStar className="text-yellow-400 fill-current" />
                      <span className="ml-1 text-gray-700">
                        {shop.rating?.toFixed(1) || "4.5"} (
                        {shop.reviewCount || "120"} reviews)
                      </span>
                    </div>
                    <span className="mx-2 text-gray-300">•</span>
                    <div className="flex items-center">
                      <FiShoppingBag className="text-gray-500" />
                      <span className="ml-1 text-gray-700">
                        {products.length}{" "}
                        {products.length === 1 ? "product" : "products"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
                    aria-label="Add to favorites"
                  >
                    <FiHeart />
                  </button>
                  <button
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
                    aria-label="Share shop"
                  >
                    <FiShare2 />
                  </button>
                </div>
              </div>

              <p className="mt-3 text-gray-600">
                {shop.description ||
                  "This shop hasn't added a description yet."}
              </p>

              <div className="mt-4 flex flex-wrap gap-4">
                {shop.location && (
                  <div className="flex items-center text-gray-600">
                    <FiMapPin className="mr-2" />
                    <span>{shop.location}</span>
                  </div>
                )}
                {shop.phone && (
                  <div className="flex items-center text-gray-600">
                    <FiPhone className="mr-2" />
                    <a href={`tel:${shop.phone}`}>{shop.phone}</a>
                  </div>
                )}
                {shop.email && (
                  <div className="flex items-center text-gray-600">
                    <FiMail className="mr-2" />
                    <a href={`mailto:${shop.email}`}>{shop.email}</a>
                  </div>
                )}
                {shop.hours && (
                  <div className="flex items-center text-gray-600">
                    <FiClock className="mr-2" />
                    <span>{shop.hours}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Category Filters */}
        {categories.length > 1 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Categories
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedCategory === category
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white border-gray-200 hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Products Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Products</h2>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-gray-600">No products found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
