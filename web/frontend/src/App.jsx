import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import UserProfile from './components/UserProfile';

export default function App() {
  const [loggedUser, setLoggedUser] = useState(null);

  return (
    <Router>
      <nav className="p-4 bg-gray-200 flex justify-center space-x-4">
        <Link to="/">Inicio</Link>
        {!loggedUser && <Link to="/login">Login</Link>}
        {!loggedUser && <Link to="/register">Registro</Link>}
        {loggedUser && <Link to="/perfil">Perfil</Link>}
      </nav>

      <Routes>
        <Route path="/" element={<h1 className="text-center text-2xl mt-10">Bienvenido a la App 👋</h1>} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm onLogin={setLoggedUser} />} />
        <Route path="/perfil" element={<UserProfile onLogout={() => setLoggedUser(null)} />} />
      </Routes>
    </Router>
  );
}
