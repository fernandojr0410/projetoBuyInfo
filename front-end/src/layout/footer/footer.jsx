import Logo from "../../assets/images/logo-buy-info.png";
import { BsInfoCircle } from "react-icons/bs";
import { GrShieldSecurity } from "react-icons/gr";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="flex justify-between p-10">
        <div className="flex gap-10">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl cursor-pointer"
          >
            <BsInfoCircle />
            <span>Ajuda e contato</span>
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 text-xl cursor-pointer"
          >
            <GrShieldSecurity />
            <span>Dicas e segurança</span>
          </Link>
        </div>

        <div>
          <img src={Logo} alt="Logo Buy Info" className="w-56" />
        </div>
      </div>

      <div className="flex bg-primary text-white px-8 py-6">
        <span className="text-center text-base font-bold">
          Buy Info é uma marca registrada. Todos os direitos reservados. Os
          preços anunciados neste site promocional podem ser alterados sem
          prévio aviso. O Buy Info não é responsável por erros descritivos. As
          fotos contidas nesta página são meramente ilustrativas do produto e
          podem variar de acordo com o fornecedor/lote do fabricante.
          <span className="px-2 underline cursor-pointer">
            Clique aqui e veja as políticas de nossa empresa.
          </span>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
