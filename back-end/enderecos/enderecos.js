const conn = require("../db/mysql.js");
const util = require("util");
const queryPromise = util.promisify(conn().query).bind(conn());

function findAll() {
  return queryPromise("SELECT * FROM endereco");
}

function findById(idEndereco) {
  return queryPromise(
    `SELECT * FROM endereco WHERE idEndereco = ${idEndereco}`
  );
}

function updateClienteEndereco(idEndereco, Id_Cliente) {
  console.log("update endereço:", idEndereco);
  console.log("update cliente:", Id_Cliente);
  const sql = `UPDATE endereco SET idEndereco = ${idEndereco} WHERE id_cliente = ${Id_Cliente}`;
  return queryPromise(sql);
}

// function findByIdClienteEndereco(Id_Cliente) {
//   console.log("id cliente:", Id_Cliente);
//   return queryPromise(`
//     SELECT *
//     FROM cliente
//     JOIN endereco ON cliente.Id_Cliente = endereco.Id_Cliente
//     WHERE cliente.Id_Cliente = ${Id_Cliente};
//   `);
// }

function findByIdClienteEndereco(Id_Cliente) {
  const sql = `SELECT cliente.Id_Cliente, cliente.nome, cliente.sobrenome, cliente.cpf, cliente.telefone, cliente.email, endereco.idEndereco,
  endereco.cep, endereco.cidade, endereco.estado, endereco.bairro, endereco.rua, endereco.numero, endereco.complemento
  FROM cliente
  JOIN endereco ON cliente.Id_Cliente = endereco.id_cliente
  WHERE cliente.Id_Cliente = ${Id_Cliente}`;
  return queryPromise(sql);
}

function insert(dados) {
  const { cep, cidade, estado, bairro, rua, numero, complemento, Id_Cliente } =
    dados;
  let sql = `INSERT INTO endereco (cep, cidade, estado, bairro, rua, numero, complemento, Id_Cliente) values ('${cep}', '${cidade}', '${estado}', '${bairro}', '${rua}', ${numero}, '${complemento}', ${Id_Cliente})`;
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
    Id_Cliente,
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

  if (Id_Cliente) {
    sql += " Id_Cliente = ?,";
    params.push(Id_Cliente);
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
  findByIdClienteEndereco,
  insert,
  update,
  deleteById,
};
