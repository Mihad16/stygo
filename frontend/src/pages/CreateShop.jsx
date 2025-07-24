import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createShop } from "../services/shop";

export default function CreateShop() {
  const [shopName, setShopName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateShop = async () => {
    setError("");
    if (!shopName || !location) {
      setError("All fields are required.");
      return;
    }

    try {
      await createShop(shopName, location);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Your Shop</h2>

      <input
        type="text"
        placeholder="Shop Name"
        value={shopName}
        onChange={(e) => setShopName(e.target.value)}
        className="border p-2 w-full rounded mb-3"
      />

      <input
        type="text"
        placeholder="Location (e.g., Mumbai)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border p-2 w-full rounded mb-3"
      />

      <button
        onClick={handleCreateShop}
        className="bg-green-600 text-white py-2 px-4 rounded w-full hover:bg-green-700"
      >
        Create Shop
      </button>

      {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
    </div>
  );
}
