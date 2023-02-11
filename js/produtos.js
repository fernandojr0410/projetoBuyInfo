const token = "e82b7ce9aefe9ea912d47c59cf8875";

const url = new URL(window.location.href);
const categoria = url.searchParams.get("categoria");
const marca = url.searchParams.get("marca");
const produto = url.searchParams.get("produto");

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

const queryProduto = `
      {
        product(filter: {id: {eq: ${produto}}}) {
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
      console.log(res);
      if (categoria) {
        mostrarTituloProdutos(res.data.category);
        mostrarListaProdutos(res.data.allProducts);
      }
      if (produto) {
        mostrarProduto(res.data.product);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

if (categoria) buscarProdutos(queryProdutosCategoria);
if (produto) buscarProdutos(queryProduto);

function mostrarTituloProdutos(categoriaOuMarca) {
  alterarTituloDaPagina(categoriaOuMarca.nome);

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

function mostrarProduto(produto) {
  alterarTituloDaPagina(produto.nome);
  const containerProduto = document.getElementById("containerProduto");
  const dadosProduto = document.createElement("div");
  dadosProduto.className = "fundo-wrapper";
  dadosProduto.innerHTML = `
          <div class="conteudo">
            <div class="imagens">
              <div class="galeria-imagens" id="galeriaImagens"></div>

              <div class="imagem-principal">
                <img
                  id="imagemPrincipal"
                  src="${produto.imagens[0].url}"
                  alt="${produto.nome}"
                />
              </div>
            </div>

            <div class="informacao">
              <h3>
                ${produto.nome}
              </h3>
              <div class="preco">
                <span>${formatarValorMoeda(produto.preco)}</span>
                <span>ou em até 3x de ${formatarValorMoeda(
                  produto.preco / 3
                )} sem juros</span>
              </div>

              <a href="#" id="forma-pagamento">ver mais opções de pagamento</a>

              <button class="comprar" id="comprar" type="button">
                COMPRAR
              </button>

              <div class="calcular-frete">
                <span>Consultar frete e prazo de entrega</span>
                <div class="cep">
                  <input
                    type="number"
                    name="cep"
                    id="cep"
                    placeholder="Inserir CEP"
                  />
                  <button class="button-cep" id="ok" type="button">OK</button>
                </div>
              </div>
            </div>
          </div>

          <hr />

          <div class="descricao-produto">
            <h3>Descrição Produto</h3>
            <span>
              ${formatarDescricaoProduto(produto.descricao)}
            </span> 
          </div>
        `;
  containerProduto.appendChild(dadosProduto);
  criarGaleriaImagensProduto(produto);
}

function criarCardProduto(produto) {
  const card = document.createElement("div");
  card.className = "card-produto-wrapper";
  card.innerHTML = `
          <a href="produto.html?produto=${
            produto.id
          }" class="conteudo-card-produto">
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

function criarGaleriaImagensProduto(produto) {
  const galeriaImagens = document.getElementById("galeriaImagens");

  produto.imagens.forEach((imagem) => {
    const img = document.createElement("img");
    img.src = imagem.url;
    img.alt = produto.nome;

    img.addEventListener("mouseover", () => trocarImagemProduto(imagem.url));

    galeriaImagens.appendChild(img);
  });
}

function trocarImagemProduto(url) {
  const imagemPrincipal = document.getElementById("imagemPrincipal");
  imagemPrincipal.src = url;
}

function formatarDescricaoProduto(descricao) {
  // const descricaoFormatada = descricao.replace(/\\n/g, "<br>");
  console.log(JSON.stringify(descricao).includes("/a/"));

  return descricao;
}

// FUNÇÕES DE USO GERAL
function formatarValorMoeda(valor) {
  return valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}

function alterarTituloDaPagina(title) {
  document.title = title;
}
