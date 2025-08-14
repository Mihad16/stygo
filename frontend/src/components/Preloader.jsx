import React from "react";
import { motion } from "framer-motion";

export default function Preloader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      {/* Logo with bounce animation */}
      <motion.img
        src="/images/my_logo.png"
        alt="Stygo Logo"
        className="w-28"
        animate={{ y: [0, -10, 0] }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        }}
      />

      {/* Text fade in and shimmer */}
      <motion.p
        className="mt-4 text-gray-700 text-lg font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Stygo is dressing up for you...
      </motion.p>

      {/* Loading bar */}
      <motion.div
        className="mt-6 h-1 w-40 bg-gray-200 overflow-hidden rounded-full"
        initial={{ width: 0 }}
        animate={{ width: "10rem" }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="h-full bg-green-500"
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
        />
      </motion.div>
    </div>
  );
}
