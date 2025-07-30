import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, PackageSearch, User2, Boxes } from "lucide-react"; // ✅ Use Boxes icon for products

export default function SellerBottomNav() {
  return (
    <nav className="fixed bottom-0 w-full max-w-md mx-auto bg-white border-t border-gray-200 flex justify-around items-center h-14 z-50">
      <NavLink to="/dashboard" className="flex flex-col items-center text-sm">
        <LayoutDashboard size={20} />
        <span className="text-xs">Dashboard</span>
      </NavLink>

      <NavLink to="/my-products" className="flex flex-col items-center text-sm">
        <Boxes size={20} />
        <span className="text-xs">My Products</span>
      </NavLink>

      <NavLink to="/orders" className="flex flex-col items-center text-sm">
        <PackageSearch size={20} />
        <span className="text-xs">Orders</span>
      </NavLink>

      <NavLink to="/profile" className="flex flex-col items-center text-sm">
        <User2 size={20} />
        <span className="text-xs">Profile</span>
      </NavLink>
    </nav>
  );
}
