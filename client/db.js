
const { Database } = require('@sqlitecloud/drivers');

const connectionString = 'sqlitecloud://cisdx1ygvz.g1.sqlite.cloud:443?apikey=eXuuby6EVbQSvMB8yzaXlBE5bdkXmebsWwbvu2R9vXg';
const db = new Database(connectionString);

const createTables = async () => {
  try {
    await db.sql`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `;

    await db.sql`
      CREATE TABLE IF NOT EXISTS chat_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        sender TEXT NOT NULL,
        message TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      );
    `;

    console.log('Tables created successfully.');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

module.exports = { db, createTables };
