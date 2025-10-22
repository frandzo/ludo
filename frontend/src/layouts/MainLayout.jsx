// frontend/src/layouts/MainLayout.jsx

import { Outlet, Link } from "react-router-dom";

/*
 * define la estructura visual principal de la aplicación
 * incluye la barra de navegación y renderiza las páginas hijas
 */
export default function MainLayout({ loggedUser, onLogout }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
  };

  return (
    <div>
      <nav className="p-4 bg-gray-800 text-white flex justify-center space-x-4">
        <Link to="/">Inicio</Link>
        {!loggedUser && <Link to="/login">Login</Link>}
        {!loggedUser && <Link to="/register">Registro</Link>}
        {loggedUser && <Link to="/perfil">Perfil</Link>}
        {loggedUser && (
          <button
            onClick={handleLogout}
            className="bg-transparent hover:underline"
          >
            Cerrar Sesión
          </button>
        )}
      </nav>

      <main className="p-4">
        <Outlet /> {/* aquí se renderizarán las rutas anidadas */}
      </main>
    </div>
  );
}
