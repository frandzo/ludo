import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {getConnection} from "../database/connection.js";  // tu conexión MySQL
import dotenv from 'dotenv';
import db from "../config/db.js";

dotenv.config();
const router = express.Router();

// 📌 Registro de usuario
router.post("/register", async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  try {
    const [existing] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?,'guest')", [
      nombre,
      email,
      hashedPassword,
    ]);

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// 📌 Login de usuario
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  try {
    const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // 🔸 Crear token JWT (1 hora de duración)
    const token = jwt.sign(
      { id: user.id, email: user.email, nombre: user.nombre },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      usuario: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;