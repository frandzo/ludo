import { useState } from 'react';
import api from '../api';

export default function RegisterForm() {
  const [form, setForm] = useState({ nombre: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error al registrar');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded space-y-2 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-2">Registro</h2>
      <input name="nombre" placeholder="Nombre" onChange={handleChange} required className="w-full p-2 border rounded"/>
      <input name="email" placeholder="Email" onChange={handleChange} required type="email" className="w-full p-2 border rounded"/>
      <input name="password" placeholder="Contraseña" onChange={handleChange} required type="password" className="w-full p-2 border rounded"/>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Registrarse</button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </form>
  );
}
