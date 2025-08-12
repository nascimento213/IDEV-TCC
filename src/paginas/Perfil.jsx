import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [secaoAtiva, setSecaoAtiva] = useState('perfil')

  const handleSetSecaoAtiva = (secao) => {
    setSecaoAtiva(secao)
    if (secao === 'inicio') {
      navigate('/dashboard')
      setTimeout(() => {
        const event = new CustomEvent('setDashboardSection', { detail: 'inicio' })
        window.dispatchEvent(event)
      }, 50)
    } else if (secao !== 'perfil') {
      navigate('/dashboard')
    }
  }

  // Mock function to simulate API call
  const buscarUsuario = async (userId) => {
    setCarregando(true)
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const usuarioEncontrado = mockUsers.find(user => user.id === userId)
    setUsuario(usuarioEncontrado || null)
    setCarregando(false)
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
        <style jsx>{`
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
              onClick={() => {
                navigate('/dashboard')
                setTimeout(() => {
                  const event = new CustomEvent('setDashboardSection', { detail: 'inicio' })
                  window.dispatchEvent(event)
                }, 100)
              }}
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
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6',
                margin: 0
              }}>
                {usuario.bio}
              </p>
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
                <p style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  ID: {usuario.id}
                </p>
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
                  style={{
                    padding: '0.75rem 1rem',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
                >
                  Enviar mensagem
                </button>
                <button
                  onClick={() => navigate('/')}
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