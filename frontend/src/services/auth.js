import axios from "axios";

const baseURL = "http://localhost:8000/api/auth"; // update if your backend base URL is different

// 1. Send OTP
export const sendOTP = async (phone) => {
  const res = await axios.post(`${baseURL}/send-otp/`, {
    phone,
  });
  return res.data; // Expected: { message: "OTP sent" }
};

// 2. Verify OTP
export const verifyOTP = async (phone, otp) => {
  const res = await axios.post(`${baseURL}/verify/`, {
    phone,
    otp,
  });

  const {
    access,
    refresh,
    has_shop,
    user_id,
    phone: verifiedPhone,
  } = res.data;

  // Save values to localStorage
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
  localStorage.setItem("user_id", user_id);
  localStorage.setItem("phone", verifiedPhone);

  // ✅ Return all required fields
  return {
    access,
    refresh,
    hasShop: has_shop,
    userId: user_id,
    phone: verifiedPhone,
  };
};
