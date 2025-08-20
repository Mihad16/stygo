import React from "react";
import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        ← Back
      </button>
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-gray-700 mb-4">
        We value your privacy. This policy explains what data we collect, how we use it, and your rights.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>Account information you provide (name, phone, email)</li>
        <li>Order and browsing information to improve your experience</li>
        <li>Cookies for session management and analytics</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Information</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>To operate and improve the Stygo platform</li>
        <li>To process orders and provide customer support</li>
        <li>To prevent fraud and ensure platform security</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">Your Choices</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>You can request access, correction, or deletion of your data</li>
        <li>You can control cookies from your browser settings</li>
      </ul>
      <p className="text-gray-500 text-sm mt-8">
        Note: This is a general policy template. Update it to reflect your actual practices and legal requirements.
      </p>
    </div>
  );
}
