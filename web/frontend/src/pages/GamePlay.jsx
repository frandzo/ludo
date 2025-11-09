// web/frontend/src/pages/GamePlay.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Star, Loader2 } from "lucide-react";
import { toast } from "sonner";
import api from "@/utils/api";

export default function GamePlay() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentScore, setCurrentScore] = useState(0);

  // función para guardar el progreso del juego (es llamada desde Unity)
  const handleGameCompleted = React.useCallback(
    async (finalScore) => {
      try {
        await api.post("/api/juegos/completar", {
          juegoId: gameId,
          puntaje: Number(finalScore),
        });
        toast.success("¡Juego completado!", {
          description: `Obtuviste ${finalScore} puntos. Tu progreso ha sido guardado.`,
        });
        // Redirigir al dashboard después de un breve momento
        setTimeout(() => navigate("/dashboard"), 1500);
      } catch (error) {
        toast.error("Error al guardar", {
          description:
            "No se pudo guardar tu progreso. Por favor, intenta de nuevo.",
        });
        console.error("Error saving game result:", error);
      }
    },
    [gameId, navigate]
  );

  // exponer la función de completar al objeto window para que Unity pueda llamarla
  useEffect(() => {
    window.handleGameCompleted = handleGameCompleted;

    return () => {
      delete window.handleGameCompleted;
    };
  }, [handleGameCompleted]);

  // cargar datos del juego al componente
  useEffect(() => {
    const loadGame = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/juegos/${gameId}`);
        setGame(response.data);
      } catch (error) {
        console.error("Error loading game:", error);
        toast.error("Juego no encontrado", {
          description: "No pudimos cargar los detalles de este juego.",
        });
        navigate("/juegos");
      } finally {
        setLoading(false);
      }
    };
    loadGame();
  }, [gameId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <span className="ml-4 text-lg">Cargando el juego...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/5 via-accent/5 to-secondary/5">
      <div className="bg-background border-b">
        <div className="container py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/juegos")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a juegos
          </Button>
          <div className="text-center">
            <h1 className="text-xl font-bold">{game?.titulo}</h1>
            <p className="text-sm text-muted-foreground">{game?.categoria}</p>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-secondary" />
            <span className="font-bold">{currentScore}</span>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <Card className="p-0 overflow-hidden shadow-playful-lg">
          <div className="aspect-video bg-muted flex items-center justify-center relative">
            {game?.unityUrl ? (
              <iframe
                src={game.unityUrl}
                className="w-full h-full absolute inset-0 border-0"
                title={game.titulo}
                allow="autoplay; fullscreen"
              />
            ) : (
              <p>No se encontró la URL del juego.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
