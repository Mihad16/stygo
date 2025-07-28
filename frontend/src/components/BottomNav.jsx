import React from "react";
import { Home, Store, ShoppingBag, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function BottomNav() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow p-2 flex justify-around max-w-md mx-auto border-t z-50 md:hidden">
      <NavItem icon={<Home className="w-5 h-5" />} label="Home" onClick={() => navigate("/")} />
      <NavItem icon={<Store className="w-5 h-5" />} label="Shops" onClick={() => navigate("/shops")} />
      <NavItem icon={<ShoppingBag className="w-5 h-5" />} label="Cart" onClick={() => navigate("/orders")} />
      <NavItem icon={<Info className="w-5 h-5" />} label="Info" onClick={() => navigate("/info")} />
    </div>
  );
}

function NavItem({ icon, label, onClick }) {
  return (
    <button
      className="flex flex-col items-center text-sm text-gray-600 hover:text-green-600"
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
