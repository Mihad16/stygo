import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../services/auth";

export default function Login() {
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("login"); // 'login' or 'signup'
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Check if the input is an email
  const isEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };
  
  // Check if the input is a phone number (digits only, 10+ digits)
  const isPhone = (value) => {
    return /^\d{10,15}$/.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setError("");
    setLoading(true);

    // Clear any existing tokens to prevent auto-refresh
    ['accessToken', 'refreshToken', 'user_id', 'phone', 'has_shop'].forEach(key => {
      localStorage.removeItem(key);
    });

    // Validation
    if (!loginIdentifier) {
      setError(activeTab === "signup" ? "Phone number is required" : "Email or phone number is required");
      setLoading(false);
      return false;
    }

    if (activeTab === "signup") {
      // For signup, we need both email and phone
      if (!isPhone(loginIdentifier)) {
        setError("Please enter a valid 10-digit phone number");
        setLoading(false);
        return false;
      }
      if (!email) {
        setError("Email is required for signup");
        setLoading(false);
        return false;
      }
      if (!isEmail(email)) {
        setError("Please enter a valid email address");
        setLoading(false);
        return false;
      }
    } else {
      // For login, check if it's a valid email or phone
      if (!isEmail(loginIdentifier) && !isPhone(loginIdentifier)) {
        setError("Please enter a valid email or phone number");
        setLoading(false);
        return false;
      }
    }

    if (!password) {
      setError("Password is required");
      setLoading(false);
      return false;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters long");
      setLoading(false);
      return false;
    }

    try {
      if (activeTab === "signup") {
        // For signup, we need both phone and email
        await signup(loginIdentifier, password, email);
      } else {
        // For login, we can use either email or phone
        await login(loginIdentifier, password);
      }
      
      // Redirect based on shop status
      const hasShop = localStorage.getItem('has_shop') === 'true';
      if (hasShop) {
        navigate('/dashboard');
      } else {
        navigate('/Become-a-patner');
      }
    } catch (err) {
      // Use the error message from our enhanced error handling in auth service
      setError(err.message || "Failed to process your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Stygo</h1>
          <p className="text-gray-600">
            {activeTab === "signup" ? 'Create your account' : 'Sign in to continue'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 border-b border-gray-200">
          <button
            className={`py-3 px-4 text-center flex-1 text-sm font-medium ${activeTab === "login" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("login")}
          >
            Sign In
          </button>
          <button
            className={`py-3 px-4 text-center flex-1 text-sm font-medium ${activeTab === "signup" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("signup")}
          >
            Create Account
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "login" ? (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <div className="mb-4">
                <label htmlFor="loginIdentifier" className="block text-sm font-medium text-gray-700 mb-2">
                  Email or Phone Number
                </label>
                <input
                  id="loginIdentifier"
                  type="text"
                  placeholder="Enter your email or phone number"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  disabled={loading}
                  minLength="4"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !loginIdentifier || !password}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors mb-4"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm text-center">{error}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <button
                      type="button"
                      onClick={() => navigate('/password-reset')}
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <div className="mb-4">
                <label htmlFor="loginIdentifier" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    +91
                  </span>
                  <input
                    id="loginIdentifier"
                    type="tel"
                    placeholder="Enter 10-digit number"
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={loginIdentifier}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setLoginIdentifier(value);
                    }}
                    maxLength={10}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required={true}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Create a password (min 4 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  disabled={loading}
                  minLength="4"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !loginIdentifier || !password}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors mb-4"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}
          </form>
        )}

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            By continuing, you agree to our{' '}
            <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> and{' '}
            <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
