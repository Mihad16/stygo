import React from "react";
import { Outlet } from "react-router-dom";
import { BottomNav } from "../components/BottomNav";

export default function MainLayout() {
  return (
    <div>
      <Outlet />
      <BottomNav />
    </div>
  );
}
