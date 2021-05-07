import React from 'react';
import { BannerProvider } from './banner';
import { StorageProvider } from './storage';

import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => {
  return (
    <StorageProvider>
      <BannerProvider>
        <ToastProvider>{children}</ToastProvider>;
      </BannerProvider>
    </StorageProvider>
  );
};

export default AppProvider;
