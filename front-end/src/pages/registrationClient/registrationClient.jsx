import Logo from "../../assets/images/logo-buy-info.png";
import ModalRegistration from "../../components/modal/modalRegistration";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function RegistrationClient({ handleUser }) {
  const [nome, setNome] = useState("");
  const [nomeError, setNomeError] = useState("");

  const [sobrenome, setSobrenome] = useState("");
  const [sobrenomeError, setSobrenomeError] = useState("");

  const [cpf, setcpf] = useState("");
  const [cpfError, setCpfError] = useState("");

  const [telefone, setTelefone] = useState("");
  const [telefoneError, setTelefoneError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [senha, setSenha] = useState("");
  const [senhaError, setSenhaError] = useState("");

  const [formularioValido, setFormularioValido] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    validarFormulario();
  }, [nome, sobrenome, cpf, telefone, email, senha]);

  // Validação Nome
  const validarNome = (valor) => {
    if (valor === "") {
      setNomeError("Preencha o nome");
    } else if (/\d/.test(valor)) {
      setNomeError("O campo nome não pode ter números");
    } else {
      setNomeError("");
    }
  };

  const validarSobrenome = (valor) => {
    if (valor === "") {
      setSobrenomeError("Preencha o sobrenome");
    } else if (/\d/.test(valor)) {
      setSobrenomeError("O campo sobrenome não pode ter números");
    } else {
      setSobrenomeError("");
    }
  };

  // Formatar o CPF com máscara
  const formatCPF = (value) => {
    const cleanedValue = value.replace(/\D/g, "");

    // máscara com os pontos após os três primeiros números
    let formattedValue = "";
    for (let i = 0; i < cleanedValue.length; i++) {
      if (i === 3 || i === 6) {
        formattedValue += ".";
      }
      if (i === 9) {
        formattedValue += "-";
      }
      formattedValue += cleanedValue.charAt(i);
    }

    return formattedValue;
  };

  const validarCpf = (valor) => {
    if (valor.length === 14) {
      setCpfError("");
    } else {
      setCpfError("CPF inválido");
    }
  };
  const validarEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return re.test(email);
  };

  const validarSenha = (valor) => {
    if (valor.length >= 6) {
      setSenhaError("");
    } else {
      setSenhaError("A senha precisa ter pelo menos 6 caracteres");
    }
  };

  const validarFormulario = () => {
    if (
      nomeError === "" &&
      nome !== "" &&
      sobrenomeError === "" &&
      sobrenome !== "" &&
      sobrenomeError === "" &&
      sobrenome !== "" &&
      telefoneError === "" &&
      telefone !== "" &&
      cpfError === "" &&
      cpf !== "" &&
      cpf.length >= 14 &&
      emailError === "" &&
      email !== "" &&
      senhaError === "" &&
      senha !== ""
    ) {
      setFormularioValido(true);
    } else {
      setFormularioValido(false);
    }
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();

    setNomeError("");
    setSobrenomeError("");
    setCpfError("");
    setEmailError("");
    setTelefoneError("");
    setSenhaError("");

    validarNome(nome);
    validarSobrenome(sobrenome);
    validarCpf(cpf);
    validarEmail(email);
    validarSenha(senha);

    if (
      nome !== "" &&
      sobrenome !== "" &&
      cpf !== "" &&
      telefone !== "" &&
      email !== "" &&
      senha !== ""
    ) {
      if (senha.length < 6) {
        setSenhaError("A senha precisa ter pelo menos 6 caracteres");
      } else {
        setSenhaError("");
      }
    }

    validarFormulario();

    if (formularioValido) {
      const dadosClientes = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          nome,
          sobrenome,
          cpf,
          telefone,
          email,
          senha,
        }),
      };

      fetch(`http://localhost:5000/clientes/insert`, dadosClientes)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro na solicitação.");
          }

          if (response.status === 200) {
            const cliente = {
              nome,
              sobrenome,
              cpf,
              telefone,
              email,
              senha,
            };
            handleUser(cliente);
            setMostrarModal(true);
            console.log("Nome cadastrado:", nome);
            console.log("Usuário logado:", cliente);
          }
        })
        .catch((error) => console.error("Erro durante a solicitação:", error));
    }
  };

  const handleNomeChange = (evento) => {
    const { value } = evento.target;
    if (/\d/.test(value)) {
      const newValue = value.replace(/\d/g, "");
      setNome(newValue);
    } else {
      setNome(value);
    }
    validarNome(value);
  };

  const handleSobrenomeChange = (evento) => {
    const { value } = evento.target;
    if (/\d/.test(value)) {
      const newValue = value.replace(/\d/g, "");
      setSobrenome(newValue);
    } else {
      setSobrenome(value);
    }
    validarSobrenome(value);
  };

  const handleCpfChange = (evento) => {
    const { value } = evento.target;
    if (!/(\d)\1{10}/.test(value)) {
      const formattedCpf = formatCPF(value);
      setcpf(formattedCpf);
      validarCpf(formattedCpf);
    }
  };

  const handleTelefoneChange = (evento) => {
    setTelefone(evento.target.value);
  };

  const handleSenhaChange = (evento) => {
    setSenha(evento.target.value);
    validarSenha(evento.target.value);
  };

  const handleCloseMensagemSucesso = () => {
    setMostrarModal(false);
    // navigate("/home");
  };
  return (
    <div className="flex justify-center bg-primary w-full items-center">
      <div className="flex justify-center p-10 h-full w-[50%]">
        <div className="flex flex-col justify-center py-4 bg-white w-full rounded-md">
          <div className="flex items-center flex-col gap-4">
            <img src={Logo} alt="" className="w-60" />
            <h1 className="text-2xl text-gray-800">Crie sua conta grátis</h1>
          </div>
          <div className="flex pt-16 justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 ">
              <div className="flex gap-8">
                <div className="flex flex-col gap-1">
                  <label
                    className={`text-lg ${nomeError ? "text-red-500" : ""}`}
                  >
                    Nome
                  </label>

                  <input
                    type="text"
                    name="nome"
                    value={nome}
                    placeholder="Nome"
                    className={`border ${
                      nomeError ? "border-red-500" : "border-gray-400"
                    } rounded-lg px-2 py-1 text-sm outline-primary cursor-pointer h-9`}
                    onChange={handleNomeChange}
                  />
                  {nomeError && (
                    <span className={`text-red-500 text-xs`}>{nomeError}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    className={`text-lg ${
                      sobrenomeError ? "text-red-500" : ""
                    }`}
                  >
                    Sobrenome
                  </label>

                  <input
                    type="text"
                    name="Sobrenome"
                    value={sobrenome}
                    placeholder="Sobrenome"
                    className={`border ${
                      nomeError ? "border-red-500" : "border-gray-400"
                    } rounded-lg px-2 py-1 text-sm outline-primary cursor-pointer h-9`}
                    onChange={handleSobrenomeChange}
                  />
                  {sobrenomeError && (
                    <span className={`text-red-500 text-xs`}>
                      {sobrenomeError}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-8">
                <div className="flex flex-col gap-1">
                  <label
                    className={`text-lg ${cpfError ? "text-red-500" : ""}`}
                  >
                    CPF
                  </label>
                  <input
                    type="text"
                    maxLength="14"
                    name="cpf"
                    placeholder="CPF"
                    className={`border ${
                      cpfError ? "border-red-500" : "border-gray-400"
                    }  rounded-lg px-2 py-1 text-sm outline-primary cursor-pointer h-9`}
                    value={cpf}
                    onChange={handleCpfChange}
                  />

                  {cpfError && (
                    <span className={`text-red-500 text-xs`}>{cpfError}</span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    className={`text-lg ${telefoneError ? "text-red-500" : ""}`}
                  >
                    Telefone
                  </label>
                  <input
                    type="text"
                    name="telefone"
                    value={telefone}
                    placeholder="Telefone"
                    className={`border ${
                      telefoneError ? "border-red-500" : "border-gray-400"
                    }
                      border rounded-lg px-2 py-1 text-sm outline-primary cursor-pointer h-9
                  `}
                    onChange={handleTelefoneChange}
                  />

                  {telefoneError && (
                    <span className={`text-red-500 text-xs`}>
                      {telefoneError}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  className={`text-lg ${emailError ? "text-red-500" : ""}`}
                >
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="E-mail"
                  className={`border ${
                    emailError ? "border-red-500" : "border-gray-400"
                  }
                      border rounded-lg px-2 py-1 text-sm outline-primary cursor-pointer h-9
                  `}
                  onChange={(evento) => {
                    setEmail(evento.target.value);
                    validarEmail(evento.target.value);
                  }}
                />

                {emailError && (
                  <span className={`text-red-500 text-xs`}>{emailError}</span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label
                  className={`text-lg ${senhaError ? "text-red-500" : ""}`}
                >
                  Senha
                </label>
                <input
                  type="password"
                  name="password"
                  value={senha}
                  placeholder="senha"
                  className={`border ${
                    senhaError ? "border-red-500" : "border-gray-400"
                  } rounded-lg px-2 py-1 text-sm outline-primary cursor-pointer h-9`}
                  onChange={handleSenhaChange}
                />
                {senhaError && (
                  <span className={`text-red-500 text-xs`}>{senhaError}</span>
                )}
              </div>

              {mostrarModal && (
                <ModalRegistration
                  titulo="Cadastro realizado com sucesso!"
                  onClose={handleCloseMensagemSucesso}
                  link="/home"
                />
              )}

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="bg-primary rounded-lg text-white text-lg font-bold h-10 w-full"
                >
                  CADASTRE-SE
                </button>
              </div>
              <div className="flex items-center justify-center gap-2 text-lg pt-2">
                <span className="text-gray-800">Já tem uma conta?</span>
                <Link to="/login-cliente">
                  <span className="text-primary">Entrar</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationClient;
