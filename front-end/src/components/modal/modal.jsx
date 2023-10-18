import { GrFormClose } from "react-icons/gr";
import { AiOutlineCreditCard, AiOutlineBarcode } from "react-icons/ai";
import { MdPix } from "react-icons/md";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Modal({ onClose }) {
  const [precoProduto, setPrecoProduto] = useState([]);
  const [metodoPagamento, setMetodoPagamento] = useState("cartaoCredito");
  const [modal, setModal] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setModal(true);
  }, []);

  const abrirModal = {
    transform: modal
      ? "scale(1) translateY(0)"
      : "scale(0) translateY(644px) translateX(744px)",
    transition: "transform 0.5s",
  };

  useEffect(() => {
    fetch(`http://localhost:5000/produtos/findById?id=${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPrecoProduto(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const getParcelas = (precoProduto) => {
    if (!precoProduto.length) {
      return [];
    }

    const preco = precoProduto[0]?.preco;

    if (!preco) {
      return [];
    }

    const parcelas = [];
    const numParcelas = 10;

    for (let i = 1; i <= numParcelas; i++) {
      const valorParcela = preco / i;
      const parcela = {
        vezes: i,
        valor: valorParcela,
      };
      parcelas.push(parcela);
    }

    return parcelas;
  };
  const parcelas = getParcelas(precoProduto);

  const handlePagamentoChange = (metodo) => {
    setMetodoPagamento(metodo);
  };

  return (
    <div className="fixed  w-full h-full top-0 left-0 flex items-center justify-center">
      <div className="absolute w-full h-full bg-gray-700 opacity-50 overflow-y-hidden"></div>

      <div
        style={abrirModal}
        className="flex bg-white w-[44%] rounded z-50 transition-transform duration-500 "
      >
        <div className="flex flex-col py-4 px-6 w-full gap-2">
          <div className="flex justify-between items-center">
            <div className="flex text-xl font-bold text-gray-400">
              <span>Mais formas de pagamento</span>
            </div>

            <div className="flex text-3xl cursor-pointer" onClick={onClose}>
              <GrFormClose />
            </div>
          </div>

          <div className="flex justify-between pb-4 pt-10">
            <div className="flex items-center flex-col text-base gap-1 cursor-pointer hover:text-primary">
              <div
                className={`flex items-center flex-col text-base gap-1 cursor-pointer ${
                  metodoPagamento === "cartaoCredito"
                }`}
                onClick={() => handlePagamentoChange("cartaoCredito")}
              >
                <AiOutlineCreditCard
                  style={{ width: "40px", height: "40px" }}
                />
                <span>Cartão de Credito</span>
              </div>
            </div>

            <div
              className={`flex items-center flex-col text-base gap-1 cursor-pointer ${
                metodoPagamento === "boleto"
              }`}
              onClick={() => handlePagamentoChange("boleto")}
            >
              <div className="flex items-center flex-col text-base gap-1 cursor-pointer hover:text-primary">
                <AiOutlineBarcode style={{ width: "40px", height: "40px" }} />
                <span>Boleto</span>
              </div>
            </div>

            <div
              className={`flex items-center flex-col text-base gap-1 cursor-pointer ${
                metodoPagamento === "pix"
              }`}
              onClick={() => handlePagamentoChange("pix")}
            >
              <div className="flex items-center flex-col text-base gap-1 cursor-pointer hover:text-primary">
                <MdPix style={{ width: "40px", height: "40px" }} />
                <span>Pix</span>
              </div>
            </div>
          </div>

          <div className="border-t-2"></div>

          {metodoPagamento === "cartaoCredito" && (
            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
              <div className="flex flex-col gap-2 ">
                {parcelas.map((parcela, index) => (
                  <div
                    key={index}
                    className="flex text-base border-solid border-2 border-black rounded-md p-2"
                  >
                    <div className="flex justify-between w-full">
                      <div className="flex gap-2">
                        {parcela.vezes}x{" "}
                        {parcela.valor.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                        <span className="text-primary">Sem Juros</span>
                      </div>

                      <div>
                        {precoProduto[0]?.preco.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {metodoPagamento === "boleto" && (
            <div className="flex flex-col gap-5 text-base border-solid border-2 border-black rounded-md p-2">
              <span className="flex gap-2">
                1x{" "}
                {precoProduto[0]?.preco.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}{" "}
                <span className="text-primary">no boleto bancário.</span>
              </span>
              <span>
                O boleto será gerado após a finalização de sua compra. Imprima e
                pague no banco ou pague pela internet utilizando o código de
                barras do boleto.
              </span>
            </div>
          )}

          {metodoPagamento === "pix" && (
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                1x{" "}
                {precoProduto[0]?.preco.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}{" "}
                <span className="text-primary ">
                  no Pix com 10% de desconto.
                </span>
                <div className="flex gap-2">
                  <span>Total com desconto:</span>{" "}
                  <span className="font-bold">
                    {(precoProduto[0]?.preco * 0.9).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              </div>
              <span>
                O pagamento é instantâneo e só pode ser à vista. Na etapa de
                finalização da compra, a gente explica direitinho como pagar com
                Pix.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
