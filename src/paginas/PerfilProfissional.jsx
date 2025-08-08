import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../componentes/Header'
import PageTransition from '../componentes/PageTransition'

function PerfilProfissional() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    github: '',
    linguagens: [],
    experiencia: '',
    projetos: ''
  })
  const [novaLinguagem, setNovaLinguagem] = useState('')

  const linguagensDisponiveis = [
    'JavaScript', 'Python', 'Java', 'C#', 'PHP', 'TypeScript', 
    'React', 'Node.js', 'Angular', 'Vue.js', 'C++', 'Go', 
    'Ruby', 'Swift', 'Kotlin', 'HTML/CSS', 'SQL'
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const adicionarLinguagem = (linguagem) => {
    if (!formData.linguagens.includes(linguagem)) {
      setFormData({
        ...formData,
        linguagens: [...formData.linguagens, linguagem]
      })
    }
  }

  const removerLinguagem = (linguagem) => {
    setFormData({
      ...formData,
      linguagens: formData.linguagens.filter(l => l !== linguagem)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Perfil profissional:', formData)
    navigate('/perfil/1')
  }

  return (
    <PageTransition>
      <Header secaoAtiva="perfil-profissional" setSecaoAtiva={() => {}} aoClicarLogin={() => navigate('/')} />
      
      <main style={{
        minHeight: 'calc(100vh - 70px)',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        padding: '2rem'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '2.5rem',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            marginBottom: '2rem'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#111827',
                margin: '0 0 0.5rem 0'
              }}>
                Complete seu Perfil Profissional
              </h1>
              <p style={{
                color: '#6b7280',
                fontSize: '1.1rem',
                margin: 0
              }}>
                Mostre suas habilidades e experiências para se destacar
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Nome completo
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3b82f6'
                      e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db'
                      e.target.style.boxShadow = 'none'
                    }}
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'all 0.2s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3b82f6'
                      e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db'
                      e.target.style.boxShadow = 'none'
                    }}
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  GitHub
                </label>
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6'
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db'
                    e.target.style.boxShadow = 'none'
                  }}
                  placeholder="https://github.com/seuusuario"
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Linguagens e Tecnologias
                </label>
                
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                  padding: '1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  minHeight: '60px',
                  backgroundColor: '#f9fafb'
                }}>
                  {formData.linguagens.map((linguagem, index) => (
                    <span
                      key={index}
                      style={{
                        background: '#3b82f6',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      {linguagem}
                      <button
                        type="button"
                        onClick={() => removerLinguagem(linguagem)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          padding: 0
                        }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {formData.linguagens.length === 0 && (
                    <span style={{ color: '#6b7280', fontStyle: 'italic' }}>
                      Selecione suas linguagens e tecnologias abaixo
                    </span>
                  )}
                </div>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  {linguagensDisponiveis.map((linguagem) => (
                    <button
                      key={linguagem}
                      type="button"
                      onClick={() => adicionarLinguagem(linguagem)}
                      disabled={formData.linguagens.includes(linguagem)}
                      style={{
                        padding: '0.5rem 1rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '20px',
                        background: formData.linguagens.includes(linguagem) ? '#e5e7eb' : 'white',
                        color: formData.linguagens.includes(linguagem) ? '#9ca3af' : '#374151',
                        cursor: formData.linguagens.includes(linguagem) ? 'not-allowed' : 'pointer',
                        fontSize: '0.875rem',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseOver={(e) => {
                        if (!formData.linguagens.includes(linguagem)) {
                          e.target.style.borderColor = '#3b82f6'
                          e.target.style.backgroundColor = '#eff6ff'
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!formData.linguagens.includes(linguagem)) {
                          e.target.style.borderColor = '#d1d5db'
                          e.target.style.backgroundColor = 'white'
                        }
                      }}
                    >
                      {linguagem}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Experiência Profissional
                </label>
                <textarea
                  name="experiencia"
                  value={formData.experiencia}
                  onChange={handleChange}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s ease',
                    resize: 'vertical'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6'
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db'
                    e.target.style.boxShadow = 'none'
                  }}
                  placeholder="Descreva sua experiência profissional, cargos anteriores, tempo de experiência..."
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Projetos Realizados
                </label>
                <textarea
                  name="projetos"
                  value={formData.projetos}
                  onChange={handleChange}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s ease',
                    resize: 'vertical'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6'
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db'
                    e.target.style.boxShadow = 'none'
                  }}
                  placeholder="Descreva projetos que você já trabalhou, tecnologias utilizadas, resultados alcançados..."
                />
              </div>

              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'flex-end',
                marginTop: '1rem'
              }}>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  style={{
                    padding: '0.875rem 2rem',
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#e5e7eb'
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#f3f4f6'
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '0.875rem 2rem',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#2563eb'
                    e.target.style.transform = 'translateY(-1px)'
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#3b82f6'
                    e.target.style.transform = 'translateY(0)'
                  }}
                >
                  Salvar Perfil
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </PageTransition>
  )
}

export default PerfilProfissional