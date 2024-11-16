const { query } = require("express");
const conn = require("../db/postgres.js");

function queryPromiseReturn(sql) {
  return new Promise((resolve, reject) => {
    conn().query(sql, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

function findAll() {
  return queryPromiseReturn("SELECT * FROM pedidoProdutoCliente");
}

// function findById(id) {
//  return queryPromiseReturn(`SELECT * FROM pedidoProdutoCliente WHERE id = ${id}`);
// }

function findById(clientId, id_pedido, id_produto) {
  const sql = `
  SELECT
    ppc.id_pedido,
    ppc.id_produto,
    p.status AS status_pedido,
    c.nome AS nome_cliente,
    pr.nome AS nome_produto,
    pr.descricao AS descricao_produto,
    pr.preco AS preco_produto
  FROM
    pedidoprodutocliente ppc
  JOIN
    cliente c ON ppc.id_cliente = c.id_cliente
  JOIN
    pedido p ON ppc.id_pedido = p.id_pedido
  JOIN
    produto pr ON ppc.id_produto = pr.id_produto
  WHERE
    ppc.id_cliente = ${clientId}
    AND ppc.id_pedido = ${id_pedido}
    AND ppc.id_produto = ${id_produto};
  `;

  const params = [clientId, id_pedido, id_produto];

  return queryPromiseReturn(sql, params);
}

function insert(dados) {
  const { id_produto, id_pedido, id_cliente } = dados;
  let sql = `INSERT INTO pedidoProdutoCliente (id_produto, id_pedido, id_cliente) VALUES (${id_produto}, ${id_pedido}, ${id_cliente}) RETURNING id`;
  return queryPromiseReturn(sql);
}

function update(dados) {
  const { id, id_produto, id_pedido, id_cliente } = dados;
  let sql = "UPDATE pedidoProdutoCliente SET";

  if (id_produto) {
    sql += ` id_produto = ${id_produto},`;
  }
  if (id_pedido) {
    sql += ` id_pedido = ${id_pedido},`;
  }
  if (id_cliente) {
    sql += ` id_cliente = ${id_cliente},`;
  }

  sql = sql.slice(0, -1);
  sql += ` WHERE id = ${id}`;
  return queryPromiseReturn(sql);
}

function deleteById(ids) {
  const idsDelete = ids.toString();
  return queryPromiseReturn(
    `DELETE FROM pedidoProdutoCliente WHERE id IN (${idsDelete})`
  );
}

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteById,
};
