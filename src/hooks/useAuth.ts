import { useState, useEffect, createContext, useContext } from 'react';
import { useSessionStorage } from 'react-use-sessionstorage';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { User } from '../models/User';
import { EventBus } from '../services/EventEmitter';
import { LocalCache } from '../utils/LocalCache';

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

interface LoginCredentials {
  username: string;
  password: string;
}

export const useAuth = (): AuthContextType => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { get, set } = useSessionStorage('authSession');
  const cachedUser = LocalCache.get('user');

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);

      if (response.status === 200) {
        set(response.data.token);
        const userResponse = await axios.get(`${API_BASE_URL}/users/me`, { headers: { Authorization: `Bearer ${response.data.token}` } });
        setUser(userResponse.data);
        setIsAuthenticated(true);

        EventBus.emit('userLoggedIn', userResponse.data);
      } else {
        throw new Error('Invalid credentials or server error.');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    set(null);
    setUser(null);
    setIsAuthenticated(false);

    EventBus.emit('userLoggedOut');
  };

  useEffect(() => {
    const sessionToken = get();
    if (sessionToken) {
      if (cachedUser) {
        setUser(cachedUser);
        setIsAuthenticated(true);
        return;
      }

      const fetchUser = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/users/me`, { headers: { Authorization: `Bearer ${sessionToken}` } });
          setUser(response.data);
          setIsAuthenticated(true);

          LocalCache.set('user', response.data);
        } catch (error) {
          console.error('User fetch error:', error);
          logout();
        }
      };

      fetchUser();
    }
  }, []);

  return { isAuthenticated, user, login, logout };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};