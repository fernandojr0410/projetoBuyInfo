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

// function update(dados) {
//   const { id, nome, sobrenome, cpf, telefone, email, senha } = dados;
//   console.log("ID:", id);
//   if (id === null || id === undefined) {
//     console.error(
//       "Id_Cliente está indefinido. Não é possível executar a atualização."
//     );
//     return Promise.reject("Id_Cliente está indefinido.");
//   }

//   const params = [];
//   let sql = "UPDATE cliente SET";

//   if (nome) {
//     sql += " nome = ?,";
//     params.push(nome);
//   }

//   if (sobrenome) {
//     sql += " sobrenome = ?,";
//     params.push(sobrenome);
//   }

//   if (cpf) {
//     sql += " cpf = ?,";
//     params.push(cpf);
//   }

//   if (telefone) {
//     sql += " telefone = ?,";
//     params.push(telefone);
//   }

//   if (email) {
//     sql += " email = ?,";
//     params.push(email);
//   }

//   if (senha) {
//     sql += " senha = ?,";
//     params.push(senha);
//   }

//   // Remova a vírgula extra se houver campos para atualizar
//   if (params.length > 0) {
//     sql = sql.slice(0, -1); // Remove a última vírgula
//   }

//   // Adicione a cláusula WHERE corretamente
//   sql += " WHERE Id_Cliente = ?";
//   params.push(id);

//   console.log("SQL:", sql);
//   console.log("Params:", params);

//   return queryPromise(sql, params);
// }
// function update(dados) {
//   const { id, nome, sobrenome, cpf, telefone, email, senha } = dados;
//   const params = [];
//   let sql = "UPDATE cliente SET";

//   if (nome) {
//     sql += " nome = ?,";
//     params.push(nome);
//   }

//   if (sobrenome) {
//     sql += " sobrenome = ?,";
//     params.push(sobrenome);
//   }

//   if (cpf) {
//     sql += " cpf = ?,";
//     params.push(cpf);
//   }

//   if (telefone) {
//     sql += " telefone = ?,";
//     params.push(telefone);
//   }

//   if (email) {
//     sql += " email = ?,";
//     params.push(email);
//   }

//   if (senha) {
//     sql += " senha = ?,";
//     params.push(senha);
//   }

//   params.push(id);

//   sql = sql.slice(0, -1);

//   sql += ` WHERE Id_Cliente = ?`;
//   console.log("mySQL", sql /*queryPromise(sql, params)*/);
//   return queryPromise(sql, params);
// }

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
