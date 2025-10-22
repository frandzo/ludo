// backend/src/routes/index.js

import express from "express";
import authRouter from "./auth.routes.js";
// import estudiantesRouter from "./estudiantes.js";

const router = express.Router();

/*
 * enrutador principal que agrupa todas las rutas de la api
 */
router.use("/auth", authRouter);
// router.use("/estudiantes", estudiantesRouter);

export default router;
