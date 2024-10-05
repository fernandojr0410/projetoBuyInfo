import { useState, useEffect } from "react";
import { GiComputerFan } from "react-icons/gi";
import ListProduct from "../../components/listProduct/listProduct";
import { useParams } from "react-router-dom";
import { menuCategories } from "../../layout/menus/menusCategories";

function Category() {
  const [produtos, setProdutos] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5001/produtos/categoria?id=${id}`, {
      method: "GET",
      headers: {
        "Contet-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProdutos(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const Icon = menuCategories[id].icon ?? <VscError />;

  return (
    <section className="flex flex-col gap-4 bg-gray-100 p-10">
      <div className="flex items-center gap-3 text-gray-600 font-bold text-3xl py-4">
        <Icon.type style={{ fontSize: "1.5em" }} />
        <h2>{produtos[0]?.categoria}</h2>
      </div>

      <ListProduct produtos={produtos} />
    </section>
  );
}

export default Category;
