const express = require("express");
// const path = require("path");

const conn = require("./db/mysql.js");
const produtos = require("./produtos/produtos.js");
const categorias = require("./categorias/categorias.js");

const app = express();
app.use(express.json());

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

app.get("/categorias/findAll", (req, res) => {
  categorias
    .findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/categorias/findById", (req, res) => {
  categorias
    .findById(req.query.id)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.put("/categorias/update", (req, res) => {
  categorias
    .update(req.body)
    .then(() => {
      res.send("Categoria atualizado com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.listen(5000, () => {
  console.log("Servidor Iniciado");
});
