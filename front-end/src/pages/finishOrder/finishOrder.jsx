import { Link } from "react-router-dom";
import { FiTruck } from "react-icons/fi";
import { BsHouseDoor } from "react-icons/bs";
import { AiOutlineCreditCard, AiOutlineBarcode } from "react-icons/ai";
import { MdPix } from "react-icons/md";
import {
  PiNumberCircleOne,
  PiNumberCircleTwo,
  PiNumberCircleThree,
  PiNewspaperClippingThin,
} from "react-icons/pi";
import { RiVisaLine } from "react-icons/ri";
import { FaCcMastercard, FaBarcode } from "react-icons/fa";
import { SiNubank } from "react-icons/si";
import { useLocation } from "react-router-dom";

function FinishOrder() {
  const location = useLocation();
  const { carrinho } = location.state;
  const { valorTotal } = carrinho;

  return (
    <div className="flex flex-col justify-center bg-gray-200 p-10 ">
      <div className="flex gap-12">
        <div className="flex flex-col gap-4 w-[60%] h-full">
          <div className="flex">
            <h1 className="font-bold text-white bg-primary p-4 rounded-md text-lg w-full">
              Frete e pagamento
            </h1>
          </div>
          {carrinho.map((produto, index) => (
            <div
              className="flex items-center bg-white p-4 justify-between w-full h-[40%] border border-solid border-gray-500 rounded-md"
              key={index}
            >
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 font-bold text-primary">
                    <div className="text-2xl">
                      <FiTruck />
                    </div>
                    <div>
                      <span>Tipo de entrega</span>
                    </div>
                  </div>
                  <div className="flex py-7">
                    <span className="text-gray-400 text-sm font-bold">
                      Vendido e Enviado por Buy Info
                    </span>
                  </div>
                </div>
                <div className="flex items-center w-96">
                  {produto.imagens.length > 0 && (
                    <img
                      src={produto.imagens[0]}
                      alt=""
                      className="h-32 w-40"
                    />
                  )}

                  <div className="flex flex-col gap-4 text-base">
                    <div className="flex ">
                      <span className="font-bold">{produto.nome}</span>
                    </div>
                    <div>
                      <span className="font-bold">marca:</span>{" "}
                      <span className="text-primary">{produto.marca}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex pt-10 flex-col gap-4 text-gray-400 text-sm font-bold">
                <div>
                  <input
                    type="radio"
                    name="tipoEntrega"
                    className="cursor-pointer"
                  />{" "}
                  Normal:
                </div>
                <div>
                  <input
                    type="radio"
                    name="tipoEntrega"
                    className="cursor-pointer"
                  />{" "}
                  Expressa:
                </div>
              </div>
              <div className="flex flex-col gap-4 pt-10 text-gray-400 text-sm font-bold">
                <div>
                  <span className="text-green-400">Grátis</span>
                </div>
                <div>
                  <span>R$ 30,00</span>
                </div>
              </div>
              <div className="flex flex-col gap-4 pt-10 text-gray-400 text-sm font-bold">
                <div>
                  <span>15 dias úteis</span>
                </div>
                <div>
                  <span>8 dias úteis</span>
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-col p-4 bg-white rounded-md border border-solid border-gray-500">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="text-green-400 text-2xl">
                  <MdPix />
                </div>
                <div className="text-primary font-bold text-lg">
                  <span>Pagar com Pix</span>
                </div>
              </div>
              <div className="flex pb-5">
                <span className="bg-green-500 p-2 text-white font-bold rounded-md">
                  Aprovação em minutos
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 font-bold line-through">
                {/* R$ 3.108,00 */}
                {valorTotal &&
                  valorTotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                {/* {valorTotal &&
                  valorTotal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })} */}
                {/* {(carrinho.preco * [carrinho.quantidade]).toLocaleString(
                  "pt-BR",
                  {
                    style: "currency",
                    currency: "BRL",
                  }
                )} */}
              </span>
              <span className="text-primary font-bold">R$ 3.108,00</span>
              <span className="text-green-400 text-sm">(10% de desconto)</span>
            </div>
            <div className="flex flex-col pt-6 gap-6">
              <div className="flex gap-1">
                <div className="flex text-2xl">
                  <PiNumberCircleOne />
                </div>
                <div>
                  <span className="flex text-sm text-gray-600">
                    Após a finalização do pedido, abra o app ou banco de sua
                    preferência. Escolha a opção pagar com código Pix “copia e
                    cola”, ou código QR. O código tem validade de 2 horas.
                  </span>
                </div>
              </div>
              <div className="flex gap-1">
                <div className="flex text-2xl">
                  <PiNumberCircleTwo />
                </div>
                <div>
                  <span className="flex text-sm text-gray-600">
                    Copie e cole o código, ou escaneie o código Qr com a câmera
                    do seu celular. Confira todas as informações e autorize o
                    pagamento.
                  </span>
                </div>
              </div>
              <div className="flex gap-1 items-center">
                <div className="flex text-2xl">
                  <PiNumberCircleThree />
                </div>
                <div>
                  <span className="flex text-sm text-gray-600">
                    Você vai receber a confirmação de pagamento no seu e-mail e
                    através dos nossos canais. E pronto!
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col p-4 bg-white rounded-md border border-solid border-gray-500">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className=" text-2xl">
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
                    />
                  </div>
                  <div className="flex w-full">
                    <input
                      type="text"
                      name="nomeTitular"
                      placeholder="Nome do titular (como gravado no Cartão)"
                      className="border border-solid border-gray-500 px-2 text-sm h-10 w-[40%] rounded-md"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold pt-5">
                      DATA DE VALIDADE DO CARTÃO
                    </span>
                    <div className="flex gap-4">
                      <div>
                        <input
                          type="numer"
                          name="mesValidade"
                          placeholder="Mês"
                          className="border border-solid border-gray-500 px-2 text-sm h-10 w-36 rounded-md"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          name="anoValidade"
                          placeholder="Ano"
                          className="border border-solid border-gray-500 px-2 text-sm h-10 w-36 rounded-md"
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
                      name="CodigoCartao"
                      placeholder="cvv"
                      className="border border-solid border-gray-500 px-2 text-sm h-10 w-[40%] rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold pt-5">
                      PARCELAMENTO:
                    </span>
                    <span className="text-green-400 text-sm">
                      3% de desconto em 1x no cartão de crédito
                    </span>
                  </div>
                  <div className="flex items-center">
                    {/* <select
                      name="parcalamento"
                      className="border border-solid border-gray-500 px-2 text-sm h-10 w-[40%] rounded-md"
                      efaultValue={"DEFAULT"}
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
                    </select> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-[50%] ml-auto">
              <button
                type="onclick"
                className="flex items-center justify-center bg-primary w-full h-10 rounded-md"
              >
                <span className="text-white">
                  FINALIZAR PEDIDO COM CARTÃO DE CRÉDITO
                </span>
              </button>
            </div>
          </div>
          <div className="flex flex-col p-4 bg-white rounded-md border border-solid border-gray-500">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="text-2xl">
                  <AiOutlineBarcode />
                </div>
                <div className="text-primary font-bold text-lg">
                  <span>Pagar com boleto bancário</span>
                </div>
              </div>
              <div>
                <span className="text-primary font-bold text-lg">
                  R$ 3.108,00
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-600">
                  Você poderá visualizar ou imprimir após a finalização do
                  pedido. A data de vencimento é de 4 dias corridos após a
                  conclusão do pedido. Após esta data, ele perderá a validade.
                </span>
              </div>
            </div>
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
            <div className="flex flex-col gap-2 font-bold">
              <div className="flex gap-2 text-gray-600 px-4">
                <input
                  type="radio"
                  name="tipoEntrega"
                  className="cursor-pointer"
                />
                Avenida das Flores, 123
              </div>
              <div className="flex px-4 pb-2">
                <span className=" text-gray-500 text-sm">
                  {" "}
                  Praça da Liberdade - CEP 85801-021 - Nova Esperança - SP
                </span>
              </div>
              <div className="flex border border-gray-400"></div>
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
                      to=""
                      className="text-white"
                    >
                      USAR OUTRO ENDEREÇO
                    </Link>
                  </button>
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
            <div className="flex flex-col gap-2 font-bold">
              <div className="flex justify-between gap-2 text-gray-500 text-xs px-4">
                <div className="flex flex-col gap-4">
                  <span>Itens do Pedido</span>
                  <span className="flex w-10">
                    Processador Intel Core i9-10900KF BX8070110900KF de 10
                    núcleos e 5.3GHz de frequência
                  </span>
                </div>
                <div className="flex">
                  <div className="flex flex-col items-center gap-4">
                    <span>Qtde</span>
                    <span>1</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col items-center gap-4">
                    <span>Preço</span>
                    <span>R$ 3.108,00</span>
                  </div>
                </div>
              </div>
              <div>
                <span className="text-primary text-xs font-bold">
                  Vendido e Enviado por Buy Info
                </span>
              </div>
              <div className="flex border border-gray-400"></div>
              <div className="flex flex-col gap-4 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Frete</span>
                  <span className="text-green-400">Frete Grátis</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Valor total</span>
                  <span>R$ 3.108,00</span>
                </div>
              </div>
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
