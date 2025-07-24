import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    // ✅ Fetch seller shop and products
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/sellers/dashboard/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setShop(res.data.shop);
        setProducts(res.data.products);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      }
    };

    fetchData();
  }, [token, navigate]);

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-6">
      <h2 className="text-xl font-bold mb-4">Your Dashboard</h2>

      {shop ? (
        <>
          <div className="bg-white rounded-xl shadow p-4 mb-4">
            <p className="text-sm text-gray-600">Shop Name:</p>
            <p className="text-lg font-semibold">{shop.name}</p>
            <p className="text-xs text-gray-500">Location: {shop.location}</p>
            <p className="text-xs text-green-600 mt-1">Your Link: stygo.in/{shop.slug}</p>
          </div>

          <button
            onClick={handleAddProduct}
            className="bg-green-600 text-white w-full py-2 rounded-xl mb-6"
          >
            Add Product
          </button>

          <h3 className="text-lg font-semibold mb-2">Your Products</h3>
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-xl shadow mb-3"
              >
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-gray-500">₹{product.price}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No products added yet.</p>
          )}
        </>
      ) : (
        <p className="text-sm text-red-500">
          You don’t have a shop yet. Please create one to start selling.
        </p>
      )}
    </div>
  );
}
