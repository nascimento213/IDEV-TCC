import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Header from '../componentes/Header'
import PageTransition from '../componentes/PageTransition'
import pfp from '../assets/imagens/gato-de-terno-suit-cat.png';

// Mock data for users matching Dashboard professionals
const mockUsers = [
  {
    id: '1',
    nome: 'Samuel Nascimento',
    email: 'mumucharmoso@gmail.com',
    bio: 'Zé ruela do frontend, apaixonado por React e JavaScript. Sempre em busca de criar interfaces incríveis e funcionais.',
    foto: pfp
  },
  {
    id: '2',
    nome: 'Carlos Mendes',
    email: 'carlos.mendes@email.com',
    bio: 'Engenheiro de DevOps especializado em AWS, Docker e Kubernetes. Experiência em arquitetura de sistemas e automação de infraestrutura.',
    foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    nome: 'Mariana Costa',
    email: 'mariana.costa@email.com',
    bio: 'Designer UI/UX especializada em criar experiências digitais incríveis. Trabalho com Figma, Adobe XD e tenho conhecimento em User Research.',
    foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '4',
    nome: 'Pedro Rocha',
    email: 'pedro.rocha@email.com',
    bio: 'Engenheiro de Qualidade focado em testes automatizados. Experiência com Selenium, Jest e metodologias ágeis de desenvolvimento.',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  }
]

