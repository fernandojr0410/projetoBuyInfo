const conn = require("../db/mysql.js");
const util = require("util");
const queryPromise = util.promisify(conn().query).bind(conn());

function findAll() {
  return queryPromise("SELECT * FROM Produto");
}

function findById(id) {
  return queryPromise(`SELECT * FROM Produto WHERE Id_Produto = ${id}`);
}

module.exports = {
  findAll,
  findById,
};
