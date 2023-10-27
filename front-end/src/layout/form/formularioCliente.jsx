import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo-buy-info.png";

function FormularioCliente({
  titulo,
  inputs,
  placeholders,
  onChange,
  button,
  informacao,
  link,
}) {
  const [input1, input2, input3, input4] = inputs;
  const [placeholder1, placeholder2, placeholder3, placeholder4] = placeholders;

  return (
    <div className="flex justify-center bg-primary w-full items-center">
      <div className="flex justify-center p-10 w-full">
        <div className="flex flex-col justify-center py-4 bg-white w-[40%] rounded-md">
          <div className="flex items-center flex-col gap-4">
            <img src={Logo} alt="" className="w-60" />
            <h1 className="text-2xl text-gray-800">{titulo}</h1>
          </div>
          <div className="flex pt-16 justify-center">
            <form className="flex flex-col gap-6 w-3/4">
              <div className="flex flex-col gap-1">
                <label className="text-xl">{input1}</label>
                <input
                  type="text"
                  name="email"
                  // value={input}
                  placeholder={placeholder1}
                  className="border border-gray-400 rounded-lg px-2 py-1 text-sm outline-primary cursor-pointer h-9"
                  onChange={onChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xl">{input2}</label>
                <input
                  type="password"
                  name="password"
                  // value={input}
                  placeholder={placeholder2}
                  className="border border-gray-400 rounded-lg px-2 py-1 text-sm outline-primary cursor-pointer h-9"
                  onChange={onChange}
                />
              </div>
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="bg-primary rounded-lg text-white text-lg font-bold h-10 w-full"
                >
                  {button}
                </button>
              </div>
              <div className="flex items-center justify-center gap-2 text-lg pt-2">
                <span className="text-gray-800">{informacao}</span>
                <Link to="/cadastroCliente">
                  <span className="text-primary">{link}</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormularioCliente;
