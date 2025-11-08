// web/frontend/src/components/ProtectedRoute.jsx

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading, isTeacher, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // redirigir al dashboard correcto después del login si el usuario está en una página de rol incorrecto
  if (location.pathname === "/dashboard") {
    if (isTeacher || isAdmin)
      return <Navigate to="/dashboard/docente" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.rol)) {
    // si no tiene el rol permitido, redirigir a su dashboard por defecto
    const defaultDashboard =
      isTeacher || isAdmin ? "/dashboard/docente" : "/dashboard";
    return <Navigate to={defaultDashboard} replace />;
  }

  return children;
}
