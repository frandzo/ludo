// backend/src/repositories/usuariosRepository.js

import { getConnection } from "../database/connection.js";

/*
 * se encarga exclusivamente de las consultas a la tabla 'usuarios'
 */
export async function findByEmail(email) {
  const pool = await getConnection();
  const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [
    email,
  ]);
  return rows[0];
}

export async function create(data) {
  const { nombre, email, password, rol } = data;
  const pool = await getConnection();
  const [result] = await pool.query(
    "INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)",
    [nombre, email, password, rol]
  );
  return { id: result.insertId, ...data };
}
