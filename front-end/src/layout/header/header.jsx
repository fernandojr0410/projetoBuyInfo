import Logo from "../../assets/images/logo-buy-info.png";
import { Link, useLocation } from "react-router-dom";
import UserProfile from "./components/userProfile";
import ItemsCart from "./components/itemsCart";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";

function Header({ cliente, handleUser, itemsCart }) {
  const location = useLocation();
  const hideCartIcon =
    location.pathname === "/login-cliente" ||
    location.pathname === "/cadastro-cliente";
  const hideLoginIcon =
    location.pathname === "/login-cliente" ||
    location.pathname === "/cadastro-cliente";

  return (
    <header className="flex items-center justify-between bg-white w-screen h-24 p-8">
      <Link to="/home">
        <img src={Logo} alt="Logo Buy Info" className="w-56" />
      </Link>

      <div className="flex items-center gap-4">
        {!hideCartIcon && (
          <Link to="/carrinho" className="relative flex items-center gap-2">
            <AiOutlineShoppingCart className="h-6 w-6" />
            <span className="text-lg">Carrinho</span>
            <ItemsCart itemsCart={itemsCart} />
          </Link>
        )}

        {!hideLoginIcon && (
          <div className="flex items-center gap-4">
            {cliente ? (
              <UserProfile cliente={cliente} handleUser={handleUser} />
            ) : (
              <Link to="/login-cliente" className="flex items-center gap-2">
                <BiUserCircle className="h-6 w-6" />
                <span className="text-lg">Entrar</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
