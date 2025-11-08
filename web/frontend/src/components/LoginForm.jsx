import { useState } from 'react';
import api from '../api';

export default function LoginForm({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      onLogin(res.data.user);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded space-y-2 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-2">Iniciar Sesión</h2>
      <input name="email" placeholder="Email" onChange={handleChange} required type="email" className="w-full p-2 border rounded"/>
      <input name="password" placeholder="Contraseña" onChange={handleChange} required type="password" className="w-full p-2 border rounded"/>
      <button className="bg-green-500 text-white px-4 py-2 rounded">Entrar</button>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </form>
  );
}
