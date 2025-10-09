import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../assets/css/style.css'
import Header from '../componentes/Header'
import Carousel from '../componentes/Carousel'
import ModernLogin from '../componentes/ModernLogin'
import PageTransition from '../componentes/PageTransition'
import SectionTransition from '../componentes/SectionTransition'
import Footer from '../componentes/Footer'

const Dashboard = () => {
  const [secaoAtiva, setSecaoAtiva] = useState('inicio');
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [filtroSelecionado, setFiltroSelecionado] = useState('');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains('filtros-overlay')) {
        setMostrarFiltros(false);
      }
    };
    
    if (mostrarFiltros) {
      document.addEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [mostrarFiltros]);
  const navigate = useNavigate();
  const { switchUserType } = useAuth();

  const habilidades = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'PHP', 'C#', 'Angular', 
    'Vue.js', 'TypeScript', 'MongoDB', 'MySQL', 'PostgreSQL', 'Docker', 'AWS'
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.menu-dropdown')) {
        setShowMenu(false);
      }
    };
    
    const handleDashboardSection = (event) => {
      setSecaoAtiva(event.detail);
    };
    
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('setDashboardSection', handleDashboardSection);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('setDashboardSection', handleDashboardSection);
    };
  }, []);

  const categories = [
    { 
      id: 1, 
      name: 'Desenvolvimento Web', 
      icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
    },
    { 
      id: 2, 
      name: 'Mobile', 
      icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
    },
    { 
      id: 3, 
      name: 'DevOps', 
      icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.79a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
    },
    { 
      id: 4, 
      name: 'Testes', 
      icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-4m-4 0V9a2 2 0 0 1 4 0v2m-4 0h4m-4 0V7a2 2 0 0 1 4 0v2"/></svg>
    },
  ];

  const professionals = [
    {
      id: 1,
      name: 'João Silva',
      title: 'Desenvolvedor Full Stack',
      skills: ['React', 'Node.js', 'MongoDB'],
      location: 'São Paulo, SP'
    },
    {
      id: 2,
      name: 'Carlos Mendes',
      title: 'Engenheiro de DevOps',
      skills: ['AWS', 'Docker', 'Kubernetes'],
      location: 'Rio de Janeiro, RJ'
    },
    {
      id: 3,
      name: 'Mariana Costa',
      title: 'Designer UI/UX',
      skills: ['Figma', 'Adobe XD', 'User Research'],
      location: 'Belo Horizonte, MG'
    },
    {
      id: 4,
      name: 'Pedro Rocha',
      title: 'Engenheiro de Qualidade',
      skills: ['Testes Automatizados', 'Selenium', 'Jest'],
      location: 'Porto Alegre, RS'
    }
  ];

  const projects = [
    {
      id: 1,
      title: 'EcoMarket - Marketplace Sustentável',
      description: 'Plataforma de e-commerce focada em produtos ecológicos e sustentáveis com sistema de pontuação verde',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=250&fit=crop',
      skills: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      budget: 'R$ 25.000 - R$ 35.000'
    },
    {
      id: 2,
      title: 'FoodieConnect - App de Delivery',
      description: 'Aplicativo mobile que conecta chefs locais com clientes, incluindo sistema de avaliação e chat em tempo real',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop',
      skills: ['React Native', 'Firebase', 'Socket.io'],
      budget: 'R$ 18.000 - R$ 22.000'
    },
    {
      id: 3,
      title: 'MindSpace - Plataforma de Bem-estar',
      description: 'Sistema web para agendamento de terapias online com videochamadas integradas e acompanhamento de progresso',
      image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=250&fit=crop',
      skills: ['Vue.js', 'WebRTC', 'PostgreSQL', 'AWS'],
      budget: 'R$ 30.000 - R$ 40.000'
    },
    {
      id: 4,
      title: 'SmartHome Dashboard',
      description: 'Interface web para controle de dispositivos IoT residenciais com automação inteligente e análise de consumo',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
      skills: ['Angular', 'Python', 'MQTT', 'InfluxDB'],
      budget: 'R$ 20.000 - R$ 28.000'
    },
    {
      id: 5,
      title: 'EduTech - Plataforma de Ensino',
      description: 'Sistema completo de gestão educacional com aulas ao vivo, gamificação e acompanhamento de desempenho',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=250&fit=crop',
      skills: ['React', 'Django', 'Redis', 'Docker'],
      budget: 'R$ 45.000 - R$ 60.000'
    },
    {
      id: 6,
      title: 'CryptoTracker Pro',
      description: 'Dashboard avançado para análise de criptomoedas com gráficos em tempo real e alertas personalizados',
      image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=250&fit=crop',
      skills: ['Next.js', 'TypeScript', 'Chart.js', 'WebSocket'],
      budget: 'R$ 15.000 - R$ 25.000'
    }
  ];

  return (
    <PageTransition>
      <Header 
        secaoAtiva={secaoAtiva}
        setSecaoAtiva={setSecaoAtiva}
        aoClicarLogin={() => setMostrarLogin(true)}
      />

      <ModernLogin mostrar={mostrarLogin} fechar={() => setMostrarLogin(false)} />

      <SectionTransition sectionKey={secaoAtiva}>
        {secaoAtiva === 'profissionais' && (
          <Carousel profissionais={professionals} />
        )}

        {secaoAtiva === 'inicio' && (
          <>
            <section className="hero empresa">
              <div className="container">
                <div className="hero-header">
                  <div className="hero-title">
                    <h1>Bem-vindo ao IDev</h1>
                    <p>Conecte-se com os melhores profissionais de TI</p>
                  </div>
                </div>
                
                <div className="filtros-container">
                  <button 
                    className="filtros-toggle"
                    onClick={() => setMostrarFiltros(!mostrarFiltros)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                    </svg>
                    Filtros
                  </button>
                </div>


              </div>
              
              {mostrarFiltros && (
                <div className="filtros-overlay" onClick={(e) => e.target === e.currentTarget && setMostrarFiltros(false)}>
                  <div className="filtros-modal">
                    <div className="filtros-header">
                      <h4>Filtrar Profissionais</h4>
                      <button 
                        className="fechar-btn"
                        onClick={() => setMostrarFiltros(false)}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18"/>
                          <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </div>
                    <div className="form-group">
                      <label>Habilidade:</label>
                      <select 
                        value={filtroSelecionado} 
                        onChange={(e) => setFiltroSelecionado(e.target.value)}
                      >
                        <option value="">Todas as habilidades</option>
                        {habilidades.map(habilidade => (
                          <option key={habilidade} value={habilidade}>{habilidade}</option>
                        ))}
                      </select>
                    </div>
                    <button 
                      className="buscar-btn"
                      onClick={() => setMostrarFiltros(false)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="M21 21l-4.35-4.35"/>
                      </svg>
                      Buscar
                    </button>
                  </div>
                </div>
              )}
            </section>

            <section className="categories empresa">
              <div className="container">
                <h2>Encontre Profissionais por Categoria</h2>
                <div className="category-cards">
                  {categories.map(category => (
                    <div key={category.id} className="category-card">
                      <div className="category-icon">{category.icon}</div>
                      <h3>{category.name}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {secaoAtiva === 'projetos' && (
          <section className="projects-section">
            <div className="container">
              <h2>Projetos em Destaque</h2>
              <div className="projects-grid">
                {projects.map(project => (
                  <div key={project.id} className="project-card">
                    <div className="project-image">
                      <img src={project.image} alt={project.title} />
                    </div>
                    <div className="project-content">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="project-skills">
                        {project.skills.map((skill, index) => (
                          <span key={index} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                      <div className="project-footer">
                        <span className="project-budget">{project.budget}</span>
                        <button className="btn-details">Ver Detalhes</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {secaoAtiva === 'sobre' && (
          <section className="about-section">
            <div className="container">
              <div className="about-content">
                <div className="about-header">
                  <h2>Sobre a IDev</h2>
                  <div className="about-divider"></div>
                </div>
                
                <div className="about-text">
                  <p>
                    A IDev nasceu da necessidade de conectar talentos de TI com oportunidades reais de forma mais eficiente e humana. 
                    Como desenvolvedor, sempre senti a dificuldade de encontrar projetos que realmente fizessem sentido para meu perfil e experiência. 
                    Esta plataforma foi criada para resolver esse problema, oferecendo um espaço onde profissionais podem mostrar seu verdadeiro potencial 
                    e clientes podem encontrar exatamente o que procuram.
                  </p>
                  
                  <p>
                    Meu objetivo é simples: facilitar conexões autênticas no mundo tech. Acredito que cada projeto merece o profissional certo, 
                    e cada desenvolvedor merece oportunidades que o desafiem e o façam crescer. A IDev é mais que uma plataforma de freelance - 
                    é uma comunidade onde qualidade, transparência e crescimento mútuo são os pilares fundamentais.
                  </p>
                </div>
                
                <div className="about-stats">
                  <div className="stat-item">
                    <h3>500+</h3>
                    <p>Profissionais Cadastrados</p>
                  </div>
                  <div className="stat-item">
                    <h3>200+</h3>
                    <p>Projetos Concluídos</p>
                  </div>
                  <div className="stat-item">
                    <h3>98%</h3>
                    <p>Taxa de Satisfação</p>
                  </div>
                </div>
                
                <div className="about-cta">
                  <button className="btn-primary" onClick={() => setSecaoAtiva('profissionais')}>Conhecer Profissionais</button>
                  <button className="btn-outline" onClick={() => setSecaoAtiva('projetos')}>Ver Projetos</button>
                </div>
              </div>
            </div>
          </section>
        )}
      </SectionTransition>

      {secaoAtiva === 'inicio' && <Footer />}
    </PageTransition>
  );
};

export default Dashboard;