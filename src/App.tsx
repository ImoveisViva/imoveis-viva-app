import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import LoginForm from './pages/Login';
import { UserProvider } from './context/AuthContext';
import './index.css';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CadastroImoveisPage from './pages/Admin/cadastroimoveis/page';
import ConsultarImoveisPage from './pages/Admin/consultaimoveis/page';
import DashboardPage from './pages/Admin/dashboard/page';
import { Mapa } from './pages/Admin/mapa/page';
import { CardDetails } from './pages/CardsDetails';
import { SobrePage } from './pages/Sobre';
import AnunciarPage from './pages/Anunciar';
import { PageDePesquisa } from './pages/PaginaDePesquisa';
import AgradecimentoPage from './pages/Agradecimento';

export function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/*' element={<Home />} />
          <Route path='/estate/:id' element={<CardDetails />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path='/admin' element={<DashboardPage />} />
            <Route path="cadastroimoveis" element={<CadastroImoveisPage />} />
            <Route path="consultaimoveis" element={<ConsultarImoveisPage />} />
            <Route path="mapa" element={<Mapa />} />
          </Route>
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/anunciar" element={<AnunciarPage />} />
          <Route path="/pesquisa" element={<PageDePesquisa />} />
          <Route path="/thanks" element={<AgradecimentoPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
