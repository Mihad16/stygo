// services/auth.js
import axios from "axios";

const baseURL = "http://localhost:8000/api/auth"; // change if needed

// 1. Send OTP function
export const sendOTP = async (phone) => {
  const res = await axios.post(`${baseURL}/send-otp/`, {
    phone,
  });
  return res.data; // You can handle message or status in Login.jsx
};

// 2. Verify OTP function
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

  // Save details
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
  localStorage.setItem("user_id", user_id);
  localStorage.setItem("phone", verifiedPhone);

  return {
    access,
    hasShop: has_shop,
  };
};
