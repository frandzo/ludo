// api/src/controllers/juegosController.js

// placeholder para la lista de juegos
const mockJuegos = [
  {
    id: 1,
    titulo: "Matemáticas Mágicas",
    categoria: "Matemáticas",
    unityUrl: "/unity-game/",
  },
  {
    id: 2,
    titulo: "Laboratorio Virtual",
    categoria: "Ciencias",
    unityUrl: "/unity-game/",
  },
  {
    id: 3,
    titulo: "Aventura Lingüística",
    categoria: "Lenguaje",
    unityUrl: "/unity-game/",
  },
];

export async function getJuegos(req, res) {
  // FUTURO: obtener de la base de datos
  res.json(mockJuegos);
}

export async function getJuegoById(req, res) {
  const juego = mockJuegos.find((j) => j.id === parseInt(req.params.id));
  if (juego) {
    res.json(juego);
  } else {
    res.status(404).json({ error: "Juego no encontrado" });
  }
}

export async function completarJuego(req, res) {
  const { juegoId, puntaje } = req.body;
  const userId = req.user.id;
  console.log(
    `Usuario ${userId} completó juego ${juegoId} con puntaje ${puntaje}`
  );
  // FUTURO: guardar este progreso en la base de datos
  res.status(200).json({ message: "Progreso guardado exitosamente" });
}
