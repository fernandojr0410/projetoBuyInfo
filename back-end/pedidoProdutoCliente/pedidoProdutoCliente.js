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

function findById(clientId, idpedido, idproduto) {
  const sql = `
  SELECT
    ppc.idpedido,
    ppc.idproduto,
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
    pedido p ON ppc.idpedido = p.idpedido
  JOIN
    produto pr ON ppc.idproduto = pr.id_produto
  WHERE
    ppc.id_cliente = ${clientId}
    AND ppc.idpedido = ${idpedido}
    AND ppc.idproduto = ${idproduto};
  `;

  const params = [clientId, idpedido, idproduto];

  return queryPromiseReturn(sql, params);
}

function insert(dados) {
  const { idproduto, idpedido, id_cliente } = dados;
  let sql = `INSERT INTO pedidoProdutoCliente (idproduto, idpedido, id_cliente) VALUES (${idproduto}, ${idpedido}, ${id_cliente}) RETURNING id`;
  return queryPromiseReturn(sql);
}

function update(dados) {
  const { id, idproduto, idpedido, id_cliente } = dados;
  let sql = "UPDATE pedidoProdutoCliente SET";

  if (idproduto) {
    sql += ` idproduto = ${idproduto},`;
  }
  if (idpedido) {
    sql += ` idpedido = ${idpedido},`;
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
