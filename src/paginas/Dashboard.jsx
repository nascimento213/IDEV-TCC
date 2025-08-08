import { useState, useEffect } from 'react'
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
      name: 'Samuel Nascimento',
      title: 'Desenvolvedora Full Stack',
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
      title: 'Plataforma E-commerce',
      description: 'Desenvolvimento de plataforma de e-commerce com React e Node.js',
      skills: ['React', 'Node.js', 'MongoDB'],
      budget: 'R$ 15.000 - R$ 20.000'
    },
    {
      id: 2,
      title: 'App de Delivery',
      description: 'Aplicativo mobile para delivery de restaurantes',
      skills: ['React Native', 'Firebase'],
      budget: 'R$ 10.000 - R$ 12.000'
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
            <section className="hero">
              <div className="container">
                <div className="search-bar">
                  <span className="search-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="M21 21l-4.35-4.35"/>
                    </svg>
                  </span>
                  <input type="text" placeholder="Encontre talentos, tecnologias ou projetos..." />
                </div>
              </div>
            </section>

            <section className="categories">
              <div className="container">
                <h2>Explore por categoria</h2>
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
          <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <h2>Projetos em desenvolvimento...</h2>
          </div>
        )}

        {secaoAtiva === 'sobre' && (
          <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <h2>Sobre a IDev</h2>
            <p>Plataforma que conecta profissionais de TI com oportunidades.</p>
          </div>
        )}
      </SectionTransition>

      {secaoAtiva === 'inicio' && <Footer />}
    </PageTransition>
  );
};

export default Dashboard;