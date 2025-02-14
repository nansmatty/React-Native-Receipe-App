import axios from 'axios';
import {createContext, ReactNode, useContext, useState} from 'react';
import {AuthContext} from './AuthContext';

const API_URL = 'http://10.0.2.2:4000';

export interface Receipe {
  _id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  createdBy: string;
  createdAt: string;
}

interface ReceipeContextData {
  receipes: Receipe[];
  createReceipe: (
    receipe: Omit<Receipe, '_id' | 'createdBy' | 'createdAt'>,
  ) => Promise<void>;
  getReceipes: () => Promise<void>;
  getReceipeByID: (receipeId: string) => Promise<Receipe>;
  deleteReceipe: (receipeId: string) => Promise<void>;
}

export const ReceipeContext = createContext<ReceipeContextData>(
  {} as ReceipeContextData,
);

export const ReceipeProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [receipes, setReceipes] = useState<Receipe[]>([]);
  const {token} = useContext(AuthContext);

  const getReceipes = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/receipes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data?.success) {
        setReceipes(response.data.data.receipes);
      }
    } catch (error) {
      console.error('Error Details', error);
    }
  };

  const createReceipe = async (
    receipe: Omit<Receipe, '_id' | 'createdBy' | 'createdAt'>,
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/receipes/create`,
        receipe,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response?.data?.success) {
        setReceipes([...receipes, response.data.data.receipe]);
      }
    } catch (error) {
      console.error('Error Details', error);
    }
  };

  const getReceipeByID = async (receipeId: string) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/receipes/${receipeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response?.data?.success) {
        return response.data.data.receipe;
      }
    } catch (error) {
      console.error('Error Details', error);
    }
  };

  const deleteReceipe = async (receipeId: string) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/v1/receipes/${receipeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response?.data?.success) {
        setReceipes(receipes.filter(receipe => receipe._id !== receipeId));
      }
    } catch (error) {
      console.error('Error Details', error);
    }
  };

  return (
    <ReceipeContext.Provider
      value={{
        receipes,
        createReceipe,
        getReceipes,
        getReceipeByID,
        deleteReceipe,
      }}>
      {children}
    </ReceipeContext.Provider>
  );
};
