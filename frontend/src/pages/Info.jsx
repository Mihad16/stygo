import React from "react";

export default function Info() {
  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* Hero Section */}
      <div className="bg-green-100 rounded-xl p-4 text-center mb-6 shadow">
        <h1 className="text-2xl font-bold text-green-800">About Stygo 👗</h1>
        <p className="text-sm text-green-700 mt-1">
          Powering WhatsApp-based fashion sellers.
        </p>
      </div>

      {/* What is Stygo */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">What is Stygo?</h2>
        <p className="text-gray-600 text-sm mb-3 leading-relaxed">
          Stygo is a mobile-first platform designed to help individuals and small
          sellers showcase fashion products and get orders directly on WhatsApp.
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
          <li>No coding or app download required</li>
          <li>Easy shop and product listing</li>
          <li>100% free to use</li>
          <li>Buyers message you via WhatsApp</li>
        </ul>
      </section>

      {/* Why Stygo */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Why Stygo?</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Selling on Instagram or WhatsApp is common, but it's messy. Stygo gives
          sellers a clean shop link where buyers can view, filter, and instantly order
          fashion products through WhatsApp.
        </p>
      </section>

      {/* Meet the Team */}


    
    

      {/* Footer */}
      <div className="text-center text-xs text-gray-400 mt-8">
        &copy; {new Date().getFullYear()} Stygo. Built for sellers in the digital age.
      </div>
    </div>
  );
}
