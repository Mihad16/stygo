import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react"; // ✅ icons

const PublicTopNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { shopSlug } = useParams(); // ✅ get shop slug from URL

  const sellerNumber = "+919876543210"; // ✅ seller's phone number

  const menuItems = [
    { label: "Home", path: `/${shopSlug || ""}` },
    { label: "Products", path: `/${shopSlug || ""}/products` },
    { label: "About", path: `/${shopSlug || ""}/about` },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        
        {/* Logo / Shop Name */}
        <h1
          className="text-xl font-bold cursor-pointer text-gray-800"
          onClick={() => navigate(`/${shopSlug || ""}`)}
        >
          Elcom MG
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              {item.label}
            </button>
          ))}

          {/* Call Seller Button */}
        
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                navigate(item.path);
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              {item.label}
            </button>
          ))}

          {/* Mobile Call Seller */}
          <a
            href={`tel:${sellerNumber}`}
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            <Phone size={18} className="mr-2" />
            Call Seller
          </a>
        </div>
      )}
    </header>
  );
};

export default PublicTopNav;
