import { Link } from "react-router-dom";

import { FaMagnifyingGlass, FaMemory, FaComputerMouse } from "react-icons/fa6";
import { GiComputerFan, GiProcessor } from "react-icons/gi";
import { BsFillMotherboardFill, BsFillProjectorFill } from "react-icons/bs";
import { MdPower, MdCable } from "react-icons/md";
import { PiComputerTowerFill } from "react-icons/pi";

import imagem_produto from "../assets/images/12-img-1.jpg";

function Home() {
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
              <Link to="/">
                <GiComputerFan className="h-10 w-10" />
              </Link>
            </div>
            <Link to="/">
              <span className="flex items-center py-2 text-white text-lg font-bold">
                Cooler
              </span>
            </Link>
          </div>

          <div className="flex flex-col text-center items-center">
            <div className="flex  bg-gray-50 rounded-full p-2 w-14">
              <Link to="/">
                <BsFillMotherboardFill className="h-10 w-10" />
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
                <FaMemory className="h-10 w-10" />
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
                <MdPower className="h-10 w-10" />
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
                <PiComputerTowerFill className="h-10 w-10" />
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
                <MdCable className="h-10 w-10" />
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
                <BsFillProjectorFill className="h-10 w-10" />
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
                <FaComputerMouse className="h-10 w-10" />
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
                <GiProcessor className="h-10 w-10" />
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

      <section className="flex flex-col bg-gray-200">
        <div className="flex px-10 ">
          <span className="text-gray-600 font-bold text-2xl pt-6 pb-6">
            Mais pesquisados
          </span>
        </div>

        <div className="flex bg-white p-10 gap-2">
          <div className="flex border-gray-800">
            <div className="flex border-solid border-gray-300 border-2 p-8 w-60">
              <div className="flex flex-col items-center text-center gap-5">
                <img
                  src={imagem_produto}
                  alt="Imagem Cooler"
                  className="flex h-40 w-40"
                />
                <span>
                  Processador Intel Core i9-10900KF BX8070110900KF de 10 núcleos
                  e 5.3GHz de frequência
                </span>
                <span>Intel</span>
                <span>R$ 3.108,00</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
