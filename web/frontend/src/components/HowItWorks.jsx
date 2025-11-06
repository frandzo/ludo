// web/frontend/src/components/HowItWorks.jsx

import { Gamepad2, TrendingUp, Trophy } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Gamepad2,
      title: "Jugar",
      description:
        "Selecciona de nuestra colección de juegos educativos diseñados por expertos",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: TrendingUp,
      title: "Aprender",
      description:
        "Desarrolla habilidades mientras te diviertes con contenido adaptado",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: Trophy,
      title: "Progresar",
      description:
        "Desbloquea logros, sube en el ranking y celebra tu progreso",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tres simples pasos para transformar tu experiencia educativa
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-border to-transparent"></div>
              )}
              <div className="relative bg-card rounded-2xl p-8 shadow-playful hover:shadow-playful-lg transition-all hover:scale-105 text-center">
                <div
                  className={`inline-flex items-center justify-center h-20 w-20 rounded-2xl ${step.bgColor} ${step.color} mb-6 group-hover:animate-bounce-in`}
                >
                  <step.icon className="h-10 w-10" />
                </div>
                <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-gradient-hero flex items-center justify-center text-white font-bold text-xl shadow-playful">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
