import React, { useState, useEffect } from "react";
import { Search as SearchIcon, X, Loader2 } from "lucide-react";

export default function Search({ 
  value, 
  onChange, 
  placeholder = "Search by shop or location...",
  darkMode = false,
  loading = false
}) {
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
    <div className={`relative w-full transition-all duration-300 ${isFocused ? "scale-[1.02]" : ""}`}>
      <div className={`flex items-center rounded-xl px-5 py-3 shadow-sm transition-all duration-300 ${
        isFocused 
          ? darkMode
            ? "bg-gray-800 border-2 border-blue-400 shadow-lg"
            : "bg-white border-2 border-blue-500 shadow-lg"
          : darkMode
            ? "bg-gray-700 border border-gray-600 hover:border-gray-500"
            : "bg-gray-50 border border-gray-200 hover:border-gray-300"
      }`}>
        <SearchIcon className={`w-5 h-5 mr-3 transition-colors duration-300 ${
          isFocused 
            ? darkMode 
              ? "text-blue-400" 
              : "text-blue-500"
            : darkMode 
              ? "text-gray-400" 
              : "text-gray-500"
        }`} />
        
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`outline-none w-full bg-transparent ${
            darkMode ? "text-gray-100 placeholder-gray-400" : "text-gray-700 placeholder-gray-500"
          } text-base font-medium`}
        />
        
        <div className="flex items-center ml-2">
          {loading && (
            <Loader2 className={`w-5 h-5 animate-spin ${
              darkMode ? "text-blue-300" : "text-blue-500"
            }`} />
          )}
          
          {inputValue && !loading && (
            <button 
              onClick={handleClear}
              className={`p-1 rounded-full ${
                darkMode 
                  ? "bg-gray-600 text-gray-300 hover:bg-gray-500" 
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              } transition-colors`}
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      
      {/* Animated focus indicator */}
      {isFocused && (
        <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 ${
          darkMode ? "bg-blue-400" : "bg-blue-500"
        } h-0.5 rounded-full transition-all duration-500 ${
          isFocused ? "w-20 opacity-80" : "w-0 opacity-0"
        }`}></div>
      )}
    </div>
  );
}