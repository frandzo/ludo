// api/src/services/usuariosService.js

import * as usuariosRepo from "../repositories/usuariosRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function getAll() {
  return await usuariosRepo.findAll();
}

export async function getById(id) {
  return await usuariosRepo.findById(id);
}

export async function create(data) {
  const existingUser = await usuariosRepo.findByEmail(data.email);
  if (existingUser) {
    throw new Error("El email ya está registrado");
  }
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const newUser = {
    nombre: data.nombre,
    email: data.email,
    password: hashedPassword,
    rol: data.rol || "estudiante",
  };
  return await usuariosRepo.create(newUser);
}

export async function update(id, data) {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  return await usuariosRepo.update(id, data);
}

export async function remove(id) {
  return await usuariosRepo.remove(id);
}

export async function login({ email, password }) {
  const user = await usuariosRepo.findByEmail(email);
  if (!user) throw new Error("Usuario o contraseña incorrectos");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Usuario o contraseña incorrectos");

  const payload = {
    id: user.id,
    nombre: user.nombre,
    email: user.email,
    rol: user.rol,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "8h" });

  return { token, usuario: payload };
}
