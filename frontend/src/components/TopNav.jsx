import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShoppingBag, LogIn, UserPlus, User, ShoppingCart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { isAuthenticated, getCurrentUser } from "../services/auth";

export default function TopNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = isAuthenticated();
      setIsLoggedIn(authStatus);
      
      if (authStatus) {
        try {
          const userData = await getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    checkAuth();
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

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

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-gray-600 hover:text-green-600 focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
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
            active={location.pathname === "/info"} 
            onClick={() => navigate("/info")}
          >
               Info
          </NavButton>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn && user?.has_shop && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/dashboard")}
                className="flex items-center px-3 py-1.5 text-sm font-medium text-green-600 border border-green-600 rounded-md hover:bg-green-50 transition-colors"
              >
                <ShoppingCart size={16} className="mr-1.5" />
                My Dashboard
              </motion.button>
            )}
            {/* Cart Icon - Show for all users */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/cart")}
              className="relative p-2 text-gray-600 hover:text-green-600 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-2">
              <div className="border-t border-gray-200 my-3 pt-3">
                {isLoggedIn && user?.has_shop && (
                  <button
                    onClick={() => handleNavigation("/dashboard")}
                    className="w-full flex items-center px-3 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-md mb-2"
                  >
                    <ShoppingCart size={16} className="mr-2" />
                    Seller Dashboard
                  </button>
                )}
                <button
                  onClick={() => handleNavigation("/cart")}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <ShoppingBag size={16} className="mr-2" />
                  Cart
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Reusable NavButton component
function NavButton({ children, active, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`relative px-1 py-2 text-sm font-medium transition-colors ${
        active ? "text-green-600 font-semibold" : "text-gray-600 hover:text-gray-900"
      } ${className}`}
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
