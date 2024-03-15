const express = require("express");
const bodyParser = require("body-parser");
// require("dotenv").config();
// const jwt = require("jsonwebtoken");

const cors = require("cors"); // cors

const conn = require("./db/mysql.js");
const produtos = require("./produtos/produtos.js");
const categorias = require("./categorias/categorias.js");
const clientes = require("./clientes/clientes.js");
const enderecos = require("./enderecos/enderecos.js");
const marcas = require("./marcas/marcas.js");
const destaques = require("./destaques/destaques.js");

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
                .map((img) => `${HOST}:${PORT}/imagens/produtos/${img}`).sort(),
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
                .map((img) => `${HOST}:${PORT}/imagens/produtos/${img}`).sort(),
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
                .map((img) => `${HOST}:${PORT}/imagens/produtos/${img}`).sort(),
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
                .map((img) => `${HOST}:${PORT}/imagens/produtos/${img}`).sort(),
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

// Destaques
app.get("/destaques/findAll", (req, res) => {
  destaques
    .findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/destaques/findById", (req, res) => {
  destaques
    .findById(req.query.id)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.post("/destaques/insert", (req, res) => {
  destaques
    .insert(req.body)
    .then(() => {
      res.send("Categoria cadastrada com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.put("/destaques/update", (req, res) => {
  destaques
    .update(req.body)
    .then(() => {
      res.send("Categoria atualizada com sucesso!");
    })
    .catch((error) => {
      console.error(error);
      res.send(error);
    });
});

app.delete("/destaques/delete", (req, res) => {
  destaques
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
  const id = req.query.id;
  console.log("ID recebido no back-end:", id);
  clientes
    .findById(id)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/clientes/findByEmailSenha", (req, res) => {
  clientes
    .findByEmailSenha(req.query.email, req.query.senha)
    .then((results) => {
      res.setHeader("Cache-Control", "no-store");
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.post("/clientes/insert", (req, res) => {
  clientes
    .insert(req.body)
    .then((insertId) => {
      res.status(200).json({
        message: "Cliente cadastrado com sucesso",
        clientId: insertId
      });
    })
    .catch((error) => console.error(error));
});

// app.put("/clientes/update", async (req, res) => {
//   try {
//     console.log("Dados da solicitação:", req.body);

//     const { Id_Cliente, ...dadosAtualizados } = req.body;

//     console.log("Id_Cliente recebido:", Id_Cliente);

//     if (!Id_Cliente) {
//       console.error(
//         "Id_Cliente está indefinido. Não é possível executar a atualização."
//       );
//       return res.status(400).json({
//         message:
//           "Id_Cliente está indefinido. Não é possível executar a atualização.",
//       });
//     }

//     await clientes.update({ Id_Cliente, ...dadosAtualizados });

//     res.status(200).json({
//       message: "Dados do cliente atualizado com sucesso",
//     });
//   } catch (error) {
//     console.error("Erro ao processar a solicitação:", error);
//     res.status(500).json({
//       message: "Erro interno no servidor ao processar a solicitação",
//     });
//   }
// });

app.put("/clientes/update/:id", (req, res) => {
  const Id_Cliente = req.params.id
  const dadosCliente = req.body;
  clientes
  .update(Id_Cliente, dadosCliente)
  .then(() => {
    res.status(200).send({
      message: "Cliente atualizado com sucesso!"
    })
  })
  .catch((error) => console.error(error))
})

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

// Endereco
app.get("/enderecos/findAll", (req, res) => {
  enderecos
    .findAll()
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/enderecos/findById", (req, res) => {
  const idEndereco = req.query.id;
  console.log("ID recebido no back-end:", idEndereco);
  enderecos
    .findById(idEndereco)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ error: "Erro interno do servidor" });
    });
});

app.get("/enderecos/findByIdEndereco", (req, res) => {
  const { Id_Cliente } = req.query;
  console.log("id cliente filtrado:", Id_Cliente);
  enderecos
    .findByIdClienteEndereco(Id_Cliente)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.error("erro no back:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    });
});

app.get("/enderecos/findByIdClienteEndereco", (req, res) => {
  const { Id_Cliente } = req.query;
  
  enderecos
    .findByIdClienteEndereco(Id_Cliente)
    .then((data) => {
      console.log("id cliente filtrado:", data);
      res.status(200).json(data);
    })
    .catch((error) => {
      console.error("erro no back:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    });
});

app.post("/enderecos/insert", (req, res) => {
  enderecos
    .insert(req.body)
    .then((data) => {
      const idEndereco = data.insertId;
      console.log(idEndereco);
      res
        .status(200)
        .json({ message: "Endereço cadastrado com sucesso!", idEndereco });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Erro ao cadastrar endereço" });
    });
});

app.put("/enderecos/update", (req, res) => {
  enderecos
    .update(req.body)
    .then(() => {
      res.status(200).json({ message: "Endereço atualizado com sucesso!" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Erro ao atualizar endereço" });
    });
});

app.delete("/enderecos/delete", (req, res) => {
  enderecos
    .deleteById(req.body)
    .then(() => {
      res.send("Endereço deletado com sucesso!");
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
      res.send("Marca cadastrado com sucesso!");
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
