import { useEffect, useState } from "react";
import SidebarCustomer from "./components/sideBarCustomer";

function CustomerData({ cliente }) {
  const [dadosCliente, setDadosCliente] = useState(cliente);
  const [endereco, setEndereco] = useState([]);

  function handleChange(value, field) {
    setDadosCliente({ ...dadosCliente, [field]: value });
    setEndereco({ ...endereco, [field]: value });
  }

  const handleCadastrarEndereco = (event, Id_Cliente, idEndereco) => {
    console.log("Id_Cliente:", Id_Cliente);
    console.log("idEndereco:", idEndereco);
    // Restante do código...

    event.preventDefault();

    const enderecoCliente = JSON.stringify({
      cep: event.target.elements.cep.value,
      cidade: event.target.elements.cidade.value,
      estado: event.target.elements.estado.value,
      bairro: event.target.elements.bairro.value,
      rua: event.target.elements.rua.value,
      numero: event.target.elements.numero.value,
      complemento: event.target.elements.complemento.value,
    });

    fetch(`http://localhost:5000/enderecos/insert`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: enderecoCliente,
    })
      .then((response) => response.json())
      .then((data) => {
        setEndereco(data);
        console.log("Endereço cliente:", data);

        const idEndereco = endereco.idEndereco;
        const Id_Cliente = dadosCliente.Id_Cliente;
        console.log(idEndereco);

        const clienteEndereco = JSON.stringify({
          id_cliente: Id_Cliente,
          id_endereco: idEndereco,
        });

        fetch(`http://localhost:5000/clientes/updateClienteEndereco`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: clienteEndereco,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Update realizado", data);
          })
          .catch((error) =>
            console.error("Não foi atualizado cliente:", error)
          );
      });

    fetch(
      `http://localhost:5000/clientes/findByIdClienteEndereco?Id_Cliente=${Id_Cliente}&idEndereco=${idEndereco}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setEndereco(data);
        console.log("endereco dentro fetch", data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex pt-4 bg-gray-200 pb-16">
      <SidebarCustomer />

      <div className="flex flex-col w-[80%]">
        <div className="flex justify-between w-full gap-10 pr-12">
          <div className="flex flex-col gap-6 w-[50%]">
            <span className="font-bold text-primary text-xl">Meus Dados</span>
            <form>
              <div className="flex flex-col gap-6 border-gray-400 border rounded-md p-4 bg-white w-full">
                <div>
                  <span className="font-bold text-gray-700">
                    Dados pessoais
                  </span>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <label className=" text-primary font-bold px-2">Nome</label>
                    <input
                      type="text"
                      name="name"
                      value={dadosCliente.nome}
                      className=" border-gray-400 border rounded-md p-2"
                      onChange={({ target }) =>
                        handleChange(target.value, "nome")
                      }
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className=" text-primary font-bold px-2">
                      Sobrenome
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={dadosCliente.sobrenome}
                      className=" border-gray-400 border rounded-md p-2 "
                      onChange={({ target }) =>
                        handleChange(target.value, "sobrenome")
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <label className=" text-primary font-bold px-2">CPF</label>
                    <input
                      type="text"
                      name="name"
                      value={dadosCliente.cpf}
                      className=" border-gray-400 border rounded-md p-2 cursor-not-allowed"
                      disabled
                      onChange={({ target }) =>
                        handleChange(target.value, "cpf")
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className=" text-primary font-bold px-2">
                      Telefone
                    </label>
                    <input
                      type="text"
                      name="talefone"
                      value={dadosCliente.telefone}
                      className=" border-gray-400 border rounded-md p-2 cursor-not-allowed"
                      disabled
                      onChange={({ target }) =>
                        handleChange(target.value, "telefone")
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className=" text-primary font-bold px-2">E-mail</label>
                  <input
                    type="text"
                    name="name"
                    value={dadosCliente.email}
                    className=" border-gray-400 border rounded-md p-2 "
                    onChange={({ target }) =>
                      handleChange(target.value, "email")
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label className=" text-primary font-bold px-2">Senha</label>
                  <input
                    type="text"
                    name="name"
                    value={dadosCliente.senha}
                    className=" border-gray-400 border rounded-md p-2 "
                    onChange={({ target }) =>
                      handleChange(target.value, "senha")
                    }
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="flex flex-col gap-6 w-[50%]">
            <span className="font-bold text-primary text-xl">Meu Endereço</span>
            {/* {!mostrarFormulario && endereco ? (
              <div>
                <p>CEP: {endereco.cep}</p>
                <p>Cidade: {endereco.cidade}</p>
                <p>Estado: {endereco.estado}</p>
                <p>Bairro: {endereco.bairro}</p>
                <p>Rua: {endereco.rua}</p>
                <p>Numero: {endereco.numero}</p>
                <p>Complemento: {endereco.complemento}</p>
              </div>
            ) : (
              <button onClick={() => setMostrarFormulario(true)}>
                Cadastrar Endereço
              </button>
            )} */}

            {/* {mostrarFormulario && ( */}
            <form onSubmit={handleCadastrarEndereco}>
              <div className="flex flex-col gap-6 bg-white border-gray-400 border rounded-md p-4">
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-gray-600">CEP</label>
                  <input
                    type="text"
                    name="cep"
                    value={endereco.cep}
                    placeholder="CEP"
                    className="text-sm px-1 border-gray-300 border rounded-md h-8 cursor-pointer"
                    onChange={({ target }) => handleChange(target.value, "cep")}
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-gray-600">Cidade</label>
                    <input
                      type="text"
                      name="cidade"
                      placeholder="Cidade"
                      className="text-sm px-1 border-gray-300 border rounded-md h-8 cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-600">Estado</label>
                    <input
                      type="text"
                      name="estado"
                      placeholder="Estado"
                      className="text-sm px-1 border-gray-300 border rounded-md h-8 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-gray-600">Rua/Avenida</label>
                  <input
                    type="text"
                    name="rua"
                    placeholder="Rua/Avenida"
                    className="text-sm px-1 border-gray-300 border rounded-md h-8 cursor-pointer"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-gray-600">Bairro</label>
                    <input
                      type="text"
                      name="bairro"
                      placeholder="Bairro"
                      className="text-sm px-1 border-gray-300 border rounded-md h-8 cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-600">Numero</label>
                    <input
                      type="int"
                      name="numero"
                      placeholder="Numero"
                      className="text-sm px-1 border-gray-300 border rounded-md h-8 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <label className="text-gray-600">Complemento</label>
                  <textarea
                    name="complemento"
                    className="text-sm px-1 border-gray-300 border rounded-md py-10 w-full cursor-pointer"
                  ></textarea>
                </div>
              </div>
              <div className="flex pt-3">
                <button
                  type="submit"
                  className="bg-primary p-6 text-white font-bold rounded-md"
                >
                  SALVAR INFORMAÇÕES
                </button>
              </div>
            </form>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerData;
