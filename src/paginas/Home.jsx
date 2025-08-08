import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import HomeHeader from '../componentes/HomeHeader'
import ModernLogin from '../componentes/ModernLogin'
import UserTypeModal from './UserTypeModal'
import PageTransition from '../componentes/PageTransition'
import '../estilos/Home.css'

function Home() {
  const [mostrarLogin, setMostrarLogin] = useState(false)
  const [mostrarModal, setMostrarModal] = useState(false)
  const [textoAnimado, setTextoAnimado] = useState('')
  const [showUserTypeModal, setShowUserTypeModal] = useState(false)
  const { isLoggedIn, user } = useAuth()
  const navigate = useNavigate()

  const handleUserTypeSelect = (tipo) => {
    if (tipo === 'profissional') {
      navigate('/perfil-profissional')
    } else {
      navigate('/dashboard')
    }
  }

  const handleComecarAgora = () => {
    if (isLoggedIn) {
      if (user?.type === 'profissional') {
        navigate('/perfil-profissional')
      } else {
        navigate('/dashboard')
      }
    } else {
      setShowUserTypeModal(true)
    }
  }
  
  const textoCompleto = 'Conecte-se com os melhores profissionais de TI'

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < textoCompleto.length) {
        setTextoAnimado(textoCompleto.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 50)
    return () => clearInterval(timer)
  }, [])

  return (
    <PageTransition>
      <HomeHeader 
        aoClicarLogin={() => setMostrarLogin(true)}
      />

      <main style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: 'calc(100vh - 70px)', 
        textAlign: 'center', 
        padding: '2rem',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
      }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          color: '#212529', 
          marginBottom: '1rem',
          animation: 'fadeInUp 1s ease-out'
        }}>
          Bem-vindo ao IDev
        </h1>
        
        <p style={{ 
          fontSize: '1.5rem', 
          color: '#6c757d', 
          marginBottom: '3rem',
          minHeight: '2rem'
        }}>
          {textoAnimado}
        </p>

        <button 
          onClick={handleComecarAgora}
          style={{ 
            padding: '15px 40px', 
            fontSize: '1.2rem', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '50px', 
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0,123,255,0.3)',
            transition: 'all 0.3s ease',
            animation: 'pulse 2s infinite'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-5px)'
            e.target.style.boxShadow = '0 15px 40px rgba(0,0,0,0.4)'
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)'
          }}
        >
          Começar Agora
        </button>

        <div style={{ 
          marginTop: '4rem', 
          display: 'flex', 
          gap: '3rem',
          animation: 'fadeIn 2s ease-out'
        }}>
          <div style={{ textAlign: 'center', color: '#495057' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </div>
            <h3>Desenvolvedores</h3>
            <p>Profissionais qualificados</p>
          </div>
          <div style={{ textAlign: 'center', color: '#495057' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3>Projetos</h3>
            <p>Oportunidades incríveis</p>
          </div>
          <div style={{ textAlign: 'center', color: '#495057' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            </div>
            <h3>Resultados</h3>
            <p>Sucesso garantido</p>
          </div>
        </div>
      </main>

      <ModernLogin mostrar={mostrarLogin} fechar={() => setMostrarLogin(false)} />
      <UserTypeModal 
        mostrar={showUserTypeModal} 
        fechar={() => setShowUserTypeModal(false)}
        onSelect={handleUserTypeSelect}
        showLogin={() => {
          setShowUserTypeModal(false)
          setMostrarLogin(true)
        }}
      />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </PageTransition>
  )
}

export default Home