import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Users,
  ShoppingBag,
  MessageCircle,
  CreditCard,
  Smile
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
      icon: <ShoppingBag className="w-5 h-5" />,
      title: "Create Account",
      description: "Sign up as a seller in seconds",
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "Add Products",
      description: "Upload images, set prices, write descriptions",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Share Your Link",
      description: "Distribute on WhatsApp, Instagram, Facebook",
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: "Receive Orders",
      description: "Get notified instantly via WhatsApp",
    },
    {
      icon: <Smile className="w-5 h-5" />,
      title: "Get Paid",
      description: "Direct payments, no middleman fees",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Grow Your Business with <span className="text-green-600">Stygo</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Join <span className="font-semibold text-green-600">10,000+</span> sellers who use Stygo to 
              sell directly to customers on WhatsApp — <span className="underline">no fees, no hassle</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={() => navigate("/login")}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-all transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
              >
                Start Selling for Free
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-sm text-gray-500">
                No credit card required • Setup in 5 minutes
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { value: "10K+", label: "Active Sellers" },
                { value: "₹50L+", label: "Sales Generated" },
                { value: "0%", label: "Commission" },
                { value: "4.9★", label: "User Rating" }
              ].map((stat, index) => (
                <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-2xl font-bold text-green-600">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Sellers Love Stygo
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Everything you need to start and grow your online business
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 ${
                  hoveredFeature === index
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Start Selling in 5 Simple Steps
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Get your online store up and running in minutes
            </p>
          </div>
          
          <div className="relative">
            <div className="hidden lg:flex absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2">
              <div className="h-full bg-green-500" style={{ width: "100%" }}></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 relative">
              {steps.map((step, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-lg mb-4 mx-auto">
                    {step.icon}
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-semibold text-green-600 mb-1">STEP {index + 1}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Selling?</h2>
          <p className="text-green-100 mb-8 text-lg">
            Join thousands of entrepreneurs who are growing their business with Stygo
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-all transform hover:scale-105 shadow-md flex items-center gap-2 mx-auto"
          >
            Create Your Free Shop Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}