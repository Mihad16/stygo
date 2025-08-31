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
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [plan, setPlan] = useState("free");
  const navigate = useNavigate();

  const onLogoChange = (file) => {
    setLogo(file || null);
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoPreview(url);
    } else {
      setLogoPreview("");
    }
  };

  const validate = () => {
    if (!name.trim()) return "Please enter a shop name.";
    if (!location.trim()) return "Please enter a location.";
    if (!category) return "Please select a category.";
    return "";
  };

  const handleCreate = async (e) => {
    e?.preventDefault();
    setError("");
    setSuccess("");
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    try {
      setSubmitting(true);
      await createShop(name, location, category, logo, plan);
      setSuccess("Shop created successfully! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 900);
    } catch (err) {
      setError("Failed to create shop. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
        <div className="px-6 sm:px-8 py-6 border-b border-gray-100 bg-gray-50/60">
          <h1 className="text-2xl font-bold text-gray-900">Create Your Shop</h1>
          <p className="text-sm text-gray-600 mt-1">Fill in the details below to set up your storefront.</p>
        </div>

        <form onSubmit={handleCreate} className="px-6 sm:px-8 py-6 pb-24 space-y-5">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 px-3 py-2 text-sm">{error}</div>
          )}
          {success && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800 px-3 py-2 text-sm">{success}</div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shop Name</label>
            <input
              type="text"
              placeholder="e.g., Urban Threads"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">This name will be visible to customers.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                placeholder="City, Area"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Shop Logo</label>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                {logoPreview ? (
                  // eslint-disable-next-line jsx-a11y/alt-text
                  <img src={logoPreview} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-gray-400 text-xs">Preview</span>
                )}
              </div>
              <label className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onLogoChange(e.target.files?.[0])}
                />
                Upload Logo
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-2">PNG or JPG up to 2MB is recommended.</p>
          </div>

          

          <div className="fixed inset-x-0 bottom-0 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-t border-gray-200 py-4 z-50">
            <div className="max-w-2xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className={`inline-flex justify-center items-center rounded-xl px-5 py-3 w-full sm:w-auto text-white text-sm font-medium shadow-sm transition-colors ${
                  submitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {submitting ? "Creating..." : "Create Shop"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
