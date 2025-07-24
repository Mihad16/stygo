import axios from "axios";

export const createShop = async (shopName, location) => {
  const token = localStorage.getItem("token");
  return axios.post(
    "http://localhost:8000/api/sellers/create-shop/",
    {
      shop_name: shopName,
      location,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
