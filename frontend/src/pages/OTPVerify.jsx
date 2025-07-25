import { useState } from "react";
import { verifyOTP } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function OTPVerify() {
  const [otp, setOTP] = useState("");
  const [phone] = useState(localStorage.getItem("phone") || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
    setError("");
    setSuccess("");

    try {
      const res = await verifyOTP(phone, otp); // { access, refresh, hasShop }
      console.log("OTP verify response:", res);

      // ✅ Store JWT tokens
      localStorage.setItem("token", res.access);
      localStorage.setItem("refresh", res.refresh);

      setSuccess("OTP verified successfully!");

      // ✅ Navigate based on shop status
      if (res.hasShop) {
        navigate("/dashboard");
      } else {
        navigate("/create-shop");
      }
    } catch (err) {
      console.error("OTP verify error:", err);
      setError(err.response?.data?.error || "Invalid OTP or verification failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-10 bg-white shadow rounded-xl">
      <h2 className="text-xl font-semibold mb-4 text-center">Verify OTP</h2>

      <input
        type="tel"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOTP(e.target.value)}
        className="border border-gray-300 p-3 w-full rounded-xl mb-4"
      />

      <button
        onClick={(e) => {
          e.preventDefault();
          handleVerify();
        }}
        className="bg-green-600 text-white w-full py-2 rounded-xl hover:bg-green-700"
      >
        Verify OTP
      </button>

      {error && <p className="text-red-600 mt-3 text-center text-sm">{error}</p>}
      {success && <p className="text-green-600 mt-3 text-center text-sm">{success}</p>}
    </div>
  );
}
