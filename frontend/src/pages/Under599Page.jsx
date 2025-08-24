import React, { useEffect, useMemo, useState } from "react";
import { getProductsUnder599 } from "../services/product";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiLoader, FiRefreshCw, FiAlertCircle } from "react-icons/fi";
import { FaRupeeSign, FaShoppingBag } from "react-icons/fa";

export default function Under599() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState("relevance"); // relevance | price-asc | price-desc | name-asc | name-desc
  const [viewMode, setViewMode] = useState("grid"); // grid | list

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

  const displayedProducts = useMemo(() => {
    const arr = Array.isArray(products) ? [...products] : [];
    switch (sortOption) {
      case "price-asc":
        return arr.sort((a, b) => (a.price || 0) - (b.price || 0));
      case "price-desc":
        return arr.sort((a, b) => (b.price || 0) - (a.price || 0));
      case "name-asc":
        return arr.sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));
      case "name-desc":
        return arr.sort((a, b) => String(b.name || "").localeCompare(String(a.name || "")));
      default:
        return arr; // relevance (server order)
    }
  }, [products, sortOption]);

  const handleProductClick = (product) => {
    const productId = product.id;
    const slug = product.seller_slug || product.shopSlug;
    if (slug) {
      navigate(`/${slug}/product/${productId}`);
    } else {
      // Fallback to generic product route
      navigate(`/product/${productId}`);
    }
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
                "image": product.image_url || "/placeholder.png",
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
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="text-lg font-semibold">
                Showing {products.length} {products.length === 1 ? "item" : "items"} under ₹599
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                <label className="text-sm text-gray-600" htmlFor="sortBy">Sort by</label>
                <select
                  id="sortBy"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white"
                  aria-label="Sort products"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
                <div className="h-5 w-px bg-gray-200" aria-hidden="true" />
                <div className="inline-flex rounded-md shadow-sm" role="group" aria-label="Toggle view mode">
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className={`px-3 py-1.5 text-sm border border-gray-300 rounded-l-md ${viewMode === "grid" ? "bg-gray-100" : "bg-white"}`}
                    aria-pressed={viewMode === "grid"}
                  >
                    Grid
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-1.5 text-sm border border-gray-300 border-l-0 rounded-r-md ${viewMode === "list" ? "bg-gray-100" : "bg-white"}`}
                    aria-pressed={viewMode === "list"}
                  >
                    List
                  </button>
                </div>
                <button
                  onClick={handleRefresh}
                  className="text-blue-600 hover:text-blue-700 flex items-center text-sm"
                >
                  <FiRefreshCw className="mr-1.5" /> Refresh
                </button>
              </div>
            </div>
            
            <div className={viewMode === "grid" ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6" : "space-y-4"}>
              {displayedProducts.map((product) => (
                <article
                  key={product.id}
                  className={viewMode === "grid" ? "bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all flex flex-col cursor-pointer" : "bg-white rounded-lg shadow-sm hover:shadow-md transition-all flex cursor-pointer"}
                  onClick={() => handleProductClick(product)}
                >
                  {viewMode === "grid" ? (
                    <div className="relative pt-[100%] bg-gray-50">
                      <img
                        src={product.image_url || "/placeholder.png"}
                        alt={product.name}
                        className="absolute top-0 left-0 w-full h-full object-contain p-4"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="flex w-full">
                      <div className="w-32 flex-shrink-0 bg-gray-50 relative">
                        <img
                          src={product.image_url || "/placeholder.png"}
                          alt={product.name}
                          className="w-32 h-32 object-contain p-3"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 border-l border-gray-100">
                        <div className="p-3">
                          <h3 className="text-sm font-medium text-gray-800 line-clamp-2">{product.name}</h3>
                          {product.description && (
                            <p className="mt-0.5 text-xs text-gray-500 line-clamp-2">{product.description}</p>
                          )}
                          {(product.seller_name || product.seller_logo_url || product.shopName || product.shopLogo) && (
                            <div className="mt-1 flex items-center gap-2">
                              {(product.seller_logo_url || product.shopLogo) && (
                                <img
                                  src={product.seller_logo_url || product.shopLogo}
                                  alt={product.seller_name || product.shopName || "Shop"}
                                  className="w-4 h-4 rounded-full"
                                  loading="lazy"
                                />
                              )}
                              {(product.seller_slug || product.shopSlug) ? (
                                <a
                                  href={`/${product.seller_slug || product.shopSlug}`}
                                  className="text-xs text-gray-500 hover:text-gray-700 truncate"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {product.seller_name || product.shopName || product.seller_slug || product.shopSlug}
                                </a>
                              ) : (
                                <span className="text-xs text-gray-500 truncate">{product.seller_name || product.shopName}</span>
                              )}
                              {(product.seller_location || product.shopLocation) && (
                                <span className="text-[10px] text-gray-400">• {product.seller_location || product.shopLocation}</span>
                              )}
                            </div>
                          )}
                          <div className="mt-2 flex items-center gap-2">
                            <div className="flex items-center">
                              <FaRupeeSign className="text-green-600 text-sm" />
                              <p className="text-base font-bold text-green-600 ml-1">
                                {Number(product.price || 0).toLocaleString('en-IN')}
                              </p>
                            </div>
                            {product.original_price && Number(product.original_price) > Number(product.price) && (
                              <>
                                <span className="text-xs text-gray-400 line-through">
                                  ₹{Number(product.original_price).toLocaleString('en-IN')}
                                </span>
                                <span className="text-xs font-semibold text-green-600">
                                  {Math.round(((Number(product.original_price) - Number(product.price)) / Number(product.original_price)) * 100)}% off
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {viewMode === "grid" && (
                    <div className="p-3 border-t border-gray-100">
                      <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="mt-0.5 text-xs text-gray-500 line-clamp-2">{product.description}</p>
                      )}
                      {/* Shop info */}
                      {(product.seller_name || product.seller_logo_url) && (
                        <div className="mt-1 flex items-center gap-2">
                          {(product.seller_logo_url || product.shopLogo) && (
                            <img
                              src={product.seller_logo_url || product.shopLogo}
                              alt={product.seller_name || product.shopName || "Shop"}
                              className="w-4 h-4 rounded-full"
                              loading="lazy"
                            />
                          )}
                          {(product.seller_slug || product.shopSlug) ? (
                            <a
                              href={`/${product.seller_slug || product.shopSlug}`}
                              className="text-xs text-gray-500 hover:text-gray-700 truncate"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {product.seller_name || product.shopName || product.seller_slug || product.shopSlug}
                            </a>
                          ) : (
                            <span className="text-xs text-gray-500 truncate">{product.seller_name || product.shopName}</span>
                          )}
                          {(product.seller_location || product.shopLocation) && (
                            <span className="text-[10px] text-gray-400">• {product.seller_location || product.shopLocation}</span>
                          )}
                        </div>
                      )}
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center">
                          <FaRupeeSign className="text-green-600 text-sm" />
                          <p className="text-base font-bold text-green-600 ml-1">
                            {Number(product.price || 0).toLocaleString('en-IN')}
                          </p>
                        </div>
                        {product.original_price && Number(product.original_price) > Number(product.price) && (
                          <>
                            <span className="text-xs text-gray-400 line-through">
                              ₹{Number(product.original_price).toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs font-semibold text-green-600">
                              {Math.round(((Number(product.original_price) - Number(product.price)) / Number(product.original_price)) * 100)}% off
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}