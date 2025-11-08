// api/src/routes/index.js

import express from "express";
import puntajesRoutes  from "./scores.js";
import usuariosRouter from "./usuarios.js";
// import estudiantesRouter from "./estudiantes.js";
// import logrosRouter from "./logros.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use("/usuarios", usuariosRouter);
router.use("/puntajes", verificarToken, puntajesRoutes);
// router.use("/scores", scoresRouter);
// router.use("/estudiantes", estudiantesRouter);
// router.use("/logros", logrosRouter);

export default router;
