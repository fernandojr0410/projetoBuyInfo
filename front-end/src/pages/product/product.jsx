import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiOutlineCreditCard, AiOutlineBarcode } from "react-icons/ai";
import { MdPix } from "react-icons/md";
// import Modal from "../../components/modal/modal";
// import ModalJuca from "../../components/modal/modal";
import Modal from "../../components/modal/modal";

function Product({ handleAdicionarCarrinho }) {
  const [imagem, setImagem] = useState("");
  const [produto, setProduto] = useState([]);
  // const [abrirModal, setAbrirModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();

  const [precoProduto, setPrecoProduto] = useState([]);
  const [metodoPagamento, setMetodoPagamento] = useState("cartaoCredito");

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

  useEffect(() => {
    fetch(`http://localhost:5001/produtos/findById?id=${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProduto(data);
        setPrecoProduto(data);
        if (data?.imagens && data.imagens.length > 0) {
          setImagem(data.imagens[0]);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const openModal = () => {
    // setAbrirModal(true);
    setShowModal(true);
  };

  const closeModal = () => {
    // setAbrirModal(false);
    setShowModal(false);
  };

  return (
    <main className="flex justify-center bg-gray-100 py-6">
      <Modal
        showModal={showModal}
        title="Forma de pagamento"
        onClose={closeModal}
      >
        <div className="flex justify-between pb-4 pt-10">
          <div className="flex items-center flex-col text-base gap-1 cursor-pointer hover:text-primary">
            <div
              className={`flex items-center flex-col text-base gap-1 cursor-pointer ${metodoPagamento === "cartaoCredito" ? "text-primary" : ""
                }`}
              onClick={() => handlePagamentoChange("cartaoCredito")}
            >
              <AiOutlineCreditCard style={{ width: "40px", height: "40px" }} />
              <span>Cartão de Credito</span>
            </div>
          </div>

          <div
            className={`flex items-center flex-col text-base gap-1 cursor-pointer w-[400px] ${metodoPagamento === "boleto" ? "text-primary" : ""
              }`}
            onClick={() => handlePagamentoChange("boleto")}
          >
            <div className="flex items-center flex-col text-base gap-1 cursor-pointer hover:text-primary">
              <AiOutlineBarcode style={{ width: "40px", height: "40px" }} />
              <span>Boleto</span>
            </div>
          </div>

          <div
            className={`flex items-center flex-col text-base gap-1 cursor-pointer ${metodoPagamento === "pix" ? "text-primary" : ""
              }`}
            onClick={() => handlePagamentoChange("pix")}
          >
            <div className="flex items-center flex-col text-base gap-1 cursor-pointer hover:text-primary">
              <MdPix style={{ width: "40px", height: "40px" }} />
              <span>Pix</span>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-gray-200 py-2"></div>

        {metodoPagamento === "cartaoCredito" && (
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            <div className="flex flex-col gap-2 ">
              {parcelas.map((parcela, index) => (
                <div
                  key={index}
                  className="flex text-base border-solid border border-black rounded-md p-2"
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
          <div className="flex flex-col gap-5 text-base border-solid border border-black rounded-md p-2 w-[600px]">
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
          <div className="flex flex-col gap-4 border-solid border border-black rounded-md p-2 w-full">
            <div className="flex gap-2 ">
              1x{" "}
              {precoProduto[0]?.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}{" "}
              <span className="text-primary ">no Pix com 10% de desconto.</span>
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
            <span className="w-[600px] ">
              O pagamento é instantâneo e só pode ser à vista. Na etapa de
              finalização da compra, a gente explica direitinho como pagar com
              Pix.
            </span>
          </div>
        )}
      </Modal>

      <div className="flex flex-col bg-white rounded-lg w-[90%] p-6">
        <div className="flex justify-between pb-10">
          <div className="flex flex-col gap-4 cursor-pointer ">
            {produto[0]?.imagens.map((image, index) => (
              <img
                key={index}
                src={image}
                alt=""
                className="border-solid border border-gray-200 rounded-md p-1 hover:border-primary"
                onMouseOver={() => setImagem(image)}
                style={{ width: "60px", height: "60px" }}
              />
            ))}
          </div>

          <div className="flex items-center justify-center h-50">
            <img
              src={imagem || (produto[0]?.imagens && produto[0]?.imagens[0])}
              alt="Imagem Principal do Produto"
              className="w-full h-auto"
            />
          </div>

          <div className="flex flex-col w-[30%]">
            <div className="flex flex-col gap-6 border-solid border border-gray-300 rounded-lg p-3">
              <div className="flex font-bold text-lg">
                <span>{produto[0]?.nome}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-primary text-3xl">

                  {(Number(produto[0]?.preco).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }))}
                </span>
                <span className="text-lg">
                  ou em até 10x de{" "}
                  {(produto[0]?.preco / 10).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}{" "}
                  sem juros
                </span>
              </div>

              <div
                className="text-gray-400 underline text-lg cursor-pointer"
                onClick={openModal}
              >
                ver mais opções de pagamento
              </div>
              <Link to="/carrinho">
                <button
                  onClick={() => handleAdicionarCarrinho(produto[0])}
                  className="bg-green-600 text-white text-lg rounded-md border-solid p-2 w-full md:w-[75%]"
                >
                  Comprar agora
                </button>
              </Link>

              <button
                onClick={() => handleAdicionarCarrinho(produto[0])}
                className="bg-green-400 text-green-700 text-lg rounded-md border-solid p-2 w-full md:w-[75%]"
              >
                Adicionar carrinho
              </button>

              <div className="flex flex-col gap-2">
                <span className="font-bold">
                  Consultar frete e prazo de entrega
                </span>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Inserir CEP"
                    className="border-solid border border-gray-300 p-2 rounded-md text-base cursor-pointer"
                  />
                  <button
                    type="button"
                    className="border-solid border-primary border rounded-md p-2 text-primary cursor-pointer"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t-2 pt-4">
          <span className="text-primary font-bold text-xl">
            Descrição Produto
          </span>
          <span className="text-base">{produto[0]?.descricao}</span>
        </div>
      </div>
    </main>
  );
}

export default Product;
