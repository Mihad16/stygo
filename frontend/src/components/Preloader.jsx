import React from "react";
import { motion } from "framer-motion";

export default function Preloader() {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      <div
        className="flex flex-col items-center text-center"
        role="status"
        aria-live="polite"
        aria-label="Loading"
      >
        {/* Brand mark with subtle breathe animation */}
        <motion.img
          src="/images/my_logo.png"
          alt="Stygo"
          className="w-24 h-auto"
          initial={{ opacity: 0.85, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />

        {/* Spinner */}
        <div className="mt-6 h-10 w-10 rounded-full border-2 border-gray-300 border-t-blue-600 animate-spin" />

        {/* Message */}
        <p className="mt-4 text-gray-600 text-base">
          Loading Stygo experience...
        </p>
        <span className="sr-only">Please wait</span>
      </div>
    </div>
  );
}
