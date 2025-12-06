import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiClient from '../lib/apiClient';
import { usersApi } from '../lib/api/usersApi';
import { useAuth } from '../contexts/AuthContext';

const api = new ApiClient();
const userService = usersApi(api);

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== passwordConfirm) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      // 1. Criar o usuário
      await userService.create({
        email,
        password,
        passwordConfirm,
        name,
        phone,
        role: 'cliente' // padrão inicial
      });

      // 2. Autenticar automaticamente após criar
      await login(email, password);

      // 3. Redirecionar
      navigate('/onboarding');
    } catch (err: any) {
      console.error(err);
      setError('Não foi possível criar a conta.');
    }
  };

  return (
    <div className="flex flex-col max-w-md mx-auto mt-16 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Criar Conta</h1>

      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Seu nome"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Telefone"
          className="border p-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirmar Senha"
          className="border p-2 rounded"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
        >
          Criar Conta
        </button>
      </form>
    </div>
  );
}
