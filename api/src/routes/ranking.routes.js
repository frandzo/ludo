// api/src/routes/ranking.routes.js

import express from "express";
import * as rankingController from "../controllers/rankingController.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/global", verificarToken, rankingController.getGlobalRanking);

export default router;
