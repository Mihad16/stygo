import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createShop } from "../services/shop";

const categories = [
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "kids", label: "Kids" },
  { value: "accessories", label: "Accessories" },
  { value: "beauty", label: "Beauty" },
];

export default function CreateShop() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("men");
  const [logo, setLogo] = useState(null); // ✅ New state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleCreate = async () => {
    setError("");
    setSuccess("");

    try {
      await createShop(name, location, category, logo); // ✅ Correct values
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

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-300 p-3 w-full rounded-xl mb-4"
      >
        {categories.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>

      {/* ✅ File Input for Logo */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setLogo(e.target.files[0])}
        className="mb-4 w-full"
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
