import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import ListProduct from "../components/listProduct/listProduct";
import { menuCategories } from "../layout/menus/menusCategories";
import { VscError } from "react-icons/vsc";

function Home() {
  const [produtosDestaque, setProdutosDestaque] = useState([]);
  const [categories, setCategories] = useState([]);

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
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/categorias/findAll`, {
      method: "GET",
      headers: {
        "Contet-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const maisPesquisados = produtosDestaque.filter(
    (produto) => produto.destaque_id_destaque === 1
  );

  const ultimosAnuncios = produtosDestaque.filter(
    (produto) => produto.destaque_id_destaque === 2
  );

  const menus = categories?.map((category) => {
    return {
      ...category,
      icon: menuCategories[category.id_categoria].icon ?? <VscError />,
    };
  });

  return (
    <main>
      <div className="flex flex-col bg-primary pt-10 px-10">
        <div className="flex">
          <input
            type="text"
            placeholder="Estou buscando por..."
            className="flex w-full bg-white py-1 px-4"
          />
          <div
            className="flex 
        justify-center 
          items-center 
            border-l 
             border-solid
            border-gray
                rounded-sm
              p-2
               bg-white"
          >
            <button>
              <FaMagnifyingGlass />
            </button>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          {menus.map((menu) => {
            return (
              <Link
                key={menu.id_categoria}
                to={`/categoria/${menu.id_categoria}`}
                className="flex flex-col text-center items-center"
              >
                <div className="flex bg-gray-50 rounded-full p-2 w-14">
                  <menu.icon.type className="h-10 w-10 text-zinc-500" />
                </div>

                <span className="flex items-center py-2 text-white text-lg font-bold ">
                  {menu.nome}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <section className="flex flex-col gap-4 bg-gray-100 px-10 py-6">
        <div>
          <h3 className="flex text-gray-600 font-bold text-2xl">
            Mais pesquisados
          </h3>
        </div>

        <ListProduct produtos={maisPesquisados} />
      </section>

      <section className="flex flex-col gap-4  px-10 py-6">
        <div>
          <h3 className="flex text-gray-600 font-bold text-2xl">
            Ultimos anuncios
          </h3>
        </div>

        <ListProduct produtos={ultimosAnuncios} />
      </section>
    </main>
  );
}

export default Home;
