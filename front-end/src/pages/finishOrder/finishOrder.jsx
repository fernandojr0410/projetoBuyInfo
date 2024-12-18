import { Link } from "react-router-dom";
import { FiTruck } from "react-icons/fi";
import { BsHouseDoor } from "react-icons/bs";
import { AiOutlineCreditCard } from "react-icons/ai";
import { MdPix } from "react-icons/md";
import { PiNewspaperClippingThin } from "react-icons/pi";
import { RiVisaLine } from "react-icons/ri";
import { FaCcMastercard, FaBarcode } from "react-icons/fa";
import { SiNubank } from "react-icons/si";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ModalRegistration from "../../components/modal/modalRegistration";
import CheckoutForm from "../../components/checkoutForm/checkoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe('pk_test_51PRzenISma1JVODe4EXNZZkqWh9eIrthZXASg7397vudybTCcEHSGmp25iOLs57ZhqTrmymnOV9uDcJlgbduzMrD00iRGgN5vX')

function FinishOrder({ cliente }) {
  const location = useLocation();
  const { carrinho } = location.state || [];
  console.log("{carrinho}", location)
  const [tipoEntrega, setTipoEntrega] = useState("normal");
  const [frete, setFrete] = useState(30);
  const valorProduto = carrinho.reduce(
    (total, produto) => total + parseFloat(produto.preco),
    0
  );
  let valorTotal = parseFloat(location.state.valorTotal);
  if (tipoEntrega === "expressa") {
    valorTotal += frete;
  }
  // const valorTotalFrete =
  //   tipoEntrega === "normal" ? valorProduto : valorProduto + frete;

  // const { valorTotal } = location.state;
  const [endereco, setEndereco] = useState([]);
  // const [pedidoCliente, setPedidoCliente] = useState({});
  // const [id_pedido, setid_pedido] = useState({});
  const [status, setStatus] = useState("aguardando pagamento");
  const [showModal, setShowModal] = useState(false);
  const [registroCliente, setRegistroCliente] = useState(cliente);
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    const valor = valorTotal.toFixed(2).replace('.', '')
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5001/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(valor) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  // old handlePayment
  const handlePayment = (event) => {
    console.log('rodou handlePayment')

    const statusPedido = {
      status: status,
    };

    fetch(`http://localhost:5001/order/insertOrder`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(statusPedido),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data antes if", data)
        if (data && data.result && data.result.id_pedido) {
          const id_pedido = data.result.id_pedido;
          console.log("dentro if", data)
          const carrinhoData = JSON.parse(localStorage.getItem("carrinho"));
          carrinhoData.forEach((produto) => {
            const dadosPedidos = {
              id_produto: produto.id_produto,
              id_cliente: cliente.id_cliente,
              id_pedido: id_pedido,
            };

            console.log("dadosPedidos", dadosPedidos)

            fetch(`http://localhost:5001/orderProductClient/insert`, {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify(dadosPedidos),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log("Pedido Produto Cliente:", data);
              });
          });

          const vendasBody = {
            produtos: carrinhoData.map((produto) => {
              return {
                id_produto: produto.id_produto,
                qtd_vendido: produto.quantidade
              }
            })
          }

          fetch(`http://localhost:5001/vendas/insert`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(vendasBody)
          })
            .catch((error) => console.error("erro ao inserir vendas", error))
          setShowModal(true);
        } else {
          console.error("Erro ao inserir pedido:", data);
        }
      })
      .catch((error) => console.error("Erro ao inserir pedido:", error));
    event.preventDefault();
    setShowModal(true);
  };


  useEffect(() => {
    if (registroCliente && registroCliente.id_cliente) {
      fetch(`http://localhost:5001/enderecos/findByIdClienteEndereco?id_cliente=${registroCliente.id_cliente}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao buscar endereço");
          }
          return response.json();
        })
        .then((data) => {
          if (data && data.length > 0) {
            const enderecoData = {
              Cliente: {
                id_cliente: registroCliente.id_cliente,
                Nome: data[0].nome,
                Sobrenome: data[0].sobrenome,
                CPF: data[0].cpf,
                Telefone: data[0].telefone,
                Email: data[0].email,
                Enderecos: {
                  idEndereco: data[0].idEndereco,
                  nome: data[0].nome,
                  cep: data[0].cep,
                  cidade: data[0].cidade,
                  estado: data[0].estado,
                  bairro: data[0].bairro,
                  rua: data[0].rua,
                  numero: data[0].numero,
                  complemento: data[0].complemento,
                },
              },
            };
            setEndereco(enderecoData);

            // Verifica se o id_cliente mudou antes de atualizar o registroCliente
            if (registroCliente.id_cliente !== data[0].id_cliente) {
              setRegistroCliente(data[0]);
            }
          }
        })
        .catch((error) => console.error("Erro ao buscar endereço:", error));
    }
  }, [registroCliente]);


  return (
    <div className="flex flex-col justify-center bg-gray-200 p-10 ">
      <div className="flex gap-12">
        <div className="flex flex-col gap-4 w-[60%] h-full">
          <div className="flex">
            <h1 className="font-bold text-white bg-primary p-4 rounded-md text-lg w-full">
              Frete e pagamento
            </h1>
          </div>

          <div className="flex justify-between items-center bg-white p-4 border border-solid border-gray-500 rounded-md">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 font-bold text-primary">
                <div className="text-2xl">
                  <FiTruck />
                </div>
                <div>
                  <span>Tipo de entrega</span>
                </div>
              </div>
              {carrinho.map((produto, index) => (
                <div key={index} className="flex flex-col pt-6 mb-4">
                  <div className="flex items-center w-96">
                    {produto.imagens.length > 0 && (
                      <img
                        src={produto.imagens[0]}
                        alt=""
                        className="h-32 w-40"
                      />
                    )}

                    <div className="flex flex-col gap-4 text-base">
                      <div className="flex">
                        <span className="font-bold">{produto.nome}</span>
                      </div>
                      <div>
                        <span className="font-bold">Marca:</span>{" "}
                        <span className="text-primary">{produto.marca}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4 mt-4 text-gray-400 text-sm font-bold">
              <div>
                <input
                  type="radio"
                  name={`tipoEntregaNormal`}
                  checked={tipoEntrega === "normal"}
                  onChange={() => setTipoEntrega("normal")}
                  className="cursor-pointer"
                />
                Normal:
              </div>
              <div>
                <input
                  type="radio"
                  name={`tipoEntregaExpressa`}
                  checked={tipoEntrega === "expressa"}
                  onChange={() => setTipoEntrega("expressa")}
                  className="cursor-pointer"
                />{" "}
                Expressa:
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-4 text-gray-400 text-sm font-bold">
              <div>
                <span className="text-green-400">Grátis</span>
              </div>
              <div>
                <span>{`R$ 30,00`}</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-4 text-gray-400 text-sm font-bold">
              <div>
                <span>15 dias úteis</span>
              </div>
              <div>
                <span>8 dias úteis</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col p-4 bg-white rounded-md border border-solid border-gray-500">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="text-2xl">
                  <AiOutlineCreditCard />
                </div>
                <div className="text-primary font-bold text-lg">
                  <span>Pagar com cartão de crédito</span>
                </div>
              </div>
              <div className="flex flex-col pt-4">
                <div className="flex flex-col gap-4">
                  <div className="flex w-full">

                    {/* Stripe Pagamento */}
                    {
                      clientSecret && (
                        <Elements options={options} stripe={stripePromise}>
                          <CheckoutForm onSubmit={handlePayment} />
                        </Elements>
                      )
                    }
                    {/* Stripe Pagamento */}
                  </div>
                </div>
              </div>

            </div>
            {showModal && (
              <ModalRegistration
                titulo="Produto comprado com sucesso!"
                onClose={() => setShowModal(false)}
                link="/edicao-cadastro/meus-pedidos/pedidos"
              />
            )}
          </div>
        </div>


        <div className="flex flex-col gap-4 h-[40%] w-[30%] justify-end">
          <div className="flex">
            <h1 className="font-bold text-white bg-primary p-4 rounded-md text-lg w-full">
              Endereço e resumo do pedido
            </h1>
          </div>
          <div className="flex flex-col gap-6 bg-white p-4 justify-between w-full h-full border border-solid border-gray-500 rounded-md">
            <div className="flex items-center gap-3 font-bold text-primary">
              <div className="text-2xl">
                <BsHouseDoor />
              </div>
              <div>
                <span>Endereço de entrega</span>
              </div>
            </div>

            <div className="flex items-center flex-col gap-2 font-bold">
              <div className="flex px-4 pb-2">
                <div className="flex pr-4 text-center text-gray-500 text-sm">
                  <div className="flex flex-col">
                    <span>
                      Nome completo:
                      {`${registroCliente.nome} ${registroCliente.sobrenome},`}
                    </span>

                    <span>
                      Telefone para contato: {registroCliente.telefone}
                    </span>
                    <div className="flex mt-4 border border-gray-400"></div>
                    <div className="flex flex-col gap-6 pt-4">
                      {endereco &&
                        endereco.Cliente &&
                        endereco.Cliente.Enderecos ? (
                        <>
                          <span>
                            <input
                              type="radio"
                              name="endereco"
                              className="cursor-pointer mb-2"
                            />
                            {endereco.Cliente &&
                              endereco.Cliente.Enderecos &&
                              endereco.Cliente.Enderecos.cep
                              ? `${endereco.Cliente.Enderecos.rua} - CEP ${endereco.Cliente.Enderecos.cep} - ${endereco.Cliente.Enderecos.bairro} - ${endereco.Cliente.Enderecos.cidade} - ${endereco.Cliente.Enderecos.estado}`
                              : "Você não possui endereço cadastrado."}
                          </span>
                          <div className="flex flex-col items-center gap-4">
                            <div>
                              <span className="text-gray-400 text-sm">
                                Quer receber seu pedido em outro endereço?
                              </span>
                            </div>
                            <div className="flex w-full">
                              <button
                                type="onSubmit"
                                className="flex items-center justify-center bg-primary w-full h-10 rounded-md"
                              >
                                <Link
                                  to={{
                                    pathname: `/edicao-cadastro/meus-dados/${cliente.id_cliente}`,
                                    state: { cliente: cliente },
                                  }}
                                  className="text-white"
                                >
                                  USAR OUTRO ENDEREÇO
                                </Link>
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <span>você não tem endereço cadastrado</span>
                          <button
                            type="button"
                            className="flex items-center justify-center bg-primary w-full h-10 rounded-md"
                          >
                            <Link
                              to={{
                                pathname: `/edicao-cadastro/meus-dados/${cliente.id_cliente}`,
                                state: { cliente: cliente },
                              }}
                              className="text-white"
                            >
                              CADASTRAR ENDEREÇO
                            </Link>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 bg-white p-4 justify-between w-full h-full border border-solid border-gray-500 rounded-md">
            <div className="flex items-center gap-3 font-bold text-primary">
              <div className="text-2xl">
                <PiNewspaperClippingThin />
              </div>
              <div>
                <span>Resumo do pedido</span>
              </div>
            </div>
            <div className="flex gap-2 text-primary font-bold">
              <span>Valor total:</span>
              <span>
                {valorTotal.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <span className="text-primary underline text-base cursor-pointer">
              Clique aqui para ler o contrato de compra e venda
              {/*  aqui será o modal */}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center border border-gray-400 mt-16 w-full"></div>
      <div className="flex justify-center pt-40">
        <div className="flex gap-8 text-base">
          <span className="font-bold text-primary">
            CENTRAL DE RELACIONAMENTO
          </span>
          <span className="font-bold text-gray-500">
            Preparada para esclarecer suas dúvidas
          </span>
          <span className="font-bold text-primary">TIRE SUAS DÚVIDAS</span>
        </div>
      </div>
      <div className="flex justify-center items-center p-10">
        <Link to="" className="font-bold text-gray-500 text-sm underline">
          Precisa de Ajuda?
        </Link>

        <RiVisaLine className="h-12 w-28" />
        <FaCcMastercard className="h-8 w-28" />
        <SiNubank className="h-8 w-28" />
        <FaBarcode className="h-8 w-28" />
        <MdPix className="h-8 w-28" />
      </div>
    </div>
  );
}

export default FinishOrder;
