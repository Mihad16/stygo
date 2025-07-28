import React, { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboard"; // API function

export default function Dashboard() {
  const [shopName, setShopName] = useState("");

 useEffect(() => {
  const fetchShop = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getDashboard(token);
      setShopName(data.shop_name);
    } catch (err) {
      console.error("Dashboard error:", err.response?.data);
      setError("Could not fetch shop");
    }
  };
  fetchShop();
}, []);

  return (
    <div className="max-w-md mx-auto px-4 pb-24">
      <h1 className="text-2xl font-bold my-6">Welcome to your shop</h1>
      <div className="text-xl font-semibold text-green-700">{shopName}</div>
    </div>
  );
}
