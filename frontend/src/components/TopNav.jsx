import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

export default function TopNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm w-full px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center"
        >
          <img
            src="/images/my_logo.png"
            alt="Stygo"
            onClick={() => navigate("/")}
            className="h-10 w-auto cursor-pointer"
            onError={(e) => {
              if (e.currentTarget.dataset.fallback !== "1") {
                e.currentTarget.dataset.fallback = "1";
                e.currentTarget.src = "/images/mylogo.jpeg";
              }
            }}
          />
        </motion.div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavButton 
            active={location.pathname === "/"} 
            onClick={() => navigate("/")}
          >
            Home
          </NavButton>
          <NavButton 
            active={location.pathname === "/shops"} 
            onClick={() => navigate("/shops")}
          >
            Shops
          </NavButton>
          <NavButton 
            active={location.pathname === "/our-story"} 
            onClick={() => navigate("/our-story")}
          >
            About
          </NavButton>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Cart Icon */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/cart")}
            className="hidden md:block relative p-2 text-gray-600 hover:text-green-600 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
          </motion.button>

          {/* Always show Become a Seller button */}
      
        </div>
      </div>
    </header>
  );
}

// Reusable NavButton component
function NavButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative px-1 py-2 text-sm font-medium transition-colors ${
        active ? "text-green-600 font-semibold" : "text-gray-600 hover:text-gray-900"
      }`}
    >
      {children}
      {active && (
        <motion.span
          layoutId="navIndicator"
          className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 rounded-full"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </button>
  );
}
