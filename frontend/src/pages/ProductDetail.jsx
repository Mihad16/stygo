import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, ShoppingBag, Star, ChevronRight, Share2, Heart } from "lucide-react";
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
        setSelectedSize(data.size); // Set default size
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const handleWhatsAppOrder = () => {
    const message = `Hi, I'm interested in purchasing:
    
*${product.name}*
Price: ₹${product.price}
Size: ${selectedSize.toUpperCase()}
Quantity: ${quantity}

Is this available?`;
    
    window.open(`https://wa.me/${product.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600">Loading product...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md">
          <p className="text-red-600 mb-3">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4 text-center">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md">
          <h2 className="text-lg font-medium text-gray-800 mb-2">Product not found</h2>
          <p className="text-gray-500 mb-4">The product you're looking for doesn't exist or may have been removed.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
          >
            Back to shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 p-4 border-b border-gray-100 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex gap-2">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Heart className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Product Content */}
      <div className="px-4 pb-24">
        {/* Image Gallery */}
        <div className="relative mb-4">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-cover rounded-lg"
          />
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              New Arrival
            </span>
          )}
        </div>

        {/* Product Info */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="space-y-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <div className="flex items-center mt-1">
              <div className="flex">
            
              </div>
             
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-green-600">₹{product.price}</p>
            {product.originalPrice && (
              <p className="text-sm text-gray-400 line-through">₹{product.originalPrice}</p>
            )}
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Select Size</h3>
            <div className="flex gap-2">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size.toLowerCase())}
                  className={`px-4 py-2 border rounded-md text-sm font-medium ${
                    selectedSize === size.toLowerCase()
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Quantity</h3>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-md"
              >
                -
              </button>
              <span className="text-gray-800 font-medium">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-md"
              >
                +
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.description || "No description available for this product."}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-lg">
        <div className="max-w-md mx-auto flex gap-3">
          <button className="flex-1 bg-gray-100 text-gray-800 rounded-lg py-3 font-medium flex items-center justify-center gap-2">
            <Heart className="w-5 h-5" />
            Save
          </button>
          <button 
            onClick={handleWhatsAppOrder}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-lg py-3 font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}