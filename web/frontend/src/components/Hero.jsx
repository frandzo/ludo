// web/frontend/src/components/Hero.jsx

import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Sparkles, PlayCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5"></div>
      <div className="absolute top-20 left-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl animate-float"></div>
      <div
        className="absolute bottom-20 right-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl animate-float"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium shadow-playful">
              <Sparkles className="h-4 w-4" />
              Plataforma educativa gamificada
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Aprender jugando{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                nunca fue tan fácil
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              Combina juegos interactivos con seguimiento educativo. Diseñada
              para estudiantes de secundaria y docentes comprometidos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/juegos">
                  <PlayCircle className="h-5 w-5" />
                  Explorar juegos
                </Link>
              </Button>
            </div>
            <div className="flex gap-8 pt-8">
              <div>
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">
                  Juegos educativos
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">1000+</div>
                <div className="text-sm text-muted-foreground">
                  Estudiantes activos
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">98%</div>
                <div className="text-sm text-muted-foreground">
                  Satisfacción
                </div>
              </div>
            </div>
          </div>
          <div className="relative animate-bounce-in">
            <div className="absolute inset-0 bg-gradient-hero rounded-3xl blur-3xl opacity-20"></div>
            <img
              src="/hero-illustration.png"
              alt="Estudiantes aprendiendo con tecnología"
              className="relative z-10 w-full rounded-3xl shadow-playful-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
