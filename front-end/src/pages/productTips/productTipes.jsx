import { useLocation } from "react-router-dom"
import ListProduct from "../../components/listProduct/listProduct";

function ProductTips() {
  const location = useLocation();
  const { grupos, result } = location.state;
  console.log("grupos", grupos)
  console.log("result", result)
  return (
    <div>
      <section className="flex flex-col gap-4 bg-gray-100 px-10 py-6">
        <div>
          <h3 className="flex text-gray-600 font-bold text-2xl">
            Produtos recomendados baseado na sua pesquisa
          </h3>
        </div>

        <ListProduct produtos={result} />
      </section>

    </div>
  )
}

export default ProductTips