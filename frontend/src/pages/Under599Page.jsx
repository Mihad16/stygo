import React, { useEffect, useState } from "react";
import { getProductsUnder599 } from "../services/product";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiLoader, FiRefreshCw, FiAlertCircle, FiStar } from "react-icons/fi";
import { FaRupeeSign, FaShoppingBag } from "react-icons/fa";

export default function Under599() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();

  // SEO Metadata
  const pageTitle = "Best Products Under ₹599 | Affordable Shopping Deals";
  const pageDescription = "Discover amazing products under ₹599. Shop budget-friendly items with great discounts and offers.";

  const fetchProducts = async () => {
    try {
      setRefreshing(true);
      const data = await getProductsUnder599();
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    document.title = pageTitle;
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = pageDescription;
    document.head.appendChild(metaDescription);
  }, []);

  const handleProductClick = (productId, productName) => {
    navigate(`/products-under-599/${productName.toLowerCase().replace(/\s+/g, '-')}-${productId}`);
  };

  const handleRefresh = () => {
    fetchProducts();
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": pageTitle,
          "description": pageDescription,
          "url": window.location.href,
          "mainEntity": products.length > 0 ? {
            "@type": "ItemList",
            "itemListElement": products.map((product, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Product",
                "name": product.name,
                "image": product.image,
                "offers": {
                  "@type": "Offer",
                  "price": product.price,
                  "priceCurrency": "INR"
                }
              }
            }))
          } : []
        })}
      </script>

      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-4 p-2 rounded-full hover:bg-gray-100"
                aria-label="Go back"
              >
                <FiArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Best Products Under ₹599
              </h1>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Refresh products"
            >
              <FiRefreshCw className={`h-5 w-5 text-gray-600 ${refreshing ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="relative">
              <FaShoppingBag className="h-12 w-12 text-gray-300" />
              <FiLoader className="absolute -top-1 -right-1 h-6 w-6 text-blue-500 animate-spin" />
            </div>
            <p className="text-gray-500">Loading budget products...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <div className="inline-block p-6 bg-white rounded-lg shadow-sm max-w-md">
              <div className="flex flex-col items-center">
                <div className="mb-4 p-3 bg-red-100 rounded-full">
                  <FiAlertCircle className="h-8 w-8 text-red-500" />
                </div>
                <p className="text-red-500 mb-4 max-w-md">{error}</p>
                <button
                  onClick={handleRefresh}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-white rounded-lg shadow-sm max-w-md">
              <div className="mb-5 mx-auto w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
                <FaShoppingBag className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <button
                onClick={handleRefresh}
                className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Refresh Products
              </button>
            </div>
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && products.length > 0 && (
          <>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                Showing {products.length} {products.length === 1 ? "item" : "items"} under ₹599
              </h2>
              <button
                onClick={handleRefresh}
                className="text-blue-600 hover:text-blue-700 flex items-center"
              >
                <FiRefreshCw className="mr-1.5" /> Refresh
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {products.map((product) => (
                <div 
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all flex flex-col cursor-pointer"
                  onClick={() => handleProductClick(product.id, product.name)}
                >
                  <div className="relative pt-[100%] bg-gray-50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute top-0 left-0 w-full h-full object-contain p-4"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3 border-t border-gray-100">
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="mt-2 flex items-center">
                      <FaRupeeSign className="text-green-600 text-sm" />
                      <p className="text-base font-bold text-green-600 ml-1">
                        {product.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}