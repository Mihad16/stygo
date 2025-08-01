import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

export default function TopNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const isSellerLoggedIn = !!localStorage.getItem("accessToken");

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm w-full px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Image Only */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center"
        >
          <img
            src="images/my_logo.png" // Replace with your actual logo path
            alt="Stygo"
            onClick={() => navigate("/")}
            className="h-10 w-auto cursor-pointer"
          />
        </motion.div>

        {/* Navigation Links - Visible on medium screens and up */}
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
            active={location.pathname === "/about"} 
            onClick={() => navigate("/about")}
          >
            About
          </NavButton>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Cart Icon (only visible on md+) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/cart")}
            className="hidden md:block relative p-2 text-gray-600 hover:text-green-600 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {/* Optional cart badge */}
          </motion.button>

          {/* Seller Button */}
          {!isSellerLoggedIn ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all shadow-sm hover:shadow-md"
            >
              <span className="hidden sm:inline">Become a Seller</span>
              <span className="sm:hidden">Seller</span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/dashboard")}
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
            >
              <User className="w-5 h-5 text-gray-700" />
              <span className="hidden sm:inline text-sm font-medium">Dashboard</span>
            </motion.button>
          )}
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
