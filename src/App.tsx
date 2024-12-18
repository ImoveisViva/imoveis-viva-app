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

export function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/*' element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path='/admin' element={<DashboardPage />} />
            <Route path="cadastroimoveis" element={<CadastroImoveisPage />} />
            <Route path="consultaimoveis" element={<ConsultarImoveisPage />} />
            <Route path="mapa" element={<Mapa />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
