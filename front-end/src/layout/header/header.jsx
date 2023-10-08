import Logo from "../../assets/images/logo-buy-info.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-white w-screen h-24 flex items-center justify-between p-8">
      <img src={Logo} alt="Logo Buy Info" className="w-56" />

      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <Link to="/carrinho">
            <i>icone</i>
            <span>Carrinho</span>
          </Link>

          <Link to="/#">
            <i>icone</i>
            <span>Entrar</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
