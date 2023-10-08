import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Header from "./layout/header/header";
import MainLayout from "./layout/main-layout/main-layout";
import Footer from "./layout/footer/footer";
import Cart from "./pages/cart/cart";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route exact path="/carrinho" element={<Cart />} />
      </Routes>
      <MainLayout />
      <Footer />
    </Router>
  </React.StrictMode>
);
