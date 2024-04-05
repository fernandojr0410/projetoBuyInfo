const conn = require("../db/postgres.js");
const util = require("util");
const queryPromise = util.promisify(conn().query).bind(conn());

function findAll() {
  return queryPromise("SELECT * FROM Destaque");
}

function findById(id) {
  return queryPromise(`SELECT * FROM Destaque WHERE Id_Destaque = ${id}`);
}

function insert(dados) {
  const { nome } = dados;
  let sql = `INSERT INTO Destaque (Nome) values ('${nome}')`;
  return queryPromise(sql);
}

function update(dados) {
  const { id, nome } = dados;
  const params = [];
  let sql = "UPDATE Marca SET";

  if (nome) {
    sql += " nome = ?,";
    params.push(nome);
  }

  params.push(id);

  sql = sql.slice(0, -1);

  sql += " WHERE Id_Destaque = ?";
  return queryPromise(sql, params);
}

function deleteById(ids) {
  const idsDelete = ids.toString();
  return queryPromise(`DELETE FROM Destaque WHERE Id_Destaque IN (${idsDelete})`);
}

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteById,
};
