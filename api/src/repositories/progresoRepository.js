// api/src/repositories/progresoRepository.js

import { getConnection } from "../database/connection.js";

export async function findByUserId(usuarioId) {
  const db = await getConnection();
  const [rows] = await db.query(
    `SELECT hp.*, j.titulo, j.categoria 
     FROM historial_progreso hp
     JOIN juegos j ON hp.juego_id = j.id
     WHERE hp.usuario_id = ? 
     ORDER BY hp.fecha_juego DESC`,
    [usuarioId]
  );
  return rows;
}

export async function create(data) {
  const db = await getConnection();
  const [result] = await db.query("INSERT INTO historial_progreso SET ?", [
    data,
  ]);
  return { id: result.insertId, ...data };
}

export async function getGlobalRanking() {
  const db = await getConnection();
  const [rows] = await db.query(`
        SELECT 
            u.id, 
            u.nombre, 
            SUM(hp.puntaje) as puntaje,
            COUNT(hp.id) as juegosCompletados
        FROM historial_progreso hp
        JOIN usuarios u ON hp.usuario_id = u.id
        WHERE u.rol_id = 3 -- Solo estudiantes
        GROUP BY u.id, u.nombre
        ORDER BY puntaje DESC
        LIMIT 10
    `);
  return rows;
}