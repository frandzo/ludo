// web/frontend/src/components/Navbar.jsx

import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Gamepad2,
  User,
  LogOut,
  LayoutDashboard,
  UserPlus,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { user, isAuthenticated, logout, isTeacher, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getDashboardLink = () => {
    if (isTeacher || isAdmin) return "/dashboard/docente";
    return "/dashboard";
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="h-10 w-10 rounded-lg bg-gradient-hero flex items-center justify-center shadow-playful">
            <Gamepad2 className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Ludodidactas
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/juegos"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Juegos
          </Link>
          <Link
            to="/ranking"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Ranking
          </Link>
          <Link
            to="/contacto"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Contacto
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  {user?.nombre}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate(getDashboardLink())}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                {(isAdmin || isTeacher) && (
                  <DropdownMenuItem onClick={() => navigate("/registro")}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Registrar usuarios
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive focus:text-destructive focus:bg-destructive/10"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm" asChild>
              <Link to="/login">Iniciar sesión</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
