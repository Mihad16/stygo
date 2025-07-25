import axios from "axios";

export const createShop = async (shopName, location) => {
  const token = localStorage.getItem("token");
  console.log("Token sent:", token); // ✅ Debug log

  if (!token) {
    throw new Error("User not authenticated. No token found.");
  }

  const response = await axios.post(
    "http://localhost:8000/api/sellers/create-shop/",
    {
      shop_name: shopName,
      location: location,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Use Bearer for JWT
      },
    }
  );

  return response.data;
};
