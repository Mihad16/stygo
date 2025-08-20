import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SellerBottomNav from "../components/SellerBottomNav";

export default function SellerLayout() {
  const location = useLocation();
  const showBottomNav = location.pathname !== "/create-shop";

  return (
    <div className={showBottomNav ? "pb-14" : "pb-0"}> {/* Avoid overlap only when nav is visible */}
      <Outlet />
      {showBottomNav && <SellerBottomNav />}
    </div>
  );
}
