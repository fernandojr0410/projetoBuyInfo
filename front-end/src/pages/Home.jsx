import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import ListProduct from "../components/listProduct/listProduct";
import { menuCategories } from "../layout/menus/menusCategories";
import { VscError } from "react-icons/vsc";
import LineProduct from "../components/lineProduct/lineProduct";

function Home() {
  const [produtosDestaque, setProdutosDestaque] = useState([]);
  const [categories, setCategories] = useState([]);
  const [termoDeBusca, setTermoDeBusca] = useState('');
  const [resultadoBusca, setResultadoBusca] = useState([])
  const [buscaRapida, setBuscaRapida] = useState([])

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

  const handleSearch = () => {
    const encodedSearchTerm = encodeURIComponent(termoDeBusca);
    fetch(`http://localhost:5000/product/findByName?nome=${encodedSearchTerm}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar produtos');
        }
        return response.json();
      })
      .then((data) => {
        setResultadoBusca(data)
      })
      .catch((error) => console.error('Erro ao buscar produtos:', error));
  };

  const handlefastSearch = () => {
    const encodedSearchTerm = encodeURIComponent(termoDeBusca);
    fetch(`http://localhost:5000/product/fastSearch?nome=${encodedSearchTerm}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar produtos');
        }
        return response.json();
      })
      .then((data) => {
        setBuscaRapida(data)
        console.log("data", data)
      })
      .catch((error) => console.error('Erro ao buscar produtos:', error));
  };

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
        <div className="flex relative">
          <input
            type="text"
            placeholder="Estou buscando por..."
            className="flex w-full bg-white py-1 px-4 outline-none focus:outline-none"
            value={termoDeBusca}
            onChange={(e) => {
              setTermoDeBusca(e.target.value)
              if (e.target.value.length >= 3) {
                handlefastSearch()
              }
              if (e.target.value.length < 3) setBuscaRapida([])
            }}
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
            <button
              onClick={() => {
                handleSearch();
                setBuscaRapida([]);
              }}
            >
              <FaMagnifyingGlass />
            </button>
          </div>
          {buscaRapida.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-bege border mt-1 z-50 bg-white">
              {buscaRapida.map((produto, index) => (
                <div key={index} className="bg-bege">
                  <LineProduct produto={produto} />
                </div>
              ))}
            </div>
          )}
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

      {resultadoBusca.length > 0 ? (
        <section className="flex flex-col gap-4 bg-gray-100 px-10 py-6">
          <div>
            <h3 className="flex text-gray-600 font-bold text-2xl">
              Resultado da busca
            </h3>
          </div>

          <ListProduct produtos={resultadoBusca} />
        </section>
      ) : (
        <section>
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
                Últimos anúncios
              </h3>
            </div>

            <ListProduct produtos={ultimosAnuncios} />
          </section>
        </section>
      )}
    </main>
  );
}
export default Home;
