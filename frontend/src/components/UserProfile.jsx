import { useEffect, useState } from 'react';
import api from '../api';

export default function UserProfile({ onLogout }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    api.get('/perfil', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setUser(res.data.user))
      .catch(() => onLogout());
    }, []);
    
  

  return (
    <div className="p-4 max-w-sm mx-auto border rounded">
      <h2 className="text-xl font-bold mb-2">Perfil</h2>
      {user ? (
        <>
          <p><strong>ID:</strong> {user.idusuario}</p>
          <p><strong>Rol:</strong> {user.rol}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={() => { localStorage.removeItem('token'); onLogout(); }} className="bg-red-500 text-white mt-4 px-4 py-2 rounded">
            Cerrar Sesión
          </button>
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}
