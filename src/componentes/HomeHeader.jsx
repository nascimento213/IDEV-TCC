import { Link } from 'react-router-dom'
import '../estilos/HomeHeader.css'

function HomeHeader({ aoClicarLogin }) {
  return (
    <header className="home-header">
      <div className="home-header-container">
        <Link to="/" className="home-logo">
          <img src="/src/assets/imagens/logo2.png" alt="IDev" />
          <span className="home-logo-text">IDev</span>
        </Link>
        
        <button onClick={aoClicarLogin} className="home-login-btn">
          Entrar
        </button>
      </div>
    </header>
  )
}

export default HomeHeader