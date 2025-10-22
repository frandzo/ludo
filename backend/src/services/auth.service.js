// backend/src/services/auth.service.js

import * as usuariosRepo from "../repositories/usuariosRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/*
 * contiene la lógica de negocio para la autenticación
 */
export async function register(userData) {
  const { nombre, email, password } = userData;
  if (!nombre || !email || !password) {
    throw new Error("Faltan datos obligatorios");
  }

  const existingUser = await usuariosRepo.findByEmail(email);
  if (existingUser) {
    throw new Error("El email ya está registrado");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    nombre,
    email,
    password: hashedPassword,
    rol: "guest", // rol por defecto
  };

  return await usuariosRepo.create(newUser);
}

export async function login({ email, password }) {
  if (!email || !password) {
    throw new Error("Email y contraseña son requeridos");
  }

  const user = await usuariosRepo.findByEmail(email);
  if (!user) {
    throw new Error("Credenciales inválidas"); // mensaje genérico por seguridad
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Credenciales inválidas");
  }

  // datos que se guardarán en el token
  const payload = {
    id: user.id,
    email: user.email,
    nombre: user.nombre,
    rol: user.rol,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  return {
    token,
    usuario: { id: user.id, nombre: user.nombre, email: user.email },
  };
}
