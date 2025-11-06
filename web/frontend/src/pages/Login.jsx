// web/frontend/src/pages/Login.jsx

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gamepad2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);

      toast.success("¡Bienvenido!", {
        description: "Has iniciado sesión exitosamente.",
      });

      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      if (userData.rol === "docente" || userData.rol === "admin") {
        navigate("/dashboard/docente", { replace: true });
      } else {
        navigate(from === "/" ? "/dashboard" : from, { replace: true });
      }
    } catch (error) {
      toast.error("Error de autenticación", {
        description:
          error.response?.data?.error || "Email o contraseña incorrectos",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 p-4">
      <div className="w-full max-w-md">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" /> Volver al inicio
          </Link>
        </Button>

        <div className="bg-card rounded-2xl shadow-playful-lg p-8 space-y-6 animate-bounce-in">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-hero mb-4 shadow-playful">
              <Gamepad2 className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold">Iniciar sesión</h1>
            <p className="text-muted-foreground">
              Continúa tu aventura educativa
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              variant="hero"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Los estudiantes son registrados por docentes o administradores.
          </p>
        </div>
      </div>
    </div>
  );
}
