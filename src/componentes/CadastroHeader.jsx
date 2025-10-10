import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function CadastroHeader() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const entrarModoDesenvolvedor = () => {
    login({ nome: 'Dev User', email: 'dev@test.com' }, 'cliente')
    navigate('/dashboard')
  }

  return (
    <header style={{
      background: 'linear-gradient(135deg, #000000, #1a1a1a)',
      padding: 0,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px',
        padding: '0 20px'
      }}>
        <div 
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            transition: 'transform 0.2s ease',
            textDecoration: 'none',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <img src="/src/assets/imagens/logo2.png" alt="IDev" style={{ height: '40px' }} />
          <span style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'white',
            letterSpacing: '-0.025em'
          }}>
            IDev
          </span>
        </div>
        
       {/* <button 
          onClick={entrarModoDesenvolvedor}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)'
            e.target.style.transform = 'translateY(-2px)'
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)'
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)'
            e.target.style.transform = 'translateY(0)'
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'
          }}
        >
          🚀
        </button> /* Botão de modo desenvolvedor */}
      </div>
    </header>
  )
}

export default CadastroHeader