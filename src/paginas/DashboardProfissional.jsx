import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import HeaderProfissional from '../componentes/HeaderProfissional'
import PageTransition from '../componentes/PageTransition'
import '../assets/css/DashboardProfissional.css'



function DashboardProfissional() {
  const navigate = useNavigate()
  const { user, switchUserType, isLoggedIn } = useAuth()
  const [secaoAtiva, setSecaoAtiva] = useState('inicio')
  const [dadosProfissional, setDadosProfissional] = useState(null)
  const [notificacoes, setNotificacoes] = useState([])
  const [estatisticas, setEstatisticas] = useState([])
  const [projetosDisponiveis, setProjetosDisponiveis] = useState([])
  const [meusProjetos, setMeusProjetos] = useState([])
  
  // Proteção de rota - apenas profissionais podem acessar
  useEffect(() => {
    const tipoUsuario = user?.tipo || user?.type
    
    if (isLoggedIn && user && tipoUsuario === 'empresa') {
      alert('Não é possível acessar esta área! Este usuário não está cadastrado como profissional.')
      navigate('/dashboard')
    }
  }, [isLoggedIn, user, navigate])

  const handleSetSecaoAtiva = (secao) => {
    setSecaoAtiva(secao)
    if (!['inicio', 'notificacoes', 'agenda', 'avaliacoes'].includes(secao)) {
      navigate('/dashboard')
    }
  }

  // Buscar dados reais do usuário logado
  useEffect(() => {
    const carregarDados = async () => {
      if (user) {
        setDadosProfissional({
          id: user.id,
          nome: user.nome,
          area: user.bio || 'Profissional de TI',
          foto: user.fotoPerfil ? `http://localhost:8080${user.fotoPerfil}` : '/src/assets/imagens/gato-de-terno-suit-cat.png',
          email: user.email,
          telefone: user.telefone || 'Não informado',
          localizacao: 'Brasil',
          disponibilidade: 'Disponível'
        })
        
        // Carregar estatísticas reais
        try {
          const projetosResponse = await fetch(`http://localhost:8080/api/v1/projeto/profissional/${user.id}`)
          if (projetosResponse.ok) {
            const projetos = await projetosResponse.json()
            const projetosCompletos = projetos.filter(p => p.status === 'FINALIZADO').length
            const projetosAtivos = projetos.filter(p => p.status === 'EM_ANDAMENTO').length
            
            setEstatisticas([
              { label: 'Projetos Completos', valor: projetosCompletos.toString(), icone: 'projetos', cor: '#3b82f6' },
              { label: 'Projetos Ativos', valor: projetosAtivos.toString(), icone: 'clientes', cor: '#10b981' },
              { label: 'Avaliação Média', valor: '4.8', icone: 'estrela', cor: '#f59e0b' },
              { label: 'Total Projetos', valor: projetos.length.toString(), icone: 'dinheiro', cor: '#8b5cf6' }
            ])
          }
        } catch (error) {
          console.error('Erro ao carregar estatísticas:', error)
        }
        
        // Carregar notificações reais (requests + mensagens)
        try {
          const notificacoesArray = []
          
          // Buscar requests
          const requestsResponse = await fetch(`http://localhost:8080/api/v1/request/recebidos/${user.id}`)
          if (requestsResponse.ok) {
            const requests = await requestsResponse.json()
            requests.forEach(req => {
              notificacoesArray.push({
                id: `req_${req.id}`,
                tipo: req.categoria,
                titulo: `${req.categoria} recebida`,
                descricao: req.mensagem.substring(0, 50) + '...',
                tempo: new Date(req.dataEnvio).toLocaleDateString()
              })
            })
          }
          
          // Buscar mensagens
          const mensagensResponse = await fetch(`http://localhost:8080/api/v1/mensagem/recebidas/${user.id}`)
          if (mensagensResponse.ok) {
            const mensagens = await mensagensResponse.json()
            for (const msg of mensagens) {
              // Buscar dados do remetente
              let nomeRemetente = 'Usuário'
              try {
                const remetenteResponse = await fetch(`http://localhost:8080/api/v1/usuario/${msg.remetenteId}`)
                if (remetenteResponse.ok) {
                  const remetente = await remetenteResponse.json()
                  nomeRemetente = remetente.nome
                }
              } catch (error) {
                console.error('Erro ao buscar remetente:', error)
              }
              
              notificacoesArray.push({
                id: `msg_${msg.id}`,
                tipo: 'mensagem',
                titulo: `Mensagem de ${nomeRemetente}`,
                descricao: msg.mensagem.substring(0, 50) + '...',
                tempo: new Date(msg.dataEnvio).toLocaleDateString(),
                remetenteId: msg.remetenteId
              })
            }
          }
          
          // Ordenar por data e pegar apenas as 3 mais recentes
          setNotificacoes(notificacoesArray.slice(0, 3))
        } catch (error) {
          console.error('Erro ao carregar notificações:', error)
        }
        
        // Carregar projetos disponíveis (apenas para profissionais)
        if (user.tipo === 'profissional') {
          try {
            const projetosAbertosResponse = await fetch('http://localhost:8080/api/v1/projeto/abertos')
            if (projetosAbertosResponse.ok) {
              const projetos = await projetosAbertosResponse.json()
              setProjetosDisponiveis(projetos)
            }
          } catch (error) {
            console.error('Erro ao carregar projetos disponíveis:', error)
          }
        }
        
        // Carregar meus projetos
        try {
          const meusProjetosResponse = await fetch(`http://localhost:8080/api/v1/projeto/profissional/${user.id}`)
          if (meusProjetosResponse.ok) {
            const projetos = await meusProjetosResponse.json()
            setMeusProjetos(projetos)
          }
        } catch (error) {
          console.error('Erro ao carregar meus projetos:', error)
        }
      }
    }
    carregarDados()
  }, [user])

  const candidatarSeProjeto = async (projetoId) => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/candidatura', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projetoId: projetoId,
          profissionalId: user.id
        })
      })
      
      if (response.ok) {
        alert('Candidatura enviada com sucesso!')
        // Recarregar projetos para atualizar a lista
        window.location.reload()
      } else {
        const error = await response.json()
        alert(error.message || 'Erro ao enviar candidatura')
      }
    } catch (error) {
      console.error('Erro ao candidatar-se:', error)
      alert('Erro ao enviar candidatura')
    }
  }

  const getIcone = (tipo) => {
    const icones = {
      projetos: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
      clientes: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
      estrela: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>,
      dinheiro: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
    }
    return icones[tipo] || icones.projetos
  }

  if (!dadosProfissional) {
    return (
      <PageTransition>
        <HeaderProfissional secaoAtiva={secaoAtiva} setSecaoAtiva={handleSetSecaoAtiva} aoClicarLogin={() => navigate('/')} />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dashboard...</p>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <HeaderProfissional secaoAtiva={secaoAtiva} setSecaoAtiva={handleSetSecaoAtiva} aoClicarLogin={() => navigate('/')} />
      
      <main className="dashboard-pro">
        <div className="dashboard-container">
          {secaoAtiva === 'inicio' && (
            <>
              {/* Header do Dashboard */}
              <div className="dashboard-header professional">
                <div className="welcome-section">
                  <p>Olá, {dadosProfissional.nome}! Gerencie seus serviços e clientes</p>
                </div>
                <div className="header-actions">
                  <div className="status-badge professional">
                    <span className="status-indicator"></span>
                    {dadosProfissional.disponibilidade}
                  </div>
                </div>
              </div>

              {/* Estatísticas */}
              <div className="stats-grid">
                {estatisticas.map((stat, index) => (
                  <div key={index} className="stat-card" style={{ '--accent-color': stat.cor }}>
                    <div className="stat-icon">
                      {getIcone(stat.icone)}
                    </div>
                    <div className="stat-content">
                      <h3>{stat.valor}</h3>
                      <p>{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="dashboard-grid professional">
                {/* Informações do Profissional */}
                <div className="services-card">
                  <div className="card-header">
                    <h3>Informações</h3>
                  </div>
                  
                  <div className="services-list">
                    <div className="service-item">
                      <div className="service-info">
                        <h4>Email</h4>
                        <p className="service-price">{dadosProfissional.email}</p>
                      </div>
                    </div>
                    <div className="service-item">
                      <div className="service-info">
                        <h4>Telefone</h4>
                        <p className="service-price">{dadosProfissional.telefone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Perfil Resumido */}
                <div className="profile-summary-card">
                  <div className="profile-header-mini">
                    <img src={dadosProfissional.foto} alt={dadosProfissional.nome} className="profile-avatar-mini" />
                    <div className="profile-info-mini">
                      <h3>{dadosProfissional.nome}</h3>
                      <p>{dadosProfissional.area}</p>
                      <span className="location">{dadosProfissional.localizacao}</span>
                    </div>
                  </div>
                  
                  <div className="profile-actions">
                    <button className="action-btn primary" style={{ width: '100%', marginBottom: '0.5rem' }} onClick={() => navigate('/perfil-profissional')}>
                      Editar Perfil
                    </button>
                    <button className="action-btn secondary" style={{ width: '100%' }} onClick={() => navigate('/request-form')}>
                      Enviar Request
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {secaoAtiva === 'notificacoes' && (
            <div className="section-content">
              <h2>Notificações</h2>
              <div className="notifications-list">
                {notificacoes.map(notif => (
                  <div key={notif.id} className={`notification-item ${notif.tipo}`}>
                    <div className="notification-content">
                      <h4>{notif.titulo}</h4>
                      <p>{notif.descricao}</p>
                      {notif.valor && <span className="notification-value">{notif.valor}</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {notif.tipo === 'mensagem' && notif.remetenteId && (
                        <button
                          onClick={() => navigate(`/contato-form?destinatario=${notif.remetenteId}`)}
                          style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}
                        >
                          Responder
                        </button>
                      )}
                      <span className="notification-time">{notif.tempo}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {secaoAtiva === 'agenda' && (
            <div className="section-content">
              <h2>Agenda & Projetos</h2>
              
              <div style={{ marginBottom: '3rem' }}>
                <h3>Projetos Disponíveis</h3>
                <div className="projects-grid">
                  {projetosDisponiveis.map(projeto => (
                    <div key={projeto.id} className="project-card">
                      <h4>{projeto.titulo}</h4>
                      <p>{projeto.descricao}</p>
                      <div className="project-footer">
                        <span className="project-status aberto">Aberto</span>
                        <button 
                          className="btn-apply"
                          onClick={() => candidatarSeProjeto(projeto.id)}
                        >
                          Candidatar-se
                        </button>
                      </div>
                    </div>
                  ))}
                  {projetosDisponiveis.length === 0 && (
                    <p style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
                      Nenhum projeto disponível no momento
                    </p>
                  )}
                </div>
              </div>
              
              <div style={{ marginBottom: '3rem' }}>
                <h3>Meus Projetos</h3>
                <div className="projects-grid">
                  {meusProjetos.map(projeto => (
                    <div key={projeto.id} className="project-card">
                      <h4>{projeto.titulo}</h4>
                      <p>{projeto.descricao}</p>
                      <div className="project-footer">
                        <span className={`project-status ${projeto.status.toLowerCase()}`}>
                          {projeto.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  {meusProjetos.length === 0 && (
                    <p style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
                      Você ainda não possui projetos
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <h3>Próximos Compromissos</h3>
                <div className="agenda-list">
                  <p style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
                    Nenhum compromisso agendado
                  </p>
                </div>
              </div>
            </div>
          )}



          {secaoAtiva === 'avaliacoes' && (
            <div className="section-content">
              <h2>Avaliações Recentes</h2>
              <div className="rating-summary">
                <span className="rating-number">4.8</span>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`star ${i < 4 ? 'filled' : ''}`}>★</span>
                  ))}
                </div>
              </div>
              <div className="reviews-list">
                <p style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
                  Nenhuma avaliação ainda
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </PageTransition>
  )
}

export default DashboardProfissional