import { Link } from "react-router-dom";

function LineProduct({ produto }) {
  return (
    <Link
      to={`/produto/${produto.id_produto}`}
      className="flex flex-row items-center p-4 border-solid border border-gray-300 gap-4 transition-transform transform hover:-translate-y-1 cursor-pointer"
    >
      <div className="flex items-center justify-center h-[90px] w-[60px]">
        {produto.imagens && produto.imagens[0] ? (
          <img
            src={produto.imagens[0]}
            alt={produto.nome}
            className="max-h-full max-w-full"
          />
        ) : (
          <div>Imagem não disponível</div>
        )}
      </div>

      <div className="flex flex-col flex-1 justify-center font-semibold text-base">
        <span>{produto.nome}</span>
        <span className="border-solid border border-primary text-primary rounded-md px-2 mt-2">
          {produto.marca}
        </span>
        <span className="font-bold text-primary text-xl mt-2">
          {Number(produto.preco).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
    </Link>
  );
}

export default LineProduct;
