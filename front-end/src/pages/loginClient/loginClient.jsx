import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../../assets/images/logo-buy-info.png";
import ModalRegistration from "../../components/modal/modalRegistration";
import Loading from "../../layout/loading/loading";
import Modal from "../../components/modal/modal";

function LoginClient({ handleUser }) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [senha, setSenha] = useState("");
  const [senhaError, setSenhaError] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  // const [carregamento, setCarregamento] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (evento) => {
    evento.preventDefault();

    if (email === "") {
      setEmailError("Preencha o e-mail");
    }
    if (senha === "") {
      setSenhaError("Preencha a senha");
    }

    // setCarregamento(true);

    fetch(
      `http://localhost:5000/clientes/findByEmailSenha?email=${email}&senha=${senha}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      // .then((response) => {
      //   if (response.status === 200) {
      //     return response.json();
      //   } else if (response.status === 401) {
      //     setMostrarModal("Conta não encontrada");
      //     throw new Error("Falha na autenticação");
      //   } else {
      //     console.log("Erro no Servidor");
      //     throw new Error("Erro no Servidor");
      //   }
      // })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Conta não encontrada");
        }
      })
      .then((data) => {
        if (data.length > 0) {
          const cliente = data[0];

          handleUser(cliente);
          setEmail("");
          setSenha("");
          navigate("/home");
          // setShowModal(true);
        } else {
          //   setShowModal(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setShowErrorModal(true);
      });
    console.log("email", email);
    console.log("senha", senha);
  };

  return (
    <div className="flex justify-center bg-primary w-full items-center">
      <div className="flex justify-center p-10 w-full">
        <div className="flex flex-col justify-center py-4 bg-white w-[40%] rounded-md">
          <div className="flex items-center flex-col gap-4">
            <img src={Logo} alt="" className="w-60" />
            <h1 className="text-2xl text-gray-800">Acesse sua conta</h1>
          </div>
          <div className="flex pt-16 justify-center">
            <form className="flex flex-col gap-6 w-3/4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1">
                <label
                  className={`text-xl ${emailError ? "text-red-500" : ""}`}
                >
                  E-mail
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="E-mail"
                  className={`border ${
                    emailError
                      ? "border-red-500"
                      : "border-gray-400 rounded-lg px-2 py-1 text-sm outline-primary cursor-pointer h-9"
                  }`}
                  onChange={(evento) => {
                    setEmail(evento.target.value);
                  }}
                />
                {emailError && (
                  <span className={`text-red-500 text-xs`}>{emailError}</span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label
                  className={`text-xl ${senhaError ? "text-erd-500" : ""}`}
                >
                  Senha
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="senha"
                  className={`border ${
                    senhaError
                      ? "border-red-500"
                      : "border-gray-400 rounded-lg px-2 py-1 text-sm outline-primary cursor-pointer h-9"
                  }`}
                  onChange={(evento) => {
                    setSenha(evento.target.value);
                  }}
                />
                {senhaError && (
                  <span className={`text-red-500 text-xs`}>{senhaError}</span>
                )}
              </div>
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="bg-primary rounded-lg text-white text-lg font-bold h-10 w-full"
                >
                  Entrar
                </button>
              </div>
              <div className="flex items-center justify-center gap-2 text-lg pt-2">
                <span className="text-gray-800">Não tem uma conta?</span>
                <Link to="/cadastro-cliente">
                  <span className="text-primary">Cadastre-se</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showErrorModal && ( // Modal de erro
        <ModalRegistration
          showModal={showErrorModal}
          title="Conta não encontrada!"
          onClose={() => setShowErrorModal(false)}
        />
      )}
    </div>
  );
}

export default LoginClient;
