import api from "./axios";

// ✅ Fetch single shop detail by slug
export const fetchShop = (slug) => api.get(`/api/sellers/${slug}/`);

// ✅ Fetch products for a specific shop by slug
export const fetchShopProducts = (slug) => api.get(`/api/products/shop/${slug}/`);

