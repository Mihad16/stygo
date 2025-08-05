import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Users,

} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AboutSelling() {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const navigate = useNavigate();

  const features = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Zero Commissions",
      description: "Keep 100% of your earnings with no hidden fees or charges",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Quick Setup",
      description: "Create your shop in under 5 minutes with our simple process",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "No Technical Skills",
      description:
        "User-friendly interface requires no coding or technical knowledge",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "WhatsApp Integration",
      description:
        "Direct customer communication through India's favorite messaging app",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create Account",
      description: "Sign up as a seller in seconds",
    },
    {
      number: "02",
      title: "Add Products",
      description: "Upload images, set prices, write descriptions",
    },
    {
      number: "03",
      title: "Share Your Link",
      description: "Distribute on WhatsApp, Instagram, Facebook",
    },
    {
      number: "04",
      title: "Receive Orders",
      description: "Get notified instantly via WhatsApp",
    },
    {
      number: "05",
      title: "Get Paid",
      description: "Direct payments, no middleman fees",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">


      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Start Selling on <span className="text-green-600">Stygo</span>
        </h1>

        <p className="text-gray-700 text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
          Join <span className="font-semibold text-green-600">10,000+</span> small
          business owners and fashion entrepreneurs using Stygo to reach
          customers directly on WhatsApp — <span className="underline">no fees, no hassle</span>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-4 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            Become a Seller – It's Free
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-sm text-gray-500">
            ✨ No credit card required • ⚡ Set up in 5 minutes
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">10K+</div>
            <div className="text-gray-600 text-sm">Active Sellers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">₹50L+</div>
            <div className="text-gray-600 text-sm">Sales Generated</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">0%</div>
            <div className="text-gray-600 text-sm">Commission</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">4.9★</div>
            <div className="text-gray-600 text-sm">User Rating</div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Stygo?
          </h2>
          <p className="text-gray-600 text-lg">
            Everything you need to sell successfully online
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-green-200 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                  hoveredFeature === index
                    ? "bg-green-600 text-white scale-110"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gradient-to-r from-gray-50 to-green-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg">
              Simple steps to start your online business
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-green-200 via-green-400 to-green-200"></div>

            <div className="grid lg:grid-cols-5 gap-6">
              {steps.map((step, index) => (
                <div key={index} className="relative text-center group">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-lg transition-all duration-300 hover:border-green-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl flex items-center justify-center font-bold text-lg mx-auto mb-4 group-hover:scale-110 transition-transform">
                      {step.number}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 text-green-400">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
