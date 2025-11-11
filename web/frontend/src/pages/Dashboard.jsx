// web/frontend/src/pages/Dashboard.jsx

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Target,
  Clock,
  TrendingUp,
  Award,
  Star,
  Loader2,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import api from "@/utils/api";

export default function Dashboard() {
  const { user } = useAuth();

  const { data: progressHistory, isLoading: isLoadingHistory } = useQuery({
    queryKey: ["progress", user?.id],
    queryFn: () =>
      api.get(`/api/usuarios/${user.id}/progreso`).then((res) => res.data),
    enabled: !!user, // solo ejecutar la consulta si el usuario está cargado
  });

  // calcular estadísticas basadas en los datos (datos reales)
  const totalPoints =
    progressHistory?.reduce((sum, item) => sum + item.puntaje, 0) || 0;
  const gamesCompleted = progressHistory?.length || 0;
  const totalTimeSeconds =
    progressHistory?.reduce(
      (sum, item) => sum + item.tiempo_jugado_segundos,
      0
    ) || 0;
  const totalTimeHours = (totalTimeSeconds / 3600).toFixed(1);

  const stats = [
    {
      label: "Juegos completados",
      value: gamesCompleted,
      icon: Trophy,
      color: "text-primary",
    },
    {
      label: "Puntos totales",
      value: totalPoints.toLocaleString(),
      icon: Star,
      color: "text-secondary",
    },
    {
      label: "Tiempo jugado",
      value: `${totalTimeHours}h`,
      icon: Clock,
      color: "text-accent",
    },
    {
      label: "Nivel actual",
      value: "15",
      icon: TrendingUp,
      color: "text-primary",
    }, // TODO: hacer funcional el cálculo de "Nivel actual" (no hace mucha falta por ahora)
  ];

  const recentGames = progressHistory?.slice(0, 3) || [];

  const achievements = [
    {
      name: "Primera Victoria",
      description: "Completa tu primer juego",
      unlocked: gamesCompleted > 0,
    },
    {
      name: "Estudiante Dedicado",
      description: "Juega 5 días seguidos",
      unlocked: true,
    }, // Lógica a implementar
    {
      name: "Maestro Matemático",
      description: "Completa 10 juegos de matemáticas",
      unlocked: false,
    },
    {
      name: "Científico Estrella",
      description: "Obtén puntuación perfecta en ciencias",
      unlocked: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
        <div className="container py-12">
          <div className="mb-8 animate-slide-up">
            <h1 className="text-4xl font-extrabold mb-2">
              ¡Hola,{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {user?.nombre}
              </span>
              !
            </h1>
            <p className="text-muted-foreground">
              Continuá tu progreso y desbloquea nuevos logros
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="p-6 shadow-playful hover:shadow-playful-lg transition-all hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center ${stat.color}`}
                  >
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {isLoadingHistory ? "..." : stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card
                className="p-6 shadow-playful animate-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Progreso de nivel</h3>
                    <p className="text-sm text-muted-foreground">
                      Nivel 15 → Nivel 16
                    </p>
                  </div>
                  <div className="text-3xl font-bold text-primary">75%</div>
                </div>
                <Progress value={75} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">
                  ¡Solo 250 puntos más para subir de nivel!
                </p>
              </Card>
              <Card
                className="p-6 shadow-playful animate-slide-up"
                style={{ animationDelay: "0.3s" }}
              >
                <h3 className="text-xl font-bold mb-4">Juegos recientes</h3>
                {isLoadingHistory ? (
                  <div className="flex justify-center items-center p-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <span className="ml-2">Cargando historial...</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentGames.map((game) => (
                      <div
                        key={game.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted/70 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="font-semibold">{game.titulo}</div>
                          <div className="text-sm text-muted-foreground">
                            {game.categoria} •{" "}
                            {new Date(game.fecha_juego).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-primary">
                            {game.puntaje}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            puntos
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <Button variant="outline" className="w-full mt-4">
                  Ver historial completo
                </Button>
              </Card>
            </div>
            <div className="space-y-6">
              <Card
                className="p-6 shadow-playful animate-slide-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Award className="h-5 w-5 text-secondary" />
                  <h3 className="text-xl font-bold">Logros</h3>
                </div>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        achievement.unlocked
                          ? "bg-primary/5 border-primary"
                          : "bg-muted/30 border-muted opacity-60"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            achievement.unlocked
                              ? "bg-gradient-hero"
                              : "bg-muted"
                          }`}
                        >
                          <Trophy
                            className={`h-5 w-5 ${
                              achievement.unlocked
                                ? "text-white"
                                : "text-muted-foreground"
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm">
                            {achievement.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {achievement.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-4">
                  Ver todos los logros
                </Button>
              </Card>
              <Card
                className="p-6 shadow-playful bg-gradient-playful animate-slide-up"
                style={{ animationDelay: "0.4s" }}
              >
                <Target className="h-8 w-8 text-foreground mb-3" />
                <h3 className="text-xl font-bold mb-2">Meta diaria</h3>
                <p className="text-sm mb-4">Completa 3 juegos hoy</p>
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 bg-white/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full"
                      style={{ width: "66%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold">2/3</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
