import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Header from "./layout/header/header";
// import MainLayout from "./layout/main-layout/main-layout";
import Home from "./pages/Home";
import Footer from "./layout/footer/footer";
import Cart from "./pages/cart/cart";
import Category from "./pages/categories/category";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route exact path="/carrinho" element={<Cart />} />
        <Route exact path="/category" element={<Category />} />
      </Routes>

      {/* <MainLayout /> */}
      <Home />

      <Footer />
    </Router>
  </React.StrictMode>
);
