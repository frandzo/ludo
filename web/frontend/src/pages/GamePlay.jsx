// web/frontend/src/pages/GamePlay.jsx

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Star, Loader2, PartyPopper } from "lucide-react";
import { toast } from "sonner";
import api from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function GamePlay() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth(); // obtener el estado de autenticación
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unityInstance, setUnityInstance] = useState(null);
  const [visitorScore, setVisitorScore] = useState(0); // estado para el puntaje del visitante
  const [showVisitorModal, setShowVisitorModal] = useState(false); // estado para el modal

  const handleGameCompleted = useCallback(
    (finalScore) => {
      if (isAuthenticated) {
        toast.success("¡Juego completado!", {
          description: `Obtuviste ${finalScore} puntos. Tu progreso ha sido guardado.`,
        });
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        // si es visitante, guardar el puntaje y mostrar el modal
        setVisitorScore(finalScore);
        setShowVisitorModal(true);
      }
    },
    [isAuthenticated, navigate]
  );

  useEffect(() => {
    window.handleGameCompleted = handleGameCompleted;
    return () => {
      delete window.handleGameCompleted;
    };
  }, [handleGameCompleted]);

  useEffect(() => {
    const loadGameDetails = async () => {
      try {
        const response = await api.get(`/api/juegos/${gameId}`);
        setGame(response.data);
      } catch (error) {
        toast.error("Juego no encontrado");
        navigate("/juegos");
      }
    };
    loadGameDetails();
  }, [gameId, navigate]);

  useEffect(() => {
    if (game) {
      const script = document.createElement("script");

      // ruta dinámica
      const basePath = `/games/${gameId}/Build`;
      script.src = `${basePath}/${gameId}.loader.js`;

      script.onload = () => {
        // la variable createUnityInstance es global gracias al script loader.js
        window
          .createUnityInstance(
            document.querySelector("#unity-canvas"),
            {
              // rutas dinámicas
              dataUrl: `${basePath}/${gameId}.data`,
              frameworkUrl: `${basePath}/${gameId}.framework.js`,
              codeUrl: `${basePath}/${gameId}.wasm`,
            },
            (progress) => {
              console.log(`Cargando juego: ${Math.round(progress * 100)}%`);
            }
          )
          .then((instance) => {
            setUnityInstance(instance);
            setLoading(false);
            const token = localStorage.getItem("token");

            // crear el objeto con los datos
            let authData = {};
            if (isAuthenticated) {
              const token = localStorage.getItem("token");
              authData = { token, gameId };
            }

            // enviar el objeto como un string JSON (pueden estar vacíos si es visitante)
            instance.SendMessage(
              "LoginManagerObject",
              "StartGameWithData",
              JSON.stringify(authData)
            );
          })
          .catch((err) => {
            console.error("Error al instanciar Unity:", err);
            toast.error("No se pudo cargar el juego.");
          });
      };
      document.body.appendChild(script);

      return () => {
        if (unityInstance) {
          unityInstance.Quit();
        }
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game, user]);

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
            <span className="font-bold">--</span>
          </div>
        </div>
      </div>

      {/* Modal para visitantes */}
      <AlertDialog open={showVisitorModal} onOpenChange={setShowVisitorModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              <PartyPopper className="h-12 w-12 mx-auto text-primary mb-4" />
              ¡Felicidades, has completado el juego!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-lg">
              Tu puntaje fue de:{" "}
              <span className="font-bold text-xl text-primary">
                {visitorScore}
              </span>
              <br />
              <br />
              Para guardar tu progreso y competir en el ranking, necesitas una
              cuenta.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
            <Button
              variant="outline"
              onClick={() => setShowVisitorModal(false)}
            >
              Volver a los juegos
            </Button>
            <Button variant="hero" onClick={() => navigate("/login")}>
              Iniciar sesión / Registrarse
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="container py-8">
        <Card className="p-0 overflow-hidden shadow-playful-lg">
          <div className="aspect-video bg-muted flex items-center justify-center relative">
            {loading && (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <span>Cargando el juego...</span>
              </div>
            )}
            <canvas
              id="unity-canvas"
              style={{
                width: "100%",
                height: "100%",
                display: loading ? "none" : "block",
              }}
            ></canvas>
          </div>
        </Card>
      </div>
    </div>
  );
}
