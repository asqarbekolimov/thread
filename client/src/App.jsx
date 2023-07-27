import React from "react";
import { Navbar } from "./components";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";

const App = () => {
  return (
    <>
      <Navbar />
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </>
    </>
  );
};

export default App;
