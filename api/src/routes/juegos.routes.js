// api/src/routes/juegos.routes.js

import express from "express";
import * as juegosController from "../controllers/juegosController.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// rutas públicas: cualquiera puede ver los juegos
router.get("/", juegosController.getJuegos);
router.get("/:id", juegosController.getJuegoById);

// ruta protegida: solo usuarios autenticados pueden guardar su progreso
router.post("/completar", verificarToken, juegosController.completarJuego);

export default router;
