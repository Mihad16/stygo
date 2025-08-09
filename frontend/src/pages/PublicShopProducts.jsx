import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductsByShop } from "../services/product";

function PublicShopProducts() {
  const { shopSlug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!shopSlug) return;

    async function fetchProducts() {
      try {
        setLoading(true);
        const data = await getProductsByShop(shopSlug);

        // Sort descending by created_at, get latest 5
        const latestFive = data
          .slice() // shallow copy
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 5);

        setProducts(latestFive);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [shopSlug]);

  if (loading) {
    return <p className="text-center mt-8 text-gray-600">Loading products...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-900">Latest Products</h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id || product.slug}
              to={`/${shopSlug}/product/${product.slug || product.id}`}
              className="group block w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="w-full h-40 bg-gray-100 overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-xl">
                    No Image
                  </div>
                )}
              </div>

              <div className="p-3">
                <h2 className="text-md font-semibold text-gray-900 truncate">{product.name}</h2>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">{product.description}</p>
                <div className="mt-2 flex items-center justify-between text-gray-700 text-sm font-medium">
                  <span>Size: {product.size || "-"}</span>
                  <span>₹{product.price}</span>
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  Added on {new Date(product.created_at).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default PublicShopProducts;
