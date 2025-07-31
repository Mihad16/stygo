import React, { useState, useEffect } from "react";
import { Search as SearchIcon, X } from "lucide-react";

export default function Search({ value, onChange, placeholder = "Search by shop or location..." }) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  // Debounce the input
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, onChange]);

  const handleClear = () => {
    setInputValue("");
    onChange("");
  };

  return (
    <div className={`relative w-full max-w-md mx-auto mb-4 transition-all duration-200 ${isFocused ? "scale-[1.02]" : ""}`}>
      <div className={`flex items-center rounded-full px-4 py-3 shadow-sm transition-all duration-200 ${
        isFocused 
          ? "bg-white border-2 border-blue-500 shadow-md" 
          : "bg-gray-50 border border-gray-200 hover:border-gray-300"
      }`}>
        <SearchIcon className={`w-5 h-5 mr-2 transition-colors duration-200 ${
          isFocused ? "text-blue-500" : "text-gray-400"
        }`} />
        
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="outline-none w-full bg-transparent text-gray-700 placeholder-gray-400 text-sm font-medium"
        />
        
        {inputValue && (
          <button 
            onClick={handleClear}
            className="ml-2 p-1 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {/* Micro-interaction indicator */}
      {isFocused && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-500 rounded-full opacity-30"></div>
      )}
    </div>
  );
}