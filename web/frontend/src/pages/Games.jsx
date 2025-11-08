// web/frontend/src/pages/Games.jsx

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GameCard from "@/components/GameCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
const gameMath = "/game-math.png";
const gameScience = "/game-science.png";
const gameLanguage = "/game-language.png";

export default function Games() {
  const allGames = [
    {
      id: "1",
      title: "Matemáticas Mágicas",
      category: "Matemáticas",
      description: "Resuelve ecuaciones y acertijos en un mundo mágico.",
      image: gameMath,
      difficulty: 3,
      duration: "15-20 min",
    },
    {
      id: "2",
      title: "Laboratorio Virtual",
      category: "Ciencias",
      description: "Experimenta con reacciones químicas de forma segura.",
      image: gameScience,
      difficulty: 4,
      duration: "20-30 min",
    },
    {
      id: "3",
      title: "Aventura Lingüística",
      category: "Lenguaje",
      description: "Mejora tu vocabulario explorando mundos fantásticos.",
      image: gameLanguage,
      difficulty: 2,
      duration: "10-15 min",
    },
    {
      id: "4",
      title: "Historia Interactiva",
      category: "Historia",
      description:
        "Viaja en el tiempo y aprende sobre civilizaciones antiguas.",
      image: gameMath,
      difficulty: 3,
      duration: "25-30 min",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 py-16">
          <div className="container">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-slide-up">
              Catálogo de{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Juegos
              </span>
            </h1>
            <p
              className="text-lg text-muted-foreground max-w-2xl animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              Explora nuestra colección completa de juegos educativos para todas
              las materias.
            </p>
          </div>
        </section>
        <section className="container py-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar juegos..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4" />
              Filtrar por categoría
            </Button>
          </div>
        </section>
        <section className="container pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allGames.map((game, index) => (
              <div
                key={game.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <GameCard {...game} />
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
