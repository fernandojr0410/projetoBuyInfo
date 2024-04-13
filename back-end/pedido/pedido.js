const { query } = require("express");
const conn = require("../db/postgres.js");
const util = require("util");
const queryPromise = util.promisify(conn().query).bind(conn());


function findAllPedido() {
    return queryPromise("SELECT * FROM pedido")
}

function findByIdPedido(idpedido) {
console.log("idPedido", idpedido)
return queryPromise(`SELECT * FROM pedido WHERE idpedido = ${idpedido}`)
}

function findAllPedidoByClientId(idpedido, id_cliente) {
    console.log("idPedido", idpedido);
    console.log("idCliente", id_cliente);
    return queryPromise(`
    SELECT p.idpedido, p.idproduto, p.id_cliente, c.nome, c.sobrenome, c.cpf
    FROM pedido p
    JOIN cliente c ON p.id_cliente = c.id_cliente
    WHERE c.id_cliente = ${id_cliente};    
    `);
}

function insertOrderProductClient(dados) {
    const {
        idproduto,
        idpedido,
        id,
        id_cliente
    } = dados
    let sql = `INSERT INTO pedido (idproduto, idpedido, id, id_cliente) values (${idproduto}, ${idpedido}, ${id}, ${id_cliente})`
    return queryPromise(sql)
}

function deleteOrderById(ids) {
    const idsDelete = ids.toString()
    return queryPromise(`DELETE FROM pedido WHERE idpedido IN (${idsDelete})`)
}

// criar uma nova funcao chamado insertProdutoPedido()
// nela ira inserir somente no pedido que ainda nao foi pago, o produto adicionado

function findAllPedidoByVendedorId(id_vendedor) {
console.log("idVendedor Pedido", id_vendedor)
return queryPromise(`SELECT * FROM pedido WHERE id_vendedor = ${id_vendedor}`)
}

module.exports = {
    findAllPedido,
    findByIdPedido,
    findAllPedidoByClientId,
    insertOrderProductClient,
    deleteOrderById,
    findAllPedidoByVendedorId
}