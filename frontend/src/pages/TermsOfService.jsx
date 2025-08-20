import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function TermsOfService() {
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          ← Back
        </button>
        <Link
          to="/suggestions"
          className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Send a Suggestion
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="text-gray-700 mb-4">
        By using Stygo, you agree to the following terms and conditions.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Use of the Platform</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>You must provide accurate information and keep your account secure.</li>
        <li>Do not engage in fraudulent or illegal activities.</li>
        <li>Respect intellectual property and community guidelines.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">Orders and Payments</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>All orders are subject to availability and seller confirmation.</li>
        <li>Refunds and returns follow the seller's policy and applicable laws.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">Liability</h2>
      <p className="text-gray-700 mb-4">
        Stygo is a marketplace platform and is not responsible for products sold by independent sellers, except as required by law.
      </p>
      <p className="text-gray-500 text-sm mt-8">
        Note: This is a general terms template. Update it to reflect your actual policies and legal requirements.
      </p>
    </div>
  );
}
