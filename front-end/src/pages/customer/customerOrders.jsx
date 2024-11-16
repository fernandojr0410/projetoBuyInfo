// import { useEffect, useState } from "react";
// import SidebarCustomer from "./components/sideBarCustomer";
// import { Link } from "react-router-dom";

// function CustomerOrders() {
//   const [carrinho, setCarrinho] = useState([]);
//   const [cliente, setCliente] = useState({});
//   const [endereco, setEndereco] = useState({});
//   const [tipoEntrega, setTipoEntrega] = useState("normal");
//   const [frete, setFrete] = useState(30);
//   const [valorTotal, setValorTotal] = useState(0);
//   const [pedidos, setPedidos] = useState([]);
//   const [listaPedidos, setListaPedidos] = useState([]);

//   // Carregar dados do localStorage
//   useEffect(() => {
//     const carrinhoData = JSON.parse(localStorage.getItem("pedidos") || '[]');
//     setCarrinho(carrinhoData);

//     const clienteData = JSON.parse(localStorage.getItem("cliente") || '{}');
//     setCliente(clienteData);

//     const enderecoData = JSON.parse(localStorage.getItem("endereco") || '{}');
//     setEndereco(enderecoData);

//     const carrinho = JSON.parse(localStorage.getItem("carrinho" || "{}"))
//     setCarrinho(carrinho)

//     const valorTotalData = JSON.parse(localStorage.getItem("valorTotal") || '0');
//     setValorTotal(valorTotalData);

