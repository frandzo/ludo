import express from "express";
import usuariosRouter from "./usuarios.js";
// import estudiantesRouter from "./estudiantes.js";
// import logrosRouter from "./logros.js";

const router = express.Router();

router.use("/usuarios", usuariosRouter);
// router.use("/estudiantes", estudiantesRouter);
// router.use("/logros", logrosRouter);

export default router;
