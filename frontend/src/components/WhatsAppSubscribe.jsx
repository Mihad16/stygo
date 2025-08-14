import React, { useState } from "react";
import axios from "axios";

export default function WhatsAppSubscribe() {
  const [formData, setFormData] = useState({
    phone_number: "",
    name: "",
    consent: false,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Basic validation
      if (!formData.phone_number) {
        throw new Error("Phone number is required");
      }
      if (!formData.consent) {
        throw new Error("You must agree to receive WhatsApp updates");
      }

      const res = await axios.post(
        "http://localhost:8000/api/subscribe/",
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        setSuccess(true);
        setFormData({ phone_number: "", name: "", consent: false });
        setMessage(res.data.message || "Subscribed successfully!");
      } else {
        setMessage(res.data.message || "Subscription failed");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "150vh", padding: "50px 20px", background: "#f0f0f0" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Subscribe to WhatsApp Updates</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "400px",
          margin: "auto",
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        {message && (
          <p
            style={{
              background: success ? "#d4edda" : "#f8d7da",
              color: success ? "#155724" : "#721c24",
              padding: "10px",
              borderRadius: "5px",
              textAlign: "center",
            }}
          >
            {message}
          </p>
        )}

        <input
          type="text"
          name="phone_number"
          placeholder="Phone number (+CountryCode)"
          value={formData.phone_number}
          onChange={handleChange}
          required
          style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="text"
          name="name"
          placeholder="Your name (optional)"
          value={formData.name}
          onChange={handleChange}
          style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <label style={{ display: "block", marginBottom: "15px" }}>
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            style={{ marginRight: "8px" }}
            required
          />
          I agree to receive WhatsApp updates
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            background: "#25D366",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Processing..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
}
