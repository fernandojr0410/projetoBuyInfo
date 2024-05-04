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
  returnQueryPromise("SELECT * FROM pedidoProdutoCliente");
}

function findById(id) {
  returnQueryPromise(`SELECT * FROM pedidoProdutoCliente WHERE id = ${id}`);
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
    sql += ` id_cliente = ${id_cliente}`;
  }

  sql = sql.slice(0, -1);
  sql += ` WHERE id = ${id}`;
  returnQueryPromise(sql);
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
