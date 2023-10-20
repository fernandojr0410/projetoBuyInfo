import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ListProduct from "../../components/listProduct/listProduct";
import Logo from "../../assets/images/12-img-1.jpg";
import { HiOutlineTrash } from "react-icons/hi";
import { BsArrowRightCircle } from "react-icons/bs";
import { RiVisaLine } from "react-icons/ri";
import { FaCcMastercard, FaBarcode } from "react-icons/fa";
import { SiNubank } from "react-icons/si";
import { MdPix } from "react-icons/md";

function Cart() {
  const [produtosDestaque, setProdutosDestaque] = useState([]);

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

  return (
    <div className="flex flex-col justify-center items-center  bg-gray-200">
      <div className="flex px-24 pt-10 p-20">
        <div className="flex flex-col gap-4 w-[60%] px-6">
          <div className="font-bold text-primary text-xl">
            <h1>Meu carrinho</h1>
          </div>

          <div className="flex flex-col bg-white p-4 rounded-md shadow-inner">
            <div className="flex justify-between w-full">
              <div className="flex">
                <img src={Logo} alt="Imagem Produto" className="h-32 w-40" />
              </div>

              <div className="flex flex-col justify-between p-2">
                <div className="font-bold">
                  <span>
                    Processador Intel Core i9-10900KF BX8070110900KF de 10
                    núcleos e 5.3GHz de frequência
                  </span>
                </div>
                <span className="text-primary">
                  Vendido e entregue por Buy Info
                </span>
                <span className="text-primary">Marca: Intel</span>
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
                  type="onclick"
                  className="flex w-9 h-9 justify-center items-center bg-primary rounded-full text-white font-bold"
                >
                  -
                </button>
                <span className="flex w-9 h-9 items-center justify-center font-bold text-xl border border-primary">
                  1
                </span>
                <button
                  type="onclick"
                  className="flex w-9 h-9 justify-center items-center bg-primary rounded-full text-white font-bold"
                >
                  +
                </button>
              </div>
              <div className="flex flex-col items-center pt-6 font-bold text-primary">
                <span>Valor Unitário: R$ 3.108,00</span>
                <span>Valor Total: R$ 3.108,00</span>
              </div>
            </div>
          </div>
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
                className="border-solid border border-primary text-primary rounded-lg h-8 w-20"
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
                  type="button"
                  className="flex items-center justify-center  bg-green-700 w-full h-10 rounded-md"
                >
                  FINALIZAR
                  <BsArrowRightCircle className="ml-2" />
                </button>
              </div>
              <button
                type="button"
                className="flex items-center justify-center w-full h-10 text-primary font-bold rounded-md border-primary border border-solid"
              >
                ESCOLHER MAIS PRODUTOS
              </button>
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
