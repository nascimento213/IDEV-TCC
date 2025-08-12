import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../estilos/Header.css'

function Header({ secaoAtiva, setSecaoAtiva, aoClicarLogin }) {
  const [menuAberto, setMenuAberto] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const { isLoggedIn, user, logout, login, switchUserType } = useAuth()
  const navigate = useNavigate()
  
  const userData = {
    id: 1,
    name: 'Samuel Nascimento',
    avatar: '/src/assets/imagens/gato-de-terno-suit-cat.png'
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
    setSecaoAtiva(id)
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
        ) : (
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
        )}

        {!isLoggedIn ? (
          <div className="auth-container">
            <button onClick={aoClicarLogin} className="login-btn">
              Entrar
            </button>
            <div className="user-profile-container">
              <button 
                className="dev-mode-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowProfileMenu(!showProfileMenu)
                }}
              >
                🚀
              </button>
              {showProfileMenu && (
                <div className="profile-menu">
                  <button 
                    onClick={() => {
                      login({ nome: 'Dev User', email: 'dev@test.com' }, 'cliente')
                      navigate('/dashboard')
                      setShowProfileMenu(false)
                    }}
                    className="menu-item dev-mode"
                  >
                    🚀 Modo Dev
                  </button>
                </div>
              )}
            </div>
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
              <img src={userData.avatar} alt={userData.name} className="user-avatar" />
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
                {user?.type === 'cliente' && (
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
                      switchUserType('cliente')
                      navigate('/dashboard')
                      setShowProfileMenu(false)
                    }}
                    className="menu-item"
                  >
                    Modo Cliente
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