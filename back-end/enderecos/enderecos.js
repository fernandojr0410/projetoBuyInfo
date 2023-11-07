const conn = require("../db/mysql.js");
const util = require("util");
const queryPromise = util.promisify(conn().query).bind(conn());

function findAll() {
  return queryPromise("SELECT * FROM endereco");
}

function findById(idEndereco) {
  console.log("ID endereco:", idEndereco);
  return queryPromise(
    `SELECT * FROM endereco WHERE idEndereco = ${idEndereco}`
  );
}

function insert(dados) {
  const { cep, cidade, estado, bairro, rua, numero, complemento } = dados;
  let sql = `INSERT INTO endereco (cep, cidade, estado, bairro, rua, numero, complemento) values ('${cep}', '${cidade}', '${estado}', '${bairro}', '${rua}', ${numero}, '${complemento}')`;
  return queryPromise(sql);
}

function update(dados) {
  const { idEndereco, cep, cidade, estado, bairro, rua, numero, complemento } =
    dados;
  const params = [];
  let sql = "UPDATE Cliente SET";

  if (cep) {
    sql += " cep = ?,";
    params.push(cep);
  }

  if (cidade) {
    sql += " cidade = ?,";
    params.push(cidade);
  }

  if (estado) {
    sql += " estado = ?,";
    params.push(estado);
  }

  if (bairro) {
    sql += " bairro = ?,";
    params.push(bairro);
  }

  if (rua) {
    sql += " rua = ?,";
    params.push(rua);
  }

  if (numero) {
    sql += " numero = ?,";
    params.push(numero);
  }
  if (complemento) {
    sql += " complemento = ?,";
    params.push(complemento);
  }

  params.push(idEndereco);

  sql = sql.slice(0, -1);

  sql += " WHERE idEndereco = ?";
  return queryPromise(sql, params);
}

function deleteById(ids) {
  const idsDelete = ids.toString();
  return queryPromise(
    `DELETE FROM endereco WHERE idEndereco IN (${idsDelete})`
  );
}

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteById,
};
