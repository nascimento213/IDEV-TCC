import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Home from './paginas/Home'
import Dashboard from './paginas/Dashboard'
import About from './paginas/About'
import Cadastro from './paginas/Cadastro'
import Perfil from './paginas/Perfil'
import PerfilProfissional from './paginas/PerfilProfissional'
import DashboardProfissional from './paginas/DashboardProfissional'
import RequestForm from './paginas/RequestForm'
import RequestList from './paginas/RequestList'
import ContatoForm from './paginas/ContatoForm'
import CriarProjeto from './paginas/CriarProjeto'
import CandidatosProjeto from './paginas/CandidatosProjeto'
import Admin from './paginas/Admin'

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/perfil/:id" element={<Perfil />} />
        <Route path="/perfil-profissional" element={<PerfilProfissional />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard-profissional" element={<DashboardProfissional />} />
        <Route path="/request-form" element={<RequestForm />} />
        <Route path="/contato-form" element={<ContatoForm />} />
        <Route path="/requests" element={<RequestList />} />
        <Route path="/criar-projeto" element={<CriarProjeto />} />
        <Route path="/projeto/:projetoId/candidatos" element={<CandidatosProjeto />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;