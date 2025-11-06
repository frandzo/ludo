import { getConnection } from "../database/connection.js";

export async function findAll() {
  const db = await getConnection();
  const [rows] = await db.query("SELECT * FROM juegos_usuarios");
  return rows;
}

export async function create(data) {
  const db = await getConnection();
  const [result] = await db.query("INSERT INTO juegos_usuarios SET ?", [data]);
  return { id: result.insertId, ...data };
}


export async function remove(id,idj) {
  const db = await getConnection();
  await db.query("DELETE FROM juegos_usuarios WHERE idusuarios = ? AND idjuegos = ?", [id,idj]);
  return { success: true };
}
