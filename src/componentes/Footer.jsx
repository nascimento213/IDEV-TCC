import { useNavigate } from 'react-router-dom'
import '../assets/css/Footer.css'

function Footer() {
  const navigate = useNavigate()
  
  const handleSobreClick = () => {
    navigate('/dashboard')
    setTimeout(() => {
      const event = new CustomEvent('setDashboardSection', { detail: 'sobre' })
      window.dispatchEvent(event)
    }, 100)
  }
  
  return (
    <footer className="modern-footer">
      <div className="footer-separator"></div>
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
              <span>IDev</span>
            </div>
            <p>Conectando os melhores talentos de TI com projetos inovadores.</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h3>Sobre</h3>
              <ul>
                <li><button onClick={handleSobreClick} style={{background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, font: 'inherit'}}>Sobre Nós</button></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 IDev. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer