const { query } = require("express");
const conn = require("../db/postgres.js");
// const util = require("util");

function queryPromiseReturn(sql) {
    return new Promise((resolve, reject) => {
        conn().query(sql, (error, result) => {
            if(error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}
 

function findAllPedido() {
    return queryPromiseReturn("SELECT * FROM pedido")
}

function findByIdPedido(idpedido) {
console.log("idPedido", idpedido)
return queryPromiseReturn(`SELECT * FROM pedido WHERE idpedido = ${idpedido}`)
}

function findAllPedidoByClientId(idpedido, id_cliente) {
    console.log("idPedido", idpedido);
    console.log("idCliente", id_cliente);
    return queryPromiseReturn(`
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
    return queryPromiseReturn(sql)
}

function updateOrder(idpedido, dados) {
    const {
        idproduto,
        id,
        id_cliente
    } = dados
    let sql = 'UPDATE pedido SET'

    if(idproduto) {
        sql =+ ` idproduto = ${idproduto},`
    }
    if(id) {
        sql += ` id = ${id},`
    }
    if(id_cliente) {
        sql += ` id_cliente = ${id_cliente}`
    }

    sql = sql.slice(0, -1)
    sql += ` WHERE idpedido = ${idpedido}`
    return queryPromiseReturn(sql)
}

function deleteOrderById(ids) {
    const idsDelete = ids.toString()
    return queryPromiseReturn(`DELETE FROM pedido WHERE idpedido IN (${idsDelete})`)
}

// function findAllPedidoByVendedorId(id_vendedor) {
// console.log("idVendedor Pedido", id_vendedor)
// return queryPromise(`SELECT * FROM pedido WHERE id_vendedor = ${id_vendedor}`)
// }

module.exports = {
    findAllPedido,
    findByIdPedido,
    findAllPedidoByClientId,
    insertOrderProductClient,
    updateOrder,
    deleteOrderById,
    // findAllPedidoByVendedorId
}