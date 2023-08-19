const token = "e82b7ce9aefe9ea912d47c59cf8875";

const MAXIMO_PARCELAS_PAGAMENTO = 10;

const url = new URL(window.location.href);
const estaNaHome = url.pathname.includes("home");
const categoria = url.searchParams.get("categoria");
const marca = url.searchParams.get("marca");
const produto = url.searchParams.get("produto");
const carrinho = url.pathname.includes("carrinho");

const idMaisPesquisados = "99010004";
const idUltimosAnuncios = "99010005";

const queryProdutosHome = `
      {
        allProducts(filter: {productHighlight: {in: [${idMaisPesquisados}, ${idUltimosAnuncios}]}}) {
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
      if (estaNaHome) {
        mostrarListaProdutosHome(res.data.allProducts);
      }
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

function buscarProdutosCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho"));
  mostrarCarrinho(carrinho);
}

if (estaNaHome) buscarProdutos(queryProdutosHome);
if (categoria) buscarProdutos(queryProdutosCategoria);
if (produto) buscarProdutos(queryProduto);
if (carrinho) buscarProdutosCarrinho();

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

function mostrarListaProdutosHome(produtos) {
  const produtosMaisPesquisados = produtos.filter(
    (item) => item.productHighlight.id === idMaisPesquisados
  );
  const produtosUltimosAnuncios = produtos.filter(
    (item) => item.productHighlight.id === idUltimosAnuncios
  );

  produtosMaisPesquisados.forEach((produto) => {
    const card = criarCardProduto(produto);
    maisPesquisados.appendChild(card);
  });

  produtosUltimosAnuncios.forEach((produto) => {
    const card = criarCardProduto(produto);
    ultimosAnuncios.appendChild(card);
  });
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
                <span>ou em até 10x de ${formatarValorMoeda(
                  produto.preco / MAXIMO_PARCELAS_PAGAMENTO
                )} sem juros</span>
              </div>

              <span class="mais-forma-pagamento" id="verMaisFormasDePagamento" onclick="criarModalFormaPagamento(${
                produto.preco
              })">ver mais opções de pagamento</span>

              <button class="btn-comprar" id="comprar" type="button">
                Comprar agora
              </button>
              <button 
                class="btn-adicionar-carrinho" 
                id="btnAddCarrinho"
                type="button" 
              >
                Adicionar ao carrinho
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
            <span id="descricaoProduto"></span> 
          </div>
        `;
  containerProduto.appendChild(dadosProduto);
  criarGaleriaImagensProduto(produto);
  criarDescricaoProduto(produto);
  const btnAddCarrinho = document.getElementById("btnAddCarrinho");
  btnAddCarrinho.addEventListener("click", () => {
    handleAdicionarAoCarrinho(produto);
  });
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

function criarDescricaoProduto(produto) {
  const descricaoProduto = document.getElementById("descricaoProduto");
  descricaoProduto.innerText = `${produto.descricao}`;
}