//     try {
//       fetch(`http://localhost:5001/order/findAllOrder`, {
//         method: "GET",
//         headers: {
//           "Content-type": 'application/json'
//         }
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.result?.length > 0) {
//             setPedidos(data.result);
//             console.log("setPedidos", data.result);
//           }
//         })
//         .catch((error) => console.error(error));
//     } catch (error) {
//       console.error("Erro ao buscar pedidos", error);
//     }
//   }, []);

//   // Buscar produtos por pedido
//   useEffect(() => {
//     const run = async () => {
//       if (pedidos.length > 0 && cliente.id_cliente) {
//         let promises = pedidos.map((pedido) => buscarProdutosPorPedido(pedido.id_pedido, pedido.status));

//         try {
//           const produtosPorPedido = await Promise.all(promises);
//           setListaPedidos(produtosPorPedido);
//         } catch (error) {
//           console.error("Erro ao buscar produtos por pedido", error);
//         }
//       }
//     };
//     run();
//   }, [cliente, pedidos]);

//   // Função para buscar produtos por pedido
//   const buscarProdutosPorPedido = async (id_pedido, status_pedido) => {
//     try {
//       const response = await fetch(`http://localhost:5001/order/findAllProductsByOrderClientId?id_pedido=${id_pedido}&id_cliente=${cliente.id_cliente}`, {
//         method: "GET",
//         headers: {
//           "Content-type": "application/json"
//         }
//       });
//       const data = await response.json();
//       if (data.length <= 0) return (<div></div>) // some com os produtos sem pedidos

//       // Renderização dos produtos
//       const produtos = data.map((produto) => (
//         <div key={produto.id_produto} id={produto.id_produto}>
//           id Produto: {produto.id_produto}
//         </div>
//       ));

//       return (
//         <div key={id_pedido} className="bg-white gap-6 p-6">
//           <div>Pedido: {id_pedido} - Status: {status_pedido}</div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 text-center bg-white p-4">
//             {data?.map((produto) => (
//               <Link
//                 to={`/produto/${produto.id_produto}`}
//                 className="flex flex-col justify-between p-6 min-w-[152px] border-solid border border-gray-300 h-full gap-6 transition-transform transform hover:-translate-y-1 cursor-pointer"
//               >
//                 <div className="flex items-center justify-center h-[170px] w-full">
//                   {produto.imagens && produto.imagens[0] ? (
//                     <img
//                       src={produto.imagens[0]}
//                       alt={produto.nome}
//                       className="max-h-full"
//                     />
//                   ) : (
//                     <div>Imagem não disponível</div>
//                   )}
//                 </div>

//                 <div className="flex-1 justify-center flex font-semibold text-base">
//                   <span>{produto.nome}</span>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       );
//     } catch (error) {
//       console.error("Erro ao buscar produtos do pedido", error);
//       return <div>Erro ao buscar lista de produtos</div>;
//     }
//   };

//   return (
//     <div className="flex bg-gray-200 p-10">
//       <SidebarCustomer />
//       <div className="flex flex-col w-full">
//         <div className="flex flex-col gap-2">
//           <span className="font-bold text-primary text-xl">Meus Pedidos</span>

//           {/* Renderiza cada lista de produtos por pedido */}
//           {listaPedidos.length > 0 ? (
//             listaPedidos.map((pedido, index) => (
//               <div key={index}>
//                 {pedido}
//               </div>
//             ))
//           ) : (
//             <div>Nenhum pedido encontrado</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CustomerOrders;

import { useEffect, useState } from "react";
import SidebarCustomer from "./components/sideBarCustomer";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

function CustomerOrders() {
  const [carrinho, setCarrinho] = useState([]);
  const [cliente, setCliente] = useState({});
  const [endereco, setEndereco] = useState({});
  const [tipoEntrega, setTipoEntrega] = useState("normal");
  const [frete, setFrete] = useState(30);
  const [valorTotal, setValorTotal] = useState(0);
  const [pedidos, setPedidos] = useState([]);
  const [listaPedidos, setListaPedidos] = useState([]);

  // Carregar dados do localStorage
  useEffect(() => {
    const carrinhoData = JSON.parse(localStorage.getItem("pedidos") || '[]');
    setCarrinho(carrinhoData);

    const clienteData = JSON.parse(localStorage.getItem("cliente") || '{}');
    setCliente(clienteData);

    const enderecoData = JSON.parse(localStorage.getItem("endereco") || '{}');
    setEndereco(enderecoData);

    const carrinho = JSON.parse(localStorage.getItem("carrinho" || "{}"));
    setCarrinho(carrinho);

    const valorTotalData = JSON.parse(localStorage.getItem("valorTotal") || '0');
    setValorTotal(valorTotalData);

    fetch(`http://localhost:5001/order/findAllOrder`, {
      method: "GET",
      headers: {
        "Content-type": 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setPedidos(data.result || []); // Define um array vazio se não houver pedidos
      })
      .catch((error) => console.error("Erro ao buscar pedidos", error));
  }, []);

  // Buscar produtos por pedido
  useEffect(() => {
    const run = async () => {
      if (pedidos.length > 0 && cliente.id_cliente) {
        let promises = pedidos.map((pedido) => buscarProdutosPorPedido(pedido.id_pedido, pedido.status));
        try {
          const produtosPorPedido = await Promise.all(promises);
          setListaPedidos(produtosPorPedido.filter(Boolean)); // Filtra valores falsy
        } catch (error) {
          console.error("Erro ao buscar produtos por pedido", error);
        }
      } else {
        setListaPedidos([]); // Define um array vazio se não houver pedidos ou cliente
      }
    };
    run();
  }, [cliente, pedidos]);

  // Função para buscar produtos por pedido
  const buscarProdutosPorPedido = async (id_pedido, status_pedido) => {
    try {
      const response = await fetch(`http://localhost:5001/order/findAllProductsByOrderClientId?id_pedido=${id_pedido}&id_cliente=${cliente.id_cliente}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json"
        }
      });
      const data = await response.json();

      if (data.length <= 0) return null; // Retorna null se não houver produtos

      // Renderização dos produtos
      return (
        <div key={id_pedido} className="bg-white gap-6 p-6">
          <div>Pedido: {id_pedido} - Status: {status_pedido}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 text-center bg-white p-4">
            {data.map((produto) => (
              <Link
                to={`/produto/${produto.id_produto}`}
                key={produto.id_produto}
                className="flex flex-col justify-between p-6 min-w-[152px] border-solid border border-gray-300 h-full gap-6 transition-transform transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex items-center justify-center h-[170px] w-full">
                  {produto.imagens && produto.imagens[0] ? (
                    <img
                      src={produto.imagens[0]}
                      alt={produto.nome}
                      className="max-h-full"
                    />
                  ) : (
                    <div>Imagem não disponível</div>
                  )}
                </div>
                <div className="flex-1 justify-center flex font-semibold text-base">
                  <span>{produto.nome}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      );
    } catch (error) {
      console.error("Erro ao buscar produtos do pedido", error);
      return <div>Erro ao buscar lista de produtos</div>;
    }
  };

  return (
    <div className="flex bg-gray-200 p-10">
      <SidebarCustomer />
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-2">
          <span className="font-bold text-primary text-xl">Meus Pedidos</span>

          {/* Renderiza cada lista de produtos por pedido */}
          {listaPedidos.length > 0 ? (
            listaPedidos.map((pedido, index) => (
              <div key={index}>{pedido}</div>
            ))
          ) : (
            <div className="flex flex-col items-center text-primary font-bold gap-4 p-20">
              <div className="text-6xl">
                <AiOutlineShoppingCart />
              </div>
              <h1 className="text-2xl">Nenhum pedido encontrado</h1>
              <div className="flex text-center pl-30 pr-20">
                <span className="text-gray-600 font-bold">
                  Parece que você ainda não fez nenhum pedido. Adicione produtos ao seu carrinho clicando no botão “Comprar” na página de produto.
                </span>
              </div>
              <div className="border-primary border rounded-md p-3 font-bold">
                <Link to="/home">
                  <button type="button">VOLTAR PARA A PÁGINA INICIAL</button>
                </Link>
              </div>
            </div>

          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerOrders;
