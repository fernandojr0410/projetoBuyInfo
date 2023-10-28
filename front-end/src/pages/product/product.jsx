import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Modal from "../../components/modal/modal";

function Product({ handleAdicionarCarrinho }) {
  const [imagem, setImagem] = useState("");
  const [produto, setProduto] = useState([]);
  const [abrirModal, setAbrirModal] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/produtos/findById?id=${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProduto(data);
        if (data?.imagens && data.imagens.length > 0) {
          setImagem(data.imagens[0]);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  // const handleMouseOver = (index) => {
  //   if (index !== 0) {
  //     setImagem(produto[0]?.imagens[index]);
  //   }
  // };
  const openModal = () => {
    setAbrirModal(true);
  };

  const closeModal = () => {
    setAbrirModal(false);
  };

  return (
    <main className="flex justify-center bg-gray-100 py-6">
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
                  {produto[0]?.preco.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
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
              {abrirModal && (
                <Modal
                  titulo="Mais formas de pagamento"
                  isOpen={abrirModal}
                  onClose={closeModal}
                />
              )}

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
