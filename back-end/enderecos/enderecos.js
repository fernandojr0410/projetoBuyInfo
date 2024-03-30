const conn = require("../db/postgres.js");
const util = require("util");
const queryPromise = util.promisify(conn().query).bind(conn());

function findAll() {
  return queryPromise("SELECT * FROM endereco");
}

function findById(idEndereco) {
  console.log("id do endereco", idEndereco);
  return queryPromise(
    `SELECT * FROM endereco WHERE idEndereco = ${idEndereco}`
  );
}

function updateClienteEndereco(idEndereco, id_cliente) {
  console.log("update endereço:", idEndereco);
  console.log("update cliente:", id_cliente);
  const sql = `UPDATE endereco SET idEndereco = ${idEndereco} WHERE id_cliente = ${id_cliente}`;
  return queryPromise(sql);
}

function findByIdEndereco(id_cliente) {
  const sql = `SELECT
  endereco.idEndereco,
  endereco.cep,
  endereco.cidade,
  endereco.estado,
  endereco.bairro,
  endereco.rua,
  endereco.numero,
  endereco.complemento
FROM
  cliente
JOIN
  endereco ON cliente.id_cliente = endereco.id_cliente
WHERE
  cliente.id_cliente = ${id_cliente}`;
  return queryPromise(sql);
}

function findByIdClienteEndereco(id_cliente) {
  const sql = `SELECT
  cliente.id_cliente,
  cliente.nome,
  cliente.sobrenome,
  cliente.cpf,
  cliente.telefone,
  cliente.email,
  endereco.id_endereco,
  endereco.cep,
  endereco.cidade,
  endereco.estado,
  endereco.bairro,
  endereco.rua,
  endereco.numero,
  endereco.complemento
FROM
  cliente
LEFT JOIN
  endereco ON cliente.id_cliente = endereco.id_cliente
WHERE
  cliente.id_cliente = ${id_cliente}`;
  return queryPromise(sql);
}

function insert(dados) {
  const { cep, cidade, estado, bairro, rua, numero, complemento, id_cliente } =
    dados;
  let sql = `INSERT INTO endereco (cep, cidade, estado, bairro, rua, numero, complemento, id_cliente) values ('${cep}', '${cidade}', '${estado}', '${bairro}', '${rua}', ${numero}, '${complemento}', ${id_cliente})`;
  return queryPromise(sql);
}

function update(dados) {
  const {
    idEndereco,
    cep,
    cidade,
    estado,
    bairro,
    rua,
    numero,
    complemento,
    id_cliente,
  } = dados;
  const params = [];
  let sql = "UPDATE endereco SET";

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

  if (id_cliente) {
    sql += " id_cliente = ?,";
    params.push(id_cliente);
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
  updateClienteEndereco,
  findByIdEndereco,
  findByIdClienteEndereco,
  insert,
  update,
  deleteById,
};
