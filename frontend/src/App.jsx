import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Preloader from "./components/Preloader.jsx";


// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import OTPVerify from "./pages/OTPVerify";
import Shops from "./pages/Shops";
import Dashboard from "./pages/Dashboard";
import CreateShop from "./pages/CreateShop";
import ProfileSeller from "./pages/ProfileSeller";
import AddProduct from "./pages/AddProduct";
import MyProducts from "./pages/MyProducts";
import About from "./pages/about";
import PublicShopHome from "./pages/PublicShopHome";
import FavoriteShops from "./pages/FavoritesPage";
import AboutSelling from "./pages/AboutSelling.JSX";
import PublicShopProducts from "./pages/PublicShopProducts";
import SellerAbout from "./pages/SellerAbout";
import PublicProductDetail from "./pages/PublicProductDetail";

// Layouts
import MainLayout from "./layouts/MainLayout";
import SellerLayout from "./layouts/SellerLayout";
import PublicShopLayout from "./layouts/PublicShopLayout";

// Auth
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API or asset loading (you can replace with Django API call)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <Router>
      <Routes>
        {/* No layout */}
        <Route path="/selling" element={<AboutSelling />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<OTPVerify />} />

        {/* Public layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/favorites" element={<FavoriteShops />} />
        </Route>

        {/* Public shop layout */}
        <Route element={<PublicShopLayout />}>
          <Route path="/:shopSlug" element={<PublicShopHome />} />
          <Route path="/:shopSlug/products" element={<PublicShopProducts />} />
          <Route path="/:shopSlug/about" element={<SellerAbout />} />
          <Route path="/:shopSlug/product/:productId" element={<PublicProductDetail />} />
        </Route>

        {/* Seller layout */}
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
