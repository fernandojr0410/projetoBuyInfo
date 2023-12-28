import { useState, useEffect } from "react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Header from "./layout/header/header";
import Home from "./pages/home";
import Footer from "./layout/footer/footer";
import Cart from "./pages/cart/cart";
import Category from "./pages/categories/category";
import Product from "./pages/product/product";
// import Modal from "./components/modal/modal";
import FinishOrder from "./pages/finishOrder/finishOrder";
import LoginClient from "./pages/loginClient/loginClient";
import RegistrationClient from "./pages/registrationClient/registrationClient";

import SidebarCustomer from "./pages/customer/components/sideBarCustomer";
import CustomerData from "./pages/customer/customerData";
import CustomerOrders from "./pages/customer/customerOrders";
import ModalRegistration from "./components/modal/modalRegistration";
import Loading from "./layout/loading/loading";
import Modal from "./components/modal/modal";

function Main() {
  const [cliente, setCliente] = useState(
    JSON.parse(localStorage.getItem("cliente")) || null
  );

  const carrinhoLocal = JSON.parse(localStorage.getItem("carrinho")) || [];
  const [itemsCart, setItemsCart] = useState(carrinhoLocal.length || 0);

  useEffect(() => {
    const dadosCliente = JSON.parse(localStorage.getItem("cliente"));
    if (dadosCliente) {
      setCliente(dadosCliente);
    }
  }, []);

  function handleUser(user) {
    setCliente(user);

    if (user) localStorage.setItem("cliente", JSON.stringify(user));
    else localStorage.removeItem("cliente");
  }

  function handleAdicionarCarrinho(produto) {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const produtoExiste = carrinho.find(
      (item) => item.id_produto === produto.id_produto
    );

    if (produtoExiste) {
      const index = carrinho.findIndex(
        (item) => item.id_produto === produto.id_produto
      );
      carrinho[index].quantidade += 1;
    } else {
      produto.quantidade = 1;
      carrinho.push(produto);
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    setItemsCart(carrinho.length ?? 0);
  }

  function handleItemsCart(items) {
    setItemsCart(items);
  }

  return (
    <React.StrictMode>
      <Router>
        <Header
          cliente={cliente}
          itemsCart={itemsCart}
          handleUser={handleUser}
        />
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route
            exact
            path="/carrinho"
            element={
              <Cart
                handleItemsCart={handleItemsCart}
                cliente={cliente}
                handleUser={handleUser}
              />
            }
          />
          <Route
            exactx
            path="/login-cliente"
            element={<LoginClient handleUser={handleUser} cliente={cliente} />}
          />
          <Route exactx path="/carregamento" element={<Loading />} />
          <Route
            exact
            path="/cadastro-cliente"
            element={
              <RegistrationClient handleUser={handleUser} cliente={cliente} />
            }
          />
          <Route exact path="/modal" element={<ModalRegistration />} />
          <Route
            exact
            path="/edicao-cadastro/:id"
            element={<SidebarCustomer />}
          />

          <Route
            exact
            path="/edicao-cadastro/meus-dados/:id"
            element={<CustomerData handleUser={handleUser} cliente={cliente} />}
          />
          <Route
            exact
            path="/edicao-cadastro/meus-pedidos/:id"
            element={<CustomerOrders />}
          />

          <Route exact path="/categoria/:id" element={<Category />} />
          <Route
            exact
            path="/produto/:id"
            element={
              <Product handleAdicionarCarrinho={handleAdicionarCarrinho} />
            }
          />
          <Route exact path="/modal" element={<Modal />} />
          {/* <Route exact path="/modal" element={<Modal />} /> */}

          <Route
            exact
            path="/finalizar-pedido"
            element={<FinishOrder cliente={cliente} />}
          />
        </Routes>
        <Footer />
      </Router>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
