import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/HomeHeader.css'

function HomeHeader({ aoClicarLogin }) {
  const [showUserTypeModal, setShowUserTypeModal] = useState(false)
  return (
    <header className="home-header">
      <div className="home-header-container">
        <Link to="/" className="home-logo">
          <img src="/src/assets/imagens/logo2.png" alt="IDev" />
          <span className="home-logo-text">IDev</span>
        </Link>
        
        <div style={{ position: 'relative' }}>
          <button onClick={() => setShowUserTypeModal(!showUserTypeModal)} className="home-login-btn">
            Entrar
          </button>
          {showUserTypeModal && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '0.5rem',
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              zIndex: 1000,
              minWidth: '160px',
              overflow: 'hidden'
            }}>
              <button 
                onClick={() => {
                  setShowUserTypeModal(false)
                  aoClicarLogin('cliente')
                }}
                style={{
                  padding: '0.75rem 1rem',
                  background: 'none',
                  border: 'none',
                  color: '#374151',
                  fontWeight: '500',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  fontSize: '0.9rem',
                  borderBottom: '1px solid #f3f4f6'
                }}
                onMouseOver={(e) => e.target.style.background = '#f8fafc'}
                onMouseOut={(e) => e.target.style.background = 'none'}
              >
                Sou Cliente
              </button>
              <button 
                onClick={() => {
                  setShowUserTypeModal(false)
                  aoClicarLogin('profissional')
                }}
                style={{
                  padding: '0.75rem 1rem',
                  background: 'none',
                  border: 'none',
                  color: '#374151',
                  fontWeight: '500',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  fontSize: '0.9rem'
                }}
                onMouseOver={(e) => e.target.style.background = '#f8fafc'}
                onMouseOut={(e) => e.target.style.background = 'none'}
              >
                Sou Profissional
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default HomeHeader