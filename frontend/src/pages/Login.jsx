import { useState } from "react";
import { sendOTP } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    setError("");

    if (!/^\d{10}$/.test(phone)) {
      setError("Enter valid 10-digit Indian number.");
      return;
    }

    const formattedPhone = "+91" + phone;

    try {
      await sendOTP(formattedPhone);
      localStorage.setItem("phone", formattedPhone); // Save phone for next page
      navigate("/verify");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send OTP");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login with Phone</h2>

        <input
          type="tel"
          placeholder="Enter 10-digit number"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
          className="border p-3 w-full rounded-xl mb-4"
        />

        <button
          onClick={handleSendOTP}
          className="bg-green-600 text-white py-2 rounded-xl w-full"
        >
          Send OTP
        </button>

        {error && <p className="text-red-600 mt-3 text-center text-sm">{error}</p>}
      </div>
    </div>
  );
}
