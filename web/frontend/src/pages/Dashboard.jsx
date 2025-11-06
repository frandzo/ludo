// web/frontend/src/pages/Dashboard.jsx

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Target, Clock, TrendingUp, Award, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const stats = [
    {
      label: "Juegos completados",
      value: "12",
      icon: Trophy,
      color: "text-primary",
    },
    {
      label: "Puntos totales",
      value: "2,450",
      icon: Star,
      color: "text-secondary",
    },
    {
      label: "Tiempo jugado",
      value: "8.5h",
      icon: Clock,
      color: "text-accent",
    },
    {
      label: "Nivel actual",
      value: "15",
      icon: TrendingUp,
      color: "text-primary",
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
              Continúa tu progreso y desbloquea nuevos logros
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
                    <div className="text-2xl font-bold">{stat.value}</div>
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
            </div>
            <div className="space-y-6">
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
