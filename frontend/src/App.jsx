import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import OTPVerify from "./pages/OTPVerify";
import Shops from "./pages/Shops";
import Dashboard from "./pages/Dashboard";
import CreateShop from "./pages/CreateShop";
import ShopPage from "./pages/ShopPage";
import ProfileSeller from "./pages/ProfileSeller";
import AddProduct from "./pages/AddProduct";
import MyProducts from "./pages/MyProducts";
import About from "./pages/about";
import ProductDetail from "./pages/ProductDetail";
import PublicShopHome from "./pages/PublicShopHome";
import FavoriteShops from "./pages/FavoritesPage";
import AboutSelling from "./pages/AboutSelling.JSX";

// Layouts
import MainLayout from "./layouts/MainLayout";
import SellerLayout from "./layouts/SellerLayout";
import PublicShopLayout from "./layouts/PublicShopLayout";

// 🔐 Auth route wrapper
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Routes that don't need layout */}
        <Route path="/selling" element={<AboutSelling />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<OTPVerify />} />

        {/* Public layout with nav/footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/shop/:shop_name" element={<ShopPage />} />
          <Route path="/favorites" element={<FavoriteShops />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Route>

        {/* Public shop layout (like storefront) */}
        <Route element={<PublicShopLayout />}>
          <Route path="/:shopSlug" element={<PublicShopHome />} />
        </Route>

        {/* 🔒 Secured seller layout (requires login) */}
        <Route
          element={
            <PrivateRoute>
              <SellerLayout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-shop" element={<CreateShop />} />
          <Route path="/profile" element={<ProfileSeller />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/my-products" element={<MyProducts />} />
          <Route path="/edit-product/:id" element={<AddProduct />} />
        </Route>
      </Routes>
    </Router>
  );
}
