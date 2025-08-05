import React, { useEffect, useState } from "react";
import { getMyProducts, deleteProduct } from "../services/product";
import { PlusCircle, Search, Edit3, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MyProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const data = await getMyProducts();
        if (isMounted) {
          setProducts(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading products:", error);
        setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId);
        setProducts(products.filter(p => p.id !== productId));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleEdit = (productId) => {
    navigate(`/add-product?edit=${productId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">My Products</h1>
        </div>
        <button
          onClick={() => navigate("/add-product")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          <PlusCircle size={16} />
          Add Product
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
        />
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
              <div className="aspect-square bg-gray-200"></div>
              <div className="p-3">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Search className="mx-auto h-8 w-8 text-gray-400 mb-3" />
          <h3 className="text-base font-medium text-gray-900 mb-1">
            No products found
          </h3>
          <button
            onClick={() => navigate("/add-product")}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
          >
            Add Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Product Image */}
              <div className="relative aspect-square">
                <img
                  src={product.image || "/placeholder-product.jpg"}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/placeholder-product.jpg";
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="p-3">
                <h3 className="font-medium text-gray-900 text-sm truncate mb-1">{product.name}</h3>
                <p className="text-gray-500 text-xs line-clamp-2 mb-2">{product.description}</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-gray-900 text-sm">₹{product.price}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-gray-100 p-2 flex justify-between">
                <button
                  onClick={() => handleEdit(product.id)}
                  className="text-gray-500 hover:text-green-600 p-1"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-gray-500 hover:text-red-600 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
