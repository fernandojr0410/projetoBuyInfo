const conn = require("../db/mysql.js");
const util = require("util");
const queryPromise = util.promisify(conn().query).bind(conn());

function findAll() {
  return queryPromise(`
    SELECT p.id_produto, p.nome, p.descricao, p.preco, p.ativo, p.data_criacao, c.nome as categoria, m.nome as marca, d.nome as destaque, GROUP_CONCAT(i.nome) AS imagens
    FROM produto p
    LEFT JOIN categoria c ON c.id_categoria = p.categoria_id_categoria
    LEFT JOIN destaque d ON d.id_destaque = p.destaque_id_destaque
    LEFT JOIN marca m ON m.id_marca = p.marca_id_marca
    LEFT JOIN imagem_produto i ON i.produto_id_produto = p.id_produto
    GROUP BY p.id_produto;
  `);
}

function findById(id) {
  return queryPromise(`
    SELECT p.id_produto, p.nome, p.descricao, p.preco, p.ativo, p.data_criacao, c.nome as categoria, m.nome as marca, d.nome as destaque, GROUP_CONCAT(i.nome) AS imagens
    FROM produto p
    LEFT JOIN categoria c ON c.id_categoria = p.categoria_id_categoria
    LEFT JOIN destaque d ON d.id_destaque = p.destaque_id_destaque
    LEFT JOIN marca m ON m.id_marca = p.marca_id_marca
    LEFT JOIN imagem_produto i ON i.produto_id_produto = p.id_produto
    WHERE p.id_produto = ${id}
    GROUP BY p.id_produto;
    
  `);
}

function findAllDestaques() {
  return queryPromise(`
  SELECT 
  p.id_produto, 
  p.nome, 
  p.descricao, 
  p.preco, 
  p.ativo, 
  p.data_criacao, 
  c.nome as categoria, 
  m.nome as marca, 
  p.destaque_id_destaque, 
  CASE 
    WHEN p.destaque_id_destaque = 1 THEN 'Mais Pesquisados' 
    WHEN p.destaque_id_destaque = 2 THEN 'Últimos Anúncios' 
    WHEN p.destaque_id_destaque = 3 THEN 'Mais vendidos' 
    ELSE d.nome 
  END AS destaque, 
  GROUP_CONCAT(i.nome) AS imagens 
FROM 
  produto p 
  LEFT JOIN categoria c ON c.id_categoria = p.categoria_id_categoria 
  LEFT JOIN destaque d ON d.id_destaque = p.destaque_id_destaque 
  LEFT JOIN marca m ON m.id_marca = p.marca_id_marca 
  LEFT JOIN imagem_produto i ON i.produto_id_produto = p.id_produto 
WHERE 
  p.destaque_id_destaque IN (1, 2, 3) 
GROUP BY 
  p.id_produto;
  `);
}

function findByCategory(id) {
  return queryPromise(`
    SELECT p.id_produto, p.nome, p.descricao, p.preco, p.ativo, p.data_criacao, c.nome as categoria, m.nome as marca, d.nome as destaque, GROUP_CONCAT(i.nome) AS imagens
    FROM produto p
    LEFT JOIN categoria c ON c.id_categoria = p.categoria_id_categoria
    LEFT JOIN destaque d ON d.id_destaque = p.destaque_id_destaque
    LEFT JOIN marca m ON m.id_marca = p.marca_id_marca
    LEFT JOIN imagem_produto i ON i.produto_id_produto = p.id_produto
    WHERE p.categoria_id_categoria = ${id}
    GROUP BY p.id_produto;
  `);
}

function insert(dados) {
  const {
    nome,
    descricao,
    preco,
    ativo,
    categoria_id_categoria,
    marca_id_marca,
    destaque_id_destaque,
    // imagens,
  } = dados;

  let destaqueValue = destaque_id_destaque ? destaque_id_destaque : null;

  console.log("dados", dados);
  // return "";

  let sql = `INSERT INTO Produto 
  (nome, descricao, preco, ativo, categoria_id_categoria, marca_id_marca, destaque_id_destaque)VALUES (?, ?, ?, ?, ?, ?, ?)`;

  const params = [
    nome,
    descricao,
    preco,
    ativo,
    categoria_id_categoria,
    marca_id_marca,
    destaqueValue,
  ];

  return queryPromise(sql, params);
}

function update(dados) {
  const {
    id,
    nome,
    descricao,
    preco,
    ativo,
    data_criacao,
    categoria_id_categoria,
    marca_id_marca,
    destaque_id_destaque,
  } = dados;
  const params = [];
  let sql = "UPDATE Produto SET";

  if (nome) {
    sql += " nome = ?,";
    params.push(nome);
  }

  if (descricao) {
    sql += " descricao = ?,";
    params.push(descricao);
  }

  if (preco) {
    sql += " preco = ?,";
    params.push(preco);
  }

  if (ativo) {
    sql += " ativo = ?,";
    params.push(ativo);
  }

  if (data_criacao) {
    sql += " data_criacao = ?,";
    params.push(data_criacao);
  }

  if (categoria_id_categoria) {
    sql += " categoria_id_categoria = ?,";
    params.push(categoria_id_categoria);
  }

  if (marca_id_marca) {
    sql += " marca_id_marca = ?,";
    params.push(marca_id_marca);
  }

  if (destaque_id_destaque != null) {
    sql += " destaque_id_destaque = ?,";
    params.push(destaque_id_destaque);
  }

  console.log("id do produto aqui:", id);

  sql = sql.slice(0, -1);
  console.log(sql);
  sql += " WHERE Id_Produto = ?";
  params.push(id);
  return queryPromise(sql, params);
}

function deleteById(ids) {
  const idsDelete = ids.toString();
  return queryPromise(`DELETE FROM Produto WHERE Id_Produto IN (${idsDelete})`);
}

module.exports = {
  findAll,
  findById,
  findAllDestaques,
  findByCategory,
  insert,
  update,
  deleteById,
};
