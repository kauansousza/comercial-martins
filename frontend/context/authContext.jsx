
import PropTypes from 'prop-types';
import { createContext, useState, useContext, useEffect } from 'react';
import api from '../lib/axios';

const AuthContext = createContext({});

// Aqui está o erro - precisamos receber props e desestruturar children
export const AuthProvider = ({ children }) => {
      AuthProvider.propTypes = {
        children: PropTypes.node.isRequired
      };
      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);


  useEffect(() => {
    const recoveredUser = localStorage.getItem('user');

    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });

      const loggedUser = response.data;

      localStorage.setItem('user', JSON.stringify(loggedUser));
      setUser(loggedUser);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao fazer login'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        authenticated: !!user,
        user,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);