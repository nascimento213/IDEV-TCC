import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../assets/css/Header.css'

function Header({ secaoAtiva, setSecaoAtiva, aoClicarLogin }) {
  const [menuAberto, setMenuAberto] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const { isLoggedIn, user, logout, login, switchUserType } = useAuth()
  const navigate = useNavigate()
  
  const userData = {
    id: 1,
    name: 'Samuel Nascimento',
    avatar: null
  }
  
  const itensMenu = [
    { id: 'inicio', label: 'Início' },
    { id: 'profissionais', label: 'Profissionais' },
    { id: 'projetos', label: 'Projetos' },
    { id: 'sobre', label: 'Sobre' }
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-profile-container')) {
        setShowProfileMenu(false)
      }
    }
    
    if (showProfileMenu) {
      document.addEventListener('click', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showProfileMenu])

  const handleItemClick = (id) => {
    if (['dashboard-pro', 'notificacoes', 'agenda', 'avaliacoes'].includes(secaoAtiva)) {
      // Se estamos no dashboard profissional, não navegar para outras páginas
      return
    }
    
    // Se não estamos no dashboard, navegar para lá primeiro
    if (window.location.pathname !== '/dashboard') {
      navigate('/dashboard')
      setTimeout(() => {
        const event = new CustomEvent('setDashboardSection', { detail: id })
        window.dispatchEvent(event)
      }, 50)
    } else {
      setSecaoAtiva(id)
    }
    
    setMenuAberto(false)
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => navigate('/')}>
          <img src="/src/assets/imagens/logo2.png" alt="IDev" />
          <span className="logo-text">IDev</span>
        </div>
        
        <button 
          className="menu-toggle"
          onClick={() => setMenuAberto(!menuAberto)}
        >
          ☰
        </button>
        
        {secaoAtiva === 'dashboard-pro' ? (
          <nav className={`nav ${menuAberto ? 'mobile-open' : ''}`}>
            <button
              onClick={() => setSecaoAtiva('notificacoes')}
              className={`nav-item ${secaoAtiva === 'notificacoes' ? 'active' : ''}`}
            >
              Notificações
            </button>
            <button
              onClick={() => setSecaoAtiva('agenda')}
              className={`nav-item ${secaoAtiva === 'agenda' ? 'active' : ''}`}
            >
              Agenda
            </button>
            <button
              onClick={() => setSecaoAtiva('avaliacoes')}
              className={`nav-item ${secaoAtiva === 'avaliacoes' ? 'active' : ''}`}
            >
              Avaliações
            </button>
          </nav>
        ) : secaoAtiva ? (
          <nav className={`nav ${menuAberto ? 'mobile-open' : ''}`}>
            {itensMenu.map(item => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`nav-item ${secaoAtiva === item.id ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        ) : null}

        {!isLoggedIn ? (
          <div className="auth-container">
            <button onClick={aoClicarLogin} className="login-btn">
              Entrar
            </button>
          </div>
        ) : (
          <div className="user-profile-container">
            <div 
              className="user-profile" 
              onClick={(e) => {
                e.stopPropagation()
                setShowProfileMenu(!showProfileMenu)
              }}
            >
              {userData.avatar ? (
                <img src={userData.avatar} alt={userData.name} className="user-avatar" />
              ) : (
                <div className="user-avatar-placeholder">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
              )}
              <span className="user-name">{userData.name}</span>
            </div>
            {showProfileMenu && (
              <div className="profile-menu">
                <button 
                  onClick={() => {
                    navigate(`/perfil/${userData.id}`)
                    setShowProfileMenu(false)
                  }}
                  className="menu-item"
                >
                  Ver Perfil
                </button>
                <button 
                  onClick={() => {
                    navigate('/requests')
                    setShowProfileMenu(false)
                  }}
                  className="menu-item"
                >
                  Meus Requests
                </button>
                {user?.type === 'empresa' && (
                  <button 
                    onClick={() => {
                      switchUserType('profissional')
                      navigate('/dashboard-profissional')
                      setShowProfileMenu(false)
                    }}
                    className="menu-item"
                  >
                    Modo Profissional
                  </button>
                )}
                {user?.type === 'profissional' && (
                  <button 
                    onClick={() => {
                      switchUserType('empresa')
                      navigate('/dashboard')
                      setShowProfileMenu(false)
                    }}
                    className="menu-item"
                  >
                    Modo Empresa
                  </button>
                )}
                <button 
                  onClick={() => {
                    logout()
                    navigate('/')
                    setShowProfileMenu(false)
                  }}
                  className="menu-item logout"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header