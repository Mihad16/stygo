import React from "react";
import { Outlet } from "react-router-dom";
import SellerBottomNav from "../components/SellerBottomNav";

export default function SellerLayout() {
  return (
    <div className="pb-14"> {/* Padding bottom to prevent content overlap */}
      <Outlet />
      <SellerBottomNav />
    </div>
  );
}
