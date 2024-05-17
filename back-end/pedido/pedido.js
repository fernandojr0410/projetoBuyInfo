const { query } = require("express")
const conn = require("../db/postgres.js")

function queryPromiseReturn(sql) {
    return new Promise ((resolve, reject) => {
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
   return queryPromiseReturn("SELECT * FROM pedido")
    
}

function findByIdOrder(idpedido) {
    console.log(idpedido)
    return queryPromiseReturn(`SELECT * FROM pedido WHERE idpedido = ${idpedido}`)
    
}

function insertOrder(dados) {
    const {
        status
    } = dados
    sql = `INSERT INTO pedido (status) VALUES ('${status}') RETURNING idpedido`
    return queryPromiseReturn(sql)
}

function updateOrder(dados) {
    const {
        idpedido,
        status
    } = dados
    sql = "UPDATE pedido SET"
    if(status) {
        sql += ` status = '${status}',`
    }

    sql = sql.slice(0, -1)
    sql += ` WHERE idpedido = ${idpedido}`
    return queryPromiseReturn(sql)
}

function deleteOrder(ids) {
    const idsDelete = ids.toString()
    return queryPromiseReturn(`DELETE FROM pedido WHERE idpedido IN (${idsDelete})`)
}

module.exports = {
    findAllOrder,
    findByIdOrder,
    insertOrder,
    updateOrder,
    deleteOrder
}
