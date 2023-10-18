import { useState, useEffect } from "react";
import Logo from "../../assets/images/12-img-1.jpg";
import { HiOutlineTrash } from "react-icons/hi";
import { useParams } from "react-router-dom";

function Cart() {
  const [carrinhoProduto, setCarrinhoProduto] = useState([]);
  const { id } = useParams();

  fetch(`http://localhost:5000/produtos/findById?id=${id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setCarrinhoProduto(data);
      console.log(data);
    })
    .catch((error) => console.error(error));

  return (
    <div className="flex bg-gray-200 px-24 pt-10 p-20">
      <div className="flex flex-col gap-4">
        <div className="font-bold text-primary text-xl">
          <h1>Meu carrinho</h1>
        </div>

        <div className="flex flex-col bg-white p-4 rounded-md shadow-inner w-[70%]">
          <div className="flex justify-between">
            <div className="flex">
              <img src={Logo} alt="Imagem Produto" className="h-32 w-40" />
            </div>

            <div className="flex flex-col justify-between p-2">
              <div className="font-bold">
                <span>{carrinhoProduto[0]?.nome}</span>
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
          <div className="flex border-solid border-2 border-primary"></div>
          <div className="flex items-center justify-between">
            <div className="flex items-center  pt-6 gap-4">
              <span className="text-primary font-bold">Quantidade:</span>
              <button
                type="onclick"
                className="flex w-9 h-9 justify-center items-center bg-primary rounded-full text-white font-bold"
              >
                -
              </button>
              <span className="flex w-9 h-9 items-center justify-center font-bold text-xl border-2 border-primary">
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
      </div>
    </div>
  );
}

export default Cart;
