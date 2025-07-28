import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OTPVerify from "./pages/OTPVerify";
import Info from "./pages/Info";
import Shops from "./pages/Shops";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import SellerLayout from "./layouts/SellerLayout";
import CreateShop from "./pages/CreateShop";
import ShopPage from "./pages/ShopPage";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* Public layout with BottomNav */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<OTPVerify />} />
          <Route path="/info" element={<Info />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/shop/:shop_name" element={<ShopPage />} />
        </Route>

        {/* Seller layout without BottomNav */}
        <Route element={<SellerLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-shop" element={<CreateShop />} />
        </Route>

      </Routes>
    </Router>
  );
}
