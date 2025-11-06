import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const getConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

getConnection.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar con la base de datos:", err);
  } else {
    console.log("✅ Conectado a la base de datos MySQL");
  }
});

export default getConnection;
