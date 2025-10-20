import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Header from '../componentes/Header'
import PageTransition from '../componentes/PageTransition'

function CandidatosProjeto() {
  const { projetoId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [projeto, setProjeto] = useState(null)
  const [candidatos, setCandidatos] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    const carregarDados = async () => {
      try {
        // Buscar dados do projeto
        const projetoResponse = await fetch(`http://localhost:8080/api/v1/projeto/${projetoId}`)
        if (projetoResponse.ok) {
          const projetoData = await projetoResponse.json()
          setProjeto(projetoData)
        }

        // Buscar candidaturas
        const candidaturasResponse = await fetch(`http://localhost:8080/api/v1/candidatura/projeto/${projetoId}`)
        if (candidaturasResponse.ok) {
          const candidaturasData = await candidaturasResponse.json()
          
          // Buscar dados dos profissionais
          const candidatosComDados = await Promise.all(
            candidaturasData.map(async (candidatura) => {
              const profissionalResponse = await fetch(`http://localhost:8080/api/v1/usuario/${candidatura.profissionalId}`)
              if (profissionalResponse.ok) {
                const profissional = await profissionalResponse.json()
                return {
                  ...candidatura,
                  profissional: profissional
                }
              }
              return candidatura
            })
          )
          
          setCandidatos(candidatosComDados)
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      } finally {
        setCarregando(false)
      }
    }

    carregarDados()
  }, [projetoId])

  const aceitarCandidato = async (candidaturaId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/candidatura/${candidaturaId}/aceitar`, {
        method: 'PUT'
      })
      
      if (response.ok) {
        alert('Candidato aceito com sucesso!')
        window.location.reload()
      } else {
        alert('Erro ao aceitar candidato')
      }
    } catch (error) {
      console.error('Erro ao aceitar:', error)
      alert('Erro ao aceitar candidato')
    }
  }

  const excluirCandidato = async (candidaturaId) => {
    if (confirm('Tem certeza que deseja excluir esta candidatura?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/candidatura/${candidaturaId}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          alert('Candidatura excluída.')
          window.location.reload()
        } else {
          alert('Erro ao excluir candidatura')
        }
      } catch (error) {
        console.error('Erro ao excluir:', error)
        alert('Erro ao excluir candidatura')
      }
    }
  }

  if (carregando) {
    return (
      <PageTransition>
        <Header secaoAtiva="" setSecaoAtiva={() => {}} aoClicarLogin={() => navigate('/')} />
        <div style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>Carregando candidatos...</p>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <Header secaoAtiva="" setSecaoAtiva={() => {}} aoClicarLogin={() => navigate('/')} />
      
      <main style={{
        minHeight: 'calc(100vh - 70px)',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        padding: '2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem' }}>
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                marginBottom: '1rem'
              }}
            >
              ← Voltar
            </button>
            
            <h1 style={{ margin: '0 0 0.5rem 0', color: '#111827' }}>
              Candidatos para: {projeto?.titulo}
            </h1>
            <p style={{ color: '#6b7280', margin: 0 }}>
              {candidatos.length} candidato(s) encontrado(s)
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.5rem'
          }}>
            {candidatos.map(candidato => (
              <div key={candidato.id} style={{
                background: 'white',
                borderRadius: '12px',
                padding: '1.5rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <img
                    src={candidato.profissional?.fotoPerfil ? 
                      `http://localhost:8080${candidato.profissional.fotoPerfil}` : 
                      '/src/assets/imagens/gato-de-terno-suit-cat.png'
                    }
                    alt={candidato.profissional?.nome}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                  <div>
                    <h3 style={{ margin: '0 0 0.25rem 0', color: '#111827' }}>
                      {candidato.profissional?.nome}
                    </h3>
                    <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
                      {candidato.profissional?.bio || 'Profissional de TI'}
                    </p>
                  </div>
                </div>
                
                <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  Candidatou-se em: {new Date(candidato.dataCandidatura).toLocaleDateString()}
                </p>
                
                {candidato.status === 'PENDENTE' && (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => navigate(`/perfil/${candidato.profissional?.id}`)}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        backgroundColor: 'white',
                        color: '#374151',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                    >
                      Ver Perfil
                    </button>
                    <button
                      onClick={() => excluirCandidato(candidato.id)}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                    >
                      Excluir
                    </button>
                    <button
                      onClick={() => aceitarCandidato(candidato.id)}
                      style={{
                        padding: '0.75rem',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        minWidth: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      →
                    </button>
                  </div>
                )}
                
                {candidato.status === 'ACEITA' && (
                  <div style={{
                    padding: '0.75rem',
                    backgroundColor: '#d1fae5',
                    color: '#065f46',
                    borderRadius: '6px',
                    textAlign: 'center',
                    fontWeight: '600'
                  }}>
                    ✓ Candidato Aceito - Projeto em Andamento
                  </div>
                )}
                
                {candidato.status === 'REJEITADA' && (
                  <div style={{
                    padding: '0.75rem',
                    backgroundColor: '#fee2e2',
                    color: '#991b1b',
                    borderRadius: '6px',
                    textAlign: 'center',
                    fontWeight: '600'
                  }}>
                    ✗ Vaga Fechada
                  </div>
                )}
              </div>
            ))}
          </div>

          {candidatos.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
            }}>
              <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
                Nenhum candidato se inscreveu para este projeto ainda.
              </p>
            </div>
          )}
        </div>
      </main>
    </PageTransition>
  )
}

export default CandidatosProjeto