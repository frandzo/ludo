// api/src/controllers/authController.js

import * as usuariosService from "../services/usuariosService.js";

export async function registerUsuario(req, res) {
  try {
    const newUsuario = await usuariosService.create(req.body);
    res.status(201).json({
      message: "Usuario registrado exitosamente",
      usuario: newUsuario,
    });
  } catch (error) {
    if (error.message.includes("ya está registrado")) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function loginUsuario(req, res) {
  try {
    const { token, usuario } = await usuariosService.login(req.body);
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      usuario,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}
