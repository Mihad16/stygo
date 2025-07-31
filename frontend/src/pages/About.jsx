import React from "react";

export default function About() {
  return (
    <div className="max-w-md mx-auto px-4 pb-24 pt-6 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 p-8 text-center text-white shadow-xl mb-8">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">Stygo</h1>
          <p className="text-blue-100 text-lg">
            Your shop, your style 
          </p>
        </div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-400 rounded-full opacity-20"></div>
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-cyan-400 rounded-full opacity-20"></div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="text-blue-500 text-2xl mb-2">🧵</div>
          <h3 className="font-medium text-gray-800">Fashion Sellers</h3>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="text-blue-500 text-2xl mb-2">📦</div>
          <h3 className="font-medium text-gray-800">Product Listing</h3>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="text-blue-500 text-2xl mb-2">📲</div>
          <h3 className="font-medium text-gray-800">WhatsApp Orders</h3>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="text-blue-500 text-2xl mb-2">💸</div>
          <h3 className="font-medium text-gray-800">100% Free</h3>
        </div>
      </div>

      {/* What We Do */}
      <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
        <div className="flex items-start mb-4">
          <div className="bg-blue-100 p-2 rounded-lg mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">What is Stygo?</h2>
            <p className="text-gray-600 mt-1 text-sm">
              Stygo helps you list your fashion products, share your shop link, and receive orders directly on WhatsApp. No coding. No fees.
            </p>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
        <div className="flex items-start">
          <div className="bg-cyan-100 p-2 rounded-lg mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Why Stygo?</h2>
            <p className="text-gray-600 mt-1 text-sm">
              Instagram DMs are messy. WhatsApp is personal. Stygo bridges both with a simple shop experience made for online sellers.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Meet Our Team</h2>
        
        <div className="space-y-4">
          <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition">
            <div className="relative">
              <img
                src="/images/mihad.jpg"
                alt="Mihad"
                className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-white shadow"
              />
              <div className="absolute bottom-0 right-4 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <p className="font-medium text-gray-800">Mihad Bornio</p>
              <p className="text-sm text-gray-500">Founder & Developer</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition">
            <div className="relative">
              <img
                src="/images/nafith.jpg"
                alt="Nafith"
                className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-white shadow"
              />
              <div className="absolute bottom-0 right-4 w-4 h-4 bg-cyan-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <p className="font-medium text-gray-800">Nafith</p>
              <p className="text-sm text-gray-500">Marketing & Strategy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-400 mt-10">
        <p>&copy; {new Date().getFullYear()} Stygo · Made with <span className="text-blue-500">❤️</span></p>
        <p className="mt-1 text-xs">Simplifying mobile commerce</p>
      </footer>
    </div>
  );
}