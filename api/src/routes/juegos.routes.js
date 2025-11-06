// api/src/routes/juegos.routes.js

import express from "express";
import * as juegosController from "../controllers/juegosController.js";

const router = express.Router();

router.get("/", juegosController.getJuegos);
router.get("/:id", juegosController.getJuegoById);
router.post("/completar", juegosController.completarJuego);

export default router;
