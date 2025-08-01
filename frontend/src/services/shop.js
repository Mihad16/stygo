import axios from "axios";

export const createShop = async (shopName, location, category, logo) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User not authenticated. No token found.");

  const formData = new FormData();
  formData.append("shop_name", shopName);
  formData.append("location", location);
  formData.append("category", category);
  if (logo) {
    formData.append("logo", logo); // ✅ Add logo if provided
  }

  const response = await axios.post(
    "http://localhost:8000/api/sellers/create-shop/",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // ✅ Required for file uploads
      },
    }
  );

  return response.data;
};
