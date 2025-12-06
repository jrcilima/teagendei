import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const { login, loading, user } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      navigate('/dashboard'); // ou rota que você usa
    } catch (err: any) {
      console.error(err);
      setError('Credenciais inválidas');
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Carregando...</div>;
  }

  if (user) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="flex flex-col max-w-md mx-auto mt-16 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Entrar</h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Seu email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
