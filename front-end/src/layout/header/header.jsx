import Logo from "../../assets/images/logo-buy-info.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import UserProfile from "./components/userProfile";
import ItemsCart from "./components/itemsCart";

function Header({ nomeUsuario, handleUser, itemsCart }) {
  return (
    <header className="flex items-center justify-between bg-white w-screen h-24 p-8">
      <Link to="/home">
        <img src={Logo} alt="Logo Buy Info" className="w-56" />
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/carrinho" className="relative flex items-center gap-2">
          <AiOutlineShoppingCart className="h-6 w-6" />
          <span className="text-lg">Carrinho</span>

          <ItemsCart itemsCart={itemsCart} />
        </Link>

        <div className="flex items-center gap-4">
          {nomeUsuario ? (
            <UserProfile handleUser={handleUser} nomeUsuario={nomeUsuario} />
          ) : (
            <Link to="/loginCliente" className="flex items-center gap-2">
              <BiUserCircle className="h-6 w-6" />
              <span className="text-lg">Entrar</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