function Perfil() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [secaoAtiva, setSecaoAtiva] = useState('perfil')
  const [novaBio, setNovaBio] = useState('')
  const [editandoFoto, setEditandoFoto] = useState(false)
  const [podeEditar, setPodeEditar] = useState(false)

  const handleSetSecaoAtiva = (secao) => {
    setSecaoAtiva(secao)
    if (secao === 'inicio') {
      if (user?.tipo === 'profissional') {
        navigate('/dashboard-profissional')
      } else {
        navigate('/dashboard')
        setTimeout(() => {
          const event = new CustomEvent('setDashboardSection', { detail: 'inicio' })
          window.dispatchEvent(event)
        }, 50)
      }
    } else if (secao !== 'perfil') {
      if (user?.tipo === 'profissional') {
        navigate('/dashboard-profissional')
      } else {
        navigate('/dashboard')
      }
    }
  }

  // Buscar usuário da API
  const buscarUsuario = async (userId) => {
    setCarregando(true)
    try {
      const response = await fetch(`http://localhost:8080/api/v1/usuario/${userId}`)
      if (response.ok) {
        const usuarioData = await response.json()
        const bioTexto = usuarioData.bio || ''
        setUsuario({
          id: usuarioData.id,
          nome: usuarioData.nome,
          email: usuarioData.email,
          bio: bioTexto,
          foto: usuarioData.fotoPerfil || pfp,
          tipo: usuarioData.tipo
        })
        setNovaBio(bioTexto)
        setPodeEditar(user && user.id == usuarioData.id)
      } else {
        setUsuario(null)
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error)
      setUsuario(null)
    }
    setCarregando(false)
  }

  const salvarBio = async () => {
    if (novaBio === usuario.bio) return
    
    try {
      const response = await fetch(`http://localhost:8080/api/v1/usuario/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: usuario.nome,
          email: usuario.email,
          bio: novaBio,
          tipo: usuario.tipo || 'profissional'
        })
      })
      
      if (response.ok) {
        setUsuario({ ...usuario, bio: novaBio })
      }
    } catch (error) {
      console.error('Erro ao salvar bio:', error)
    }
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (file) {
      const formData = new FormData()
      formData.append('foto', file)
      
      try {
        const response = await fetch(`http://localhost:8080/api/v1/usuario/${id}/upload-foto`, {
          method: 'POST',
          body: formData
        })
        
        if (response.ok) {
          const result = await response.json()
          setUsuario({ ...usuario, foto: `http://localhost:8080${result.fotoUrl}` })
          setEditandoFoto(false)
          alert('Foto atualizada com sucesso!')
        } else {
          alert('Erro ao fazer upload da foto')
        }
      } catch (error) {
        alert('Erro ao fazer upload da foto')
      }
    }
  }

  useEffect(() => {
    if (id) {
      buscarUsuario(id)
    }
  }, [id])

  if (carregando) {
    return (
      <PageTransition>
        <Header secaoAtiva={secaoAtiva} setSecaoAtiva={handleSetSecaoAtiva} aoClicarLogin={() => navigate('/')} />
        <main style={{
          minHeight: 'calc(100vh - 70px)',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            textAlign: 'center',
            color: '#6b7280'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '4px solid #e5e7eb',
              borderTop: '4px solid #3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }}></div>
            <p>Carregando perfil...</p>
          </div>
        </main>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </PageTransition>
    )
  }

  if (!usuario) {
    return (
      <PageTransition>
        <Header secaoAtiva={secaoAtiva} setSecaoAtiva={handleSetSecaoAtiva} aoClicarLogin={() => navigate('/')} />
        <main style={{
          minHeight: 'calc(100vh - 70px)',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '3rem',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            maxWidth: '400px',
            width: '100%'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <path d="M16 16s-1.5-2-4-2-4 2-4 2"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
              </svg>
            </div>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#111827',
              margin: '0 0 1rem 0'
            }}>
              Usuário não encontrado
            </h1>
            <p style={{
              color: '#6b7280',
              marginBottom: '2rem'
            }}>
              O perfil com ID "{id}" não existe ou foi removido.
            </p>
            <button
              onClick={() => handleSetSecaoAtiva('inicio')}
              style={{
                padding: '0.75rem 1.5rem',
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
              Voltar ao início
            </button>
          </div>
        </main>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <Header secaoAtiva={secaoAtiva} setSecaoAtiva={handleSetSecaoAtiva} aoClicarLogin={() => navigate('/')} />
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
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              marginBottom: '2rem'
            }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={usuario.foto}
                  alt={usuario.nome}
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '4px solid #e5e7eb'
                  }}
                />
                {podeEditar && (
                  <button
                    onClick={() => setEditandoFoto(true)}
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                      <circle cx="12" cy="13" r="4"/>
                    </svg>
                  </button>
                )}
                {editandoFoto && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ position: 'absolute', opacity: 0, top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                  />
                )}
              </div>
              <div>
                <h1 style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#111827',
                  margin: '0 0 0.5rem 0'
                }}>
                  {usuario.nome}
                </h1>
                <p style={{
                  color: '#6b7280',
                  fontSize: '1.1rem',
                  margin: '0 0 1rem 0'
                }}>
                  {usuario.email}
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  color: '#374151'
                }}>
                  <span style={{ color: '#10b981' }}>●</span>
                  Disponível
                </div>
              </div>
            </div>

            <div>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#111827',
                margin: '0 0 1rem 0'
              }}>
                Sobre
              </h2>
              {podeEditar ? (
                <textarea
                  value={novaBio}
                  onChange={(e) => setNovaBio(e.target.value)}
                  placeholder="Conte um pouco sobre você..."
                  style={{
                    width: '100%',
                    minHeight: '100px',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db'
                    salvarBio()
                  }}
                />
              ) : (
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  margin: 0,
                  padding: '0.75rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  backgroundColor: '#f9fafb'
                }}>
                  {usuario.bio || 'Sem biografia cadastrada'}
                </p>
              )}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#111827',
                margin: '0 0 1rem 0'
              }}>
                Informações de Contato
              </h3>
              <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                <p style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  {usuario.email}
                </p>
                {user?.tipo === 'empresa' && usuario.tipo === 'profissional' && (
                  <button
                    onClick={() => navigate(`/contato-form?destinatario=${usuario.id}`)}
                    style={{
                      marginTop: '0.75rem',
                      padding: '0.5rem 1rem',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    Enviar Mensagem
                  </button>
                )}
              </div>
            </div>

            <div style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#111827',
                margin: '0 0 1rem 0'
              }}>
                Ações
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>

                <button
                  onClick={() => {
                    if (user?.tipo === 'profissional') {
                      navigate('/dashboard-profissional')
                    } else {
                      handleSetSecaoAtiva('inicio')
                    }
                  }}
                  style={{
                    padding: '0.75rem 1rem',
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                >
                  Voltar ao início
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  )
}

export default Perfil