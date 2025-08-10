// src/components/PublicProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/product";
import { fetchBuyerShops } from "../services/buyerShops";
import { ArrowLeft, Phone, MessageCircle, ShoppingBag, MapPin, Info } from "lucide-react";

export default function PublicProductDetail() {
  const { shopSlug, productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setShop(matchedShop);
      } catch (error) {
        console.error("Error fetching product or shop details:", error);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [productId, shopSlug]);

  // ✅ Create WhatsApp link if shop has phone
const whatsappLink = shop?.phone_number
  ? `https://wa.me/${shop.phone_number.replace("+", "")}?text=${encodeURIComponent(
      `Hi! I am interested in:\n\n` +
      `🛍 ${product?.name || "Product"}\n` +
      (product?.size ? `📏 Size: ${product.size.toUpperCase()}\n` : "") +
      `💰 Price: ₹${product?.price || ""}\n\n` +
      `View product: ${window.location.href}`
    )}`
  : null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <ShoppingBag className="w-12 h-12 mx-auto text-gray-400" />
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <Info className="w-12 h-12 mx-auto text-red-500" />
          <h2 className="text-xl font-semibold mt-4 text-gray-800">Error Loading Product</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Info className="w-12 h-12 mx-auto text-gray-400" />
          <p className="mt-4 text-gray-600">Product not found</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="font-medium">Back to products</span>
        </button>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            {/* 🖼 Product Image */}
            <div className="md:w-1/2 p-4 md:p-6">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* 📄 Product Info */}
            <div className="md:w-1/2 p-4 md:p-6">
              <div className="flex flex-col h-full">
                <div>
                
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
                  
                  {product.size && (
                    <div className="mt-2">
                      <span className="text-sm font-medium text-gray-500">Size:</span>
                      <span className="ml-2 text-lg font-bold text-red-600">
                        {product.size.toUpperCase()}
                      </span>
                    </div>
                  )}

                  <div className="mt-4">
                    <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="ml-2 text-lg text-gray-500 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-900">Description</h3>
                    <p className="mt-2 text-gray-600 whitespace-pre-line">{product.description}</p>
                  </div>
                </div>

                {/* 🏪 Shop Info */}
                {shop && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex items-start space-x-4">
                      <img
                        src={shop.logo}
                        alt={shop.shop_name}
                        className="w-12 h-12 rounded-full object-cover border border-gray-200"
                      />
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">{shop.shop_name}</h2>
                        {shop.location && (
                          <p className="text-sm text-gray-600 flex items-center mt-1">
                            <MapPin className="w-4 h-4 mr-1" /> {shop.location}
                          </p>
                        )}
                        {shop.phone_number && (
                          <p className="text-sm text-gray-600 flex items-center mt-1">
                            <Phone className="w-4 h-4 mr-1" /> {shop.phone_number}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 📲 WhatsApp Button */}
                {whatsappLink && (
                  <div className="mt-8">
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md transition w-full"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      <span className="font-medium">Chat on WhatsApp</span>
                    </a>
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