const { query } = require("express")
const conn = require("../db/postgres.js")
const util = require("util")
const queryPromise = util.promisify(conn().query).bind(conn())

function findAllSeller() {
    return queryPromise(`SELECT * FROM vendedor`)
}

function findByIdSeller(id_vendedor) {
    return queryPromise(`SELECT * FROM vendedor WHERE id_vendedor = ${id_vendedor}`)
}

function insertSeller(dados) {
    const {
        id_vendedor,
        nome,
        cnpj_cpf,
        telefone,
        email,
        id_endereco
    } = dados
    let sql = `INSERT INTO vendedor (id_vendedor, nome, cnpj_cpf, telefone, email, id_endereco) VALEUS (${id_vendedor}, "${nome}", "${cnpj_cpf}", "${telefone}", "${email}", ${id_endereco})`
    return queryPromise(sql)
}

module.exports = {
    findAllSeller,
    findByIdSeller,
    insertSeller
}