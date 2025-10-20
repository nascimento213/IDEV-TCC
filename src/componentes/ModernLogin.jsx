import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function ModernLogin({ mostrar, fechar }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (mostrar) {
      setIsAnimating(true)
    }
  }, [mostrar])

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => fechar(), 200)
  }

  const handleSubmit = async (e) => {
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
        
        if (!usuario.codStatus) {
          alert('Usuário inativo. Entre em contato com o administrador.')
          return
        }
        

        
        console.log('Usuário logado:', usuario)
        console.log('Tipo do usuário:', usuario.tipo)
        
        login(usuario, usuario.tipo)
        handleClose()
        
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

  if (!mostrar && !isAnimating) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        opacity: isAnimating ? 1 : 0,
        transition: 'opacity 0.2s ease',
        padding: '1rem'
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          handleClose()
        }
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '400px',
          padding: '2rem',
          position: 'relative',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          transform: isAnimating ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(10px)',
          transition: 'all 0.2s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            color: '#6b7280',
            cursor: 'pointer',
            padding: '0.25rem',
            borderRadius: '4px',
            transition: 'color 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.color = '#374151'}
          onMouseOut={(e) => e.target.style.color = '#6b7280'}
        >
          ×
        </button>

        {/* Header */}
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#111827',
            margin: '0 0 0.5rem 0',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            Entrar na sua conta
          </h2>
          <p style={{
            color: '#6b7280',
            fontSize: '0.95rem',
            margin: 0
          }}>
            Bem-vindo de volta! Entre com seus dados.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6'
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db'
                e.target.style.boxShadow = 'none'
              }}
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6'
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db'
                e.target.style.boxShadow = 'none'
              }}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.875rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              marginTop: '0.5rem'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#2563eb'
              e.target.style.transform = 'translateY(-1px)'
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#3b82f6'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            Entrar
          </button>
        </form>



        <div style={{ 
          marginTop: '1rem', 
          textAlign: 'center',
          paddingTop: '1rem',
          borderTop: '1px solid #f3f4f6'
        }}>
          <p style={{
            color: '#6b7280',
            fontSize: '0.875rem',
            margin: 0
          }}>
            Ainda não tem conta?{' '}
            <button
              onClick={() => {
                handleClose()
                navigate('/cadastro')
              }}
              style={{
                color: '#3b82f6',
                background: 'none',
                border: 'none',
                textDecoration: 'underline',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '0.875rem',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.color = '#2563eb'}
              onMouseOut={(e) => e.target.style.color = '#3b82f6'}
            >
              Cadastre-se
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ModernLogin