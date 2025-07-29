import React from "react";
import { Search as SearchIcon } from "lucide-react";

export default function Search({ value, onChange }) {
  return (
    <div className="flex items-center bg-white rounded-full shadow px-4 py-2 mb-4 border border-gray-200">
      <SearchIcon className="text-gray-400 w-5 h-5 mr-2" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by shop or location..."
        className="outline-none w-full text-sm text-gray-700 placeholder-gray-400"
      />
    </div>
  );
}
