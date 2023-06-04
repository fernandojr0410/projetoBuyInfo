const conn = require("../db/mysql.js");
const util = require("util");
const queryPromise = util.promisify(conn().query).bind(conn());

function findAll() {
  return queryPromise("SELECT * FROM Cliente");
}

function findById(id) {
  return queryPromise(`SELECT * FROM Cliente WHERE Id_Cliente = ${id}`);
}

function insert(dados) {
  const { nome, CPF, endereco, telefone } = dados;
  let sql = `INSERT INTO Cliente (Nome, CPF, endereco, telefone) values ('${nome}', '${CPF}', '${endereco}', '${telefone}')`;
  return queryPromise(sql);
}

function update(dados) {
  const { id, nome, CPF, endereco, telefone } = dados;
  const params = [];
  let sql = "UPDATE Cliente SET";

  if (nome) {
    sql += " nome = ?,";
    params.push(nome);
  }

  if (CPF) {
    sql += " CPF = ?,";
    params.push(CPF);
  }

  if (endereco) {
    sql += " endereco = ?,";
    params.push(endereco);
  }

  if (telefone) {
    sql += " telefone = ?,";
    params.push(telefone);
  }

  params.push(id);

  sql = sql.slice(0, -1);

  sql += " WHERE Id_Cliente = ?";
  return queryPromise(sql, params);
}

function deleteById(ids) {
  const idsDelete = ids.toString();
  return queryPromise(`DELETE FROM Cliente WHERE Id_Cliente IN (${idsDelete})`);
}

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteById,
};
