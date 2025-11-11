// api/src/services/usuariosService.js

import * as usuariosRepo from "../repositories/usuariosRepository.js";
import * as progresoRepo from "../repositories/progresoRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function getAll(filters = {}) {
  return await usuariosRepo.findAll(filters);
}

export async function getById(id) {
  return await usuariosRepo.findById(id);
}

export async function getProgreso(id) {
  return await progresoRepo.findByUserId(id);
}

export async function create(data) {
  const existingUser = await usuariosRepo.findByEmail(data.email);
  if (existingUser) {
    throw new Error("El email ya está registrado");
  }

  let rol_id;
  switch (data.rol?.toLowerCase()) {
    case "admin":
      rol_id = 1;
      break;
    case "docente":
      rol_id = 2;
      break;
    case "estudiante":
    default:
      rol_id = 3;
      break;
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);

  const newUser = {
    nombre: data.nombre,
    email: data.email,
    password: hashedPassword,
    nivel_educativo: data.nivel_educativo || null,
    rol_id: rol_id,
  };

  return await usuariosRepo.create(newUser);
}

export async function update(id, data) {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 12);
  }
  return await usuariosRepo.update(id, data);
}

export async function remove(id) {
  return await usuariosRepo.remove(id);
}

export async function login({ email, password }) {
  console.log(`[LOGIN-SERVICE] Intentando iniciar sesión para: ${email}`);

  const user = await usuariosRepo.findByEmail(email);

  if (!user || !user.activo) {
    console.log(
      `[LOGIN-SERVICE] Usuario no encontrado en la base de datos para el email: ${email}`
    );
    throw new Error(
      "Usuario o contraseña incorrectos, o la cuenta está inactiva."
    );
  }

  console.log(`[LOGIN-SERVICE] Usuario encontrado:`, user);
  console.log(
    `[LOGIN-SERVICE] ¿Está el usuario activo? -> ${user.activo === 1}`
  );

  if (!user.activo) {
    throw new Error("La cuenta está inactiva.");
  }

  console.log(
    `[LOGIN-SERVICE] Contraseña proporcionada (plain text): ${password}`
  );
  console.log(`[LOGIN-SERVICE] Hash de la BD: ${user.password}`);

  const isValid = await bcrypt.compare(password, user.password);

  console.log(
    `[LOGIN-SERVICE] ¿La comparación de la contraseña fue exitosa? -> ${isValid}`
  );

  if (!isValid) {
    throw new Error("Usuario o contraseña incorrectos");
  }

  console.log("[LOGIN-SERVICE] ¡Login exitoso! Creando token JWT.");

  const payload = {
    id: user.id,
    nombre: user.nombre,
    email: user.email,
    rol_id: user.rol_id,
    rol: user.rol,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "8h" });

  return { token, usuario: payload };
}
