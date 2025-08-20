import api from "./axios";

// ✅ Helper to save auth tokens
const saveAuthTokens = (access, refresh, user_id, phone) => {
  // 🧹 Clear old keys
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("token");
  localStorage.removeItem("refresh");

  // ✅ Store clean values
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
  localStorage.setItem("user_id", user_id);
  localStorage.setItem("phone", phone);
};

// ✅ 1. Send OTP to phone
export const sendOTP = async (phone) => {
  const res = await api.post(`/api/auth/send-otp/`, { phone });
  return res.data; // { message: "OTP sent" }
};

// ✅ 2. Verify OTP and login/register
export const verifyOTP = async (phone, otp) => {
  const res = await api.post(`/api/auth/verify/`, {
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

  // ✅ Save tokens using helper
  saveAuthTokens(access, refresh, user_id, verifiedPhone);

  return {
    access,
    refresh,
    hasShop: has_shop,
    userId: user_id,
    phone: verifiedPhone,
  };
};

// ✅ 3. Logout
export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user_id");
  localStorage.removeItem("phone");
};
