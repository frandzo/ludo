// backend/src/database/connection.js

import mysql from "mysql2/promise";

/*
 * crea y gestiona un pool de conexiones a la base de datos mysql
 * usar un pool es más eficiente que crear una conexión por cada consulta
 */
let pool;

export async function getConnection() {
  if (!pool) {
    console.log("Creando nuevo pool de conexiones...");
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    console.log("✅ Pool de conexiones a la base de datos establecido");
  }
  return pool;
}
