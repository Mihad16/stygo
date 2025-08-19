import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/suggestions";

export const submitSuggestion = async ({ name, email, language, message, page_path }) => {
  const payload = { name, email, language, message, page_path };
  const { data } = await axios.post(`${API_URL}/`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
};
