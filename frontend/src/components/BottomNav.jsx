import React, { useState, useEffect, useRef } from "react";
import { Home, Store, Heart, Info } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);

  // Hide on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { icon: <Home />, label: "Home", path: "/", active: location.pathname === "/" },
    { icon: <Store />, label: "Shops", path: "/shops", active: location.pathname === "/shops" },
    { icon: <Info />, label: "Info", path: "/info", active: location.pathname === "/info" }
  ];

  return (
    <div
      className={clsx(
        " md:hidden fixed bottom-1 left-1/2 transform -translate-x-1/2 bg-white/90  backdrop-blur-md shadow-2xl px-3  flex justify-center gap-4 items-center rounded-3xl max-w-md w-full  border border-gray-200 z-50 transition-transform duration-300",
        showNav ? "translate-y-0" : "translate-y-full"
      )}
    >
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
        "flex flex-col items-center justify-center px-3 py-2 rounded-2xl transition-all duration-200",
        active ? "text-green-600" : "text-gray-500 hover:text-gray-700"
      )}
      onClick={onClick}
    >
      <div
        className={clsx(
          "p-2 rounded-full transition-all duration-200",
          active ? "bg-green-50 scale-110" : "hover:bg-gray-100"
        )}
      >
        {React.cloneElement(icon, { className: "w-5 h-5" })}
      </div>
      <span className="mt-1 text-xs font-semibold">{label}</span>
    </button>
  );
}
