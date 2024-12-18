import { useEffect, useState } from "react";
import SidebarCustomer from "./components/sideBarCustomer";
import ModalRegistration from "../../components/modal/modalRegistration";

function CustomerData({ cliente }) {
  const [dadosCliente, setDadosCliente] = useState(cliente);
  const [endereco, setEndereco] = useState({});
  const [showModal, setShowModal] = useState(false);

  function handleUser(user) {
    setDadosCliente(user);
    console.log("usuario", user);
    if (user) localStorage.setItem("cliente", JSON.stringify(user));
    else localStorage.removeItem("cliente");
  }

  function handleChangeCliente(value, field) {
    setDadosCliente((prevDadosCliente) => ({
      ...prevDadosCliente,
      [field]: value,
    }));
  }

  function handleChangeEndereco(value, field) {
    setEndereco((prevEndereco) => ({ ...prevEndereco, [field]: value }));
  }

  useEffect(() => {
    if (cliente && cliente.id_cliente) {
      fetch(
        `http://localhost:5001/clientes/findById?id=${cliente.id_cliente}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.length > 0) {
            setDadosCliente(data[0]);
          }
        })
        .catch((error) => console.error(error));
    }
  }, [cliente]);

  useEffect(() => {
    if (cliente && cliente.id_cliente) {
      fetch(
        `http://localhost:5001/enderecos/findByIdClienteEndereco?id_cliente=${cliente.id_cliente}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setEndereco(data[0]);
        })
        .catch((error) => console.error("erro no front:", error));
    }
  }, [cliente]);

  const handleDadosCliente = (event) => {
    event.preventDefault();

    console.log("Valor de cliente:", cliente);
    console.log("Valor de cliente.id_cliente:", cliente.id_cliente);

    if (!cliente || !cliente.id_cliente) {
      console.error(
        "id_cliente está indefinido. Não é possível fazer a solicitação PUT."
      );
      return;
    }

    setDadosCliente((prevDadosCliente) => ({
      ...prevDadosCliente,
      id_cliente: cliente.id_cliente,
    }));

    const enderecoCliente = {
      id_endereco: endereco.id_endereco ?? null,
      id_cliente: dadosCliente.id_cliente,
      cep: event.target.elements.cep.value,
      cidade: event.target.elements.cidade.value,
      estado: event.target.elements.estado.value,
      bairro: event.target.elements.bairro.value,
      rua: event.target.elements.rua.value,
      numero: event.target.elements.numero.value,
      complemento: event.target.elements.complemento.value,
    };

    if (enderecoCliente.id_endereco) {
      fetch(`http://localhost:5001/enderecos/update`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(enderecoCliente),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Endereco", data);
          setEndereco({ ...endereco, ...enderecoCliente });
          setEndereco(data);
          console.log("atualizacao de endereco", data);
        })
        .catch((error) => console.error("Não foi atualizado cliente:", error));
    } else {
      fetch(`http://localhost:5001/enderecos/insert`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(enderecoCliente),
      })
        .then((response) => response.json())
        .then((data) => {
          setEndereco(data);
          console.log("Endereço cliente:", data);
        });
    }

    const clienteId = cliente && cliente.id_cliente;
    const dadosClienteAtualizado = { ...dadosCliente, id_cliente: clienteId };
    fetch(`http://localhost:5001/clientes/update/${clienteId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dadosClienteAtualizado),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Cliente:", data);
        setDadosCliente(dadosClienteAtualizado);
      })
      .catch((error) => console.error(error));

    setShowModal(true);
    console.log("teste", dadosCliente);

    const updatePage = () => {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    };
  };

  return (
    <div className="flex pt-4 bg-gray-200 pb-16">
      <SidebarCustomer />

      <div className="flex flex-col w-[80%] ">
        <form onSubmit={handleDadosCliente}>
          <div className="flex justify-between w-full gap-10 pr-12">
            <div className="flex flex-col gap-6 w-[50%]">
              <span className="font-bold text-primary text-xl">Meus Dados</span>
              <div className="flex flex-col gap-6 border-gray-400 border rounded-md p-4 bg-white w-full">
                <div>
                  <span className="font-bold text-gray-700">
                    Dados pessoais
                  </span>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <label className="text-primary font-bold px-2">Nome</label>
                    <input
                      type="text"
                      name="name"
                      value={dadosCliente.nome}
                      className="border-gray-400 border rounded-md p-2"
                      onChange={({ target }) =>
                        handleChangeCliente(target.value, "nome")
                      }
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-primary font-bold px-2">
                      Sobrenome
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={dadosCliente.sobrenome}
                      className="border-gray-400 border rounded-md p-2"
                      onChange={({ target }) =>
                        handleChangeCliente(target.value, "sobrenome")
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <label className="text-primary font-bold px-2">CPF</label>
                    <input
                      type="text"
                      name="name"
                      value={dadosCliente.cpf}
                      className="border-gray-400 border rounded-md p-2 cursor-not-allowed"
                      disabled
                      onChange={({ target }) =>
                        handleChangeCliente(target.value, "cpf")
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-primary font-bold px-2">
                      Telefone
                    </label>
                    <input
                      type="text"
                      name="telefone"
                      value={dadosCliente.telefone}
                      className="border-gray-400 border rounded-md p-2 cursor-pointer"
                      disabled
                      onChange={({ target }) =>
                        handleChangeCliente(target.value, "telefone")
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-primary font-bold px-2">E-mail</label>
                  <input
                    type="text"
                    name="email"
                    value={dadosCliente.email}
                    className="border-gray-400 border rounded-md p-2"
                    onChange={({ target }) =>
                      handleChangeCliente(target.value, "email")
                    }
                  />
                </div>

              </div>
            </div>
            <div className="flex flex-col gap-6 w-[50%]">
              <span className="font-bold text-primary text-xl">
                Meu Endereço
              </span>
              <div className="flex flex-col gap-6 bg-white border-gray-400 border rounded-md p-4">
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-gray-600">CEP</label>
                  <input
                    type="text"
                    name="cep"
                    value={endereco ? endereco.cep || "" : ""}
                    placeholder="CEP"
                    className="text-sm px-1 border-gray-300 border rounded-md h-8 cursor-pointer"
                    onChange={({ target }) =>
                      handleChangeEndereco(target.value, "cep")
                    }
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-gray-600">Cidade</label>
                    <input
                      type="text"
                      name="cidade"
                      value={endereco ? endereco.cidade || "" : ""}
                      placeholder="Cidade"
                      className="text-sm px-1 border-gray-300 border rounded-md h-8 cursor-pointer"
                      onChange={({ target }) =>
                        handleChangeEndereco(target.value, "cidade")
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-600">Estado</label>
                    <input
                      type="text"
                      name="estado"
                      value={endereco ? endereco.estado || "" : ""}
                      placeholder="Estado"
                      className="text-sm px-1 border-gray-300 border rounded-md h-8 cursor-pointer"
                      onChange={({ target }) => {
                        handleChangeEndereco(target.value, "estado");
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-gray-600">Rua/Avenida</label>
                  <input
                    type="text"
                    name="rua"
                    value={endereco ? endereco.rua || "" : ""}
                    placeholder="Rua/Avenida"
                    className="text-sm px-1 border-gray-300 border rounded-md h-8 cursor-pointer"
                    onChange={({ target }) => {
                      handleChangeEndereco(target.value, "rua");
                    }}
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-gray-600">Bairro</label>
                    <input
                      type="text"
                      name="bairro"
                      value={endereco ? endereco.bairro || "" : ""}
                      placeholder="Bairro"
                      className="text-sm px-1 border-gray-300 border rounded-md h-8 cursor-pointer"
                      onChange={({ target }) => {
                        handleChangeEndereco(target.value, "bairro");
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-600">Número</label>
                    <input
                      type="int"
                      name="numero"
                      value={endereco ? endereco.numero || "" : ""}
                      placeholder="Numero"
                      className="text-sm px-1 border-gray-300 border rounded-md h-8 cursor-pointer"
                      onChange={({ target }) => {
                        handleChangeEndereco(target.value, "numero");
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <label className="text-gray-600">Complemento</label>
                  <textarea
                    type="text"
                    name="complemento"
                    value={endereco ? endereco.complemento || "" : ""}
                    className="text-sm px-1 border-gray-300 border rounded-md h-32 pt-2 overflow-y-auto cursor-pointer"
                    style={{ textAlign: "top" }}
                    onChange={({ target }) => {
                      handleChangeEndereco(target.value, "complemento");
                    }}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="flex pt-3">
            <button
              type="submit"
              className="bg-primary p-6 text-white font-bold rounded-md"
            >
              SALVAR INFORMAÇÕES
            </button>
            {showModal && (
              <ModalRegistration
                titulo="Dados atualizados com sucesso!"
                onClose={() => {
                  setShowModal(false);

                  handleUser(dadosCliente);
                  console.log("dadosCliente", dadosCliente);
                  window.location.reload();
                }}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomerData;
