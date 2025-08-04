import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, PackageSearch, User2, Boxes } from "lucide-react";

export default function SellerBottomNav() {
  return (
    <nav className="fixed bottom-0 w-full max-w-md mx-auto bg-white border-t border-gray-200 flex justify-around items-center h-14 z-50 md:hidden">
      <NavLink 
        to="/dashboard" 
        className={({ isActive }) => 
          `flex flex-col items-center p-1 text-sm ${isActive ? 'text-blue-600' : 'text-gray-500'}`
        }
      >
        <LayoutDashboard size={20} />
        <span className="text-xs mt-0.5">Dashboard</span>
      </NavLink>

      <NavLink 
        to="/my-products" 
        className={({ isActive }) => 
          `flex flex-col items-center p-1 text-sm ${isActive ? 'text-blue-600' : 'text-gray-500'}`
        }
      >
        <Boxes size={20} />
        <span className="text-xs mt-0.5">Products</span>
      </NavLink>



      <NavLink 
        to="/profile" 
        className={({ isActive }) => 
          `flex flex-col items-center p-1 text-sm ${isActive ? 'text-blue-600' : 'text-gray-500'}`
        }
      >
        <User2 size={20} />
        <span className="text-xs mt-0.5">Profile</span>
      </NavLink>
    </nav>
  );
}