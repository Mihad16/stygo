import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PublicTopNav = () => {



  return (
    <div className="">
      <div className="">
        <nav className="bg-white shadow-sm py-3 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-10">
             <div className="flex items-center space-x-3 sm:space-x-4">
          </div>



          <div className="flex items-center space-x-3 sm:space-x-6">



            <button
              className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
              aria-label="User profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>


          </div>
        </nav>
      </div>
    </div>
  );
};

export default PublicTopNav;