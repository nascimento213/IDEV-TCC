// Arquivo para integrar React com o backend Java
// Coloque em src/services/api.js

const API_BASE = 'http://localhost:8080/api';

export const api = {
  // Login
  login: async (email, senha) => {
    const response = await fetch(`${API_BASE}/usuarios/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });
    return response.json();
  },

  // Cadastro
  cadastro: async (nome, email, senha, tipo = 'cliente') => {
    const response = await fetch(`${API_BASE}/usuarios/cadastro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha, tipo })
    });
    return response.json();
  },

  // Listar profissionais
  listarProfissionais: async () => {
    const response = await fetch(`${API_BASE}/usuarios/profissionais`);
    return response.json();
  },

  // Projetos
  listarProjetos: async () => {
    const response = await fetch(`${API_BASE}/projetos`);
    return response.json();
  }
};

// Exemplo de uso no componente Login.jsx:
/*
import { api } from '../services/api';

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const usuario = await api.login(email, senha);
    login(usuario, usuario.tipo);
    navigate('/dashboard');
  } catch (error) {
    alert('Erro no login');
  }
};
*/