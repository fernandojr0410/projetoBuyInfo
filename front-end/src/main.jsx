import { useState } from "react";
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
import Modal from "./components/modal/modal";
import FinishOrder from "./pages/finishOrder/finishOrder";
import LoginClient from "./pages/loginClient/loginClient";
import RegistrationClient from "./pages/registrationClient/registrationClient";

function Main() {
  const [nomeUsuario, setNomeUsuario] = useState(null);
  const [itemsCart, setItemsCart] = useState(0);
  const [carrinho, setCarrinho] = useState([]);

  function handleUser(user) {
    setNomeUsuario(user);

    if (user) localStorage.setItem("nomeUsuario", user);
    else localStorage.removeItem("nomeUsuario");
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

  function handleDelete(id_produto) {
    const atualizarCarrinho = carrinho.filter(
      (produto) => produto.id_produto !== id_produto
    );

    setCarrinho(atualizarCarrinho);
    localStorage.removeItem("carrinho", JSON.stringify(atualizarCarrinho));
  }

  // const handleDelete = (id_produto) => {
  //   console.log("id produto deletado", id_produto);

  //   const atualizarCarrinho = carrinho.filter(
  //     (produto) => produto.id_produto !== id_produto
  //   );

  //   setCarrinho(atualizarCarrinho);
  //   console.log("Carrinho Atualizado", atualizarCarrinho);
  //   setItemsCart(atualizarCarrinho.length ?? 0);
  //   localStorage.setItem("carrinho", JSON.stringify(atualizarCarrinho));
  // };

  return (
    <React.StrictMode>
      <Router>
        <Header
          nomeUsuario={nomeUsuario}
          itemsCart={itemsCart}
          handleUser={handleUser}
          handleDelete={handleDelete}
        />
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route
            exact
            path="/carrinho"
            element={<Cart handleDelete={handleDelete} />}
          />
          <Route
            exact
            path="/loginCliente"
            element={<LoginClient handleUser={handleUser} />}
          />
          <Route
            exact
            path="/cadastroCliente"
            element={<RegistrationClient handleUser={handleUser} />}
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
          <Route exact path="/finalizarPedido" element={<FinishOrder />} />
        </Routes>
        <Footer />
      </Router>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
