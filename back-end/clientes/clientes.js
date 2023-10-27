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
  const { nomeCompleto, cpf, senha } = dados;
  let sql = `INSERT INTO Cliente (nomeCompleto, cpf, senha) values ('${nomeCompleto}', '${cpf}', '${senha}')`;
  return queryPromise(sql);
}

function update(dados) {
  const { id, nomeCompleto, cpf, senha } = dados;
  const params = [];
  let sql = "UPDATE Cliente SET";

  if (nomeCompleto) {
    sql += " nomeCompleto = ?,";
    params.push(nomeCompleto);
  }

  if (cpf) {
    sql += " cpf = ?,";
    params.push(cpf);
  }

  if (endereco) {
    sql += " endereco = ?,";
    params.push(endereco);
  }

  if (senha) {
    sql += " senha = ?,";
    params.push(senha);
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
