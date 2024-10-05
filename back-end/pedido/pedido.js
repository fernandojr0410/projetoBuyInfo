const { query } = require('express')
const conn = require('../db/postgres.js')

function queryPromiseReturn(sql) {
  return new Promise((resolve, reject) => {
    conn().query(sql, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

function findAllOrder() {
  return queryPromiseReturn('SELECT * FROM pedido')
}

function findByIdOrder(id_pedido) {
  console.log(id_pedido)
  return queryPromiseReturn(
    `SELECT * FROM pedido WHERE id_pedido = ${id_pedido}`
  )
}

function findAllProductsByOrderClientId(id_pedido, id_cliente) {
    console.log("id_pedido", id_pedido)
    console.log("id_cliente", id_cliente)
  return queryPromiseReturn(`
        SELECT p.id_produto, p.nome, p.descricao, p.preco, p.ativo, p.data_criacao, c.nome as categoria, m.nome as marca, d.nome as destaque, array_to_string(array_agg(i.nome), ', ') AS imagens
        FROM produto p
        LEFT JOIN categoria c ON c.id_categoria = p.categoria_id_categoria
        LEFT JOIN destaque d ON d.id_destaque = p.destaque_id_destaque
        LEFT JOIN marca m ON m.id_marca = p.marca_id_marca
        LEFT JOIN imagem_produto i ON i.produto_id_produto = p.id_produto
        INNER JOIN pedidoprodutocliente ppc ON ppc.id_produto = p.id_produto and ppc.id_pedido = ${id_pedido} and ppc.id_cliente = ${id_cliente}
        GROUP BY p.id_produto, p.nome, p.descricao, p.preco, p.ativo, p.data_criacao, c.nome, m.nome, d.nome
        order by id_produto DESC;
        `)
}

function insertOrder(dados) {
  const { status } = dados
  sql = `INSERT INTO pedido (status) VALUES ('${status}') RETURNING id_pedido`
  return queryPromiseReturn(sql)
}

function updateOrder(dados) {
  const { id_pedido, status } = dados
  sql = 'UPDATE pedido SET'
  if (status) {
    sql += ` status = '${status}',`
  }

  sql = sql.slice(0, -1)
  sql += ` WHERE id_pedido = ${id_pedido}`
  return queryPromiseReturn(sql)
}

function deleteOrder(ids) {
  const idsDelete = ids.toString()
  return queryPromiseReturn(
    `DELETE FROM pedido WHERE id_pedido IN (${idsDelete})`
  )
}

module.exports = {
  findAllOrder,
  findByIdOrder,
  findAllProductsByOrderClientId,
  insertOrder,
  updateOrder,
  deleteOrder,
}
