const conn = require("../db/mysql.js");
const util = require("util");
const queryPromise = util.promisify(conn().query).bind(conn());

function findAll() {
  return queryPromise("SELECT * FROM Categoria");
}

function findById(id) {
  return queryPromise(`SELECT * FROM Categoria WHERE Id_Categoria = ${id}`);
}

function update(dados) {
  const { id, nome, ativo, imagem } = dados;
  console.log(ativo);
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
  console.log(sql, params);
  return queryPromise(sql, params);
}

module.exports = {
  findAll,
  findById,
  update,
};
