import React from "react";
import { Outlet } from "react-router-dom";
import { BottomNav } from "../components/BottomNav";
import TopNav from "../components/TopNav";

export default function MainLayout() {
  return (
    <div>
      <TopNav />
      <Outlet />
      <BottomNav />
    </div>
  );
}
