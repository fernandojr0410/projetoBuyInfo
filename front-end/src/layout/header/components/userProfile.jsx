import { useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

function UserProfile({ nomeUsuario, handleUser }) {
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
      <span>Olá, {nomeUsuario}</span>

      {showDropDownUser && (
        <ul className="absolute top-6 right-0 w-48 p-4 bg-white rounded shadow border border-gray-300">
          <>
            <li>
              <Link to="loginCliente" className="flex gap-2 items-center py-1">
                <BiUserCircle className="h-6 w-6" />
                <span>Meu cadastro</span>
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="flex gap-2 items-center py-1"
                onClick={logout}
              >
                <BiUserCircle className="h-6 w-6" />
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
