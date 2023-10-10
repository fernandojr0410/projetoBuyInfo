import { useEffect, useState } from "react";

function ProductHome() {
  const [produtosDestaque, setProdutosDestaque] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/produtos/destaques`, {
      method: "GET",
      headers: {
        "Contet-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProdutosDestaque(data);
        console.log(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="flex text-center justify-between bg-white p-4">
      {produtosDestaque.map((produto) => (
        <div
          key={produto.id_produto}
          className="flex p-4 border-solid border-2 border-gray-300 transition-transform transform hover:-translate-y-1 cursor-pointer"
        >
          <div className="flex items-center justify-center w-52">
            <div className="flex flex-col items-center gap-6">
              <div>
                {produto.imagens && produto.imagens[0] ? (
                  <img src={produto.imagens[0]} alt={produto.nome} />
                ) : (
                  <div>Imagem não disponível</div>
                )}
              </div>
              <span className="font-bold text-lg">{produto.nome}</span>
              <div className="flex">
                <span className="border-solid border-2 border-primary text-primary rounded-md px-2">
                  {produto.marca}
                </span>
              </div>
              <div>
                <span className="font-bold text-primary text-xl">
                  {produto.preco.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductHome;
