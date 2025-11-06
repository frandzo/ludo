// api/src/routes/usuarios.routes.js

import express from "express";
import * as usuariosController from "../controllers/usuariosController.js";

const router = express.Router();

// rutas para gestionar usuarios (protegidas)
router.get("/", usuariosController.getAllUsuarios);
router.get("/:id", usuariosController.getUsuarioById);
router.post("/", usuariosController.createUsuario); // esta es usada por el admin/docente
router.put("/:id", usuariosController.updateUsuario);
router.delete("/:id", usuariosController.deleteUsuario);

// la ruta de login se movió a auth.routes.js para ser pública
// router.post("/login", usuariosController.loginUsuario);

export default router;
