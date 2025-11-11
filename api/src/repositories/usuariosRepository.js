// api/src/repositories/usuariosRepository.js

import { getConnection } from "../database/connection.js";

// buscar todos los usuarios (con capacidad de filtrado)
export async function findAll(filters = {}) {
  const db = await getConnection();

  // consultar base que une usuarios con roles para obtener el nombre del rol
  let query = `
    SELECT u.id, u.nombre, u.email, u.nivel_educativo, u.activo, u.rol_id, r.nombre as rol 
    FROM usuarios u 
    JOIN roles r ON u.rol_id = r.id
  `;
  const whereClauses = [];
  const params = [];

  if (filters.rol) {
    whereClauses.push("r.nombre = ?");
    params.push(filters.rol);
  }

  if (whereClauses.length > 0) {
    query += ` WHERE ${whereClauses.join(" AND ")}`;
  }

  const [rows] = await db.query(query, params);
  return rows;
}

export async function findById(id) {
  const db = await getConnection();
  const [rows] = await db.query(
    `SELECT u.id, u.nombre, u.email, u.nivel_educativo, u.activo, u.rol_id, r.nombre as rol 
     FROM usuarios u
     JOIN roles r ON u.rol_id = r.id 
     WHERE u.id = ?`,
    [id]
  );
  return rows[0];
}

export async function findByEmail(email) {
  const db = await getConnection();
  const [rows] = await db.query(
    `SELECT u.id, u.nombre, u.email, u.password, u.activo, u.rol_id, r.nombre as rol 
     FROM usuarios u
     JOIN roles r ON u.rol_id = r.id 
     WHERE u.email = ?`,
    [email]
  );
  return rows[0];
}

export async function create(data) {
  const db = await getConnection();
  const { rol, ...userData } = data;
  const [result] = await db.query("INSERT INTO usuarios SET ?", [userData]);
  return { id: result.insertId, ...data };
}

export async function update(id, data) {
  const db = await getConnection();
  await db.query("UPDATE usuarios SET ? WHERE id = ?", [data, id]);
  return { id, ...data };
}

// realizar una baja lógica del usuario, actualizando el campo 'activo' a 0 (HU1.4)
export async function remove(id) {
  const db = await getConnection();
  await db.query("UPDATE usuarios SET activo = 0 WHERE id = ?", [id]);
  return { success: true, message: "Usuario dado de baja correctamente." };
}
