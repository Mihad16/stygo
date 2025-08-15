import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { BottomNav } from "../components/BottomNav";
import TopNav from "../components/TopNav";
import Preloader from "../components/Preloader";

export default function MainLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div>
      <TopNav />
      <Outlet />
      <BottomNav />
    </div>
  );
}
