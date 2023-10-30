const conn = require("../db/mysql.js");
const util = require("util");
const queryPromise = util.promisify(conn().query).bind(conn());

function findAll() {
  return queryPromise("SELECT * FROM Cliente");
}

function findById(id) {
  return queryPromise(`SELECT * FROM Cliente WHERE Id_Cliente = ${id}`);
}

function findByEmailSenha(email, senha) {
  return queryPromise(
    `SELECT * FROM Cliente WHERE email = '${email}' AND senha = '${senha}'`
  );
}

function insert(dados) {
  const { nome, sobrenome, cpf, email, senha } = dados;
  let sql = `INSERT INTO Cliente (nome, sobrenome, cpf, email, senha) values ('${nome}', '${sobrenome}', '${cpf}', '${email}', '${senha}')`;
  return queryPromise(sql);
}

function update(dados) {
  const { id, nome, sobrenome, cpf, email, senha } = dados;
  const params = [];
  let sql = "UPDATE Cliente SET";

  if (nome) {
    sql += " nome = ?,";
    params.push(nome);
  }

  if (sobrenome) {
    sql += " sobrenome = ?,";
    params.push(sobrenome);
  }

  if (cpf) {
    sql += " cpf = ?,";
    params.push(cpf);
  }

  if (email) {
    sql += " email = ?,";
    params.push(email);
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
  findByEmailSenha,
  insert,
  update,
  deleteById,
};
