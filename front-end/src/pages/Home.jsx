import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaMagnifyingGlass, FaMemory, FaComputerMouse } from "react-icons/fa6";
import { GiComputerFan, GiProcessor } from "react-icons/gi";
import { BsFillMotherboardFill, BsFillProjectorFill } from "react-icons/bs";
import { MdPower, MdCable } from "react-icons/md";
import { PiComputerTowerFill } from "react-icons/pi";

import ListProduct from "../components/listProduct/listProduct";

function Home() {
  const [produtosDestaque, setProdutosDestaque] = useState([]);

  // const navigate = useNavigate();

  // const handleHomeClick = () => {
  //   navigate("/category");
  // };

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
        console.log(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const maisPesquisados = produtosDestaque.filter(
    (produto) => produto.destaque_id_destaque === 1
  );

  const ultimosAnuncios = produtosDestaque.filter(
    (produto) => produto.destaque_id_destaque === 2
  );

  return (
    <main>
      <div className="flex flex-col bg-primary pt-10 px-10">
        <div className="flex">
          <input
            type="text"
            placeholder="Estou buscando por..."
            className="flex w-full bg-white py-1 px-4"
          />
          <div
            className="flex 
        justify-center 
          items-center 
            border-l 
             border-solid
            border-gray
                rounded-sm
              p-2
               bg-white"
          >
            <button>
              <FaMagnifyingGlass />
            </button>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <div className="flex flex-col text-center items-center">
            <div className="flex bg-gray-50 rounded-full p-2 w-14">
              <Link to="/category">
                <GiComputerFan className="h-10 w-10 text-zinc-500" />
              </Link>
            </div>
            <Link>
              <span className="flex items-center py-2 text-white text-lg font-bold ">
                Cooler
              </span>
            </Link>
          </div>

          <div className="flex flex-col text-center items-center">
            <div className="flex  bg-gray-50 rounded-full p-2 w-14">
              <Link to="/carrinho">
                <BsFillMotherboardFill className="h-10 w-10 text-zinc-500" />
              </Link>
            </div>
            <Link to="/">
              <span className="flex py-2 text-white text-lg font-bold">
                Placa mãe
              </span>
            </Link>
          </div>

          <div className="flex flex-col text-center items-center">
            <div className="flex  bg-gray-50 rounded-full p-2 w-14">
              <Link to="/">
                <FaMemory className="h-10 w-10 text-zinc-500" />
              </Link>
            </div>
            <Link to="/">
              <span className="flex py-2 text-white text-lg font-bold">
                Memória
              </span>
            </Link>
          </div>

          <div className="flex flex-col text-center items-center">
            <div className="flex  bg-gray-50 rounded-full p-2 w-14">
              <Link to="/">
                <MdPower className="h-10 w-10 text-zinc-500" />
              </Link>
            </div>
            <Link to="/">
              <span className="flex py-2 text-white text-lg font-bold">
                Fonte
              </span>
            </Link>
          </div>

          <div className="flex flex-col text-center items-center">
            <div className="flex  bg-gray-50 rounded-full p-2 w-14">
              <Link to="/">
                <PiComputerTowerFill className="h-10 w-10 text-zinc-500" />
              </Link>
            </div>
            <Link to="/">
              <span className="flex py-2 text-white text-lg font-bold">
                Gabinete
              </span>
            </Link>
          </div>

          <div className="flex flex-col text-center items-center">
            <div className="flex  bg-gray-50 rounded-full p-2 w-14">
              <Link to="/">
                <MdCable className="h-10 w-10 text-zinc-500" />
              </Link>
            </div>
            <Link to="/">
              <span className="flex py-2 text-white text-lg font-bold">
                Cabo
              </span>
            </Link>
          </div>

          <div className="flex flex-col text-center items-center">
            <div className="flex  bg-gray-50 rounded-full p-2 w-14">
              <Link to="/">
                <BsFillProjectorFill className="h-10 w-10 text-zinc-500" />
              </Link>
            </div>
            <Link to="/">
              <span className="flex py-2 text-white text-lg font-bold">
                Placa de vídeo
              </span>
            </Link>
          </div>

          <div className="flex flex-col text-center items-center">
            <div className="flex  bg-gray-50 rounded-full p-2 w-14">
              <Link to="/">
                <FaComputerMouse className="h-10 w-10 text-zinc-500" />
              </Link>
            </div>
            <Link to="/">
              <span className="flex py-2 text-white text-lg font-bold">
                Acessórios
              </span>
            </Link>
          </div>

          <div className="flex flex-col text-center items-center">
            <div className="flex  bg-gray-50 rounded-full p-2 w-14">
              <Link to="/">
                <GiProcessor className="h-10 w-10 text-zinc-500" />
              </Link>
            </div>
            <Link to="/">
              <span className="flex py-2 text-white text-lg font-bold">
                Processador
              </span>
            </Link>
          </div>
        </div>
      </div>

      <section className="flex flex-col gap-4 bg-gray-100 px-10 py-6">
        <div>
          <h3 className="flex text-gray-600 font-bold text-2xl">
            Mais pesquisados
          </h3>
        </div>

        <ListProduct produtos={maisPesquisados} />
      </section>

      <section className="flex flex-col gap-4  px-10 py-6">
        <div>
          <h3 className="flex text-gray-600 font-bold text-2xl">
            Ultimos anuncios
          </h3>
        </div>

        <ListProduct produtos={ultimosAnuncios} />
      </section>
    </main>
  );
}

export default Home;
