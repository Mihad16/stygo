import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
  ShoppingBag,
  Share2,
  Heart,
} from "lucide-react";
import { getProductById } from "../services/product";
import { motion } from "framer-motion";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductById(id);
        setProduct(data);
        setSelectedSize(data.size); // Default
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const handleWhatsAppOrder = () => {
    if (!product?.shop?.phone_number) {
      alert("Seller's WhatsApp number not available.");
      return;
    }

    const message = `Hi, I'm interested in purchasing:\n\n*${product.name}*\nPrice: ₹${product.price}\nSize: ${selectedSize.toUpperCase()}\nQuantity: ${quantity}\n\nIs this available?`;

    const whatsappNumber = product.shop.phone_number.replace(/\D/g, ""); // sanitize
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600">Loading...</span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4 text-center">
        <p className="text-red-600 mb-2">{error || "Product not found."}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative">
      {/* Header */}
      <div className="sticky top-0 bg-white z-30 p-4 border-b border-gray-100 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-1 rounded-full hover:bg-gray-100">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex gap-2">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Heart className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-40">
        <div className="relative mb-4">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-green-600">₹{product.price}</p>
            {product.originalPrice && (
              <p className="text-sm text-gray-400 line-through">₹{product.originalPrice}</p>
            )}
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Select Size</h3>
            <div className="flex gap-2">
              {["s", "m", "l", "xl"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md text-sm font-medium ${
                    selectedSize === size
                      ? "border-blue-500 bg-blue-50 text-blue-600"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  {size.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Quantity</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 border border-gray-300 rounded"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 border border-gray-300 rounded"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
            <p className="text-gray-600 text-sm">{product.description || "No description."}</p>
          </div>
        </motion.div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
        <div className="max-w-md mx-auto flex gap-3">
          <button className="flex-1 bg-gray-100 text-gray-800 rounded-lg py-3 font-medium flex items-center justify-center gap-2">
            <Heart className="w-5 h-5" />
            Save
          </button>
          <button
            onClick={handleWhatsAppOrder}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-lg py-3 font-medium flex items-center justify-center gap-2 transition"
          >
            <ShoppingBag className="w-5 h-5" />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
