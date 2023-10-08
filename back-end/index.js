const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const conn = require("./db/mysql.js");
const produtos = require("./produtos/produtos.js");
const categorias = require("./categorias/categorias.js");
const clientes = require("./clientes/clientes.js");
const marcas = require("./marcas/marcas.js");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

const PORT = 5000;
const HOST = "http://localhost";

function verificarToken(req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res
      .status(401)
      .json({ auth: false, mensagem: "Token não fornecido." });
  }

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      console.error("Erro na verificação do token:", err);
      return res
        .status(500)
        .json({ auth: false, mensagem: "Falha ao autenticar token." });
    }

    console.log("Token verificado com sucesso:", decoded);

    req.userID = decoded.id;
    next();
  });
}

app.post("/login", (req, res, next) => {
  if (req.body.user === "fernando" && req.body.pwd === "300") {
    const id = 1;
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 1200,
    });
    return res.json({ auth: true, token: token });
  }
  res.status(500).json({ mensagem: "Login Inválido!" });
});

// Produtos
app.get("/produtos/findAll", verificarToken, (req, res) => {
  produtos
    .findAll()
    .then((results) => {
      res.send(
        results.map((produto) => {
          const produtosFixos = [{ id: 1, nome: "fernando" }];
          res.send([...results, ...produtosFixos]);
          return {
            ...produto,
            imagens:
              produto.imagens &&
              produto.imagens
                .split(",")
                .map((img) => `${HOST}:${PORT}/imagens/produtos/${img}`),
          };
        })
      );
    })
    .catch((error) => {
      console.error("teste", error);
    });
});

app.get("/produtos/findById", verificarToken, (req, res) => {
  produtos
    .findById(req.query.id)
    .then((results) => {
      res.send(
        results.map((produto) => {
          const produtosFixos = [{ id: 1, nome: "fernando" }];
          res.send([...results, ...produtosFixos]);
          return {
            ...produto,
            imagens:
              produto.imagens &&
              produto.imagens
                .split(",")
                .map((img) => `${HOST}:${PORT}/imagens/produtos/${img}`),
          };
        })
      );
    })
    .catch((error) => {
      console.error(error);
    });
});

app.post("/produtos/insert", verificarToken, (req, res) => {
  produtos
    .insert(req.body)
    .then(() => {
      res.send("Produto cadastrado com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.put("/produtos/update", verificarToken, (req, res) => {
  produtos
    .update(req.body)
    .then(() => {
      res.send("Produto atualizado com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.delete("/produtos/delete", verificarToken, (req, res) => {
  produtos
    .deleteById(req.body)
    .then(() => {
      res.send("Produto deletado com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

// Categorias
app.get("/categorias/findAll", verificarToken, (req, res) => {
  categorias
    .findAll()
    .then((results) => {
      const categoriasFixos = [{ id: 1, nome: "fernando" }];
      res.send([...results, ...categoriasFixos]);
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/categorias/findById", verificarToken, (req, res) => {
  categorias
    .findById(req.query.id)
    .then((results) => {
      const categoriasFixos = [{ id: 1, nome: "fernando" }];
      res.send([...results, ...categoriasFixos]);
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.post("/categorias/insert", verificarToken, (req, res) => {
  categorias
    .insert(req.body)
    .then(() => {
      res.send("Categoria cadastrada com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.put("/categorias/update", verificarToken, (req, res) => {
  categorias
    .update(req.body)
    .then(() => {
      res.send("Categoria atualizada com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.delete("/categorias/delete", verificarToken, (req, res) => {
  categorias
    .deleteById(req.body)
    .then(() => {
      res.send("Categoria deletada com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

// Cliente
app.get("/clientes/findAll", verificarToken, (req, res) => {
  clientes
    .findAll()
    .then((results) => {
      const clientesFixos = [{ id: 1, nome: "fernando" }];
      res.send([...results, ...clientesFixos]);
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/clientes/findById", verificarToken, (req, res) => {
  clientes
    .findById(req.query.id)
    .then((results) => {
      const clientesFixos = [{ id: 1, nome: "fernando" }];
      res.send([...results, ...clientesFixos]);
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.post("/clientes/insert", verificarToken, (req, res) => {
  clientes
    .insert(req.body)
    .then(() => {
      res.send("Você foi cadastrado com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.put("/clientes/update", verificarToken, (req, res) => {
  clientes
    .update(req.body)
    .then(() => {
      res.send("Dados atualizados com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.delete("/clientes/delete", verificarToken, (req, res) => {
  clientes
    .deleteById(req.body)
    .then(() => {
      res.send("Informação deletada com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

// Marca
app.get("/marcas/findAll", verificarToken, (req, res) => {
  marcas
    .findAll()
    .then((results) => {
      const marcasFixo = [{ id: 1, nome: "fernando" }];
      res.send([...results, ...marcasFixo]);
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/marcas/findById", verificarToken, (req, res) => {
  marcas
    .findById(req.query.id)
    .then((results) => {
      const marcasFixo = [{ id: 1, nome: "fernando" }];
      res.send([...results, ...marcasFixo]);
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.post("/marcas/insert", verificarToken, (req, res) => {
  marcas
    .insert(req.body)
    .then(() => {
      res.send("Você foi cadastrado com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.put("/marcas/update", verificarToken, (req, res) => {
  marcas
    .update(req.body)
    .then(() => {
      res.send("Dados atualizados com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.delete("/marcas/delete", verificarToken, (req, res) => {
  marcas
    .deleteById(req.body)
    .then(() => {
      res.send("Informação deletada com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.listen(PORT, () => {
  console.log("Servidor Iniciado");
});
