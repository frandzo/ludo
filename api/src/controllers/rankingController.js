// api/src/controllers/rankingController.js

export async function getGlobalRanking(req, res) {
  // FUTURO: calcular ranking desde la base de datos
  const mockRanking = [
    { id: 1, nombre: "María García", puntaje: 9850, juegosCompletados: 45 },
    { id: 2, nombre: "Juan Pérez", puntaje: 9420, juegosCompletados: 42 },
    { id: 3, nombre: "Ana López", puntaje: 8990, juegosCompletados: 38 },
  ];
  res.json(mockRanking);
}
