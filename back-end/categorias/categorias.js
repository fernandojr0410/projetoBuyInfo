const conn = require("../db/mysql.js");
const util = require("util");
const queryPromise = util.promisify(conn().query).bind(conn());

function findAll() {
  return queryPromise("SELECT * FROM Categoria");
}

function findById(id) {
  return queryPromise(`SELECT * FROM Categoria WHERE Id_Categoria = ${id}`);
}

function insert(dados) {
  const { nome, ativo, imagem } = dados;
  let sql = `INSERT INTO Categoria (Nome, Ativo, Imagem) values ('${nome}', ${ativo}, '${imagem}')`;
  return queryPromise(sql);
}

function update(dados) {
  const { id, nome, ativo, imagem } = dados;
  const params = [];
  let sql = "UPDATE Categoria SET";

  if (nome) {
    sql += " nome = ?,";
    params.push(nome);
  }

  if (ativo) {
    sql += " ativo = ?,";
    params.push(ativo);
  }

  if (imagem) {
    sql += " Imagem = ?,";
    params.push(imagem);
  }

  params.push(id);

  sql = sql.slice(0, -1);

  sql += " WHERE Id_Categoria = ?";
  return queryPromise(sql, params);
}

function deleteById(ids) {
  const idsDelete = ids.toString();
  return queryPromise(
    `DELETE FROM Categoria WHERE Id_Categoria IN (${idsDelete})`
  );
}

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteById,
};
