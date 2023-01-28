const token = "e82b7ce9aefe9ea912d47c59cf8875";

const url = new URL(window.location.href);
const categoria = url.searchParams.get("categoria");
const marca = url.searchParams.get("marca");

const queryProdutosCategoria = `
      {
        allProducts(filter: {category: {eq: ${categoria}}}) {
          id, preco, nome, descricao, ativo, 
          brand {
            id, nome
          },
          category {
            id, nome
          },
          productHighlight {
            id, nome
          },
          imagens {
            id, url
          },
          _createdAt
        },
        category(filter: {id: {eq: ${categoria}}}) {
          id, nome, 
          imagem {
            id, url
          }
        }
      }
  `;

const maisPesquisados = document.getElementById("maisPesquisados");
const ultimosAnuncios = document.getElementById("ultimosAnuncios");
const tituloCardsProdutos = document.getElementById("tituloCardsProdutos");
const produtosCategoriaEMarca = document.getElementById(
  "produtosCategoriaEMarca"
);

function buscarProdutos(query) {
  fetch("https://graphql.datocms.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: query,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      mostrarTituloProdutos(res.data.category);
      mostrarListaProdutos(res.data.allProducts);
    })
    .catch((error) => {
      console.error(error);
    });
}

if (categoria) buscarProdutos(queryProdutosCategoria);

function mostrarTituloProdutos(categoriaOuMarca) {
  document.title = categoriaOuMarca.nome;

  tituloCardsProdutos.innerHTML = `
      <img
        src="${categoriaOuMarca.imagem.url}"
        alt="${categoriaOuMarca.nome}"
      />
      <h3>${categoriaOuMarca.nome}</h3>
    `;
}

function mostrarListaProdutos(produtos) {
  produtos.forEach((produto) => {
    const card = criarCardProduto(produto);
    produtosCategoriaEMarca.appendChild(card);
  });
}

function criarCardProduto(produto) {
  const card = document.createElement("div");
  card.className = "card-produto-wrapper";
  card.innerHTML = `
          <a href="#" class="conteudo-card-produto">
              <div class="img-card-produto">
                  <img src="${produto.imagens[0].url}" alt="${produto.nome}">
              </div>
              <div class="descricao-produto-card">
                  <h3>${produto.nome}</h3>
              </div>
              <small>${produto.brand.nome}</small>
              <span>${formatarValorMoeda(produto.preco)}</span>
          </a>
      `;
  return card;
}

// FUNÇÕES DE USO GERAL
function formatarValorMoeda(valor) {
  return valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}
