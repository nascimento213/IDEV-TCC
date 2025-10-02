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
  const [requests, setRequests] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    carregarRequests()
  }, [])

  const carregarRequests = async () => {
    try {
      const data = await api.listarRequestsDoUsuario(user.id)
      setRequests(data)
    } catch (error) {
      console.error('Erro ao carregar requests:', error)
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

  const getCorPrioridade = (prioridade) => {
    switch (prioridade) {
      case 'alta': return '#ef4444'
      case 'media': return '#f59e0b'
      case 'baixa': return '#10b981'
      default: return '#6b7280'
    }
  }

  const getCorCategoria = (categoria) => {
    return categoria === 'sugestao' ? '#3b82f6' : '#f59e0b'
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
              Meus Requests
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
              + Novo Request
            </button>
          </div>

          {requests.length === 0 ? (
            <div style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '3rem',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
            }}>
              <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
                Você ainda não enviou nenhum request.
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
                Enviar Primeiro Request
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {requests.map(request => (
                <div key={request.id} style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  border: `3px solid ${getCorCategoria(request.categoria)}`
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
                        backgroundColor: getCorCategoria(request.categoria),
                        color: 'white',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        textTransform: 'capitalize'
                      }}>
                        {request.categoria}
                      </span>
                      {request.prioridade && (
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          backgroundColor: getCorPrioridade(request.prioridade),
                          color: 'white',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          textTransform: 'capitalize'
                        }}>
                          {request.prioridade}
                        </span>
                      )}
                    </div>
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
                  </div>
                  
                  <p style={{
                    color: '#374151',
                    lineHeight: '1.6',
                    margin: '0 0 1rem 0'
                  }}>
                    {request.mensagem}
                  </p>
                  
                  {request.anexo && (
                    <div style={{ marginBottom: '1rem' }}>
                      <a
                        href={request.anexo}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#3b82f6',
                          textDecoration: 'none',
                          fontSize: '0.9rem'
                        }}
                      >
                        📎 Ver anexo
                      </a>
                    </div>
                  )}
                  
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