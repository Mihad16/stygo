import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function PublicShop() {
  const { shopSlug } = useParams();
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const res = await axios.get(`/api/sellers/${shopSlug}/`);
        console.log("API response:", res.data); // Debug
        setShop(res.data.shop);
        setProducts(res.data.products);
      } catch (error) {
        console.error("Error loading shop data:", error);
      }
    };

    fetchShopData();
  }, [shopSlug]);

  if (!shop) {
    return <div className="p-6">Loading shop...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Shop info */}
      <div className="flex items-center space-x-6 mb-8">
        <img
          src={shop.logo}
          alt={`${shop.shop_name} Logo`}
          className="w-20 h-20 rounded-full object-cover border border-gray-300"
        />
        <div>
          <h1 className="text-3xl font-bold">{shop.shop_name}</h1>
          {shop.description && <p className="text-gray-700">{shop.description}</p>}
          <p className="text-gray-600 mt-1">{shop.location}</p>
          <p className="text-gray-600">{shop.phone_number}</p>
        </div>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow p-3">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-36 object-cover rounded"
            />
            <h3 className="mt-2 font-semibold">{product.name}</h3>
            <p className="text-gray-600 text-sm">{product.size}</p>
            <p className="text-blue-600 font-bold mt-1">₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
