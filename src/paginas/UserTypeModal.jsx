import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../assets/css/UserTypeModal.css'

function UserTypeModal({ mostrar, fechar, onSelect, showLogin }) {
  const [animating, setAnimating] = useState(false)
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (mostrar) {
      setAnimating(true)
    }
  }, [mostrar])

  const handleClose = () => {
    setAnimating(false)
    setTimeout(() => fechar(), 300)
  }

  const handleSelect = (tipo) => {
    if (isLoggedIn) {
      if (tipo === 'profissional') {
        navigate('/dashboard-profissional')
      } else {
        onSelect(tipo)
      }
      handleClose()
    } else {
      localStorage.setItem('selectedUserType', tipo)
      handleClose()
      setTimeout(() => showLogin(), 400)
    }
  }

  if (!mostrar && !animating) return null

  return (
    <div 
      className={`modal-overlay ${animating ? 'show' : ''}`}
      onClick={handleClose}
    >
      <div 
        className={`modal-container ${animating ? 'show' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="close-button"
          title="Fechar"
        >
          ✕
        </button>

        <div className="modal-header">
          <h2 className="modal-title">
            Como você quer começar?
          </h2>
          <p className="modal-subtitle">
            Escolha o perfil que melhor descreve você
          </p>
        </div>

        <div className="buttons-container">
          <button
            onClick={() => handleSelect('cliente')}
            className="user-type-button client"
          >
            <div className="button-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div className="button-title">Sou Cliente</div>
            <div className="button-description">
              Preciso contratar profissionais
            </div>
          </button>

          <button
            onClick={() => handleSelect('profissional')}
            className="user-type-button professional"
          >
            <div className="button-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </div>
            <div className="button-title">Sou Profissional</div>
            <div className="button-description">
              Quero oferecer meus serviços
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserTypeModal