import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Home from './paginas/Home'
import Dashboard from './paginas/Dashboard'
import About from './paginas/About'
import Cadastro from './paginas/Cadastro'
import Perfil from './paginas/Perfil'
import PerfilProfissional from './paginas/PerfilProfissional'
import Chat from './paginas/Chat'

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/perfil/:id" element={<Perfil />} />
        <Route path="/perfil-profissional" element={<PerfilProfissional />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;