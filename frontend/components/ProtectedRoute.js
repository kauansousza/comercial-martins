import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>; // Você pode criar um componente de loading
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;