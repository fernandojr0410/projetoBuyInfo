import { useEffect, useState } from "react";
import SidebarCustomer from "./components/sideBarCustomer";

function CustomerOrders() {
  const [carrinho, setCarrinho] = useState([]);
  const [cliente, setCliente] = useState({});
  const [endereco, setEndereco] = useState({});
  const [tipoEntrega, setTipoEntrega] = useState("normal");
  const [frete, setFrete] = useState(30);
  const [valorTotal, setValorTotal] = useState(0);

  useEffect(() => {
    const carrinhoData = JSON.parse(localStorage.getItem("carrinho")) || [];
    setCarrinho(carrinhoData);

    const clienteData = JSON.parse(localStorage.getItem("cliente")) || {};
    setCliente(clienteData);

    const enderecoData = JSON.parse(localStorage.getItem("endereco")) || {};
    setEndereco(enderecoData);

    const valorTotalData = JSON.parse(localStorage.getItem("valorTotal")) || 0;
    setValorTotal(valorTotalData);
  }, []);

  return (
    <div className="flex bg-gray-200 p-10">
      <SidebarCustomer />
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-primary text-xl">Meus Pedidos</span>

          <div className="flex flex-col gap-4 border border-solid border-gray-400 bg-white rounded-md w-[50%] p-4">
            {carrinho.map((produto, index) => (
              <div key={index}>
                <div>
                  <div>
                    {produto.imagens.length > 0 && (
                      <img src={produto.imagens[0]} alt="" className="h-44" />
                    )}
                  </div>
                  <div className="product-info">
                    <h3>{produto.nome}</h3>
                    <p>Marca: {produto.marca}</p>
                  </div>
                  <div>
                    <span className="font-bold text-primary text-xl">
                      {(Number(produto.preco).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }))}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div >
  );
}

export default CustomerOrders;
