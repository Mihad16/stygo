import React, { useState } from "react";

const plans = [
  {
    id: "free",
    name: "Free Plan",
    price: "₹0",
    period: "/month",
    features: [
      "Shop URL: stygos.com/shopname",
      "List products (limited)",
      "Basic design only",
    ],
    buttonText: "Current Plan",
    buttonDisabled: true,
    description: "Easy entry, no barrier.",
  },
  {
    id: "pro",
    name: "Pro Plan",
    price: "₹199",
    period: "/month",
    features: [
      "Shop URL: shopname.stygo.in",
      "Appear in Trending Section sometimes",
      "More product uploads",
      "Shop banner/logo customization",
    ],
    buttonText: "Upgrade to Pro",
    buttonDisabled: false,
    description: "For small sellers who want visibility.",
  },
  {
    id: "premium",
    name: "Premium Plan",
    price: "₹499",
    period: "/month",
    features: [
      "Shop URL: shopname.stygo.in + option for custom domain",
      "Guaranteed Trending/Featured placement",
      "Advanced customization (themes/colors)",
      "Top search placement",
    ],
    buttonText: "Upgrade to Premium",
    buttonDisabled: false,
    description: "For sellers who want maximum visibility and features.",
  },
];

export default function SubscriptionPlans() {
  const [selectedPlan, setSelectedPlan] = useState("free");

  const onSelect = (planId) => {
    setSelectedPlan(planId);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-xl bg-white p-6 border ${
              selectedPlan === plan.id ? "border-blue-500 border-2" : "border-gray-200"
            } shadow-sm`}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{plan.name}</h3>
            <p className="text-3xl font-bold text-gray-900 mb-4">
              {plan.price}
              <span className="text-lg text-gray-500">{plan.period}</span>
            </p>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => onSelect(plan.id)}
              disabled={plan.buttonDisabled}
              className={`w-full py-2 px-4 rounded-md font-medium ${
                selectedPlan === plan.id
                  ? "bg-blue-600 text-white"
                  : plan.buttonDisabled
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
            >
              {plan.buttonText}
            </button>
            <p className="text-xs text-gray-500 mt-2 text-center">{plan.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
