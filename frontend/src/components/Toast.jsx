import React, { useEffect } from "react";

export default function Toast({ message, type = "error", open, onClose, duration = 3000 }) {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  const colors = type === "success"
    ? "bg-green-600 text-white"
    : type === "info"
    ? "bg-blue-600 text-white"
    : "bg-red-600 text-white";

  return (
    <div className="fixed inset-x-0 bottom-4 px-3 sm:bottom-6 sm:px-0 z-50 flex justify-center pointer-events-none">
      <div className={`pointer-events-auto ${colors} rounded-lg shadow-lg px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm max-w-sm w-full sm:w-auto text-center animate-in fade-in slide-in-from-bottom-4 duration-200`}>
        {message}
      </div>
    </div>
  );
}
