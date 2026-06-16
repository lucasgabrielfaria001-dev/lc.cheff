const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '..', '..', 'data', 'futshop.sqlite');
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao abrir o banco SQLite:', err.message);
  } else {
    console.log('✅ Banco SQLite conectado em', dbPath);
  }
});

function normalizeQuery(sql) {
  return sql
    .replace(/\$\d+/g, '?')
    .replace(/\bILIKE\b/gi, 'LIKE');
}

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve(this);
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

async function query(sql, params = []) {
  const normalizedSql = normalizeQuery(sql);
  const upperSql = normalizedSql.toUpperCase();

  if (upperSql.includes('SELECT')) {
    const rows = await all(normalizedSql, params);
    return { rows };
  }

  if (upperSql.includes('RETURNING')) {
    const tableMatch = normalizedSql.match(/\b(?:INSERT\s+INTO|UPDATE)\s+([a-zA-Z_][\w]*)/i);
    const tableName = tableMatch ? tableMatch[1] : null;

    const result = await run(normalizedSql, params);

    if (tableName && params.length > 0) {
      const selectColumnsMatch = normalizedSql.match(/RETURNING\s+(.+)$/i);
      const selectColumns = selectColumnsMatch ? selectColumnsMatch[1] : '*';
      const row = await get(`SELECT ${selectColumns} FROM ${tableName} WHERE id = ?`, [params[0]]);
      return { rows: row ? [row] : [] };
    }

    return { rows: [] };
  }

  const result = await run(normalizedSql, params);
  return { rows: [] };
}

async function init() {
  await run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      password TEXT NOT NULL,
      cpf TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      stock INTEGER DEFAULT 0,
      category TEXT,
      team TEXT,
      image_url TEXT,
      sku TEXT,
      active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      product_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      rating INTEGER NOT NULL,
      comment TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  await run(`
    INSERT OR IGNORE INTO products (id, name, description, price, stock, category, team, image_url, sku)
    VALUES
      ('1', 'Camisa Flamengo', 'Camisa oficial do Flamengo', 199.90, 15, 'camisas', 'Flamengo', 'https://via.placeholder.com/300', 'FLA-001'),
      ('2', 'Camisa Corinthians', 'Camisa oficial do Corinthians', 189.90, 10, 'camisas', 'Corinthians', 'https://via.placeholder.com/300', 'COR-001'),
      ('3', 'Bola de Futebol', 'Bola oficial para treino', 89.90, 25, 'esportes', 'Geral', 'https://via.placeholder.com/300', 'BOL-001')
  `);
}

module.exports = {
  db,
  run,
  get,
  all,
  query,
  init,
};
