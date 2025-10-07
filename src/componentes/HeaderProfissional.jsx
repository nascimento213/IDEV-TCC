import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../assets/css/HeaderProfissional.css'

function HeaderProfissional({ secaoAtiva, setSecaoAtiva, aoClicarLogin }) {
  const [menuAberto, setMenuAberto] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const { isLoggedIn, user, logout, switchUserType } = useAuth()
  const navigate = useNavigate()
  
  const userData = {
    id: 1,
    name: 'Samuel Nascimento',
    avatar: '/src/assets/imagens/gato-de-terno-suit-cat.png'
  }

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

  const handleNavigation = (secao) => {
    setSecaoAtiva(secao)
    setMenuAberto(false)
    
    switch(secao) {
      case 'inicio':
        navigate('/dashboard-profissional')
        break
      case 'perfil-profissional':
        navigate('/perfil-profissional')
        break
      case 'chat':
        navigate('/chat')
        break
      case 'notificacoes':
      case 'agenda':
      case 'avaliacoes':
        // Estas seções são internas do dashboard
        break
      default:
        break
    }
  }

  return (
    <header className="header-profissional">
      <div className="header-container">
        <div className="logo" onClick={() => { navigate('/dashboard-profissional'); setSecaoAtiva('inicio'); }}>
          <img src="/src/assets/imagens/logo2.png" alt="IDev" />
          <span className="logo-text">IDev</span>
        </div>
        
        <button 
          className="menu-toggle"
          onClick={() => setMenuAberto(!menuAberto)}
        >
          ☰
        </button>
        
        <nav className={`nav ${menuAberto ? 'mobile-open' : ''}`}>
          <button
            onClick={() => handleNavigation('inicio')}
            className={`nav-item ${secaoAtiva === 'inicio' ? 'active' : ''}`}
          >
            Início
          </button>
          <button
            onClick={() => handleNavigation('notificacoes')}
            className={`nav-item ${secaoAtiva === 'notificacoes' ? 'active' : ''}`}
          >
            Notificações
          </button>
          <button
            onClick={() => handleNavigation('agenda')}
            className={`nav-item ${secaoAtiva === 'agenda' ? 'active' : ''}`}
          >
            Agenda
          </button>
          <button
            onClick={() => handleNavigation('avaliacoes')}
            className={`nav-item ${secaoAtiva === 'avaliacoes' ? 'active' : ''}`}
          >
            Avaliações
          </button>
        </nav>

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
                  navigate('/perfil-profissional')
                  setShowProfileMenu(false)
                }}
                className="menu-item"
              >
                Editar Perfil
              </button>
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
      </div>
    </header>
  )
}

export default HeaderProfissional