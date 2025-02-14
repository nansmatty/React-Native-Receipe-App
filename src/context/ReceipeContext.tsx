import axios from 'axios';
import {createContext, ReactNode, useState} from 'react';

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
  // getReceipes: () => Promise<void>;
  // updateReceipe: (receipe: Receipe) => Promise<void>;
  // deleteReceipe: (receipeId: string) => Promise<void>;
  // isLoading: boolean;
}

export const ReceipeContext = createContext<ReceipeContextData>(
  {} as ReceipeContextData,
);

export const ReceipeProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [receipes, setReceipes] = useState<Receipe[]>([]);

  const createReceipe = async (
    receipe: Omit<Receipe, '_id' | 'createdBy' | 'createdAt'>,
  ) => {
    // try {
    //   const response = await axios.post(`${API_URL}/api/v1/receipes`, receipe, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   setReceipes([...Receipes, response.data.data.receipe]);
    // } catch (error) {
    //   console.error('Error Details', error);
    // }
    console.log({receipe});
  };

  return (
    <ReceipeContext.Provider value={{receipes, createReceipe}}>
      {children}
    </ReceipeContext.Provider>
  );
};
