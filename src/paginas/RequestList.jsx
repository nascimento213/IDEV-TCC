import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Header from '../componentes/Header'
import HeaderProfissional from '../componentes/HeaderProfissional'
import PageTransition from '../componentes/PageTransition'
import { api } from '../services/api'

function RequestList() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [requests, setRequests] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    carregarRequestsEMensagens()
  }, [])

  const carregarRequestsEMensagens = async () => {
    try {
      const todasMensagens = []
      
      // Carregar requests
      const requestsResponse = await fetch(`http://localhost:8080/api/v1/request/usuario/${user.id}`)
      if (requestsResponse.ok) {
        const requestsData = await requestsResponse.json()
        if (Array.isArray(requestsData)) {
          requestsData.forEach(req => {
            todasMensagens.push({
              ...req,
              tipo: 'request',
              titulo: `${req.categoria} - Request`
            })
          })
        }
      }
      
      // Carregar mensagens enviadas
      const mensagensEnviadasResponse = await fetch(`http://localhost:8080/api/v1/mensagem/enviadas/${user.id}`)
      if (mensagensEnviadasResponse.ok) {
        const mensagensEnviadas = await mensagensEnviadasResponse.json()
        if (Array.isArray(mensagensEnviadas)) {
          mensagensEnviadas.forEach(msg => {
            todasMensagens.push({
              ...msg,
              tipo: 'mensagem_enviada',
              categoria: 'mensagem',
              titulo: msg.assunto || 'Mensagem enviada'
            })
          })
        }
      }
      
      // Carregar mensagens recebidas
      const mensagensRecebidasResponse = await fetch(`http://localhost:8080/api/v1/mensagem/recebidas/${user.id}`)
      if (mensagensRecebidasResponse.ok) {
        const mensagensRecebidas = await mensagensRecebidasResponse.json()
        if (Array.isArray(mensagensRecebidas)) {
          mensagensRecebidas.forEach(msg => {
            todasMensagens.push({
              ...msg,
              tipo: 'mensagem_recebida',
              categoria: 'mensagem',
              titulo: msg.assunto || 'Mensagem recebida'
            })
          })
        }
      }
      
      // Ordenar por data
      todasMensagens.sort((a, b) => new Date(b.dataEnvio) - new Date(a.dataEnvio))
      setRequests(todasMensagens)
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error)
      setRequests([])
    } finally {
      setCarregando(false)
    }
  }

  const deletarRequest = async (id) => {
    if (confirm('Tem certeza que deseja excluir este request?')) {
      try {
        await api.deletarRequest(id)
        setRequests(requests.filter(r => r.id !== id))
        alert('Request excluído com sucesso!')
      } catch (error) {
        console.error('Erro ao excluir request:', error)
        alert('Erro ao excluir request')
      }
    }
  }

  const formatarData = (dataString) => {
    return new Date(dataString).toLocaleString('pt-BR')
  }

  const getCorCategoria = (categoria, tipo) => {
    if (categoria === 'mensagem') {
      return tipo === 'mensagem_enviada' ? '#3b82f6' : '#8b5cf6'
    }
    switch (categoria) {
      case 'reclamacao': return '#ef4444'
      case 'sugestao': return '#f59e0b'
      case 'elogio': return '#10b981'
      default: return '#6b7280'
    }
  }

  if (carregando) {
    return (
      <PageTransition>
        {user?.tipo === 'profissional' ? (
          <HeaderProfissional secaoAtiva="" setSecaoAtiva={() => {}} aoClicarLogin={() => navigate('/')} />
        ) : (
          <Header secaoAtiva="" setSecaoAtiva={() => {}} aoClicarLogin={() => navigate('/')} />
        )}
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p>Carregando requests...</p>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      {user?.tipo === 'profissional' ? (
        <HeaderProfissional secaoAtiva="" setSecaoAtiva={() => {}} aoClicarLogin={() => navigate('/')} />
      ) : (
        <Header secaoAtiva="" setSecaoAtiva={() => {}} aoClicarLogin={() => navigate('/')} />
      )}
      
      <main style={{
        minHeight: 'calc(100vh - 70px)',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        padding: '2rem'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#111827',
              margin: 0
            }}>
              Minhas Mensagens
            </h1>
            <button
              onClick={() => navigate('/request-form')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              + Nova Mensagem
            </button>
          </div>

          {!requests || requests.length === 0 ? (
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '3rem',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
            }}>
              <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
                Você ainda não tem nenhuma mensagem.
              </p>
              <button
                onClick={() => navigate('/request-form')}
                style={{
                  marginTop: '1rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Enviar Primeira Mensagem
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {requests && requests.map(request => (
                <div key={`${request.tipo}_${request.id}`} style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  border: `3px solid ${getCorCategoria(request.categoria, request.tipo)}`
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        backgroundColor: getCorCategoria(request.categoria, request.tipo),
                        color: 'white',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        textTransform: 'capitalize'
                      }}>
                        {request.tipo === 'mensagem_enviada' ? 'Enviada' : 
                         request.tipo === 'mensagem_recebida' ? 'Recebida' : 
                         request.categoria}
                      </span>
                      <h3 style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#111827',
                        margin: 0
                      }}>
                        {request.titulo}
                      </h3>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {request.tipo === 'mensagem_recebida' && (
                        <button
                          onClick={() => navigate(`/contato-form?destinatario=${request.remetenteId}`)}
                          style={{
                            background: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '0.5rem 1rem',
                            fontSize: '0.8rem',
                            cursor: 'pointer'
                          }}
                        >
                          Responder
                        </button>
                      )}
                      {request.tipo === 'request' && (
                        <button
                          onClick={() => deletarRequest(request.id)}
                          style={{
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '0.5rem 1rem',
                            fontSize: '0.8rem',
                            cursor: 'pointer'
                          }}
                        >
                          Excluir
                        </button>
                      )}
                    </div>
                  </div>
                  

                  <p style={{
                    color: '#374151',
                    lineHeight: '1.6',
                    margin: '0 0 1rem 0'
                  }}>
                    {request.mensagem}
                  </p>
                  

                  
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#6b7280',
                    textAlign: 'right'
                  }}>
                    Enviado em: {formatarData(request.dataEnvio)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </PageTransition>
  )
}

export default RequestList