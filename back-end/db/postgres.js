const { Pool } = require('pg')

function conn() {
  const pool = new Pool({
    user: 'fernando',
    host: '172.19.0.2',
    database: 'postgres',
    password: 'Funcion@2300',
    port: 5432,
  })

  pool.on('error', (err, client) => {
    console.error('Erro inesperado no pool de clientes do PostgreSQL', err)
    process.exit(-1)
  })

  return pool
}

module.exports = conn
