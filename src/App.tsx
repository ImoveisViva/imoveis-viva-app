import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import LoginForm from './pages/Login';
import { AdminDashboard } from './pages/Admin';
import { UserProvider } from './context/AuthContext';

export function App() {
  return (
    <UserProvider> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
