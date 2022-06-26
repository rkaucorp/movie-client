import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRoute from "./Auth";
import Home from "./pages/Home";
import Login from "./pages/Login";

const RouteLayout = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<AuthRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteLayout;
