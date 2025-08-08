import { useState } from 'react'

function ModernMenu({ activeTab, setActiveTab, onLoginClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { id: 'professionals', label: 'Profissionais', icon: '👥' },
    { id: 'projects', label: 'Projetos', icon: '💼' },
    { id: 'services', label: 'Serviços', icon: '⚡' },
    { id: 'about', label: 'Sobre', icon: '📋' }
  ]

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
      {/* Desktop Menu */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1rem',
              borderRadius: '12px',
              border: 'none',
              background: activeTab === item.id ? 'rgba(255,255,255,0.15)' : 'transparent',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontSize: '0.95rem',
              fontWeight: '500',
              position: 'relative'
            }}
            onMouseOver={(e) => {
              if (activeTab !== item.id) {
                e.target.style.background = 'rgba(255,255,255,0.1)'
                e.target.style.transform = 'translateY(-1px)'
              }
            }}
            onMouseOut={(e) => {
              if (activeTab !== item.id) {
                e.target.style.background = 'transparent'
                e.target.style.transform = 'translateY(0)'
              }
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
            <span>{item.label}</span>
            {activeTab === item.id && (
              <div style={{
                position: 'absolute',
                bottom: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                height: '2px',
                background: 'white',
                borderRadius: '1px'
              }} />
            )}
          </button>
        ))}
      </nav>

      {/* Login Button */}
      <button
        onClick={onLoginClick}
        style={{
          padding: '0.75rem 1.5rem',
          borderRadius: '12px',
          border: '2px solid rgba(255,255,255,0.3)',
          background: 'rgba(255,255,255,0.1)',
          color: 'white',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          fontSize: '0.95rem',
          fontWeight: '600',
          backdropFilter: 'blur(10px)'
        }}
        onMouseOver={(e) => {
          e.target.style.background = 'rgba(255,255,255,0.2)'
          e.target.style.borderColor = 'rgba(255,255,255,0.5)'
          e.target.style.transform = 'translateY(-1px)'
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'rgba(255,255,255,0.1)'
          e.target.style.borderColor = 'rgba(255,255,255,0.3)'
          e.target.style.transform = 'translateY(0)'
        }}
      >
        Entrar
      </button>
    </div>
  )
}

export default ModernMenu