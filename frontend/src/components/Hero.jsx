import React from "react";
import { Plus } from "lucide-react";

export default function Hero() {
  return (
    <div
      className="text-center py-10 px-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=60')`,
      }}
    >
      {/* Overlay for dark blur effect */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 inline-block">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to Stygo 👗</h1>
        <p className="text-sm text-gray-600 mt-2">
          Sell & shop fashion directly through WhatsApp
        </p>
        <p className="text-xs text-gray-500 mt-1">Sell fashion online, free forever</p>

        <button className="mt-4 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-2 rounded-full inline-flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Build Your Store
        </button>
      </div>
    </div>
  );
}
