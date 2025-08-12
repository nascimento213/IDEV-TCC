import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Header from '../componentes/Header'
import HeaderProfissional from '../componentes/HeaderProfissional'
import PageTransition from '../componentes/PageTransition'

const mockConversas = [
  {
    id: 1,
    nome: 'Carlos Mendes',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
    ultimaMensagem: 'Oi! Vi seu perfil e gostaria de conversar sobre o projeto.',
    horario: '14:30',
    naoLidas: 2,
    online: true
  },
  {
    id: 2,
    nome: 'Mariana Costa',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
    ultimaMensagem: 'Perfeito! Quando podemos começar?',
    horario: '12:15',
    naoLidas: 0,
    online: false
  },
  {
    id: 3,
    nome: 'Pedro Rocha',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
    ultimaMensagem: 'Obrigado pela ajuda com os testes!',
    horario: 'Ontem',
    naoLidas: 0,
    online: true
  }
]

const mockMensagens = [
  { id: 1, texto: 'Oi! Vi seu perfil e gostaria de conversar sobre o projeto.', enviada: false, horario: '14:25' },
  { id: 2, texto: 'Olá! Claro, vamos conversar. Qual projeto você tem em mente?', enviada: true, horario: '14:27' },
  { id: 3, texto: 'É um e-commerce em React. Preciso de alguém experiente no frontend.', enviada: false, horario: '14:30' },
  { id: 4, texto: 'Perfeito! Tenho bastante experiência com React e e-commerce. Podemos agendar uma call?', enviada: true, horario: '14:32' }
]

function Chat() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [secaoAtiva, setSecaoAtiva] = useState('chat')
  const [conversaSelecionada, setConversaSelecionada] = useState(mockConversas[0])
  const [mensagens, setMensagens] = useState(mockMensagens)
  const [novaMensagem, setNovaMensagem] = useState('')

  const handleSetSecaoAtiva = (secao) => {
    setSecaoAtiva(secao)
    if (secao === 'chat') {
      // Manter na página de chat
      return
    }
    if (user?.type === 'profissional') {
      navigate('/dashboard-profissional')
    } else {
      navigate('/dashboard')
    }
  }

  const enviarMensagem = () => {
    if (novaMensagem.trim()) {
      const nova = {
        id: mensagens.length + 1,
        texto: novaMensagem,
        enviada: true,
        horario: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }
      setMensagens([...mensagens, nova])
      setNovaMensagem('')
    }
  }

  return (
    <PageTransition>
      {user?.type === 'profissional' ? (
        <HeaderProfissional secaoAtiva="" setSecaoAtiva={handleSetSecaoAtiva} aoClicarLogin={() => navigate('/')} />
      ) : (
        <Header secaoAtiva="" setSecaoAtiva={handleSetSecaoAtiva} aoClicarLogin={() => navigate('/')} />
      )}
      
      <main style={{
        minHeight: 'calc(100vh - 70px)',
        background: '#f8fafc',
        display: 'flex'
      }}>
        {/* Lista de Conversas */}
        <div style={{
          width: '320px',
          background: 'white',
          borderRight: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid #e2e8f0'
          }}>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#1e293b',
              margin: 0
            }}>
              Mensagens
            </h2>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {mockConversas.map(conversa => (
              <div
                key={conversa.id}
                onClick={() => setConversaSelecionada(conversa)}
                style={{
                  padding: '1rem 1.5rem',
                  borderBottom: '1px solid #f1f5f9',
                  cursor: 'pointer',
                  background: conversaSelecionada.id === conversa.id ? '#f8fafc' : 'white',
                  transition: 'background 0.2s ease'
                }}
                onMouseOver={(e) => {
                  if (conversaSelecionada.id !== conversa.id) {
                    e.target.style.background = '#f8fafc'
                  }
                }}
                onMouseOut={(e) => {
                  if (conversaSelecionada.id !== conversa.id) {
                    e.target.style.background = 'white'
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ position: 'relative' }}>
                    <img
                      src={conversa.avatar}
                      alt={conversa.nome}
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                    {conversa.online && (
                      <div style={{
                        position: 'absolute',
                        bottom: '2px',
                        right: '2px',
                        width: '12px',
                        height: '12px',
                        background: '#10b981',
                        border: '2px solid white',
                        borderRadius: '50%'
                      }} />
                    )}
                  </div>
                  
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{
                        fontSize: '0.95rem',
                        fontWeight: '600',
                        color: '#1e293b',
                        margin: 0
                      }}>
                        {conversa.nome}
                      </h3>
                      <span style={{
                        fontSize: '0.75rem',
                        color: '#64748b'
                      }}>
                        {conversa.horario}
                      </span>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
                      <p style={{
                        fontSize: '0.85rem',
                        color: '#64748b',
                        margin: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {conversa.ultimaMensagem}
                      </p>
                      {conversa.naoLidas > 0 && (
                        <span style={{
                          background: '#3b82f6',
                          color: 'white',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          padding: '0.125rem 0.5rem',
                          borderRadius: '10px',
                          minWidth: '18px',
                          textAlign: 'center'
                        }}>
                          {conversa.naoLidas}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Área de Chat */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: 'white'
        }}>
          {/* Header do Chat */}
          <div style={{
            padding: '1rem 1.5rem',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <img
              src={conversaSelecionada.avatar}
              alt={conversaSelecionada.nome}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
            <div>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: '#1e293b',
                margin: 0
              }}>
                {conversaSelecionada.nome}
              </h3>
              <p style={{
                fontSize: '0.8rem',
                color: conversaSelecionada.online ? '#10b981' : '#64748b',
                margin: 0
              }}>
                {conversaSelecionada.online ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>

          {/* Mensagens */}
          <div style={{
            flex: 1,
            padding: '1rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {mensagens.map(mensagem => (
              <div
                key={mensagem.id}
                style={{
                  display: 'flex',
                  justifyContent: mensagem.enviada ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  maxWidth: '70%',
                  padding: '0.75rem 1rem',
                  borderRadius: '1rem',
                  background: mensagem.enviada ? '#3b82f6' : '#f1f5f9',
                  color: mensagem.enviada ? 'white' : '#1e293b'
                }}>
                  <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem' }}>
                    {mensagem.texto}
                  </p>
                  <span style={{
                    fontSize: '0.75rem',
                    opacity: 0.7
                  }}>
                    {mensagem.horario}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input de Mensagem */}
          <div style={{
            padding: '1rem',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            gap: '0.75rem'
          }}>
            <input
              type="text"
              value={novaMensagem}
              onChange={(e) => setNovaMensagem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && enviarMensagem()}
              placeholder="Digite sua mensagem..."
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                border: '1px solid #e2e8f0',
                borderRadius: '25px',
                outline: 'none',
                fontSize: '0.9rem'
              }}
            />
            <button
              onClick={enviarMensagem}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'background 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.background = '#2563eb'}
              onMouseOut={(e) => e.target.style.background = '#3b82f6'}
            >
              Enviar
            </button>
          </div>
        </div>
      </main>
    </PageTransition>
  )
}

export default Chat