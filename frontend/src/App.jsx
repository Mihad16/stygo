import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OTPVerify from "./pages/OTPVerify";
import Shops from "./pages/Shops";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import SellerLayout from "./layouts/SellerLayout";
import CreateShop from "./pages/CreateShop";
import ShopPage from "./pages/ShopPage";
import ProfileSeller from "./pages/ProfileSeller";
import AddProduct from "./pages/AddProduct";
import MyProducts from "./pages/MyProducts";
import About from "./pages/about"; 
import ProductDetail from "./pages/ProductDetail";



export default function App() {
  return (
    <Router>
      <Routes>

        {/* Public layout with BottomNav */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<OTPVerify />} />
          <Route path="/about" element={<About />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/shop/:shop_name" element={<ShopPage />} />
         <Route path="/product/:id" element={<ProductDetail />} />
     
        </Route>

        {/* Seller layout without BottomNav */}
        <Route element={<SellerLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-shop" element={<CreateShop />} />
          <Route path="/profile" element={<ProfileSeller />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/my-products" element={<MyProducts />} />
        </Route>

      </Routes>
    </Router>
  );
}
