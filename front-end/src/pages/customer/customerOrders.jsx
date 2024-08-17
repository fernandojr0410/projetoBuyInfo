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
    const carrinhoData = JSON.parse(localStorage.getItem("pedidos") || '[]');
    setCarrinho(carrinhoData);

    const clienteData = JSON.parse(localStorage.getItem("cliente") || '{}');
    setCliente(clienteData);

    const enderecoData = JSON.parse(localStorage.getItem("endereco") || '{}');
    setEndereco(enderecoData);

    const valorTotalData = JSON.parse(localStorage.getItem("valorTotal") || '0');
    setValorTotal(valorTotalData);
  }, []);

  return (
    <div className="flex bg-gray-200 p-10">
      <SidebarCustomer />
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-primary text-xl">Meus Pedidos</span>

          {carrinho.map((produto, index) => (
            <div key={index} className="flex flex-col gap-4 border border-solid border-gray-400 bg-white rounded-md p-4 w-[50%]">
              <div className="flex items-center gap-4">
                {produto.imagens.length > 0 && (
                  <img src={produto.imagens[0]} alt={produto.nome} className="h-44" />
                )}
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{produto.nome}</h3>
                    <p className="text-sm text-gray-500">Marca: {produto.marca}</p>
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
              <div className={`text-sm ${produto.status === 'Entregue' ? 'text-green-500' : 'text-red-500'}`}>
                {produto.status}
              </div>
              <div className="text-sm text-gray-500">
                {produto.status === 'Entregue' ? `Chegou no dia ${produto.dataEntrega}` : 'Compra cancelada'}
              </div>
              {produto.vendedor && (
                <div className="text-sm text-blue-500">
                  <a href="#">{produto.vendedor}</a>
                </div>
              )}
              <div className="flex gap-2">
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md">Ver compra</button>
                <button className="bg-gray-500 text-white py-2 px-4 rounded-md">Comprar novamente</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerOrders;
