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
  const hashedPassword = await bcrypt.hash(data.password, 10);
  data.password = hashedPassword;
  return await usuariosRepo.create(data);
}

export async function update(id, data) {
  return await usuariosRepo.update(id, data);
}

export async function remove(id) {
  return await usuariosRepo.remove(id);
}

export async function login({ email, password }) {
  const user = await usuariosRepo.findByEmail(email);
  if (!user) throw new Error("Usuario no encontrado");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Contraseña incorrecta");

  const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET);
  return token;
}
