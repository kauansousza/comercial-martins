import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import api from '../lib/axios';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    todayAccess: 0,
    totalSales: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Você pode adaptar essas rotas de acordo com seu backend
        const [metricsResponse, activitiesResponse] = await Promise.all([
          api.get('/dashboard/metrics'),
          api.get('/dashboard/activities')
        ]);

        setDashboardData(metricsResponse.data);
        setRecentActivities(activitiesResponse.data);
      } catch (err) {
        setError('Erro ao carregar dados do dashboard');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-2xl text-blue-800">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed lg:relative lg:translate-x-0 z-30 w-64 h-screen transition-transform duration-300 ease-in-out bg-blue-800`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-20 bg-blue-900">
            <img src="/Martins.png" alt="Logo" className="h-12" />
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2">
            <a href="#" className="flex items-center px-4 py-3 text-white hover:bg-blue-700 rounded-lg">
              <span className="ml-3">Dashboard</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-white hover:bg-blue-700 rounded-lg">
              <span className="ml-3">Usuários</span>
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-white hover:bg-blue-700 rounded-lg">
              <span className="ml-3">Configurações</span>
            </a>
          </nav>

          <div className="p-4">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-white bg-blue-900 rounded-lg hover:bg-blue-700"
            >
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          
          <div className="flex items-center">
            <span className="text-gray-800 font-medium">Bem-vindo, {user?.email}</span>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dashboard Cards */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Total de Usuários</h3>
              <p className="text-3xl font-bold text-blue-800">{dashboardData.totalUsers}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Acessos Hoje</h3>
              <p className="text-3xl font-bold text-blue-800">{dashboardData.todayAccess}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">Total de Vendas</h3>
              <p className="text-3xl font-bold text-blue-800">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(dashboardData.totalSales)}
              </p>
            </div>
          </div>

          {/* Recent Activity Table */}
          <div className="mt-8 bg-white rounded-lg shadow">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Atividades Recentes</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Usuário
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ação
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentActivities.length > 0 ? (
                      recentActivities.map((activity) => (
                        <tr key={activity.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(activity.date).toLocaleDateString('pt-BR')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {activity.user}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {activity.action}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                          Nenhuma atividade recente
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;