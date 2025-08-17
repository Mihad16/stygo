import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBuyerShops } from "../services/buyerShops";
import { getProductsByShop } from "../services/product";
import { FiSearch, FiMapPin, FiShoppingBag, FiGrid, FiList, FiFilter } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";

export default function PublicProduct() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedShop, setSelectedShop] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const categories = ["men", "women", "kids", "accessories", "beauty"];

  // Get shops that have products in the selected category
  const availableShops = useMemo(() => {
    if (!selectedCategory) return shops;
    
    const shopsWithCategoryProducts = new Set();
    allProducts.forEach(product => {
      if (product.category?.toLowerCase() === selectedCategory.toLowerCase()) {
        shopsWithCategoryProducts.add(product.shopSlug);
      }
    });
    
    return shops.filter(shop => shopsWithCategoryProducts.has(shop.slug));
  }, [shops, allProducts, selectedCategory]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        (product.description &&
          product.description.toLowerCase().includes(query.toLowerCase()));
      
      const matchesCategory = selectedCategory ? 
        product.category?.toLowerCase() === selectedCategory.toLowerCase() : true;
      
      const matchesShop = selectedShop ? 
        product.shopSlug === selectedShop : true;
      
      const matchesPriceRange = 
        (!priceRange.min || parseFloat(product.price) >= parseFloat(priceRange.min)) &&
        (!priceRange.max || parseFloat(product.price) <= parseFloat(priceRange.max));

      return matchesSearch && matchesCategory && matchesShop && matchesPriceRange;
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-high":
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "shop":
        filtered.sort((a, b) => a.shopName.localeCompare(b.shopName));
        break;
      case "newest":
      default:
        filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
    }

    return filtered;
  }, [allProducts, query, sortBy, selectedCategory, selectedShop, priceRange]);

  // Fetch all shops and their products
  useEffect(() => {
    async function fetchAllProducts() {
      setLoading(true);
      try {
        const shopsData = await fetchBuyerShops();
        setShops(shopsData);

        // Fetch products from all shops
        const allProductsPromises = shopsData.map(async (shop) => {
          try {
            const products = await getProductsByShop(shop.slug);
            return products.map(product => ({
              ...product,
              shopSlug: shop.slug,
              shopName: shop.shop_name,
              shopLogo: shop.logo,
              shopLocation: shop.location
            }));
          } catch (error) {
            console.error(`Failed to fetch products for shop ${shop.slug}:`, error);
            return [];
          }
        });

        const allProductsArrays = await Promise.all(allProductsPromises);
        const flattenedProducts = allProductsArrays.flat();
        setAllProducts(flattenedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllProducts();
  }, []);

  const handleProductClick = (product) => {
    navigate(`/${product.shopSlug}/product/${product.id}`);
  };

  const clearFilters = () => {
    setQuery("");
    setSelectedCategory("");
    setSelectedShop("");
    setPriceRange({ min: "", max: "" });
  };

  // Reset shop selection when category changes
  useEffect(() => {
    if (selectedCategory && selectedShop) {
      const isShopAvailable = availableShops.some(shop => shop.slug === selectedShop);
      if (!isShopAvailable) {
        setSelectedShop("");
      }
    }
  }, [selectedCategory, selectedShop, availableShops]);

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case "men": return { bg: "bg-blue-100", text: "text-blue-800" };
      case "women": return { bg: "bg-pink-100", text: "text-pink-800" };
      case "kids": return { bg: "bg-green-100", text: "text-green-800" };
      case "accessories": return { bg: "bg-purple-100", text: "text-purple-800" };
      case "beauty": return { bg: "bg-yellow-100", text: "text-yellow-800" };
      default: return { bg: "bg-gray-100", text: "text-gray-800" };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3 max-w-7xl mx-auto">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-bold text-xl">
              <FiShoppingBag />
            </div>
          </div>
          <div className="min-w-0">
            <h1 className="text-lg font-semibold truncate">All Products</h1>
            <p className="text-xs text-gray-500 truncate">
              Browse products from all shops
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 sm:px-6 max-w-7xl mx-auto w-full">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          {/* Search Bar */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-500" />
            </div>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products across all shops..."
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent text-sm"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>

              {/* Shop Filter */}
              <select
                value={selectedShop}
                onChange={(e) => setSelectedShop(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent text-sm"
              >
                <option value="">
                  {selectedCategory ? `All Shops (${availableShops.length})` : "All Shops"}
                </option>
                {availableShops.map(shop => (
                  <option key={shop.slug} value={shop.slug}>
                    {shop.shop_name}
                  </option>
                ))}
              </select>

              {/* Price Range */}
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min ₹"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  className="w-20 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent text-sm"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  placeholder="Max ₹"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  className="w-20 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
                <option value="shop">Shop A-Z</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-amber-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                >
                  <FiGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-amber-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                >
                  <FiList className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters & Results Count */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? "product" : "products"} found
              </span>
              {(selectedCategory || selectedShop || priceRange.min || priceRange.max || query) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <section>
          {loading ? (
            <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4" : "grid-cols-1"}`}>
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
                  <div className={`bg-gray-200 rounded mb-3 ${viewMode === "grid" ? "h-40" : "h-24 w-24 float-left mr-4"}`}></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                <FiShoppingBag className="w-full h-full" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-1">
                No products found
              </h4>
              <p className="text-gray-500 max-w-md mx-auto">
                {query || selectedCategory || selectedShop || priceRange.min || priceRange.max
                  ? "Try adjusting your search or filter criteria"
                  : "No products are currently available"}
              </p>
              {(query || selectedCategory || selectedShop || priceRange.min || priceRange.max) && (
                <button
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          ) : (
            <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4" : "grid-cols-1"}`}>
              {filteredAndSortedProducts.map((product) => (
                <div
                  key={`${product.shopSlug}-${product.id}`}
                  className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer group ${viewMode === "list" ? "flex" : ""}`}
                  onClick={() => handleProductClick(product)}
                >
                  <div className={`relative bg-gray-100 overflow-hidden ${viewMode === "grid" ? "pt-[100%]" : "w-24 h-24 flex-shrink-0"}`}>
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`object-cover transition-transform duration-300 group-hover:scale-105 ${viewMode === "grid" ? "absolute top-0 left-0 w-full h-full" : "w-full h-full"}`}
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className={`p-3 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                    
                    {/* Shop Info */}
                    <div className="flex items-center mt-1 mb-2">
                      {product.shopLogo && (
                        <img
                          src={product.shopLogo}
                          alt={product.shopName}
                          className="w-4 h-4 rounded-full mr-1"
                        />
                      )}
                      <span className="text-xs text-gray-500 truncate">{product.shopName}</span>
                    </div>

                    {/* Category */}
                    {product.category && (
                      <span
                        className={`inline-block text-xs font-medium px-2 py-1 rounded-full mb-2 ${getCategoryColor(product.category).bg} ${getCategoryColor(product.category).text}`}
                      >
                        {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                      </span>
                    )}

                    {product.description && (
                      <p className={`text-xs text-gray-500 mt-1 mb-2 ${viewMode === "grid" ? "line-clamp-2" : "line-clamp-1"}`}>
                        {product.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">₹{product.price}</span>
                      <button className="text-amber-600 hover:text-amber-700">
                        <IoIosArrowForward />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
