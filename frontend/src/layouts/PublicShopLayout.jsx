import React from "react";
import { Outlet } from "react-router-dom";


export default function PublicShopLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
     

      <header className="p-4 bg-white shadow-sm text-center font-bold text-xl">
        Welcome to the Shop
      </header>

      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
