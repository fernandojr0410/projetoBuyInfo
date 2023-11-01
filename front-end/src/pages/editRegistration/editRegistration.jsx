import { useState, useEffect } from "react";
import { BsPencil } from "react-icons/bs";
import { useParams } from "react-router-dom";
import RegistrationClient from "../registrationClient/registrationClient";

function EditRegistration({ nome, sobrenome, email, senha }) {
  const [cliente, setCliente] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/clientes/findById?id=${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((Response) => Response.json())
      .then((data) => {
        setCliente(data[0]);
        console.log("clientes", data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="">
      <span>Edição de Cadastro</span>
      <input type="text" name="name" value={cliente?.nome ?? ""} />
      <input type="text" name="name" value={cliente?.sobrenome ?? ""} />
    </div>
  );
}

export default EditRegistration;
