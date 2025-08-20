import api from "./axios";

export const createShop = async (shopName, location, category, logo) => {
  const access = localStorage.getItem("accessToken");
  if (!access) throw new Error("User not authenticated. Please log in.");

  const formData = new FormData();
  formData.append("shop_name", shopName);
  formData.append("location", location);
  formData.append("category", category);
  if (logo) {
    formData.append("logo", logo);
  }

  const response = await api.post(
    "/api/sellers/create-shop/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
