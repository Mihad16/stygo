import axios from "axios";

export async function getDashboard() {
  const token = localStorage.getItem("access"); // must be set after OTP login

  if (!token) {
    throw new Error("No access token found");
  }

  const res = await axios.get("http://localhost:8000/api/sellers/dashboard/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
