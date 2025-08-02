import React from "react";
import { Link, useParams } from "react-router-dom";

export default function PublicShopNavbar() {
  const { shopSlug } = useParams();

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          {/* Logo or Shop Name */}
          <div className="flex-shrink-0">
            <Link to={`/${shopSlug}`} className="text-xl font-bold text-blue-600">
              {shopSlug}
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link
              to={`/${shopSlug}`}
              className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-gray-700 hover:border-blue-600 hover:text-blue-600"
            >
              Home
            </Link>
            <Link
              to={`/${shopSlug}/category`}
              className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-gray-700 hover:border-blue-600 hover:text-blue-600"
            >
              Category
            </Link>
            <Link
              to={`/${shopSlug}/favorites`}
              className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-gray-700 hover:border-blue-600 hover:text-blue-600"
            >
              Favorite
            </Link>
            <Link
              to={`/${shopSlug}/about`}
              className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-gray-700 hover:border-blue-600 hover:text-blue-600"
            >
              About
            </Link>
            <Link
              to={`/${shopSlug}/shop`}
              className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-gray-700 hover:border-blue-600 hover:text-blue-600"
            >
              Shop
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