function criarModalFormaPagamento(precoProduto) {
  const modalFormaPagamento = `
  <div class="forma-pagamento-container">
  <div class="forma-pagamento" onclick="criarParcelasCartaoPagamento(${precoProduto})">
    <i class="ph-credit-card"></i>
    <span>Cartão de Credito</span>
  </div>
  <div class="forma-pagamento" onclick="criarParcelaBoletoPagamento(${precoProduto})">
    <i class="ph-barcode"></i>
    <span>Boleto</span>
  </div>

  <div class="forma-pagamento" onclick="criarParcelaPixPagamento(${precoProduto})">
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <defs />
      <g fill="currentColor" fill-rule="evenodd">
        <path
          d="M393.072 391.897c-20.082 0-38.969-7.81-53.176-22.02l-77.069-77.067c-5.375-5.375-14.773-5.395-20.17 0l-76.784 76.786c-14.209 14.207-33.095 22.019-53.179 22.019h-9.247l97.521 97.52c30.375 30.375 79.614 30.375 109.988 0l97.239-97.238h-15.123zm-105.049 74.327c-8.55 8.53-19.93 13.25-32.05 13.25h-.02c-12.12 0-23.522-4.721-32.05-13.25l-56.855-56.855c7.875-4.613 15.165-10.248 21.758-16.84l63.948-63.948 64.23 64.23c7.637 7.66 16.188 14.013 25.478 18.952l-54.439 54.46zM310.958 22.78c-30.374-30.374-79.613-30.374-109.988 0l-97.52 97.52h9.247c20.082 0 38.97 7.834 53.178 22.02l76.784 76.785c5.57 5.592 14.622 5.57 20.17 0l77.069-77.068c14.207-14.187 33.094-22.02 53.176-22.02h15.123l-97.239-97.237zm6.028 96.346l-64.23 64.23-63.97-63.97c-6.593-6.592-13.86-12.206-21.736-16.818l56.853-56.877c17.69-17.645 46.476-17.668 64.121 0l54.44 54.461c-9.292 4.961-17.842 11.315-25.479 18.974h.001z"
        />
        <path
          d="M489.149 200.97l-58.379-58.377h-37.706c-13.838 0-27.394 5.635-37.185 15.426l-77.068 77.069c-7.202 7.18-16.623 10.77-26.067 10.77-9.443 0-18.885-3.59-26.066-10.77l-76.785-76.785c-9.792-9.814-23.346-15.427-37.207-15.427h-31.81L22.78 200.97c-30.374 30.375-30.374 79.614 0 109.988l58.095 58.074 31.81.021c13.86 0 27.416-5.635 37.208-15.426l76.784-76.764c13.925-13.947 38.208-13.924 52.133-.02l77.068 77.066c9.791 9.792 23.346 15.405 37.185 15.405h37.706l58.379-58.356c30.374-30.374 30.374-79.613 0-109.988zm-362.19 129.724c-3.763 3.786-8.942 5.917-14.273 5.917H94.302l-48.59-48.564c-17.689-17.69-17.689-46.476 0-64.143L94.3 175.296h18.385c5.331 0 10.51 2.154 14.295 5.918l74.74 74.74-74.761 74.74zm339.257-42.647l-48.848 48.87h-24.305c-5.309 0-10.508-2.155-14.251-5.92l-75.023-75.043 75.023-75.023c3.743-3.764 8.942-5.918 14.252-5.918h24.304l48.847 48.891c8.573 8.551 13.273 19.93 13.273 32.05 0 12.141-4.7 23.52-13.273 32.093z"
        />
      </g>
    </svg>
    <span>Pix</span>
  </div>
</div>

<hr />

  <div class="parcelamento-container" id="parcelasPagamento"></div>
  `;

  mostrarModal("Mais formas de pagamento", modalFormaPagamento);
  criarParcelasCartaoPagamento(precoProduto);
}

function criarParcelasCartaoPagamento(precoProduto) {
  const parcelasPagamento = document.getElementById("parcelasPagamento");
  parcelasPagamento.querySelectorAll(".parcelas").forEach((item) => {
    item.remove();
  });
  for (let i = 0; i < MAXIMO_PARCELAS_PAGAMENTO; i++) {
    let parcelaAtual = i + 1;
    const parcela = document.createElement("div");
    parcela.className = "parcelas";
    parcela.innerHTML = `
      <div class="preco-parcela">
        <span> 
          ${parcelaAtual}x ${formatarValorMoeda(precoProduto / parcelaAtual)} 
        </span>
        <span>Sem Juros</span>
      </div>
      <div class="preco-total"> 
        <span> ${formatarValorMoeda(precoProduto)}</span>
      </div>
    `;

    parcelasPagamento.appendChild(parcela);
  }
}

function criarParcelaBoletoPagamento(precoProduto) {
  const parcelasPagamento = document.getElementById("parcelasPagamento");
  parcelasPagamento.querySelectorAll(".parcelas").forEach((item) => {
    item.remove();
  });
  const parcela = document.createElement("div");
  parcela.className = "parcelas";
  parcela.innerHTML = `
      <div class="preco-parcela">
        <span> 
          1x ${formatarValorMoeda(precoProduto)} 
        </span>
        <span>no boleto bancário.</span>
      </div>
      <p>O boleto será gerado após a finalização de sua compra. 
      Imprima e pague no banco ou pague pela internet utilizando o código de barras do boleto.</p>
    `;
  parcelasPagamento.appendChild(parcela);
}

function criarParcelaPixPagamento(precoProduto) {
  const parcelasPagamento = document.getElementById("parcelasPagamento");
  parcelasPagamento.querySelectorAll(".parcelas").forEach((item) => {
    item.remove();
  });
  const parcela = document.createElement("div");
  parcela.className = "parcelas";
  parcela.innerHTML = `
      <div class="preco-parcela">
        <span> 
          1x ${formatarValorMoeda(precoProduto)} 
        </span>
        <span>no Pix com 10% de desconto.</span>
      </div>
      <div class="preco-total"> 
        <span>Total com desconto <b>${formatarValorMoeda(
          calculaDescontoPercentual(precoProduto, 0.1)
        )}</b></span>
      </div>
      <p>O pagamento é instantâneo e só pode ser à vista. Na etapa de finalização da compra, 
      a gente explica direitinho como pagar com Pix.</p>
    `;
  parcelasPagamento.appendChild(parcela);
}

