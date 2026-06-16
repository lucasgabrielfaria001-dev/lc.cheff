import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authService } from '../services/api';
import { setUser, setToken } from '../redux/authSlice';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await authService.login(email, password);
      dispatch(setUser(response.data.user));
      dispatch(setToken(response.data.token));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded mb-6"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:bg-gray-400"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p className="text-center mt-4">
        Não tem conta? <Link to="/register" className="text-blue-600 hover:underline">Registre-se</Link>
      </p>
    </div>
  );
}
