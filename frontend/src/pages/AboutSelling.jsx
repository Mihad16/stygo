import React from "react";
import { useNavigate } from "react-router-dom";

export default function AboutSelling() {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 text-sm sm:text-base underline"
      >
        ← Back to Home
      </button>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
        Start Selling on Stygo
      </h1>

      <p className="text-gray-700 text-lg text-center max-w-2xl mx-auto mb-10">
        Join thousands of small business owners and fashion entrepreneurs using Stygo to reach customers directly on WhatsApp — no fees, no hassle.
      </p>

      <div className="grid md:grid-cols-2 gap-10 mb-12">
        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="text-xl font-semibold mb-3 text-green-700">Why Choose Stygo?</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>✅ Zero commissions — keep 100% of your earnings</li>
            <li>✅ Simple WhatsApp-powered sales model</li>
            <li>✅ Create your shop in under 5 minutes</li>
            <li>✅ No technical skills or coding needed</li>
            <li>✅ Perfect for small fashion businesses in India</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="text-xl font-semibold mb-3 text-green-700">How It Works</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Create a seller account</li>
            <li>Add your products with prices and images</li>
            <li>Share your shop link on WhatsApp or social media</li>
            <li>Receive orders directly via WhatsApp</li>
            <li>Deliver products and get paid directly</li>
          </ol>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => window.open("/login", "_blank")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
        >
          Become a Seller – It's Free
        </button>
        <p className="text-sm text-gray-500 mt-2">
          No credit card required • Set up in minutes
        </p>
      </div>
    </div>
  );
}