function mostrarCarrinho(carrinho) {
  alterarTituloDaPagina("Carrinho");
  const containerProdutosCarrinho = document.getElementById(
    "containerProdutosCarrinho"
  );

  containerProdutosCarrinho.innerHTML = "";

  carrinho.forEach((item) => {
    const dadosProduto = document.createElement("div");
    dadosProduto.className = "fundo-meu-carrinho";
    dadosProduto.innerHTML = `
    <div class="produto">
      <div class="imagem-produto">
        <img
          src="${item.imagens[0].url}"
          alt="${item.nome}"
        />
        <div class="informacao-produto">
          <h3>${item.nome}</h3>
          <span>Vendido e entregue por Buy Info</span>
          <span>Marca: ${item.brand.nome}</span>
        </div>
      </div>

      <div class="lixeira">
        <i class="ph-light ph-trash"></i>
      </div>
    </div>

    <div class="quantidade-produto">
      <div class="counter">
        <h3>Quantidade:</h3>
        <p></p>
        <button
          type="button"
          class="botao diminui"
          onclick="diminuirQtdProdutoCarrinho(${item.id})"
        >
          -
        </button>
        <span id="value">${item.quantidade}</span>
        <button
          type="button"
          class="botao soma"
          onclick="aumentarQtdProdutoCarrinho(${item.id})"
        >
          +
        </button>
      </div>

      <div class="valor-produto">
        <span>Valor Unitário: ${formatarValorMoeda(item.preco)}</span>
        <span>Valor Total: ${formatarValorMoeda(
          item.quantidade * item.preco
        )}</span>
      </div>
    </div>
        `;
    containerProdutosCarrinho.appendChild(dadosProduto);
  });
}

function diminuirQtdProdutoCarrinho(idProduto) {
  const carrinho = JSON.parse(localStorage.getItem("carrinho"));
  const produtoCarrinho = carrinho.filter(
    (item) => item.id === idProduto.toString()
  );

  if (produtoCarrinho[0].quantidade > 1) {
    produtoCarrinho[0].quantidade -= 1;
    adicionarAoCarrinho(carrinho);
    mostrarCarrinho(carrinho);
  }
}

function aumentarQtdProdutoCarrinho(idProduto) {
  const carrinho = JSON.parse(localStorage.getItem("carrinho"));
  const produtoCarrinho = carrinho.filter(
    (item) => item.id === idProduto.toString()
  );

  produtoCarrinho[0].quantidade += 1;
  adicionarAoCarrinho(carrinho);
  mostrarCarrinho(carrinho);
}

function handleAdicionarAoCarrinho(produto) {
  produto.quantidade = 1;
  let carrinho = JSON.parse(localStorage.getItem("carrinho"));

  if (!carrinho) {
    carrinho = [produto];
    adicionarAoCarrinho(carrinho);
    return;
  }

  const produtoCarrinho = carrinho.filter((item) => item.id === produto.id);

  if (produtoCarrinho.length === 0) {
    carrinho.push(produto);
    adicionarAoCarrinho(carrinho);
  } else {
    produtoCarrinho[0].quantidade += 1;
    adicionarAoCarrinho(carrinho);
  }
}

function adicionarAoCarrinho(carrinho) {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// FUNÇÕES DE USO GERAL
function formatarValorMoeda(valor) {
  return valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}

function alterarTituloDaPagina(title) {
  document.title = title;
}

function calculaDescontoPercentual(valor, percentual) {
  const desconto = valor * percentual;
  return valor - desconto;
}

function mostrarModal(tituloModal, conteudoModal) {
  const bodyElement = document.getElementsByTagName("body")[0];
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-wrapper">
      <div class="modal-conteudo">
        <div class="modal-titulo">
          <h3>${tituloModal}</h3>
          <i class="ph ph-x" id="btnFecharModal"></i>
        </div>
        ${conteudoModal}  
        <div class="body-modal">
        </div>
      </div>
    </div>
  `;

  bodyElement.appendChild(modal);
  document.getElementById("btnFecharModal").addEventListener("click", () => {
    fecharModal(bodyElement, modal);
  });
  tirarScroll();
}

function fecharModal(body, modal) {
  body.removeChild(modal);
  colocarScroll();
}

function tirarScroll() {
  document.documentElement.style.overflow = "hidden";
}

function colocarScroll() {
  document.documentElement.style.overflow = "auto";
}
