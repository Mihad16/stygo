import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OTPVerify from "./pages/OTPVerify";
import Info from "./pages/Info";
import Shops from "./pages/Shops";
import Dashboard from "./pages/Dashboard";
import "./App.css"; // global styles
import { BottomNav } from "./components/BottomNav";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<OTPVerify />} />
        <Route path="/info" element={<Info />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <BottomNav/>
    </Router>
  );
}
