const { Pool } = require('pg');

function connection() {
  const pool = new Pool({
    user: 'root',
    host: 'localhost',
    database: 'buy_info',
    password: 'root',
    port: 5432
  });

  pool.on('error', (err, client) => {
    console.error('Erro inesperado no pool de clientes do PostgreSQL', err);
    process.exit(-1);
  });

  return pool;
}

module.exports = connection;
