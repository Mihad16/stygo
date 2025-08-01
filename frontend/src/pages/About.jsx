import React from "react";
import { Bolt, MessageCircle, Zap, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <div className="relative z-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Revolutionizing <span className="text-blue-600">Fashion</span> Commerce
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Stygo bridges the gap between social selling and professional eCommerce
            </p>
          </div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400 rounded-full opacity-10"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full opacity-10"></div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-6 md:p-8">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Bolt className="text-blue-500" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Instant Setup</h2>
            <p className="text-gray-600">
              Get your fashion store up and running in minutes, not days. No technical skills needed - just your products and passion.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-6 md:p-8">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <MessageCircle className="text-purple-500" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Direct WhatsApp Integration</h2>
            <p className="text-gray-600">
              Your customers shop from your catalog and message you directly on WhatsApp - the platform they already know and trust.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">How Stygo Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A seamless selling experience designed for fashion entrepreneurs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Zap className="text-emerald-500" size={32} />,
              title: "List Products",
              description: "Upload your fashion items with photos, prices, and sizes in seconds"
            },
            {
              icon: <Users className="text-blue-500" size={32} />,
              title: "Share Your Link",
              description: "Customers browse your products on any device, anytime"
            },
            {
              icon: <MessageCircle className="text-purple-500" size={32} />,
              title: "Receive Orders",
              description: "Get purchase inquiries directly in your WhatsApp inbox"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-center text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The passionate minds behind Stygo
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {[
            {
              name: "Mihad Bornio",
              role: "Founder & Developer",
              bio: "Built the platform to empower fashion entrepreneurs with simple technology",
              image: "/images/mihad.jpg"
            },
            {
              name: "Nafith",
              role: "Marketing & Strategy",
              bio: "Helps sellers maximize their business potential through digital channels",
              image: "/images/nafith.jpg"
            }
          ].map((member, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                    <p className="text-blue-600">{member.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

  

      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center border-t border-gray-200">
        <p className="text-gray-500">
          &copy; {new Date().getFullYear()} Stygo. All rights reserved.
        </p>
      </footer>
    </div>
  );
}