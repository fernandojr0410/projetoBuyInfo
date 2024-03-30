const conn = require("../db/postgres.js");
const util = require("util");
const queryPromise = util.promisify(conn().query).bind(conn());

function findAll() {
  return queryPromise("SELECT * FROM categoria")
}

function findById(id) {
  return queryPromise(`SELECT * FROM categoria WHERE id_categoria = ${id}`);
}

function insert(dados) {
  const { nome, ativo, imagem } = dados;
  let sql = `INSERT INTO categoria (nome, ativo, imagem) values ('${nome}', ${ativo}, '${imagem}')`;
  return queryPromise(sql);
}

function update(dados) {
  const { id, nome, ativo, imagem } = dados;
  const params = [];
  let sql = "UPDATE categoria SET";

  if (nome) {
    sql += " nome = ?,";
    params.push(nome);
  }

  if (ativo) {
    sql += " ativo = ?,";
    params.push(ativo);
  }

  if (imagem) {
    sql += " imagem = ?,";
    params.push(imagem);
  }

  params.push(id);

  sql = sql.slice(0, -1);

  sql += " WHERE id_categoria = ?";
  return queryPromise(sql, params);
}

function deleteById(ids) {
  const idsDelete = ids.toString();
  return queryPromise(
    `DELETE FROM categoria WHERE id_categoria IN (${idsDelete})`
  );
}

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteById,
};
