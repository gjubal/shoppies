import React, { createContext, useContext, useState } from 'react';

import { MovieProps } from '../pages/Landing';

interface StorageContextData {
  persistentNominations: MovieProps[];
  persistentWinners: MovieProps[];
  setPersistentNominations(param: MovieProps[]): void;
  setPersistentWinners(param: MovieProps[]): void;
}

const StorageContext = createContext<StorageContextData>(
  {} as StorageContextData,
);

const StorageProvider: React.FC = ({ children }) => {
  const localNominations = JSON.parse(
    localStorage.getItem('nominations') || '[]',
  );
  const localWinners = JSON.parse(localStorage.getItem('winners') || '[]');
  const [persistentNominations, setPersistentNominations] = useState(
    localNominations,
  );
  const [persistentWinners, setPersistentWinners] = useState(localWinners);

  return (
    <StorageContext.Provider
      value={{
        persistentNominations,
        persistentWinners,
        setPersistentNominations,
        setPersistentWinners,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

function useStorage(): StorageContextData {
  const context = useContext(StorageContext);

  if (!context) {
    throw new Error('useStorage must be used within an StorageProvider');
  }

  return context;
}

export { StorageProvider, useStorage, StorageContext };
