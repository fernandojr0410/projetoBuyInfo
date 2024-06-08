const conn = require('../db/postgres.js')
const util = require('util')
const queryPromise = util.promisify(conn().query).bind(conn())

function queryPromiseReturn(sql) {
  return new Promise((resolve, reject) => {
    console.log({ sql })
    conn().query(sql, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

function findAll() {
  return queryPromise(`
    SELECT p.id_produto, p.nome, p.descricao, p.preco, p.ativo, p.data_criacao, c.nome as categoria, m.nome as marca, d.nome as destaque, array_to_string(array_agg(i.nome), ', ') AS imagens
    FROM produto p
    LEFT JOIN categoria c ON c.id_categoria = p.categoria_id_categoria
    LEFT JOIN destaque d ON d.id_destaque = p.destaque_id_destaque
    LEFT JOIN marca m ON m.id_marca = p.marca_id_marca
    LEFT JOIN imagem_produto i ON i.produto_id_produto = p.id_produto
    GROUP BY p.id_produto, p.nome, p.descricao, p.preco, p.ativo, p.data_criacao, c.nome, m.nome, d.nome
    order by id_produto DESC;
  `)
}

function findById(id) {
  return queryPromise(`
    SELECT p.id_produto, p.nome, p.descricao, p.preco, p.ativo, p.data_criacao, c.nome as categoria, m.nome as marca, d.nome as destaque, array_to_string(array_agg(i.nome), ', ') AS imagens
    FROM produto p
    LEFT JOIN categoria c ON c.id_categoria = p.categoria_id_categoria
    LEFT JOIN destaque d ON d.id_destaque = p.destaque_id_destaque
    LEFT JOIN marca m ON m.id_marca = p.marca_id_marca
    LEFT JOIN imagem_produto i ON i.produto_id_produto = p.id_produto
    WHERE p.id_produto = ${id}
    GROUP BY p.id_produto, p.nome, p.descricao, p.preco, p.ativo, p.data_criacao, c.nome, m.nome, d.nome;
    
  `)
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
  array_to_string(array_agg(i.nome), ', ') AS imagens 
FROM 
  produto p 
  LEFT JOIN categoria c ON c.id_categoria = p.categoria_id_categoria 
  LEFT JOIN destaque d ON d.id_destaque = p.destaque_id_destaque 
  LEFT JOIN marca m ON m.id_marca = p.marca_id_marca 
  LEFT JOIN imagem_produto i ON i.produto_id_produto = p.id_produto 
WHERE 
  p.destaque_id_destaque IN (1, 2, 3) 
GROUP BY 
  p.id_produto, p.nome, p.descricao, p.preco, p.ativo, p.data_criacao, c.nome, m.nome, p.destaque_id_destaque, destaque;
  `)
}

function findByNameProduct(nome) {
  // Usando query parameter para evitar SQL Injection e fazendo busca case-insensitive
  return queryPromise(
    'SELECT * FROM produto WHERE nome ILIKE $1 OR descricao ILIKE $1',
    [`%${nome}%`]
  )
}

function findByCategory(id) {
  return queryPromise(`
    SELECT p.id_produto, p.nome, p.descricao, p.preco, p.ativo, p.data_criacao, c.nome as categoria, m.nome as marca, d.nome as destaque, array_to_string(array_agg(i.nome), ', ') AS imagens
    FROM produto p
    LEFT JOIN categoria c ON c.id_categoria = p.categoria_id_categoria
    LEFT JOIN destaque d ON d.id_destaque = p.destaque_id_destaque
    LEFT JOIN marca m ON m.id_marca = p.marca_id_marca
    LEFT JOIN imagem_produto i ON i.produto_id_produto = p.id_produto
    WHERE p.categoria_id_categoria = ${id}
    GROUP BY
    p.id_produto, p.nome, p.descricao, p.preco, p.ativo, p.data_criacao, c.nome, m.nome, p.destaque_id_destaque, destaque;
  `)
}

function getMaxId() {
  let sqlGetMaxId = `SELECT MAX(id_produto) FROM produto`
  return queryPromiseReturn(sqlGetMaxId)
}

const insert = async (dados) => {
  const {
    nome,
    descricao,
    preco,
    ativo,
    categoria_id_categoria,
    marca_id_marca,
    destaque_id_destaque,
    id_vendedor,
  } = dados

  const lastId = await getMaxId()
  console.log('Valor Max', lastId.rows[0].max + 1)
  let sql = `INSERT INTO produto (id_produto, nome, descricao, preco, ativo, data_criacao, categoria_id_categoria, marca_id_marca, destaque_id_destaque, id_vendedor) VALUES (${
    lastId.rows[0].max + 1
  }, '${nome}', '${descricao}', ${preco}, ${ativo}, '${new Date(
    Date.now()
  ).toUTCString()}', ${categoria_id_categoria}, ${marca_id_marca}, ${destaque_id_destaque}, ${id_vendedor}) RETURNING id_produto`
  return queryPromiseReturn(sql)
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
  } = dados
  const params = []
  let sql = 'UPDATE produto SET'

  if (nome) {
    sql += ' nome = ?,'
    params.push(nome)
  }

  if (descricao) {
    sql += ' descricao = ?,'
    params.push(descricao)
  }

  if (preco) {
    sql += ' preco = ?,'
    params.push(preco)
  }

  if (ativo) {
    sql += ' ativo = ?,'
    params.push(ativo)
  }

  if (data_criacao) {
    sql += ' data_criacao = ?,'
    params.push(data_criacao)
  }

  if (categoria_id_categoria) {
    sql += ' categoria_id_categoria = ?,'
    params.push(categoria_id_categoria)
  }

  if (marca_id_marca) {
    sql += ' marca_id_marca = ?,'
    params.push(marca_id_marca)
  }

  if (destaque_id_destaque != null) {
    sql += ' destaque_id_destaque = ?,'
    params.push(destaque_id_destaque)
  }

  if (params.length === 0) {
    throw new Error('Nenhum campo para atualizar')
  }

  console.log('id do produto aqui:', id)

  sql = sql.trim().slice(0, -1)

  sql += ' WHERE id_produto = ?'
  params.push(id)

  console.log('SQL final:', sql)
  console.log('Parâmetros:', params)

  return queryPromise(sql, params)
}

// function deleteById(ids) {
//   const idsDelete = ids.toString();
//   return queryPromise(`DELETE FROM produto WHERE id_produto IN (${idsDelete})`);
// }

function deleteById(id) {
  return queryPromise(`DELETE FROM produto WHERE id_produto = ${id}`)
}

module.exports = {
  findAll,
  findById,
  findAllDestaques,
  findByNameProduct,
  findByCategory,
  insert,
  update,
  deleteById,
}
