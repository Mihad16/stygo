import axios from "axios";

const API_BASE = "http://localhost:8000/api/auth/";

// Format phone to include +91 if not already
const formatPhone = (phone) => {
  return phone.startsWith("+91") ? phone : "+91" + phone;
};

export const sendOTP = (phone) => {
  return axios.post(`${API_BASE}send-otp/`, {
    phone: formatPhone(phone),
  });
};

export const verifyOTP = (phone, otp) => {
  return axios.post(`${API_BASE}verify/`, {
    phone: formatPhone(phone),
    otp: otp,
  });
};
