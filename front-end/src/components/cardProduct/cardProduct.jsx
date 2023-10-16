import { Link } from "react-router-dom";

function CardProduct(produto) {
  return (
    <Link
      to={`/produto/${produto.id_produto}`}
      className="flex flex-col justify-between p-6 min-w-[152px] border-solid border-2 border-gray-300 h-full gap-6 transition-transform transform hover:-translate-y-1 cursor-pointer"
    >
      <div className="flex items-center justify-center h-[170px] w-full">
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

      <div className="flex-1 justify-center flex font-semibold text-base">
        <span>{produto.nome}</span>
      </div>

      <div className="flex flex-col items-center gap-6">
        <span className="flex border-solid border-2 border-primary text-primary rounded-md px-2">
          {produto.marca}
        </span>

        <span className="font-bold text-primary text-xl">
          {produto.preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
    </Link>
  );
}

export default CardProduct;
