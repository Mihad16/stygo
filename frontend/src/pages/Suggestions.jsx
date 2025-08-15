import React, { useState } from "react";

export default function Suggestions() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, message, language }); // For testing
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
    setLanguage("");
  };

  return (
    <div className="w-full px-4 py-6 sm:max-w-4xl sm:mx-auto sm:py-10">
      <h1 className="text-2xl font-bold mb-4 sm:text-3xl sm:mb-6">Share Your Thoughts</h1>
      <p className="text-gray-700 mb-6 sm:mb-8">
        Found a mistake? Have an idea? Let us know below.
      </p>

      {submitted ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          ✅ Thank you! We've received your feedback.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded-lg p-4 sm:space-y-6 sm:p-6">
          <div>
            <label className="block text-sm font-medium mb-1 sm:mb-2">Your name (optional)</label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 sm:px-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

        
        
          <div>
            <label className="block text-sm font-medium mb-1 sm:mb-2">What would you like to tell us?</label>
            <textarea
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 sm:px-4"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

      

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors sm:w-auto sm:px-6"
          >
            Send Feedback
          </button>
        </form>
      )}
    </div>
  );
}