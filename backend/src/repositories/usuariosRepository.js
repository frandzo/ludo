import { getConnection } from "../database/connection.js";

export async function findAll() {
  const db = await getConnection();
  const [rows] = await db.query("SELECT * FROM usuarios");
  return rows;
}

export async function findById(id) {
  const db = await getConnection();
  const [rows] = await db.query("SELECT * FROM usuarios WHERE id = ?", [id]);
  return rows[0];
}

export async function findByEmail(email) {
  const db = await getConnection();
  const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
  return rows[0];
}

export async function create(data) {
  const db = await getConnection();
  const [result] = await db.query("INSERT INTO usuarios SET ?", [data]);
  return { id: result.insertId, ...data };
}

export async function update(id, data) {
  const db = await getConnection();
  await db.query("UPDATE usuarios SET ? WHERE id = ?", [data, id]);
  return { id, ...data };
}

export async function remove(id) {
  const db = await getConnection();
  await db.query("DELETE FROM usuarios WHERE id = ?", [id]);
  return { success: true };
}
