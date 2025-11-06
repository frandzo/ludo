// web/frontend/src/pages/NotFound.jsx

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-primary/10 via-accent/10 to-secondary/10 p-4">
      <div className="text-center max-w-md space-y-6 animate-bounce-in">
        <div className="relative">
          <h1 className="text-9xl font-extrabold bg-linear-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            404
          </h1>
          <div className="absolute inset-0 blur-3xl opacity-20 bg-gradient-hero"></div>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Página no encontrada</h2>
          <p className="text-muted-foreground">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button variant="hero" size="lg" asChild>
            <Link to="/">
              <Home className="h-5 w-5" />
              Volver al inicio
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/juegos">
              <Search className="h-5 w-5" />
              Explorar juegos
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
