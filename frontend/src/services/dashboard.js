// src/services/dashboard.js
import axios from "axios";

export const getDashboard = async (token) => {
  const response = await axios.get("http://localhost:8000/api/sellers/dashboard/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
