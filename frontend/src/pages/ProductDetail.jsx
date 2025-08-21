import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, MessageCircle, ShoppingBag, MapPin, Info, Star, ChevronRight, Heart } from "lucide-react";
import { getProductById, getProductsByShop } from "../services/product";
import { fetchBuyerShops } from "../services/buyerShops";

export default function ProductDetail() {
  const { productId, shopSlug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [shop, setShop] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Debug: route params
    try { console.log("[ProductDetail] Route params:", { productId, shopSlug }); } catch {}
    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);
        
        if (!productId) {
          throw new Error("Product ID is missing from URL");
        }
        
        // 1️⃣ Get product details
        const productData = await getProductById(productId);
        setProduct(productData);
        try { console.log("[ProductDetail] Fetched product:", productData); } catch {}

        // 2️⃣ Get shop details (prioritize route slug, then product seller slug, then id, then shop name)
        const shops = await fetchBuyerShops();
        try { console.log("[ProductDetail] Shops list:", shops); } catch {}
        let matchedShop = null;
        // a) route param slug
        if (shopSlug) {
          matchedShop = shops.find((s) => s.slug === shopSlug) || null;
        }
        // b) seller slug from product (consider multiple possible fields)
        const sellerSlug =
          productData.seller?.slug ||
          productData.seller_slug ||
          productData.shop_slug ||
          productData.shop?.slug ||
          null;
        try { console.log('[ProductDetail] Candidate sellerSlug:', sellerSlug); } catch {}
        if (!matchedShop && sellerSlug) {
          matchedShop = shops.find((s) => s.slug === sellerSlug) || null;
        }
        // c) match by seller id (object or numeric)
        const sellerId = (productData.seller && typeof productData.seller === 'object')
          ? productData.seller.id
          : (typeof productData.seller === 'number' ? productData.seller : null);
        const sellerProfileId = productData.seller_profile_id || productData.sellerProfileId || null;
        const sellerIdFallback = productData.seller_id || productData.sellerId || null;
        const idToMatch = sellerId || sellerProfileId || sellerIdFallback || null;
        try { console.log('[ProductDetail] Candidate sellerId:', sellerId, 'profileId:', sellerProfileId, 'fallback:', sellerIdFallback); } catch {}
        if (!matchedShop && idToMatch) {
          matchedShop = shops.find((s) => String(s.id) === String(idToMatch)) || null;
        }
        // d) match by shop name from product data
        const candidateNames = [
          productData.seller?.shop_name,
          productData.seller?.name,
          productData.shop_name,
          productData.shopName,
          productData.seller_name,
          productData.sellerName,
        ].filter(Boolean);
        try { console.log('[ProductDetail] Candidate shop names:', candidateNames); } catch {}
        if (!matchedShop && candidateNames.length) {
          matchedShop = shops.find((s) => candidateNames.some((n) => (s.shop_name || s.name) === n)) || null;
        }
        try { console.log("[ProductDetail] Matched shop:", matchedShop); } catch {}
        if (matchedShop) {
          setShop(matchedShop);
        } else {
          // e) Fallback: probe shops by fetching their products to find ownership
          try {
            for (const s of shops) {
              if (!s?.slug) continue;
              try { console.log('[ProductDetail] Probing shop by slug:', s.slug); } catch {}
              const prods = await getProductsByShop(s.slug);
              const owns = Array.isArray(prods) && prods.some((p) => String(p.id) === String(productData.id));
              if (owns) {
                matchedShop = s;
                try { console.log('[ProductDetail] Ownership found via products list. Shop:', s); } catch {}
                break;
              }
            }
          } catch (probeErr) {
            try { console.warn('[ProductDetail] Shop probe failed:', probeErr); } catch {}
          }
          if (matchedShop) {
            setShop(matchedShop);
          } else {
          // Build a minimal display shop from product fields so UI can render something
          const fallbackDisplay = {
            shop_name: candidateNames[0] || null,
            slug: sellerSlug || null,
            phone_number: productData.seller?.phone_number || productData.phone_number || null,
            logo: productData.seller?.logo || null,
            location: productData.seller?.location || productData.location || null,
          };
          try { console.log('[ProductDetail] Using fallback display shop:', fallbackDisplay); } catch {}
          // Only set if at least a name/slug/phone exists
          if (fallbackDisplay.shop_name || fallbackDisplay.slug || fallbackDisplay.phone_number) {
            setShop(fallbackDisplay);
          }
          }
        }
      } catch (error) {
        console.error("Error fetching product or shop details:", error);
        setError(error.message || "Failed to load product details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [productId]);

  // Debug: log when product/shop state updates
  useEffect(() => {
    try { console.log("[ProductDetail] State update:", { product, shop }); } catch {}
  }, [product, shop]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Add your API call here to update favorite status
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <ShoppingBag className="w-12 h-12 mx-auto text-gray-400 animate-bounce" />
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="text-center max-w-md bg-white p-8 rounded-xl shadow-sm">
          <Info className="w-12 h-12 mx-auto text-red-500" />
          <h2 className="text-xl font-semibold mt-4 text-gray-800">Error Loading Product</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
            >
              <span>Try Again</span>
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span>Go Back</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-xl shadow-sm max-w-md">
          <ShoppingBag className="w-12 h-12 mx-auto text-gray-400" />
          <h2 className="text-xl font-semibold mt-4 text-gray-800">Product Not Found</h2>
          <p className="mt-2 text-gray-600">The product you're looking for doesn't exist or may have been removed.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition flex items-center mx-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>Back to Products</span>
          </button>
        </div>
      </div>
    );
  }

  // Handle product images - use image field from database
  const productImage = product?.image_url || product?.image || "https://via.placeholder.com/500?text=No+Image";
  
  // Calculate discount percentage if original price exists
  const discountPercentage = product?.original_price && product?.price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  // Build a display shop object from fetched shop or product.seller
  const displayShop = shop || product?.seller || null;
  // Fallbacks for common field name variations across APIs
  const displayShopName =
    displayShop?.shop_name ||
    displayShop?.name ||
    displayShop?.display_name ||
    displayShop?.seller_name ||
    displayShop?.username ||
    product?.shop_name ||
    product?.shopName ||
    product?.seller_name ||
    product?.sellerName ||
    null;
  const displayShopSlug = displayShop?.slug || product?.seller_slug || null;
  const displayShopPhone = displayShop?.phone_number || displayShop?.phone || displayShop?.contact_number || null;
  const displayShopLogo = displayShop?.logo || displayShop?.image || displayShop?.avatar || "https://via.placeholder.com/100?text=Shop";
  const displayShopLocation = displayShop?.location || displayShop?.address || displayShop?.city || null;

  // WhatsApp link generator
  const whatsappLink = displayShopPhone
    ? `https://wa.me/${displayShopPhone.replace("+", "")}?text=${encodeURIComponent(
        `Hi! I'm interested in your product:\n\n` +
        `✨ *${product?.name || "Product"}*\n` +
        `💰 Price: ₹${product?.price || ""}\n` +
        `🖼 Image: ${product?.image_url || ""}\n` +
        `\nView product: ${window.location.href}`
      )}`
    : null;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition group"
        >
          <ArrowLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Products</span>
        </button>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Product Image Gallery */}
            <div className="md:w-1/2 p-4 md:p-6">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                <img
                  src={productImage}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
                
                {/* Discount badge */}
                {discountPercentage > 0 && (
                  <span className="absolute top-3 right-3 bg-amber-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
                    {discountPercentage}% OFF
                  </span>
                )}

                {/* Favorite button */}
                <button
                  onClick={toggleFavorite}
                  className={`absolute top-3 left-3 p-2 rounded-full shadow-md ${isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-700'}`}
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 p-4 md:p-6">
              <div className="flex flex-col h-full">
                <div>
                  {/* Product title and rating */}
                  <div className="flex justify-between items-start">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
                    {product.rating && (
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Shop info */}
                  <p className="mt-2 text-lg text-gray-600">{displayShopName || "Shop"}</p>
                  
                  {/* Size and category */}
                  <div className="mt-3 flex flex-wrap gap-3">
                    {product.size && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        Size: {product.size.toUpperCase()}
                      </span>
                    )}
                    {product.category && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {product.category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    )}
                  </div>

                  {/* Price section */}
                  <div className="mt-6">
                    {discountPercentage > 0 ? (
                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                        <span className="text-xl text-gray-500 line-through">₹{product.original_price}</span>
                        <span className="ml-2 text-sm font-medium text-amber-600">
                          You save ₹{product.original_price - product.price} ({discountPercentage}%)
                        </span>
                      </div>
                    ) : (
                      <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                    )}
                    {typeof product.quantity !== 'undefined' && product.quantity !== null && (
                      <p className="mt-2 text-sm text-gray-600">In stock: <span className="font-medium">{product.quantity}</span></p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900">Description</h3>
                    <p className="mt-2 text-gray-600 whitespace-pre-line">{product.description || "No description available."}</p>
                  </div>

                  {/* Reviews */}
                  {product.reviews && (
                    <div className="mt-6">
                      <p className="text-sm text-gray-600">{product.reviews} customer reviews</p>
                    </div>
                  )}
                </div>

                {/* Shop Info */}
                {(displayShop || displayShopName) && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Sold by</h3>
                    <div 
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition"
                      onClick={() => displayShopSlug && navigate(`/${displayShopSlug}`)}
                    >
                      <img
                        src={displayShopLogo || "https://via.placeholder.com/100?text=Shop"}
                        alt={displayShopName || "Shop"}
                        className="w-14 h-14 rounded-full object-cover border border-gray-200"
                      />
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-semibold text-gray-900 truncate">{displayShopName || "Seller"}</h2>
                        {displayShopLocation && (
                          <p className="text-sm text-gray-600 flex items-center mt-1 truncate">
                            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" /> 
                            <span className="truncate">{displayShopLocation}</span>
                          </p>
                        )}
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                    
                    {/* Contact buttons */}
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {displayShopPhone && (
                        <a
                          href={`tel:${displayShopPhone}`}
                          className="flex items-center justify-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                        >
                          <Phone className="w-5 h-5 mr-2" />
                          <span>Call</span>
                        </a>
                      )}
                      {whatsappLink && (
                        <a
                          href={whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-sm transition"
                        >
                          <MessageCircle className="w-5 h-5 mr-2" />
                          <span>WhatsApp</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}