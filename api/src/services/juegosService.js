// api/src/services/juegosService.js

import * as juegosRepo from "../repositories/juegosRepository.js";
import * as progresoRepo from "../repositories/progresoRepository.js";

export async function getAll() {
  return await juegosRepo.findAll();
}

export async function getById(id) {
  return await juegosRepo.findById(id);
}

export async function completarJuego(userId, juegoId, puntaje, tiempoJugado) {
  // lógica para guardar el progreso del juego en la base de datos
  const data = {
    usuario_id: userId,
    juego_id: juegoId,
    puntaje: puntaje,
    tiempo_jugado_segundos: tiempoJugado,
    completado: 1,
  };
  return await progresoRepo.create(data);

  // TODO: agregar lógica para desbloquear logros (HU2.3)
}
