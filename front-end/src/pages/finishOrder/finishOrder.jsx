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

function FinishOrder({ cliente }) {
  const location = useLocation();
  const { carrinho } = location.state;
  const [tipoEntrega, setTipoEntrega] = useState("normal");
  const valorProduto = carrinho.reduce(
    (total, produto) => total + produto.preco,
    0
  );
  const valorFrete = tipoEntrega === "expressa" ? 30.0 : 0;

  const valorTotal = valorProduto + valorFrete;

  const [endereco, setEndereco] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const handlePayment = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  useEffect(() => {
    if (cliente && cliente.Id_Cliente) {
      fetch(
        `http://localhost:5000/enderecos/findByIdClienteEndereco?Id_Cliente=${cliente.Id_Cliente}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      )
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
                Id_Cliente: data[0].Id_Cliente,
                nome: data[0].nome,
                Sobrenome: data[0].Sobrenome,
                CPF: data[0].CPF,
                Telefone: data[0].Telefone,
                Email: data[0].Email,

                Enderecos: {
                  idEndereco: data[0].idEndereco,
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
            console.log("dados endereco", enderecoData);
          }
        })
        .catch((error) => console.error("erro no front:", error));
    }
  }, [cliente]);

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
                <span>{`R$ ${valorFrete.toFixed(2)}`}</span>
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
            {/* {pagamento ? ( */}
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
                    <input
                      type="number"
                      name="numeroCartao"
                      placeholder="Número do Cartão"
                      className="border border-solid border-gray-500 px-2 text-sm h-10 w-[40%] rounded-md"
                      // onChange={handleInputChange}
                      // value={pagamento.numeroCartao}
                    />
                  </div>
                  <div className="flex w-full">
                    <input
                      type="text"
                      name="nomeTitular"
                      placeholder="Nome do titular (como gravado no Cartão)"
                      className="border border-solid border-gray-500 px-2 text-sm h-10 w-[40%] rounded-md"
                      // onChange={handleInputChange}
                      // value={pagamento.nomeTitular}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold pt-5">
                      DATA DE VALIDADE DO CARTÃO
                    </span>
                    <div className="flex gap-4">
                      <div>
                        <input
                          type="number"
                          name="mesValidade"
                          placeholder="Mês"
                          className="border border-solid border-gray-500 px-2 text-sm h-10 w-36 rounded-md"
                          // onChange={handleInputChange}
                          // value={pagamento.mesValidade}
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          name="anoValidade"
                          placeholder="Ano"
                          className="border border-solid border-gray-500 px-2 text-sm h-10 w-36 rounded-md"
                          // onChange={handleInputChange}
                          // value={pagamento.anoValidade}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-bold pt-5">
                      CÓDIGO DE SEGURANÇA
                    </span>
                  </div>
                  <div className="flex w-[50%]">
                    <input
                      type="number"
                      name="codigoCartao"
                      placeholder="cvv"
                      className="border border-solid border-gray-500 px-2 text-sm h-10 w-[40%] rounded-md"
                      // onChange={handleInputChange}
                      // value={pagamento.codigoCartao}
                    />
                  </div>

                  <div className="flex items-center">
                    <select
                      name="parcelamento"
                      className="border border-solid border-gray-500 px-2 text-sm h-10 w-[40%] rounded-md"
                      // onChange={handleInputChange}
                      defaultValue={"DEFAULT"}
                    >
                      <option value="DEFAULT" disabled>
                        Opções de Parcelamento
                      </option>
                      <option value="1">1x sem juros</option>
                      <option value="2">2x sem juros</option>
                      <option value="3">3x sem juros</option>
                      <option value="4">4x sem juros</option>
                      <option value="5">5x sem juros</option>
                      <option value="6">6x sem juros</option>
                      <option value="7">7x sem juros</option>
                      <option value="8">8x sem juros</option>
                      <option value="9">9x sem juros</option>
                      <option value="10">10x sem juros</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex w-[50%] ml-auto">
                <button
                  type="submit"
                  onClick={handlePayment}
                  className="flex items-center justify-center bg-primary w-full h-10 rounded-md"
                >
                  <span className="text-white">
                    FINALIZAR PEDIDO COM CARTÃO DE CRÉDITO
                  </span>
                </button>
              </div>
              {/* {erro && <div className="text-red-500 mt-2">{erro}</div>} */}
            </div>
            {showModal && (
              <ModalRegistration
                titulo="Produto comprado com sucesso!"
                onClose={() => setShowModal(false)}
                link="home"
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
                      Nome completo: {`${cliente.Nome} ${cliente.Sobrenome},`}
                    </span>
                    <span>Telefone para contato: {cliente.Telefone}</span>
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
                            {endereco.Cliente && endereco.Cliente.Enderecos
                              ? `${endereco.Cliente.Enderecos.rua} - CEP ${endereco.Cliente.Enderecos.cep} - ${endereco.Cliente.Enderecos.bairro} - ${endereco.Cliente.Enderecos.cidade} - ${endereco.Cliente.Enderecos.estado}`
                              : ""}
                          </span>
                          {/* <div className="flex border border-gray-400"></div> */}
                          <div className="flex flex-col items-center gap-4">
                            <div>
                              <span className="text-gray-400 text-sm">
                                Quer receber seu pedido em outro endereço?
                              </span>
                            </div>
                            <div className="flex w-full">
                              <button
                                type="onclick"
                                className="flex items-center justify-center bg-primary w-full h-10 rounded-md"
                              >
                                <Link
                                  to={{
                                    pathname: `/edicao-cadastro/meus-dados/${cliente.Id_Cliente}`,
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
                            // onClick={() => {
                            //   // Adicione a lógica de redirecionamento para a página de cadastro de endereço
                            // }}
                          >
                            <Link
                              to={{
                                pathname: `/edicao-cadastro/meus-dados/${cliente.Id_Cliente}`,
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

              {/* <div className="flex flex-col gap-4 text-xs">
                 <div className="flex justify-between">
                   <span className="text-gray-500">Frete</span>
                  <span className="text-green-400">Frete Grátis</span>
                </div> 
              </div> */}
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