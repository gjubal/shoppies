import React, { createContext, useCallback, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

import BannerContainer from '../components/BannerContainer';

export interface BannerMessage {
  id: string;
  title: string;
  description?: string;
}

interface BannerContextData {
  addBanner(messages: Omit<BannerMessage, 'id'>): void;
  removeBanner(id: string): void;
}

const BannerContext = createContext<BannerContextData>({} as BannerContextData);

const BannerProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<BannerMessage[]>([]);

  const addBanner = useCallback(
    ({ title, description }: Omit<BannerMessage, 'id'>) => {
      const id = uuid();

      const banner = {
        id,
        title,
        description,
      };

      setMessages(state => [...state, banner]);
    },
    [],
  );

  const removeBanner = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id));
  }, []);

  return (
    <BannerContext.Provider
      value={{
        addBanner,
        removeBanner,
      }}
    >
      {children}
      <BannerContainer messages={messages} />
    </BannerContext.Provider>
  );
};

function useBanner(): BannerContextData {
  const context = useContext(BannerContext);

  if (!context) {
    throw new Error('useBanner must be used within an BannerProvider');
  }

  return context;
}

export { BannerProvider, useBanner, BannerContext };
