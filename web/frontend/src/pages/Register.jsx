// web/frontend/src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { UserPlus, Eye, EyeOff, AlertCircle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Register() {
  const navigate = useNavigate();
  const { user, isAdmin, isTeacher } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    rol: "estudiante",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Error", { description: "Las contraseñas no coinciden" });
      return;
    }
    setLoading(true);
    try {
      const endpoint = isAdmin ? "/auth/register" : "/api/usuarios";
      await api.post(endpoint, {
        nombre: form.nombre,
        email: form.email,
        password: form.password,
        rol: form.rol,
      });
      toast.success("¡Usuario registrado!", {
        description: `${form.nombre} ha sido registrado como ${form.rol}.`,
      });
      setForm({
        nombre: "",
        email: "",
        password: "",
        confirmPassword: "",
        rol: "estudiante",
      });
      navigate("/dashboard/docente");
    } catch (error) {
      toast.error("Error en el registro", {
        description:
          error.response?.data?.error || "No se pudo registrar el usuario",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 p-4">
      <Card className="w-full max-w-md p-8 shadow-playful-lg animate-bounce-in">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="absolute top-4 left-4"
        >
          <Link to={isAdmin || isTeacher ? "/dashboard/docente" : "/"}>
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Link>
        </Button>
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-2xl bg-gradient-hero flex items-center justify-center">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-extrabold text-center mb-2">
          Registrar Usuario
        </h1>
        <p className="text-center text-muted-foreground mb-6">
          {isAdmin
            ? "Registra docentes o estudiantes"
            : "Registra nuevos estudiantes"}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Nombre completo
            </label>
            <Input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre del usuario"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="email@ejemplo.com"
              required
            />
          </div>
          {isAdmin && (
            <div>
              <label className="block text-sm font-semibold mb-2">Rol</label>
              <Select
                value={form.rol}
                onValueChange={(value) => setForm({ ...form, rol: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="estudiante">Estudiante</SelectItem>
                  <SelectItem value="docente">Docente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Contraseña
            </label>
            <Input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Confirmar contraseña
            </label>
            <Input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Repite la contraseña"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            variant="hero"
            size="lg"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrar usuario"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
