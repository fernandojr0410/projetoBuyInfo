const express = require("express");
const bodyParser = require("body-parser");
// require("dotenv").config();
// const jwt = require("jsonwebtoken");

const cors = require("cors"); // cors

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
app.use(cors());

const PORT = 5000;
const HOST = "http://localhost";

// function verificarToken(req, res, next) {
//   const token = req.headers["x-access-token"];

//   if (!token) {
//     return res
//       .status(401)
//       .json({ auth: false, mensagem: "Token não fornecido." });
//   }

//   jwt.verify(token, process.env.SECRET, function (err, decoded) {
//     if (err) {
//       console.error("Erro na verificação do token:", err);
//       return res
//         .status(500)
//         .json({ auth: false, mensagem: "Falha ao autenticar token." });
//     }

//     console.log("Token verificado com sucesso:", decoded);

//     req.userID = decoded.id;
//     next();
//   });
// }

// app.post("/login", (req, res, next) => {
//   if (req.body.user === "fernando" && req.body.pwd === "300") {
//     const id = 1;
//     const token = jwt.sign({ id }, process.env.SECRET, {
//       expiresIn: 1200,
//     });
//     return res.json({ auth: true, token: token });
//   }
//   res.status(500).json({ mensagem: "Login Inválido!" });
// });

app.get("/produtos/destaques", (req, res) => {
  produtos
    .findAllDestaques()
    .then((results) => {
      res.send(
        results.map((produto) => {
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

app.get("/produtos/categoria", (req, res) => {
  produtos
    .findByCategory(req.query.id)
    .then((results) => {
      res.send(
        results.map((produto) => {
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

// Produtos
app.get("/produtos/findAll", (req, res) => {
  produtos
    .findAll()
    .then((results) => {
      res.send(
        results.map((produto) => {
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

app.get("/produtos/findById", (req, res) => {
  produtos
    .findById(req.query.id)
    .then((results) => {
      res.send(
        results.map((produto) => {
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

app.post("/produtos/insert", (req, res) => {
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

app.put("/produtos/update", (req, res) => {
  const dadosAtualizados = req.body;

  produtos
    .update(dadosAtualizados)
    .then(() => {
      res.send("Dados atualizados com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.delete("/produtos/delete", (req, res) => {
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

app.post("/categorias/insert", (req, res) => {
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

app.put("/categorias/update", (req, res) => {
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

app.delete("/categorias/delete", (req, res) => {
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
app.get("/clientes/findAll", (req, res) => {
  clientes
    .findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/clientes/findById", (req, res) => {
  clientes
    .findById(req.query.id)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.post("/clientes/insert", (req, res) => {
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

app.put("/clientes/update", (req, res) => {
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

app.delete("/clientes/delete", (req, res) => {
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
app.get("/marcas/findAll", (req, res) => {
  marcas
    .findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/marcas/findById", (req, res) => {
  marcas
    .findById(req.query.id)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.post("/marcas/insert", (req, res) => {
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

app.put("/marcas/update", (req, res) => {
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

app.delete("/marcas/delete", (req, res) => {
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
