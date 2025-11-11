// api/src/repositories/juegosRepository.js

import { getConnection } from "../database/connection.js";

export async function findAll() {
  const db = await getConnection();
  const [rows] = await db.query("SELECT * FROM juegos");
  return rows;
}

export async function findById(id) {
  const db = await getConnection();
  const [rows] = await db.query("SELECT * FROM juegos WHERE id = ?", [id]);
  return rows[0];
}

// TODO: funciones para crear, editar y eliminar juegos (HU5.1)
