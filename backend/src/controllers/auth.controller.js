// backend/src/controllers/auth.controller.js

import * as authService from "../services/auth.service.js";

/*
 * maneja la lógica de las rutas de autenticación
 * delega la lógica de negocio a los servicios
 */
export async function register(req, res) {
  try {
    const user = await authService.register(req.body);
    res
      .status(201)
      .json({ success: true, message: "Usuario registrado exitosamente" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

export async function login(req, res) {
  try {
    const { token, usuario } = await authService.login(req.body);
    res.status(200).json({ success: true, data: { token, usuario } });
  } catch (error) {
    res.status(401).json({ success: false, error: error.message });
  }
}

export async function getProfile(req, res) {
  // el usuario es añadido a la request por el middleware 'verificarToken'
  res.status(200).json({ success: true, data: { user: req.user } });
}
