import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../estilos/Header.css'

function Header({ secaoAtiva, setSecaoAtiva, aoClicarLogin }) {
  const [menuAberto, setMenuAberto] = useState(false)
  const { isLoggedIn, user, logout } = useAuth()
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

  const handleItemClick = (id) => {
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

        {!isLoggedIn ? (
          <button onClick={aoClicarLogin} className="login-btn">
            Entrar
          </button>
        ) : (
          <div className="user-profile" onClick={() => navigate(`/perfil/${userData.id}`)}>
            <img src={userData.avatar} alt={userData.name} className="user-avatar" />
            <span className="user-name">{userData.name}</span>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header