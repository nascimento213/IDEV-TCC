import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/css/Carousel.css'

function Carousel({ profissionais }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(3)
  const [isAnimating, setIsAnimating] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2)
      } else {
        setItemsPerPage(3)
      }
    }
    
    updateItemsPerPage()
    window.addEventListener('resize', updateItemsPerPage)
    return () => window.removeEventListener('resize', updateItemsPerPage)
  }, [])

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => {
      const next = prev + 1
      return next >= profissionais.length - itemsPerPage + 1 ? 0 : next
    })
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => {
      const next = prev - 1
      return next < 0 ? profissionais.length - itemsPerPage : next
    })
    setTimeout(() => setIsAnimating(false), 500)
  }

  const getVisibleProfessionals = () => {
    const visible = []
    for (let i = 0; i < itemsPerPage; i++) {
      const index = (currentIndex + i) % profissionais.length
      visible.push(profissionais[index])
    }
    return visible
  }
  
  const profissionaisVisiveis = getVisibleProfessionals()

  return (
    <div className="modern-carousel">
      <div className="carousel-header">
        <h2 className="carousel-title">Profissionais em Destaque</h2>
        <div className="carousel-navigation">
          <button 
            className="nav-btn nav-btn-prev" 
            onClick={prevSlide}
            disabled={isAnimating}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button 
            className="nav-btn nav-btn-next" 
            onClick={nextSlide}
            disabled={isAnimating}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="carousel-track">
        <div 
          className="carousel-slides"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            transition: isAnimating ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
          }}
        >
          {profissionais.map((professional, index) => (
            <div 
              key={professional.id} 
              className={`professional-card-modern ${index >= currentIndex && index < currentIndex + itemsPerPage ? 'visible' : ''}`}
              style={{ 
                width: `${100 / itemsPerPage}%`,
                animationDelay: `${(index - currentIndex) * 0.1}s`
              }}
            >
              <div className="card-header">
                <div className="professional-avatar">
                  <img
                    src={`https://images.unsplash.com/photo-${professional.id === 1 ? '1472099645785-5658abf4ff4e' : professional.id === 2 ? '1507003211169-0a1dd7228f2d' : professional.id === 3 ? '1438761681033-6461ffad8d80' : '1519085360753-af0119f7c6b6'}?w=120&h=120&fit=crop&crop=face`}
                    alt={professional.name}
                  />
                  <div className="status-indicator"></div>
                </div>
                <div className="card-actions">
                  <button className="action-btn favorite">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
                  <button className="action-btn share">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="18" cy="5" r="3"/>
                      <circle cx="6" cy="12" r="3"/>
                      <circle cx="18" cy="19" r="3"/>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="card-content">
                <h3 className="professional-name-modern">{professional.name}</h3>
                <p className="professional-title-modern">{professional.title}</p>
                <p className="professional-location-modern">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {professional.location}
                </p>
                
                <div className="skills-container">
                  {professional.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="skill-chip">{skill}</span>
                  ))}
                  {professional.skills.length > 3 && (
                    <span className="skill-chip more">+{professional.skills.length - 3}</span>
                  )}
                </div>
              </div>
              
              <div className="card-footer">
                <button 
                  className="btn-modern btn-primary-modern"
                  onClick={() => navigate(`/perfil/${professional.id}`)}
                >
                  Ver Perfil
                </button>
                <button 
                  className="btn-modern btn-secondary-modern"
                  onClick={() => navigate('/chat')}
                >
                  Mensagem
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="carousel-dots">
        {Array.from({ length: Math.ceil(profissionais.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index}
            className={`dot ${index === Math.floor(currentIndex / itemsPerPage) ? 'active' : ''}`}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true)
                setCurrentIndex(index * itemsPerPage)
                setTimeout(() => setIsAnimating(false), 500)
              }
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel