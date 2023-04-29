import express from "express";
import mysql from "mysql";

const app = express();
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "buy_info",
});

app.use(express.json());

app.listen(5000, () => {
  console.log("Servidor Iniciado");
});

app.get("/produtos", (req, res) => {
  conn.query("SELECT * FROM Produto", (error, result) => {
    res.send(result);
    console.log(error);
  });
  // res.json({
  //   id: 1,
  //   nome: "Produto Teste",
  //   marca: "Apple",
  // });
});
