import Logo from "../../assets/images/logo-buy-info.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function CadastroCliente() {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [nomeCompletoError, setNomeCompletoError] = useState("");

  const [cpf, setcpf] = useState("");
  const [cpfError, setCpfError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [senha, setSenha] = useState("");
  const [senhaError, setSenhaError] = useState("");

  const [formularioValido, setFormularioValido] = useState(false);

  useEffect(() => {
    validarFormulario();
  }, [
    nomeCompleto,
    cpf,
    email,
    senha,
    nomeCompletoError,
    cpfError,
    emailError,
    senhaError,
  ]);

  // Validação Nome
  const validarNomeCompleto = (valor) => {
    if (valor.match(/\d/)) {
      setNomeCompletoError("O campo nome completo não pode ter números");
    } else {
      setNomeCompletoError("");
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
  const validarEmail = (valor) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (re.test(valor)) {
      setEmailError("");
    }
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
      nomeCompletoError === "" &&
      nomeCompleto !== "" &&
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

    if (!nomeCompleto) {
      setNomeCompletoError("Preencha o nome completo");
    } else {
      validarNomeCompleto(nomeCompleto);
    }
    if (!cpf) {
      setCpfError("Preencha o seu CPF");
    } else if (cpf.length < 14) {
      setCpfError("CPF precisa ter 11 dígitos");
    } else {
      validarCpf(cpf);
    }
    if (!email) {
      setEmailError("Preencha o e-mail");
    } else if (!validarEmail(email)) {
      setEmailError("Email inválido");
    } else {
      setEmailError("");
    }
    if (!senha) {
      setSenhaError("Preencha a senha");
    } else if (senha.length < 6) {
      setSenhaError("A senha precisa ter no mínimo 6 caracteres");
    } else {
      setSenhaError("");
    }

    validarFormulario();

    if (nomeCompleto !== "" && cpf !== "" && email !== "" && senha !== "") {
      const dadosClientes = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          nomeCompleto,
          cpf,
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
            console.log("Cliente cadastrado com sucesso!");
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const handleCpfChange = (evento) => {
    const formattedCpf = formatCPF(evento.target.value);
    setcpf(formattedCpf);
    validarCpf(formattedCpf);
  };

  const handleEmailChange = (evento) => {
    setEmail(evento.target.value);
    validarEmail(evento.target.value);
  };

  const handleSenhaChange = (evento) => {
    setSenha(evento.target.value);
    validarSenha(evento.target.value);
  };
  return (
    <div className="flex justify-center bg-primary w-full items-center">
      <div className="flex justify-center p-10 h-full w-full">
        <div className="flex flex-col justify-center py-4 bg-white w-[40%] rounded-md">
          <div className="flex items-center flex-col gap-4">
            <img src={Logo} alt="" className="w-60" />
            <h1 className="text-2xl text-gray-800">Crie sua conta grátis</h1>
          </div>
          <div className="flex pt-16 justify-center">
            <form className="flex flex-col gap-6 w-3/4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1">
                <label
                  className={`text-lg ${
                    nomeCompletoError ? "text-red-500" : ""
                  }`}
                >
                  Nome Completo
                </label>

                <input
                  type="text"
                  name="nome"
                  value={nomeCompleto}
                  placeholder="Nome completo"
                  className={`border ${
                    nomeCompletoError ? "border-red-500" : "border-gray-400"
                  } rounded-lg px-2 py-1 text-sm outline-primary cursor-pointer h-9`}
                  onChange={(evento) => {
                    setNomeCompleto(evento.target.value);
                    validarNomeCompleto(evento.target.value);
                  }}
                />
                {nomeCompletoError && (
                  <span className={`text-red-500 text-xs`}>
                    {nomeCompletoError}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className={`text-lg ${cpfError ? "text-red-500" : ""}`}>
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
                  className={`text-lg ${emailError ? "text-red-500" : ""}`}
                >
                  E-mail
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="E-mail"
                  className={`border ${
                    emailError ? "border-red-500" : "border-gray-400"
                  }
                      border rounded-lg px-2 py-1 text-sm outline-primary cursor-pointer h-9
                  `}
                  onChange={handleEmailChange}
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
                <Link to="/loginCliente">
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

export default CadastroCliente;
