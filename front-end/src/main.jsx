import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Header from "./layout/header/header";
// import MainLayout from "./layout/main-layout/main-layout";
import Home from "./pages/home";
import Footer from "./layout/footer/footer";
import Cart from "./pages/cart/cart";
import Category from "./pages/categories/category";
import Product from "./pages/product/product";
import Modal from "./components/modal/modal";
import FinalizarPedido from "./pages/finalizarPedido/finalizarPedido";
import LoginCliente from "./pages/loginCliente/login";
import CadastroCliente from "./pages/cadastroCliente/cadastroCliente";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/carrinho" element={<Cart />} />
        <Route exact path="/loginCliente" element={<LoginCliente />} />
        <Route exact path="/cadastroCliente" element={<CadastroCliente />} />
        <Route exact path="/categoria/:id" element={<Category />} />
        <Route exact path="/produto/:id" element={<Product />} />
        <Route exact path="/modal" element={<Modal />} />
        <Route exact path="/finalizarPedido" element={<FinalizarPedido />} />
      </Routes>

      {/* <MainLayout /> */}

      <Footer />
    </Router>
  </React.StrictMode>
);
