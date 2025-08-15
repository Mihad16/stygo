import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiArrowLeft } from "react-icons/fi";
// import axios from "axios"; // Uncomment when backend ready

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ---- Fake Data for now ----
    const fakeProduct = {
      id: productId,
      name: "Floral Summer Dress",
      price: 799,
      originalPrice: 999,
      discount: 20,
      shop: "Fashion Hub",
      rating: 4.5,
      reviews: 128,
      description: "A light and comfortable floral dress perfect for summer outings. Made with 100% organic cotton for maximum comfort.",
      images: [
        "https://images.unsplash.com/photo-1520975922131-a52c6e6d4d4a?w=800",
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800"
      ],
      colors: ["Red", "Blue", "Yellow"],
      sizes: ["S", "M", "L", "XL"]
    };

    setProduct(fakeProduct);
    setIsLoading(false);

    // ---- When backend is ready ----
    // setIsLoading(true);
    // axios.get(`/api/products/${productId}/`)
    //   .then(res => {
    //     setProduct(res.data);
    //     setIsLoading(false);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //     setIsLoading(false);
    //   });
  }, [productId]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Add your API call here to update favorite status
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-4 text-center">
        <p>Product not found</p>
        <button 
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-200 rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Header with back button */}
      <div className="bg-white shadow-sm sticky top-0 z-10 p-4 flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 mr-2"
        >
          <FiArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold">Product Details</h1>
      </div>

      {/* Product Image Gallery */}
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-80 object-cover"
        />
        <button
          onClick={toggleFavorite}
          className={`absolute top-4 right-4 p-2 rounded-full shadow-md ${isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-700'}`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <FiHeart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 bg-white">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-gray-500">{product.shop}</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-green-600">₹{product.price}</p>
            {product.originalPrice && (
              <p className="text-sm text-gray-500 line-through">₹{product.originalPrice}</p>
            )}
            {product.discount && (
              <p className="text-xs text-green-500">{product.discount}% OFF</p>
            )}
          </div>
        </div>

       


        {product.sizes && (
          <div className="mt-4">
            <h3 className="font-medium">Size</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="mt-6">
          <h3 className="font-medium">Description</h3>
          <p className="mt-1 text-gray-700">{product.description}</p>
        </div>
      </div>

      {/* Fixed Add to Cart Button */}
      <div className="  bg-white shadow-lg p-4">
        <button className="w-full bg-green-600 text-white py-3 rounded-lg flex items-center justify-center hover:bg-green-700 transition">
          <FiShoppingCart className="mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}