const conn = require('../db/postgres.js')
const util = require('util')
const queryPromise = util.promisify(conn().query).bind(conn())

function queryPromiseReturn(sql) {
  return new Promise((resolve, reject) => {
    console.log({ sql })
    conn().query(sql, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

module.exports = {}
