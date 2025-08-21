import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/product";
import { fetchBuyerShops } from "../services/buyerShops";
import { ArrowLeft, Phone, MessageCircle, ShoppingBag, MapPin, Info, Star, ChevronRight } from "lucide-react";

export default function PublicProductDetail() {
  const { shopSlug, productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // 1️⃣ Get product details
        const productData = await getProductById(productId);
        setProduct(productData);

        // 2️⃣ Get shop details
        const shops = await fetchBuyerShops();
        const matchedShop = shops.find((s) => s.slug === shopSlug);
        if (!matchedShop) {
          throw new Error("Shop not found");
        }
        setShop(matchedShop);
      } catch (error) {
        setError(error.message || "Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [productId, shopSlug]);

  // Handle product images if multiple exist
  const productImages = product?.images?.length > 0 
    ? product.images 
    : product?.image 
      ? [product.image] 
      : ["https://via.placeholder.com/500?text=No+Image"];

  // WhatsApp link generator
 const whatsappLink = shop?.phone_number
  ? `https://wa.me/${shop.phone_number.replace("+", "")}?text=${encodeURIComponent(
      `Hi! I'm interested in your product:\n\n` +
      `✨ *${product?.name || "Product"}*\n` +
      `💰 Price: ₹${product?.price || ""}\n` +
      `🖼 Image: ${product?.image_url || ""}\n` +
      `\nView product: ${window.location.href}`
    )}`
  : null;


  // Calculate discount percentage if original price exists
  const discountPercentage = product?.original_price && product?.price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
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

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate(`/${shopSlug}`)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition group"
        >
          <ArrowLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Home</span>
        </button>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            {/* 🖼 Product Image Gallery */}
            <div className="md:w-1/2 p-4 md:p-6">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg ">
                <img
                  src={productImages[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
                
                {/* Discount badge */}
                {discountPercentage > 0 && (
                  <span className="absolute top-3 right-3 bg-amber-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
                    {discountPercentage}% OFF
                  </span>
                )}
              </div>
              
              {/* Thumbnail navigation if multiple images */}
              {productImages.length > 1 && (
                <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
                  {productImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${currentImageIndex === index ? 'border-amber-500' : 'border-transparent'}`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 📄 Product Info */}
            <div className="md:w-1/2 p-4 md:p-6">
              <div className="flex flex-col h-full">
                <div>
                  {/* Product title and rating */}
                  <div className="flex justify-between items-start">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
                    {/* Rating would go here */}
                  </div>
                  
                  {/* Size and category */}
                  <div className="mt-3 flex flex-wrap gap-3">
                    {product.size && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        Size: {product.size.toUpperCase()}
                      </span>
                    )}
                    {product.category && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {product.category}
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
                  </div>

                  {/* Description */}
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900">Description</h3>
                    <p className="mt-2 text-gray-600 whitespace-pre-line">{product.description || "No description available."}</p>
                  </div>

                  {/* Additional details */}
                  {(product.material || product.color) && (
                    <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                      {product.material && (
                        <div>
                          <span className="block text-gray-500">Material</span>
                          <span className="font-medium text-gray-900">{product.material}</span>
                        </div>
                      )}
                      {product.color && (
                        <div>
                          <span className="block text-gray-500">Color</span>
                          <span className="font-medium text-gray-900">{product.color}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 🏪 Shop Info */}
                {shop && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Sold by</h3>
                    <div 
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition"
                      onClick={() => navigate(`/${shopSlug}`)}
                    >
                      <img
                        src={shop.logo || "https://via.placeholder.com/100?text=Shop"}
                        alt={shop.shop_name}
                        className="w-14 h-14 rounded-full object-cover border border-gray-200"
                      />
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-semibold text-gray-900 truncate">{shop.shop_name}</h2>
                        {shop.location && (
                          <p className="text-sm text-gray-600 flex items-center mt-1 truncate">
                            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" /> 
                            <span className="truncate">{shop.location}</span>
                          </p>
                        )}
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                    
                    {/* Contact buttons */}
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {shop.phone_number && (
                        <a
                          href={`tel:${shop.phone_number}`}
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