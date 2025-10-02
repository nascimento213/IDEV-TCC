// API Service para integração com backend Java
const API_BASE = 'http://localhost:8080/api/v1';

export const api = {
  // Usuários
  login: async (email, senha) => {
    const response = await fetch(`${API_BASE}/usuario/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });
    return response.json();
  },

  cadastro: async (nome, email, senha, tipo = 'cliente') => {
    const response = await fetch(`${API_BASE}/usuario/cadastro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha, tipo })
    });
    return response.json();
  },

  listarProfissionais: async () => {
    const response = await fetch(`${API_BASE}/usuario/profissionais`);
    return response.json();
  },

  buscarUsuario: async (id) => {
    const response = await fetch(`${API_BASE}/usuario/${id}`);
    return response.json();
  },

  // Projetos
  listarProjetos: async () => {
    const response = await fetch(`${API_BASE}/projeto`);
    return response.json();
  },

  listarProjetosAbertos: async () => {
    const response = await fetch(`${API_BASE}/projeto/abertos`);
    return response.json();
  },

  criarProjeto: async (projeto) => {
    const response = await fetch(`${API_BASE}/projeto`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projeto)
    });
    return response.json();
  },

  // Requests
  criarRequest: async (request) => {
    const response = await fetch(`${API_BASE}/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    return response.json();
  },

  listarRequestsDoUsuario: async (usuarioId) => {
    const response = await fetch(`${API_BASE}/request/usuario/${usuarioId}`);
    return response.json();
  },

  deletarRequest: async (id) => {
    const response = await fetch(`${API_BASE}/request/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  },

  contarRequests: async () => {
    const response = await fetch(`${API_BASE}/request/count`);
    return response.json();
  }
};