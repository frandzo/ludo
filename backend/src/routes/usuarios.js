import express from "express";
import * as usuariosController from "../controllers/usuariosController.js";

const router = express.Router();

router.get("/", usuariosController.getAllUsuarios);
router.get("/:id", usuariosController.getUsuarioById);
router.post("/", usuariosController.createUsuario);
router.put("/:id", usuariosController.updateUsuario);
router.delete("/:id", usuariosController.deleteUsuario);
router.post("/login", usuariosController.loginUsuario);

export default router;