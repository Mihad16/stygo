import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/sellers"; // Or your live base URL

export const fetchBuyerShops = async () => {
  try {
    const response = await axios.get(`${API_URL}/shops/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching buyer shops:", error);
    return [];
  }
};
