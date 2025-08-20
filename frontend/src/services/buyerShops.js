import api from "./axios";

const API_URL = "/api/sellers"; // Uses baseURL from axios instance

export const fetchBuyerShops = async () => {
  try {
    const response = await api.get(`${API_URL}/shops/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching buyer shops:", error);
    return [];
  }
};
