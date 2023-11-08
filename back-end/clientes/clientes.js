const conn = require("../db/mysql.js");
const util = require("util");
const queryPromise = util.promisify(conn().query).bind(conn());

function findAll() {
  return queryPromise("SELECT * FROM Cliente");
}

function findById(id) {
  console.log("ID Cliente:", id);
  return queryPromise(`SELECT * FROM Cliente WHERE id_cliente = ${id}`);
}

function findByEmailSenha(email, senha) {
  return queryPromise(
    `SELECT * FROM Cliente WHERE email = '${email}' AND senha = '${senha}'`
  );
}

function updateClienteEndereco(Id_Cliente, idEndereco) {
  console.log("update cliente:", Id_Cliente);
  console.log("update endereço:", idEndereco);
  const sql = `UPDATE cliente SET idEndereco = ${idEndereco} WHERE id_cliente = ${Id_Cliente}`;
  return queryPromise(sql);
}

function findByIdClienteEndereco(Id_Cliente, idEndereco) {
  console.log("idCliente e Endereco", Id_Cliente, idEndereco);
  const sql = `SELECT clientes.Id_Cliente, clientes.nome, clientes.sobrenome, clientes.cpf, clientes.telefone, clientes.email, 
  enderecos.cep, enderecos.cidade, enderecos.estado, enderecos.bairro, enderecos.rua, enderecos.numero, enderecos.complemento
  FROM clientes
  JOIN enderecos ON clientes.Id_Cliente = enderecos.id_cliente
  WHERE clientes.Id_Cliente = ${Id_Cliente} AND enderecos.idEndereco = ${idEndereco}`;
  return queryPromise(sql);
}

function insert(dados) {
  const { nome, sobrenome, cpf, email, senha, idEndereco } = dados;
  let sql = `INSERT INTO cliente (nome, sobrenome, cpf, email, senha, idEndereco) values ('${nome}', '${sobrenome}', '${cpf}', '${email}', '${senha}, ${idEndereco}')`;
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
  findByIdClienteEndereco,
  updateClienteEndereco,
  insert,
  update,
  deleteById,
};
