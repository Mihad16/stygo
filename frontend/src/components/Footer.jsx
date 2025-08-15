import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  const socialLinks = [
    { icon: <FaFacebook size={20} />, href: "#", label: "Facebook" },
    { icon: <FaInstagram size={20} />, href: "#", label: "Instagram" },
    { icon: <FaTwitter size={20} />, href: "#", label: "Twitter" },
    { icon: <FaYoutube size={20} />, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-6 mt-15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand / Sellers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stygo</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/Become-a-patner"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Create a Store
                </Link>
              </li>
              <li>
  <Link
    to="/suggestions"
    className="text-gray-400 hover:text-white transition-colors"
  >
    Suggestions
  </Link>
</li>

            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/our-story"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              {socialLinks.map(({ icon, href, label }, idx) => (
                <a
                  key={idx}
                  href={href}
                  aria-label={label}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-center items-center">
          <p className="text-gray-400 text-sm">© 2023 Stygo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
