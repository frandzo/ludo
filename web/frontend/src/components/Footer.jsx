// web/frontend/src/components/Footer.jsx

import { Link } from "react-router-dom";
import { BookOpen, Mail, Github, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t mt-20">
      <div className="container py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-gradient-hero flex items-center justify-center shadow-playful">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Ludodidactas
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Transformando la educación a través del juego y la tecnología.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Navegación</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/juegos"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Catálogo de juegos
                </Link>
              </li>
              <li>
                <Link
                  to="/ranking"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Ranking
                </Link>
              </li>
              <li>
                <Link
                  to="/contacto"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Guía para docentes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Guía para estudiantes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Preguntas frecuentes
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Síguenos</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="h-10 w-10 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Ludodidactas. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
