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

  function fazerLogin(e) {
    e.preventDefault()
    alert('Login feito com: ' + email)
    fechar()
  }

  function entrarModoDesenvolvedor() {
    login({ nome: 'Dev User', email: 'dev@test.com' }, 'cliente')
    fechar()
    navigate('/dashboard')
  }

  function fazerCadastro(e) {
    e.preventDefault()
    alert('Cadastro feito para: ' + nome)
    setEhCadastro(false)
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
            <p style={{ textAlign: 'center', marginTop: '15px' }}>
              <a href="#" style={{ color: '#007bff', textDecoration: 'none' }}>
                Esqueceu a senha?
              </a>
            </p>
            <p style={{ textAlign: 'center', marginTop: '10px' }}>
              <a 
                href="#" 
                onClick={() => setEhCadastro(true)}
                style={{ color: '#007bff', textDecoration: 'none' }}
              >
                Não tem uma conta? Clique aqui
              </a>
            </p>
            
            <div style={{ 
              borderTop: '1px solid #eee', 
              marginTop: '20px', 
              paddingTop: '15px' 
            }}>
              <button 
                type="button"
                onClick={entrarModoDesenvolvedor}
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  backgroundColor: '#6c757d', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer',
                  fontSize: '14px',
                  opacity: '0.8'
                }}
              >
                🚀 Modo Dev
              </button>
            </div>
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