import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {createContext, ReactNode, useEffect, useState} from 'react';

const API_URL = 'http://10.0.2.2:4000';

interface AuthContextData {
  token: string | null;
  isLoading: boolean;
  userId: string | null;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  checkAuth: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async (): Promise<boolean> => {
    try {
      const getStoredToken = await AsyncStorage.getItem('token');
      const getStoredUserId = await AsyncStorage.getItem('userId');

      if (getStoredToken && getStoredUserId) {
        setToken(getStoredToken);
        setUserId(getStoredUserId);
        setIsAuthenticated(true);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error Details', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const signUp = async (
    name: string,
    email: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_URL}/api/v1/auth/register`, {
        name,
        email,
        password,
      });

      if (response.status === 201) return true;
      else return false;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error Details', error.response?.data);
      }
      return false;
    }
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_URL}/api/v1/auth/login`, {
        email,
        password,
      });

      const {success, user} = response.data;

      if (success) {
        await AsyncStorage.setItem('token', user.access_token);
        setToken(user.access_token);
        await AsyncStorage.setItem('userId', user._id);
        setUserId(user._id);
        setIsAuthenticated(true);

        return true;
      } else return false;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error Details', error.response?.data);
      }
      return false;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('token');
      setToken(null);
      await AsyncStorage.removeItem('userId');
      setUserId(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error Details', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        isLoading,
        signUp,
        signIn,
        signOut,
        isAuthenticated,
        checkAuth,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
