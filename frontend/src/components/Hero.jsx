import React from "react";

export default function Hero() {
  return (
    <div
      className="min-h-[420px] sm:min-h-[500px] md:min-h-[600px] flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-10 text-center rounded-b-3xl shadow-md relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
      }}
    >
      {/* Floating fashion elements (purely decorative) */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-full blur-sm"></div>
      <div className="absolute bottom-1/4 right-12 w-24 h-24 bg-pink-400/10 rounded-full blur-sm"></div>
      
      <div className="max-w-sm sm:max-w-md md:max-w-lg mx-auto px-2 relative z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight drop-shadow-lg mb-4">
          Elevate Your Fashion Business
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-white/90 mt-3 drop-shadow-md mb-6">
          Sell directly to customers through WhatsApp - no fees, no hassle
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 px-6 rounded-xl transition-all shadow-md text-sm sm:text-base">
            Start Selling Free
          </button>
          <button className="border-2 border-white hover:bg-white/10 text-white font-semibold py-3 px-6 rounded-xl transition-all text-sm sm:text-base">
            How It Works
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-white/80">
          <span>No credit card required</span>
          <span>•</span>
          <span>Set up in minutes</span>
        </div>
      </div>
    </div>
  );
}