import { useState, useEffect } from "react";
import { GiComputerFan } from "react-icons/gi";

function Category() {
  const [produtosCooler, setProdutosCooler] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/produtos/coolers`, {
      method: "GET",
      headers: {
        "Contet-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProdutosCooler(data);
        console.log(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <section className="flex flex-col gap-4 bg-gray-100 p-10">
      <div className="flex items-center gap-3 text-gray-600 font-bold text-3xl py-4">
        <GiComputerFan style={{ fontSize: "1.5em" }} />
        <h2>Cooler</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 gap-4 bg-white px-10 py-6">
        {produtosCooler.map((produto, index) => (
          <div
            key={index}
            className="flex flex-col justify-between p-4 border-solid border-2 border-gray-300  h-full gap-4 transition-transform transform hover:-translate-y-1 cursor-pointer"
          >
            <div className="flex items-center justify-center h-40 w-full">
              {produto.imagens && produto.imagens[0] ? (
                <img
                  src={produto.imagens[0]}
                  alt={produto.nome}
                  className="max-h-full"
                />
              ) : (
                <div>Imagem não disponível</div>
              )}
            </div>

            <div className="flex-1 justify-center flex text-center font-semibold text-base">
              <span>{produto.nome}</span>
            </div>

            <div className="flex flex-col items-center gap-4">
              <span className="flex border-solid border-2 border-primary text-primary rounded-md px-2">
                {produto.marca}
              </span>

              <span className="font-bold text-primary text-lg">
                {produto.preco.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Category;
