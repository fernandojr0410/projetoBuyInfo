import { useLocation } from "react-router-dom";
import SidebarCustomer from "./components/sideBarCustomer";
import { useEffect, useState } from "react";

function CustomerOrders() {
  const [produtosDestaque, setProdutosDestaque] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [quantidades, setQuantidades] = useState({});
  const location = useLocation();

  useEffect(() => {
    const carrinhoData = JSON.parse(localStorage.getItem("carrinho")) || [];
    let quantidadePorProduto = {};
    carrinhoData.forEach((produto) => {
      quantidadePorProduto[produto.id_produto] = produto.quantidade;
    });
    setCarrinho(carrinhoData);
    setQuantidades(quantidadePorProduto);
  }, []);

  let valorTotal = 0;
  carrinho.forEach((produto) => {
    valorTotal +=
      produto.preco * (quantidades[produto.id_produto] || produto.quantidade);
  });

  const numeroParcelas = 10;
  const valorParcela = valorTotal / numeroParcelas;

  const maisVendidos = produtosDestaque.filter(
    (produto) => produto.destaque_id_destaque === 3
  );

  useEffect(() => {
    fetch(`http://localhost:5000/produtos/destaques`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProdutosDestaque(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="flex bg-gray-200 py-5">
      <SidebarCustomer />

      <div className="flex flex-col">
        <span className="font-bold text-primary text-xl pb-4">
          Meus Pedidos
        </span>

        <div className="flex flex-col bg-white p-4 rounded-md w-[70%]">
          <div>
            {carrinho.map((produto, index) => (
              <div key={index}>
                <div className="flex">
                  <div className="flex w-48 h-32">
                    {produto.imagens.length > 0 && (
                      <img src={produto.imagens[0]} alt="" className="" />
                    )}
                  </div>
                  <div className="flex flex-col gap-4 p-2">
                    <div className="font-bold">
                      <span>{produto.nome}</span>
                    </div>
                    <div>
                      <span className="text-primary">
                        Marca:
                        {produto.marca}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col pt-6 font-bold text-primary">
                  <span>Valor Unitário: {produto.preco}</span>
                </div>
                <div className="flex border-solid border border-primary"></div>
              </div>
            ))}
          </div>
          <div className="flex flex-col pt-6 font-bold text-primary">
            <span>Valor Total: {valorTotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerOrders;
