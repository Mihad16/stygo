import api from "./axios";

const API_URL = "/api/suggestions";

export const submitSuggestion = async ({ name, email, language, message, page_path }) => {
  const payload = { name, email, language, message, page_path };
  const { data } = await api.post(`${API_URL}/`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
};
