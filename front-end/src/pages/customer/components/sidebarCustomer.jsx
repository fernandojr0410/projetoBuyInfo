import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FiTruck } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";
import { ImExit } from "react-icons/im";
import { BsPencil } from "react-icons/bs";

function SidebarCustomer({ handleUser }) {
  const { state } = useLocation();
  const [selectedMenu, setSelectedMenu] = useState(state?.menu);
  const { id } = useParams();

  function getCustomStyle(menu) {
    if (menu === selectedMenu) return "text-primary border-l-4 border-primary";
    return "";
  }

  function logout() {
    handleUser(null);
  }

  return (
    <div className="flex  px-10 py-2 h-[30%] ">
      <div className="flex flex-col gap-6 p-4 bg-white border-gray-400 border rounded-md text-gray-600 font-bold">
        <Link
          to={`/edicao-cadastro/meus-pedidos/pedidos`}
          state={{ menu: "pedidos" }}
          className=" pb-2 border-b border-gray-400 "
          // onClick={() => setSelectedMenu("pedidos")}
        >
          <div
            className={`flex items-center gap-2 pl-2 ${getCustomStyle(
              "pedidos"
            )}`}
          >
            <FiTruck className="text-xl" />
            <span>Pedidos</span>
          </div>
        </Link>

        <Link
          to={`/edicao-cadastro/meus-dados/${id}`}
          state={{ menu: "meusDados" }}
          className="flex items-center gap-2 pb-2 border-b border-gray-400 "
        >
          <div
            className={`flex items-center gap-2 pl-2 ${getCustomStyle(
              "meusDados"
            )}`}
          >
            <BiUserCircle className="text-xl" />
            <span>Meus Dados</span>
          </div>
        </Link>

        <button
          type="button"
          className="flex items-center gap-2 pb-2 border-b border-gray-400"
          onClick={logout}
        >
          <ImExit className="text-xl" />

          <span>Sair</span>
        </button>
      </div>
    </div>
  );
}

export default SidebarCustomer;
