import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

function Login({ mostrar, fechar }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [nome, setNome] = useState('')
  const [ehCadastro, setEhCadastro] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function fazerLogin(e) {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8080/api/v1/usuario/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
      })
      
      if (response.ok) {
        const usuario = await response.json()
        
        // Verifica se o usuário está ativo
        if (!usuario.codStatus) {
          alert('Usuário inativo. Entre em contato com o administrador.')
          return
        }
        

        
        login(usuario, usuario.tipo)
        fechar()
        
        // Redireciona baseado no tipo de usuário
        if (usuario.tipo === 'profissional') {
          navigate('/dashboard-profissional')
        } else if (usuario.tipo === 'empresa') {
          navigate('/dashboard')
        } else {
          navigate('/dashboard')
        }
      } else {
        alert('Email ou senha incorretos!')
      }
    } catch (error) {
      alert('Erro ao fazer login: ' + error.message)
    }
  }



  async function fazerCadastro(e) {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8080/api/v1/usuario/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          nome, 
          email, 
          senha, 
          tipo: 'profissional' // Padrão
        })
      })
      
      if (response.ok) {
        alert('Cadastro realizado com sucesso!')
        setEhCadastro(false)
        // Limpar campos
        setNome('')
        setEmail('')
        setSenha('')
      } else {
        const error = await response.json()
        alert(error.message || 'Erro ao cadastrar!')
      }
    } catch (error) {
      alert('Erro ao cadastrar: ' + error.message)
    }
  }

  if (!mostrar) return null

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      backgroundColor: 'rgba(0,0,0,0.7)', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      zIndex: 9999,
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <div style={{ 
        background: 'white', 
        padding: '40px', 
        borderRadius: '15px', 
        width: '420px',
        position: 'relative',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        animation: 'slideIn 0.5s ease-out 0.2s both'
      }}>
        <button 
          onClick={fechar}
          style={{ 
            position: 'absolute', 
            top: '10px', 
            right: '15px', 
            background: 'none', 
            border: 'none', 
            fontSize: '25px', 
            cursor: 'pointer' 
          }}
        >
          ×
        </button>

        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          {ehCadastro ? 'Cadastro' : 'Login'}
        </h2>

        {ehCadastro ? (
          <form onSubmit={fazerCadastro}>
            <input
              type="text"
              placeholder="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              style={{ 
                width: '100%', 
                padding: '10px', 
                marginBottom: '15px', 
                border: '1px solid #ccc', 
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ 
                width: '100%', 
                padding: '10px', 
                marginBottom: '15px', 
                border: '1px solid #ccc', 
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              style={{ 
                width: '100%', 
                padding: '10px', 
                marginBottom: '20px', 
                border: '1px solid #ccc', 
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            />
            <button 
              type="submit"
              style={{ 
                width: '100%', 
                padding: '12px', 
                backgroundColor: '#28a745', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Cadastrar
            </button>
            <p style={{ textAlign: 'center', marginTop: '15px' }}>
              <a 
                href="#" 
                onClick={() => setEhCadastro(false)}
                style={{ color: '#007bff', textDecoration: 'none' }}
              >
                Já tem conta? Faça login
              </a>
            </p>
          </form>
        ) : (
          <form onSubmit={fazerLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ 
                width: '100%', 
                padding: '10px', 
                marginBottom: '15px', 
                border: '1px solid #ccc', 
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              style={{ 
                width: '100%', 
                padding: '10px', 
                marginBottom: '20px', 
                border: '1px solid #ccc', 
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            />
            <button 
              type="submit"
              style={{ 
                width: '100%', 
                padding: '12px', 
                backgroundColor: '#007bff', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Entrar
            </button>

            <p style={{ textAlign: 'center', marginTop: '10px' }}>
              <a 
                href="#" 
                onClick={() => setEhCadastro(true)}
                style={{ color: '#007bff', textDecoration: 'none' }}
              >
                Não tem uma conta? Clique aqui
              </a>
            </p>

          </form>
        )}
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-30px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  )
}

export default Login