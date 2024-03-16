const conn = require("../db/mysql.js");
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

function insert(dados) {
  const { nome, sobrenome, cpf, telefone, email, senha } = dados;
  let sql = `INSERT INTO cliente (nome, sobrenome, cpf, telefone, email, senha) values ('${nome}', '${sobrenome}', '${cpf}', '${telefone}', '${email}', '${senha}')`;
  return queryPromiseReturn(sql)
    .then((result) => {
      console.log("Registro inserido com sucesso. ID:", result.insertId);
      return result.insertId;
    })
    .catch((error) => {
      console.error("Erro ao inserir registro:", error);
      throw error;
    });
}

function update(Id_Cliente, dados) {
  const {
    Nome,
    Sobrenome,
    CPF,
    Telefone,
    Email,
    Senha,
  } = dados;
  const params = [];
let sql = "UPDATE Cliente SET";

if (Nome) {
  sql += " Nome = ?,";
  params.push(Nome)
}

if (Sobrenome) {
  sql += " Sobrenome = ?,";
  params.push(Sobrenome)
}

if (CPF) {
  sql += " CPF = ?,";
  params.push(CPF)
}

if (Telefone) {
  sql += " Telefone = ?,"
  params.push(Telefone)
}

if (Email) {
  sql += " Email = ?,"
  params.push(Email)
}

if (Senha) {
  sql += " Senha = ?,"
  params.push(Senha)
}
if (Id_Cliente) {
  sql += " Id_Cliente = ?,";
  params.push(Id_Cliente);
}

sql = sql.slice(0, -1);

sql += " WHERE Id_Cliente = ?";
params.push(Id_Cliente);

console.log("camposCliete", Id_Cliente)

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
  // findByIdClienteEndereco,
  insert,
  update,
  deleteById,
};
