import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createShop } from "../services/shop";

export default function CreateShop() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleCreate = async () => {
    setError("");
    setSuccess("");

    try {
      const res = await createShop(name, location); // ✅ Fixed here
      setSuccess("Shop created successfully!");
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to create shop. Try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow rounded-xl">
      <h2 className="text-xl font-semibold mb-4 text-center">Create Your Shop</h2>

      <input
        type="text"
        placeholder="Shop Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 p-3 w-full rounded-xl mb-4"
      />
      <input
        type="text"
        placeholder="Shop Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border border-gray-300 p-3 w-full rounded-xl mb-4"
      />
      <button
        onClick={handleCreate}
        className="bg-green-600 text-white w-full py-2 rounded-xl"
      >
        Create Shop
      </button>

      {error && <p className="text-red-600 mt-3 text-center">{error}</p>}
      {success && <p className="text-green-600 mt-3 text-center">{success}</p>}
    </div>
  );
}
