import React from "react";
import { Home, Store, ShoppingBag, Info } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { 
      icon: <Home className="w-5 h-5" />,
      label: "Home",
      path: "/",
      active: location.pathname === "/"
    },
    { 
      icon: <Store className="w-5 h-5" />,
      label: "Shops",
      path: "/shops",
      active: location.pathname === "/shops"
    },
    { 
      icon: <ShoppingBag className="w-5 h-5" />,
      label: "Cart",
      path: "/orders",
      active: location.pathname === "/orders"
    },
    { 
      icon: <Info className="w-5 h-5" />,
      label: "About",
      path: "/about",
      active: location.pathname === "/about"
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg p-2 flex justify-around max-w-md mx-auto border-t border-gray-100 z-50 md:hidden">
      {navItems.map((item) => (
        <NavItem 
          key={item.path}
          icon={item.icon}
          label={item.label}
          active={item.active}
          onClick={() => navigate(item.path)}
        />
      ))}
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      className={clsx(
        "flex flex-col items-center w-full py-1 text-xs transition-all duration-200",
        active ? "text-green-600" : "text-gray-500 hover:text-gray-700"
      )}
      onClick={onClick}
    >
      <div className={clsx(
        "p-2 rounded-full transition-colors",
        active ? "bg-green-50" : "hover:bg-gray-100"
      )}>
        {React.cloneElement(icon, {
          className: clsx(
            "w-5 h-5 transition-transform",
            active && "scale-110"
          )
        })}
      </div>
      <span className="mt-1 font-medium">{label}</span>
      {active && (
        <div className="w-1 h-1 bg-green-500 rounded-full mt-1"></div>
      )}
    </button>
  );
}