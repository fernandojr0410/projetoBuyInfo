const express = require("express");
// const path = require("path");

const conn = require("./db/mysql.js");
const produtos = require("./produtos/produtos.js");

const app = express();
app.use(express.json());

app.listen(5000, () => {
  console.log("Servidor Iniciado");
});

app.use(express.static("public"));

app.get("/produtos/findAll", (req, res) => {
  produtos
    .findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/produtos/findById", (req, res) => {
  produtos
    .findById(req.query.id)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/categorias", (req, res) => {
  conn().query("SELECT * FROM Categoria", (error, result) => {
    res.send(result);
  });
});
