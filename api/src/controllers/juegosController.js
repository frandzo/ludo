// api/src/controllers/juegosController.js

import * as juegosService from "../services/juegosService.js";

export async function getJuegos(req, res) {
  try {
    const juegos = await juegosService.getAll();
    res.json(juegos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getJuegoById(req, res) {
  try {
    const juego = await juegosService.getById(req.params.id);
    if (juego) {
      res.json(juego);
    } else {
      res.status(404).json({ error: "Juego no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function completarJuego(req, res) {
  const { juegoId, puntaje, tiempoJugado } = req.body;
  const userId = req.user.id; // obtenido del token JWT

  if (!juegoId || puntaje === undefined) {
    return res.status(400).json({ error: "juegoId y puntaje son requeridos" });
  }

  try {
    await juegosService.completarJuego(
      userId,
      juegoId,
      puntaje,
      tiempoJugado || 0
    );
    console.log(
      `Usuario ${userId} completó juego ${juegoId} con puntaje ${puntaje}`
    );
    res.status(200).json({ message: "Progreso guardado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al guardar el progreso: " + error.message });
  }
}
