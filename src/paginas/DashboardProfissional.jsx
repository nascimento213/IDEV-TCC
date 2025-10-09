import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import HeaderProfissional from '../componentes/HeaderProfissional'
import PageTransition from '../componentes/PageTransition'
import '../assets/css/DashboardProfissional.css'

// Mock data simulando dados do banco - Perfil Profissional
const mockProfessionalData = {
  id: 1,
  nome: 'Samuel Nascimento',
  area: 'Desenvolvedor Full Stack',
  foto: '/src/assets/imagens/gato-de-terno-suit-cat.png',
  email: 'samuel@email.com',
  telefone: '(11) 99999-9999',
  localizacao: 'São Paulo, SP',
  experiencia: '3 anos',
  skills: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'MongoDB'],
  avaliacaoMedia: 4.8,
  totalAvaliacoes: 24,
  projetosCompletos: 18,
  clientesAtivos: 5,
  rendaMensal: 8500,
  disponibilidade: 'Disponível',
  servicosPrestados: [
    { nome: 'Desenvolvimento Web', preco: 'R$ 80/h', demanda: 'Alta' },
    { nome: 'Consultoria React', preco: 'R$ 120/h', demanda: 'Média' },
    { nome: 'Code Review', preco: 'R$ 60/h', demanda: 'Baixa' }
  ],
  agendaProximos: [
    { cliente: 'TechCorp', projeto: 'E-commerce', data: '2024-01-15', hora: '14:00' },
    { cliente: 'StartupXYZ', projeto: 'Landing Page', data: '2024-01-16', hora: '10:00' }
  ],
  avaliacoesRecentes: [
    { cliente: 'Maria Silva', nota: 5, comentario: 'Excelente trabalho!', projeto: 'App Mobile' },
    { cliente: 'João Santos', nota: 4, comentario: 'Muito profissional', projeto: 'Website' }
  ]
}

const mockNotifications = [
  { id: 1, tipo: 'proposta', titulo: 'Nova proposta de projeto', descricao: 'E-commerce em React', valor: 'R$ 5.000', tempo: '2h' },
  { id: 2, tipo: 'mensagem', titulo: 'Mensagem de cliente', descricao: 'Carlos Mendes enviou uma mensagem', tempo: '1d' },
  { id: 3, tipo: 'avaliacao', titulo: 'Nova avaliação recebida', descricao: '5 estrelas no projeto Mobile App', tempo: '3d' }
]

const mockStats = [
  { label: 'Projetos Completos', valor: '18', icone: 'projetos', cor: '#3b82f6' },
  { label: 'Clientes Ativos', valor: '5', icone: 'clientes', cor: '#10b981' },
  { label: 'Avaliação Média', valor: '4.8', icone: 'estrela', cor: '#f59e0b' },
  { label: 'Renda Mensal', valor: 'R$ 8.5k', icone: 'dinheiro', cor: '#8b5cf6' }
]

function DashboardProfissional() {
  const navigate = useNavigate()
  const { user, switchUserType } = useAuth()
  const [secaoAtiva, setSecaoAtiva] = useState('inicio')
  const [dadosProfissional, setDadosProfissional] = useState(null)
  const [notificacoes, setNotificacoes] = useState([])
  const [estatisticas, setEstatisticas] = useState([])

  const handleSetSecaoAtiva = (secao) => {
    setSecaoAtiva(secao)
    if (!['inicio', 'notificacoes', 'agenda', 'avaliacoes'].includes(secao)) {
      navigate('/dashboard')
    }
  }

  // Simula busca de dados do banco
  useEffect(() => {
    const carregarDados = async () => {
      // Simula delay de API
      await new Promise(resolve => setTimeout(resolve, 500))
      setDadosProfissional(mockProfessionalData)
      setNotificacoes(mockNotifications)
      setEstatisticas(mockStats)
    }
    carregarDados()
  }, [])

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
                {/* Serviços Prestados */}
                <div className="services-card">
                  <div className="card-header">
                    <h3>Meus Serviços</h3>
                  </div>
                  
                  <div className="services-list">
                    {dadosProfissional.servicosPrestados.map((servico, index) => (
                      <div key={index} className="service-item">
                        <div className="service-info">
                          <h4>{servico.nome}</h4>
                          <p className="service-price">{servico.preco}</p>
                        </div>
                        <div className="service-demand">
                          <span className={`demand-badge ${servico.demanda.toLowerCase()}`}>
                            {servico.demanda}
                          </span>
                        </div>
                      </div>
                    ))}
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
                    <button className="action-btn primary" style={{ width: '100%' }} onClick={() => navigate('/perfil-profissional')}>
                      Editar Perfil
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
                    <span className="notification-time">{notif.tempo}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {secaoAtiva === 'agenda' && (
            <div className="section-content">
              <h2>Agenda - Próximos Compromissos</h2>
              <div className="agenda-list">
                {dadosProfissional.agendaProximos.map((item, index) => (
                  <div key={index} className="agenda-item">
                    <div className="agenda-date">
                      <span className="date">{new Date(item.data).getDate()}</span>
                      <span className="month">{new Date(item.data).toLocaleDateString('pt-BR', { month: 'short' })}</span>
                    </div>
                    <div className="agenda-info">
                      <h4>{item.projeto}</h4>
                      <p>Cliente: {item.cliente}</p>
                      <span className="agenda-time">{item.hora}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {secaoAtiva === 'avaliacoes' && (
            <div className="section-content">
              <h2>Avaliações Recentes</h2>
              <div className="rating-summary">
                <span className="rating-number">{dadosProfissional.avaliacaoMedia}</span>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`star ${i < Math.floor(dadosProfissional.avaliacaoMedia) ? 'filled' : ''}`}>★</span>
                  ))}
                </div>
              </div>
              <div className="reviews-list">
                {dadosProfissional.avaliacoesRecentes.map((avaliacao, index) => (
                  <div key={index} className="review-item">
                    <div className="review-header">
                      <span className="client-name">{avaliacao.cliente}</span>
                      <div className="review-rating">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`star ${i < avaliacao.nota ? 'filled' : ''}`}>★</span>
                        ))}
                      </div>
                    </div>
                    <p className="review-comment">{avaliacao.comentario}</p>
                    <span className="review-project">Projeto: {avaliacao.projeto}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </PageTransition>
  )
}

export default DashboardProfissional