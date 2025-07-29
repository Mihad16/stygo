import React from "react";

export default function Hero() {
  return (
    <div
      className="min-h-[480px] flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-10 text-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=60')",
      }}
    >
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Elevate Your Style
        </h1>
        <p className="text-sm text-white mt-2">
          Discover & sell unique fashion pieces — 100% on WhatsApp.
        </p>
        <p className="text-xs text-white mt-1">
          Sell fashion online, free forever
        </p>

        <button className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded-xl transition">
          Start Selling Now
        </button>
      </div>
    </div>
  );
}
