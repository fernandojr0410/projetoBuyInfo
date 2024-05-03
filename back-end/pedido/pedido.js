const { query } = require("express")
const conn = require("../db/postgres.js")

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

function findAllOrder() {
    return queryPromiseReturn('SELECT * FROM pedido')
}

function findByIdpedido(idpedido) {
    let sql = `SELECT FROM pedido WHERE idpedido = ${idpedido}`
    return queryPromiseReturn(sql)
}

function insertOrder(dados) {
    const {
        status,
    } = dados
    let sql = `INSERT INTO pedido (status) VALUES ('${status}') RETURNING idpedido`
    return queryPromiseReturn(sql)
}

function updateOrder(dados) {
    const {
        idpedido,
        status,
    } = dados
    let sql = 'UPDATE pedido SET'

    if(status) {
    sql += ` status = ${status},`
    }
    sql = sql.slice(0, -1)
    sql += ` WHERE idpedido = ${idpedido}`
    return queryPromiseReturn(sql)
}

function deleteByIdOrder(ids) {
    const idsDelete = ids.toString()
    queryPromiseReturn(`DELETE FROM pedido WHERRE idpedido IN (${idsDelete})`)
}

module.exports = {
    findAllOrder,
    findByIdpedido,
    insertOrder,
    updateOrder,
    deleteByIdOrder
}