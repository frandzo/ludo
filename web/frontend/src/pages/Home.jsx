// web/frontend/src/pages/Home.jsx

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import GameCard from "@/components/GameCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
// imágenes en public/ o src/assets/
const gameMath = "/game-math.png";
const gameScience = "/game-science.png";
const gameLanguage = "/game-language.png";

export default function Home() {
  const featuredGames = [
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
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <section className="py-20 container">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
              Juegos destacados
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre nuestra selección de juegos más populares.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredGames.map((game, index) => (
              <div
                key={game.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <GameCard {...game} />
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/juegos">
                Ver todos los juegos <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
        <section className="py-20 bg-gradient-hero">
          <div className="container text-center text-white">
            <div className="max-w-3xl mx-auto space-y-6 animate-slide-up">
              <h2 className="text-3xl md:text-5xl font-extrabold">
                ¿Listo para comenzar tu aventura educativa?
              </h2>
              <p className="text-lg opacity-90">
                Únete a miles de estudiantes que ya están aprendiendo de manera
                divertida.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Button variant="secondary" size="lg" asChild>
                  <Link to="/registro">Crear cuenta gratis</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-white hover:bg-white/20"
                  asChild
                >
                  <Link to="/contacto">Contactar</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
