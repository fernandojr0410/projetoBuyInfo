const conn = require("../db/postgres.js");
const util = require("util");
const queryPromise = util.promisify(conn().query).bind(conn());

function findAll() {
  return queryPromise("SELECT * FROM endereco");
}

function findById(id_endereco) {
  console.log("id do endereco", id_endereco);
  return queryPromise(
    `SELECT * FROM endereco WHERE id_endereco = ${id_endereco}`
  );
}

function updateClienteEndereco(id_endereco, id_cliente) {
  console.log("update endereço:", id_endereco);
  console.log("update cliente:", id_cliente);
  const sql = `UPDATE endereco SET id_endereco = ${id_endereco} WHERE id_cliente = ${id_cliente}`;
  return queryPromise(sql);
}

function findByIdEndereco(id_cliente) {
  const sql = `SELECT
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
    cliente.id_cliente = ${id_cliente};`;
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
    id_endereco,
    cep,
    cidade,
    estado,
    bairro,
    rua,
    numero,
    complemento,
    id_cliente,
  } = dados;

  let sql = "UPDATE endereco SET";

  if (cep) {
    sql += ` cep = '${cep}',`;
  }

  if (cidade) {
    sql += ` cidade = '${cidade}',`;
  }

  if (estado) {
    sql += ` estado = '${estado}',`;
  }

  if (bairro) {
    sql += ` bairro = '${bairro}',`;
  }

  if (rua) {
    sql += ` rua = '${rua}',`;
  }

  if (numero) {
    sql += ` numero = ${numero},`;
  }

  if (complemento) {
    sql += ` complemento = '${complemento}',`;
  }

  if (id_cliente) {
    sql += ` id_cliente = ${id_cliente},`;
  }

  sql = sql.slice(0, -1);

  sql += ` WHERE id_endereco = ${id_endereco}`;

  return queryPromise(sql);
}

function deleteById(ids) {
  const idsDelete = ids.toString();
  return queryPromise(
    `DELETE FROM endereco WHERE id_endereco IN (${idsDelete})`
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
