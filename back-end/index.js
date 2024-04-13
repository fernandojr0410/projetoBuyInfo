const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const cors = require("cors"); 

const conn = require("./db/postgres.js");
const produtos = require("./produtos/produtos.js");
const pedido = require("./pedido/pedido.js")
const vendedor = require("./vendedor/vendedor.js")
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

app.get("/produtos/destaques", (req, res) => {
  produtos
    .findAllDestaques()
    .then((results) => {
      res.send(
        results.rows.map((produto) => {
          return {
            ...produto,
            imagens:
              produto.imagens &&
              produto.imagens
                .split(",")
                .map((img) => `${HOST}:${PORT}/imagens/produtos/${img}`.replaceAll(' ','')).sort(),
          };
        })
      );
    })
    .catch((error) => {
      console.error(error);
    });
});

// Pedido
app.get("/pedido/findAllPedido", (req, res) => {
  pedido
  .findAllPedido()
  .then((results) => {
    res.send(results)
  })
  .catch((error) => console.error(error))
})

app.get("/pedido/findByIdPedido", (req, res) => {
  const idpedido = req.query.idpedido
  pedido
  .findAllPedido(idpedido)
  .then((results) => {
    res.send(results.rows)
  })
  .catch((error) => console.error("Erro ao filtrar pedido",error))
})

app.get("/pedido/findAllPedidoByClientId", (req, res) => {
  const id_cliente = req.query.id_cliente
  const idpedido = req.query.idpedido
  pedido
    .findAllPedidoByClientId(idpedido, id_cliente)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => console.error(error));
});

app.post("/pedido/insertOrderProductClient", (req, res) => {
  pedido
    .insertOrderProductClient(req.body)
    .then(() => {
      res.send("Pedido inserido com sucesso!")
    })
    .catch((error) => console.error(error));
});

app.delete("/pedido/deleteOrderById", (req, res) => {
  pedido
  .deleteOrderById(req.body)
  .then(() => {
    res.send("Pedido deletado com sucesso!")
  })
  .catch((error) => console.error("Erro ao deletar pedido",error))
})

app.get("/produtos/categoria", (req, res) => {
  produtos
    .findByCategory(req.query.id)
    .then((results) => {
      console.log(results)
      res.send(
        results.rows.map((produto) => {
          return {
            ...produto,
            imagens:
              produto.imagens &&
              produto.imagens
                .split(",")
                .map((img) => `${HOST}:${PORT}/imagens/produtos/${img}`.replaceAll(' ','')).sort(),
          };
        })
      );
    })
    .catch((error) => {
      console.error(error);
    });
});

// Vendedor
app.get("/vendedor/findAllVendedor", (req, res) => {
  vendedor
  .findAllSeller()
  .then((results) => {
    res.send(results)
  })
  .catch((error) => console.error(error))
})

app.get("/vendedor/findByIdVendedor", (req, res) => {
  const id_vendedor = req.body.id_vendedor
  vendedor
  .findAllSeller(id_vendedor)
  .then((results) => {
    res.send(results)
  })
  .catch((error) => console.error(error))
})

app.post("/vendedor/insertSeller", (req, res) => {})

// Produtos
app.get("/produtos/findAll", (req, res) => {
  produtos
    .findAll()
    .then((results) => {
      res.send(
        results.rows.map((produto) => {
          return {
            ...produto,
            imagens:
              produto.imagens &&
              produto.imagens
                .split(",")
                .map((img) => `${HOST}:${PORT}/imagens/produtos/${img}`.replaceAll(' ','')).sort(),
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
        results.rows.map((produto) => {
          return {
            ...produto,
            imagens:
              produto.imagens &&
              produto.imagens
                .split(",")
                .map((img) => `${HOST}:${PORT}/imagens/produtos/${img}`.replaceAll(' ','')).sort(),
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
      res.send(results.rows);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/categorias/findById", (req, res) => {
  categorias
    .findById(req.query.id)
    .then((results) => {
      res.send(results.rows);
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
      res.send(results.rows);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/destaques/findById", (req, res) => {
  destaques
    .findById(req.query.id)
    .then((results) => {
      res.send(results.rows);
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
      res.send(results.rows);
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
      res.send(results.rows);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/clientes/findByEmail", (req, res) => {
  clientes
  .findByEmail(req.query.email)
  .then((results) => {
    res.send(results.rows)
  })
  .catch((error) => console.error(error))
})

app.get("/clientes/findByEmailSenha", (req, res) => {
  clientes
    .findByEmailSenha(req.query.email, req.query.senha)
    .then((results) => {
      res.setHeader("Cache-Control", "no-store");
      res.send(results.rows);
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

app.put("/clientes/update/:id", (req, res) => {
  const id_cliente = req.params.id
  const dadosCliente = req.body;
  clientes
  .update(id_cliente, dadosCliente)
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
      res.send(results.rows);
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
  const { id_cliente } = req.query;
  console.log("id cliente filtrado:", id_cliente);
  enderecos
    .findByIdClienteEndereco(id_cliente)
    .then((data) => {
      res.status(200).json(data.rows);
    })
    .catch((error) => {
      console.error("erro no back:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    });
});

app.get("/enderecos/findByIdClienteEndereco", (req, res) => {
  const { id_cliente } = req.query;
  enderecos
    .findByIdClienteEndereco(id_cliente)
    .then((data) => {
      console.log("id cliente filtrado:", data);
      res.status(200).json(data.rows);
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
      const id_endereco = data.insertId;
      console.log(id_endereco);
      res
        .status(200)
        .json({ message: "Endereço cadastrado com sucesso!", id_endereco });
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
      res.send(results.rows);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/marcas/findById", (req, res) => {
  marcas
    .findById(req.query.id)
    .then((results) => {
      res.send(results.rows);
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
