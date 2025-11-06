// web/frontend/src/pages/GamePlay.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trophy, Star, Target } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";

export default function GamePlay() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    const loadGame = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/juegos/${gameId}`);
        setGame(response.data);
      } catch (error) {
        console.error("Error loading game:", error);
        navigate("/juegos"); // Redirige si el juego no se encuentra
      } finally {
        setLoading(false);
      }
    };
    loadGame();
  }, [gameId, navigate]);

  const handleGameCompleted = async (finalScore) => {
    try {
      await api.post("/api/juegos/completar", {
        juegoId: gameId,
        puntaje: finalScore,
      });
      navigate("/dashboard", {
        state: { message: `¡Juego completado! Obtuviste ${finalScore} puntos` },
      });
    } catch (error) {
      console.error("Error saving game result:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
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
        <div className="lg:col-span-3">
          <Card className="p-0 overflow-hidden shadow-playful-lg">
            <div className="aspect-video bg-muted flex items-center justify-center relative">
              <iframe
                src={game?.unityUrl}
                className="w-full h-full absolute inset-0 border-0"
                title={game?.titulo}
                allow="autoplay; fullscreen"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
