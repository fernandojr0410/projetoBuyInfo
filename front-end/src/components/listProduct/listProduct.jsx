import CardProduct from "../cardProduct/cardProduct";

function ListProduct({ produtos }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 text-center bg-white p-4">
      {produtos?.map((produto) => (
        <CardProduct key={produto.id_produto} {...produto} />
        
      ))}
    </div>
  );
}

export default ListProduct;
