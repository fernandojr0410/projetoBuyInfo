const { query } = require("express")
const conn = require("../db/postgres.js")
const util = require("util")
const queryPromise = util.promisify(conn().query).bind(conn())

function queryPromiseReturn(sql) {
    return new Promise((resolve, reject) => {
      conn().query(sql, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

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

function updateSeller(id_vendedor, dados) {
    const {
        nome,
        cnpj_cpf,
        telefone,
        email,
        id_endereco
    } = dados
    let sql = "UPDATE vendedor SET";

    if (nome) {
        sql += ` nome = '${nome}',`;
    }
    if (cnpj_cpf) {
       sql += ` cnpj_cpf = '${cnpj_cpf}',`;
    }
    if(telefone) {
        sql += ` telefone = '${telefone}',`
    }
    if(email) {
        sql += ` email = '${email}',`
    }
    if(id_endereco) {
        sql += ` id_endereco = ${id_endereco}`
    }

    sql = sql.slice(0, -1)
    sql += ` WHERE id_vendedor = ${id_vendedor}`
    return queryPromiseReturn(sql)
}

function deleteById(ids) {
    const idsDelete = ids.toString()
    return queryPromise(`DELETE FROM vendedor WHERE id_vendedor = IN (${idsDelete})`)
}

module.exports = {
    findAllSeller,
    findByIdSeller,
    insertSeller,
    updateSeller,
    deleteById
}