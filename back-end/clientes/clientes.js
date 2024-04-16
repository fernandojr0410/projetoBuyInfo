const conn = require("../db/postgres.js");
const util = require("util");
const queryPromise = util.promisify(conn().query).bind(conn());

function queryPromiseReturn(sql) {
  return new Promise((resolve, reject) => {
    conn().query(sql, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

function findAll() {
  return queryPromise("SELECT * FROM cliente");
}

function findById(id) {
  console.log("ID cliente:", id);
  return queryPromise(`SELECT * FROM cliente WHERE id_cliente = ${id}`);
}

function findByEmail(email) {
  return queryPromise(
    `SELECT * FROM cliente WHERE email = '${email}'`
  )
}

function findByEmailSenha(email, senha) {
  return queryPromise(
    `SELECT * FROM cliente WHERE email = '${email}' AND senha = '${senha}'`
  );
}

function insert(dados) {
  const { nome, sobrenome, cpf, telefone, email, senha } = dados;
  let sql = `INSERT INTO cliente (nome, sobrenome, cpf, telefone, email, senha) values ('${nome}', '${sobrenome}', '${cpf}', '${telefone}', '${email}', '${senha}') RETURNING id_cliente`;
  return queryPromiseReturn(sql)
    .then((result) => {
      console.log("result", JSON.stringify(result))
      console.log("Registro inserido com sucesso. ID:", result.rows[0].id_cliente);
      return result.rows[0].id_cliente;
    })
    .catch((error) => {
      console.error("Erro ao inserir registro:", error);
      throw error;
    });
}

function update(id_cliente, dados) {
  const {
    nome,
    sobrenome,
    cpf,
    telefone,
    email,
    senha,
  } = dados;

  let sql = "UPDATE cliente SET";

  if (nome) {
    sql += ` nome = '${nome}',`;X
  }

  if (sobrenome) {
    sql += ` sobrenome = '${sobrenome}',`;
  }

  if (cpf) {
    sql += ` cpf = '${cpf}',`;
  }

  if (telefone) {
    sql += ` telefone = '${telefone}',`;
  }

  if (email) {
    sql += ` email = '${email}',`;
  }

  if (senha) {
    sql += ` senha = '${senha}',`;
  }

  sql = sql.slice(0, -1);

  sql += ` WHERE id_cliente = ${id_cliente}`;

  return queryPromiseReturn(sql);
}

function deleteById(ids) {
  const idsDelete = ids.toString();
  return queryPromise(`DELETE FROM cliente WHERE id_cliente IN (${idsDelete})`);
}

module.exports = {
  findAll,
  findById,
  findByEmail,
  findByEmailSenha,
  insert,
  update,
  deleteById,
};
