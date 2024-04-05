const conn = require("../db/postgres.js");
const util = require("util");
const queryPromise = util.promisify(conn().query).bind(conn());

function findAll() {
  return queryPromise("SELECT * FROM Marca");
}

function findById(id) {
  return queryPromise(`SELECT * FROM Marca WHERE Id_Marca = ${id}`);
}

function insert(dados) {
  const { nome, ativo } = dados;
  let sql = `INSERT INTO Marca (Nome, ativo) values ('${nome}', ${ativo})`;
  return queryPromise(sql);
}

function update(dados) {
  const { id, nome, ativo } = dados;
  const params = [];
  let sql = "UPDATE Marca SET";

  if (nome) {
    sql += " nome = ?,";
    params.push(nome);
  }

  if (ativo) {
    sql += " ativo = ?,";
    params.push(telefone);
  }

  params.push(id);

  sql = sql.slice(0, -1);

  sql += " WHERE Id_Marca = ?";
  return queryPromise(sql, params);
}

function deleteById(ids) {
  const idsDelete = ids.toString();
  return queryPromise(`DELETE FROM Marca WHERE Id_Marca IN (${idsDelete})`);
}

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteById,
};
