const mysql = require("mysql");

function connection() {
  const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "buy_info",
  });
  return conn;
}

module.exports = connection;
