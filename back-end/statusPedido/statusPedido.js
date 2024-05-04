const { query } = require("express")
const conn = require("../db/postgres.js")
const util = require("util")

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

function findAllStatusOrder() {
    return queryPromiseReturn('SELECT * FROM status_pedido')
}

function findStatusOrderById(id) {
    return queryPromiseReturn(`SELECT * FROM status_pedido WHERE id = ${id}`)
}

function insertStatusOrder(dados) {
    const {
        id,
        idpedido,
        id_cliente,
        id_endereco,
        status
    } = dados
    let sql = `INSERT INTO status_pedido (id, idpedido, id_cliente, id_endereco, status) VALUES (${id}, ${idpedido}, ${id_cliente}, ${id_endereco}, '${status}')`
    return queryPromiseReturn(sql)
} 

function updateStatusOrder(id, dados) {
    const {
        idpedido,
        id_cliente,
        id_endereco,
        status
    } = dados
    let sql = "UPDATE status_pedido SET"

    if(idpedido) {
        sql += ` idpedido = ${idpedido},`
    }
    if(id_cliente) {
        sql += ` id_cliente = ${id_cliente},`
    }
    if(id_endereco) {
        sql += ` id_endereco = ${id_endereco},`
    }
    if(status) {
        sql += ` status = '${status}',`
    }

    sql = sql.slice(0, -1)
    sql += ` WHERE id = ${id}`
    return queryPromiseReturn(sql)
}

function deleteStatusOrder(ids) {
    const idsDelete = ids.toString()
    return queryPromiseReturn(`DELETE FROM status_pedido WHERE id IN (${idsDelete})`)
}

module.exports = {
    findAllStatusOrder,
    findStatusOrderById,
    insertStatusOrder,
    updateStatusOrder,
    deleteStatusOrder,
}