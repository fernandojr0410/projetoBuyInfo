import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ListProduct from "../../components/listProduct/listProduct";
import { HiOutlineTrash } from "react-icons/hi";
import { BsArrowRightCircle } from "react-icons/bs";
import { RiVisaLine } from "react-icons/ri";
import { FaCcMastercard, FaBarcode } from "react-icons/fa";
import { SiNubank } from "react-icons/si";
import { MdPix } from "react-icons/md";

function Cart() {
  const [produtosDestaque, setProdutosDestaque] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [quantidadesProdutos, setQuantidadeProduto] = useState({});
  const [valorTotal, setValorTotal] = useState(0);

  useEffect(() => {
    const carrinhoData = JSON.parse(localStorage.getItem("carrinho")) || [];
    setCarrinho(carrinhoData);
  }, []);

  const handleIncrement = (idProduto, precoProduto) => {
    const quantidadeAtual = quantidadesProdutos[idProduto] || 0;
    setQuantidadeProduto((quantidades) => ({
      ...quantidades,
      [idProduto]: quantidadeAtual + 1,
    }));

    setValorTotal((valorTotal) => valorTotal + precoProduto);
  };

  const handleDecrement = (idProduto, quantidadesProdutos, precoProduto) => {
    console.log("quantidade:", quantidadesProdutos);
    const quantidadeAtual = quantidadesProdutos[idProduto] || 0;
    console.log("quantidadeAtual:", quantidadeAtual);
    if (quantidadeAtual > 0) {
      console.log(quantidadeAtual);
      setQuantidadeProduto((quantidadeAtual) => ({
        ...quantidadeAtual,
        [idProduto]: quantidadeAtual - 1,
      }));

      setValorTotal((valorTotal) => valorTotal - precoProduto);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/produtos/destaques`, {
      method: "GET",
      headers: {
        "Contet-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProdutosDestaque(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const maisVendidos = produtosDestaque.filter(
    (produto) => produto.destaque_id_destaque === 3
  );

  const navigate = useNavigate();

  const finalizarCompra = () => {
    if (produtosDestaque.length > 0) {
      navigate("/cadastroEndereco");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center  bg-gray-200">
      <div className="flex px-24 pt-10 p-20">
        <div className="flex flex-col gap-4 w-[60%] px-6">
          <div className="font-bold text-primary text-xl">
            <h1>Meu carrinho</h1>
          </div>

          {carrinho.map((produto, index) => (
            <div
              key={index}
              className="flex flex-col bg-white p-4 rounded-md shadow-inner"
            >
              <div className="flex justify-between w-full">
                <div className="flex">
                  {produto.imagens.length > 0 && (
                    <img
                      src={produto.imagens[0]}
                      alt=""
                      className="w-40 h-32"
                    />
                  )}
                </div>

                <div className="flex flex-col justify-between p-2">
                  <div className="font-bold">
                    <span>{produto.nome}</span>
                  </div>
                  <span className="text-primary">
                    Vendido e entregue por Buy Info
                  </span>
                  <span className="text-primary">Marca: {produto.marca}</span>
                </div>
                <div className="cursor-pointer">
                  <HiOutlineTrash />
                </div>
              </div>
              <div className="flex border-solid border border-primary"></div>
              <div className="flex items-center justify-between">
                <div className="flex items-center pt-6 gap-4">
                  <span className="text-primary font-bold text-xl">
                    Quantidade:
                  </span>
                  <button
                    type="button"
                    className="flex w-9 h-9 justify-center items-center bg-primary rounded-full text-white font-bold"
                    onClick={() => handleDecrement(22, 2, 1000)}
                  >
                    -
                  </button>

                  <span className="flex w-9 h-9 items-center justify-center font-bold text-xl border border-primary">
                    {quantidadesProdutos[produto.quantidade] ||
                      produto.quantidade}
                  </span>

                  <button
                    type="button"
                    className="flex w-9 h-9 justify-center items-center bg-primary rounded-full text-white font-bold"
                    onClick={() =>
                      handleIncrement(
                        produto.id_produto,
                        produto.quantidade,
                        produto.preco
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <div className="flex flex-col items-center pt-6 font-bold text-primary">
                  <span>
                    Valor Unitário:{" "}
                    {produto.preco.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                  <span>
                    Valor Total:{" "}
                    {(
                      produto.preco *
                      (quantidadesProdutos[produto.quantidade] || 1)
                    ).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-4">
            <span className="font-bold text-primary text-base">
              Simule frete e prazo de entrega
            </span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="cep"
                placeholder="Digite aqui seu CEP"
                className="flex w-[30%] rounded-lg border border-primary px-4 h-8 text-sm"
              />
              <button
                type="onclick"
                className="border-solid border border-primary text-primary text-xs rounded-lg h-8 w-20"
              >
                Calcular
              </button>
              <Link
                to="https://buscacepinter.correios.com.br/app/endereco/index.php"
                target="_blank"
                className="text-primary underline text-sm font-bold"
              >
                Não sei meu cep
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-[40%]">
          <div className="font-bold text-primary text-xl">
            <h1>Meu carrinho</h1>
          </div>

          <div className="flex flex-col bg-white p-4 rounded-md shadow-inner gap-2">
            <div className="flex justify-between w-full text-sm">
              <div className="flex">
                <span className="font-bold">Subtotal (1 item)</span>
              </div>
              <div className="flex">
                <span className="font-bold text-primary">R$ 3.108,00</span>
              </div>
            </div>
            <div className="flex border-solid border border-primary"></div>
            <div className="flex pt-6 items-center justify-between text-sm">
              <div className="flex  ">
                <span className="font-bold">Valor Total</span>
              </div>
              <div className="flex flex-col items-end w-[40%]">
                <span className="font-bold text-primary">R$ 3.108,00</span>
                <span className="text-primary text-right">
                  Em até 10x de R$ 310,80 sem juros
                </span>
              </div>
            </div>
            <div className="flex border-solid border border-primary"></div>

            <div className="flex flex-col items-center gap-4 p-8 w-full">
              <div className="flex items-center justify-center font-bold text-white w-full">
                <button
                  onClick={finalizarCompra}
                  className="flex items-center justify-center  bg-green-700 w-full h-10 rounded-md"
                >
                  FINALIZAR
                  <BsArrowRightCircle className="ml-2" />
                </button>
              </div>
              <Link
                to="/home"
                className="flex items-center justify-center w-full h-10 text-primary font-bold rounded-md border-primary border border-solid"
              >
                ESCOLHER MAIS PRODUTOS
              </Link>
            </div>
          </div>
        </div>
      </div>
      <section className="flex flex-col gap-4 px-10 py-6">
        <div>
          <h3 className="flex text-gray-600 font-bold text-2xl">
            Mais vendidos
          </h3>
        </div>

        <ListProduct produtos={maisVendidos} />
      </section>

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
      <div className="flex items-center p-10">
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

export default Cart;
