import { useState } from "react";
import { Link } from "react-router-dom";
import { FiTruck } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";
import { ImExit } from "react-icons/im";

function UserProfile({ cliente, handleUser }) {
  const [showDropDownUser, setShowDropDownUser] = useState(false);

  function logout() {
    handleUser(null);
  }

  return (
    <div
      className="relative text-lg flex items-center"
      onMouseOver={() => setShowDropDownUser(true)}
      onMouseOut={() => setShowDropDownUser(false)}
    >
      <BiUserCircle className="h-6 w-6" />
      <span>Olá, {cliente.nome}</span>

      {showDropDownUser && (
        <ul className="absolute top-6 right-0 w-48 p-4 bg-white rounded shadow border border-gray-300">
          <>
            <li>
              <Link
                to={`/edicao-cadastro/meus-pedidos/${cliente.Id_Cliente}`}
                className="flex flex-col gap-6 py-1"
              >
                <div className="flex items-center gap-2">
                  <FiTruck className="h-6 w-6" />
                  <span>Meus Pedidos</span>
                </div>
              </Link>

              <Link
                to={`/edicao-cadastro/meus-dados/${cliente.Id_Cliente}`}
                className="flex flex-col gap-6 py-1"
              >
                <div className="flex items-center gap-2">
                  <BiUserCircle className="h-6 w-6" />
                  <span>Minha Conta</span>
                </div>
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="flex gap-2 items-center pt-4"
                onClick={logout}
              >
                <ImExit className="h-6 w-6" />
                <span>Sair</span>
              </button>
            </li>
          </>
        </ul>
      )}
    </div>
  );
}

export default UserProfile;
