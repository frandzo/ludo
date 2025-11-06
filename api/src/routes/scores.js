// routes/puntajes.routes.js
import express from "express";
import db from "../config/db.js"; // tu conexión (mysql2 createConnection)

const router = express.Router();

router.post("/", async (req, res) => {
  const { idjuego, puntaje } = req.body;
  const email = req.user.email;

  if (!email || !idjuego || puntaje == null) {
    return res.status(400).json({ error: "Faltan datos", body: req.body });
  }

  try {
    // 1) Buscar usuario por email
    const [userRows] = await db.promise().query(
      "SELECT idusuarios FROM usuarios WHERE email = ?",
      [email]
    );

    if (userRows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const idusuario = userRows[0].idusuarios;

    // 2) Insertar siempre un nuevo registro (historial)
    await db.promise().query(
      "INSERT INTO juegos_usuarios (idjuegos, idusuarios, puntaje) VALUES (?, ?, ?)",
      [idjuego, idusuario, puntaje]
    );

    return res.status(201).json({ message: "Puntaje registrado (nuevo registro creado)" });
  } catch (err) {
    console.error("Error en /api/puntajes:", err);
    return res.status(500).json({ error: "Error interno del servidor", detalle: err.message });
  }
});

export default router;
