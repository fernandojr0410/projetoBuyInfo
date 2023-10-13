import Logo from "../../assets/images/logo-buy-info.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex items-center justify-between bg-white w-screen h-24 p-8">
      <Link to="/home">
        <img src={Logo} alt="Logo Buy Info" className="w-56" />
      </Link>

      <div className="flex items-center gap-2">
        <Link to="/carrinho" className="flex items-center gap-2 ">
          <AiOutlineShoppingCart className="h-6 w-6" />
          <span className="text-lg">Carrinho</span>
        </Link>

        <Link to="/#" className="flex items-center gap-2 ">
          <BiUserCircle className="h-6 w-6" />
          <span className="text-lg">Entrar</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
