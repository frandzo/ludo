// backend/src/routes/auth.routes.js

import express from "express";
import * as authController from "../controllers/auth.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/perfil", verificarToken, authController.getProfile);

export default router;
