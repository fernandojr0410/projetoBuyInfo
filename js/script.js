const produtos = [
    {
        "id": 1,
        "categoria": 1,
        "descricao": "Iphone 13, Meia Noite, 128GB, Tela 6,5",
        "marca": 1,
        "preco": 5550.00,
        "imagem": "https://m.media-amazon.com/images/I/41rfDU6FGqL._AC_SL1000_.jpg",
        "titulo": "Iphone 13, Meia Noite, 128GB, Tela 6,5"
    },
    {
        "id": 2,
        "categoria": 2,
        "descricao": "Macbook Air, 13,5 Polegadas, 8GB de Memória RAM, 128 SSD",
        "marca": 1,
        "preco": 7150.00,
        "imagem": "https://m.media-amazon.com/images/I/51ppYyWOrNL._AC_SL1000_.jpg",
        "titulo": "Macbook Air, 13,5 Polegadas, 8GB de Memória RAM, 128 SSD"
    },
    {
        "id": 3,
        "categoria": 3,
        "descricao": "Air Pods 2 Geracao, branco, duracao de bateria de até 20 Horas",
        "marca": 1,
        "preco": 1750.00,
        "imagem": "https://m.media-amazon.com/images/I/7120GgUKj3L._AC_SL1500_.jpg",
        "titulo": "Air Pods 2 Geracao, branco, duracao de bateria de até 20 Horas"
    },
    {
        "id": 4,
        "categoria": 3,
        "descricao": "Fone de ouvido on-ear sem fio JBL Tune 510BT preto",
        "marca": 3,
        "preco": 219.00,
        "imagem": "https://http2.mlstatic.com/D_NQ_NP_2X_916914-MLA46540739257_062021-F.webp",
        "titulo": "Fone de ouvido on-ear sem fio JBL Tune 510BT preto"
    },
    {
        "id": 4,
        "categoria": 3,
        "descricao": "Fone de ouvido on-ear sem fio JBL Tune 510BT preto",
        "marca": 3,
        "preco": 219.00,
        "imagem": "https://http2.mlstatic.com/D_NQ_NP_2X_916914-MLA46540739257_062021-F.webp",
        "titulo": "Fone de ouvido on-ear sem fio JBL Tune 510BT preto"
    }
]

const categoria = [
    { id: 1, descricao: "Celular" },
    { id: 2, descricao: "Notbooks" },
    { id: 3, descricao: "Fones" },
];

const marca = [
    { id: 1, descricao: "Apple" },
    { id: 2, descricao: "Samsung" },
    { id: 3, descricao: "JBL" },
];

function formatarValorMoeda(valor) {
    return valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" })
}

function criarCard(produto) {
    const card = document.createElement("div")
    card.className = "card-produto-wrapper"
    card.innerHTML = `
        <a href="#" class="conteudo-card-produto">
            <div class="img-card-produto">
                <img src="${produto.imagem}" alt="${produto.titulo}">
            </div>
            <div class="descricao-produto-card">
                <h3>${produto.titulo}</h3>
            </div>
            <span>${formatarValorMoeda(produto.preco)}</span>
        </a>
    `
    return card
}
const maisPesquisados = document.getElementById("maisPesquisados")
const ultimosAnuncios = document.getElementById("ultimosAnuncios")


produtos.forEach((produto) => {
    const card = criarCard(produto)
    maisPesquisados.appendChild(card)
})

produtos.forEach((produto) => {
    const card = criarCard(produto)
    ultimosAnuncios.appendChild(card)
})