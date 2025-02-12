import axios from 'axios';
import {createContext, ReactNode, useState} from 'react';

const API_URL = 'http://10.0.2.2:4000';

interface AuthContextData {
  token: string | null;
  isLoading: boolean;
  userId: string | null;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

      if (response.status === 201) return true;
      else return false;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error Details', error.response?.data);
      }
      return false;
    }
  };

  const signOut = async (): Promise<void> => {};

  return (
    <AuthContext.Provider
      value={{token, userId, isLoading, signUp, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};
