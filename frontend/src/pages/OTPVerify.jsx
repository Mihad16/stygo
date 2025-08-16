import { useState, useEffect } from "react";
import { verifyOTP, sendOTP } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { RefreshCw, Clock } from "lucide-react";

export default function OTPVerify() {
  const [otp, setOTP] = useState("");
  const [phone] = useState(localStorage.getItem("phone") || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  // Countdown timer for resend functionality
  useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
    } else if (resendCountdown === 0 && !canResend) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown, canResend]);

  // Start countdown when component mounts
  useEffect(() => {
    setResendCountdown(30); // 30 seconds countdown
    setCanResend(false);
  }, []);

  const handleVerify = async () => {
    setError("");
    setSuccess("");

    if (!otp || otp.length < 4) {
      setError("Please enter a valid OTP");
      return;
    }

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

  const handleResendOTP = async () => {
    if (!canResend || isResending) return;

    setIsResending(true);
    setError("");
    setSuccess("");

    try {
      await sendOTP(phone);
      setSuccess("OTP resent successfully!");
      setCanResend(false);
      setResendCountdown(30); // Reset countdown to 30 seconds
    } catch (err) {
      setError(err.response?.data?.error || "Failed to resend OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white shadow-xl rounded-2xl border border-gray-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify OTP</h2>
        <p className="text-gray-600 text-sm">
          Enter the 6-digit code sent to {phone}
        </p>
      </div>

      <div className="space-y-4">
        <input
          type="tel"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOTP(e.target.value.replace(/\D/g, "").slice(0, 6))}
          className="border border-gray-300 p-4 w-full rounded-xl text-center text-lg font-mono tracking-widest focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          maxLength={6}
        />

        <button
          onClick={handleVerify}
          disabled={!otp || otp.length < 6}
          className="bg-blue-600 text-white w-full py-3 rounded-xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
        >
          Verify OTP
        </button>

        {/* Resend OTP Section */}
        <div className="text-center pt-4 border-t border-gray-200">
          {!canResend ? (
            <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
              <Clock className="w-4 h-4" />
              <span>Resend OTP in {formatTime(resendCountdown)}</span>
            </div>
          ) : (
            <button
              onClick={handleResendOTP}
              disabled={isResending}
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 disabled:text-gray-400 transition-colors duration-200"
            >
              <RefreshCw className={`w-4 h-4 ${isResending ? 'animate-spin' : ''}`} />
              <span>{isResending ? 'Sending...' : 'Resend OTP'}</span>
            </button>
          )}
        </div>

        {/* Error and Success Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm text-center">
            {success}
          </div>
        )}
      </div>

      {/* Back to Login */}
      <div className="text-center mt-6">
        <button
          onClick={() => navigate("/login")}
          className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200"
        >
          ← Back to Login
        </button>
      </div>
    </div>
  );
}