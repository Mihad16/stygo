import React from "react";
import { Link, useParams } from "react-router-dom";

function PublicBottomNav() {
  const { shopSlug } = useParams();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg p-2 max-w-md mx-auto border-t border-gray-100 z-50 md:hidden">
      <nav className="w-full flex justify-between items-center px-6">

        {/* Home */}
        <Link
          to={`/${shopSlug || ""}`}
          className="flex flex-col items-center text-sm text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z"
            />
          </svg>
          <span className="mt-1">Home</span>
        </Link>

        {/* Category */}
        <Link
          to={`/${shopSlug || ""}/Products`}
          className="flex flex-col items-center text-sm text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <span className="mt-1">product</span>
        </Link>

        {/* Favorites */}
        <Link to="/favorites" className="flex flex-col items-center text-sm text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
            />
          </svg>
          <span className="mt-1">Favorites</span>
        </Link>

        {/* Profile */}
        <Link to="/profile" className="flex flex-col items-center text-sm text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.121 17.804A9 9 0 1118.879 6.196 9 9 0 015.121 17.804z"
            />
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="mt-1">Profile</span>
        </Link>

      </nav>
    </div>
  );
}

export default PublicBottomNav;
