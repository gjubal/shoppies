import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/globals';

import Routes from './routes';
import AppProvider from './hooks';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>

      <GlobalStyle />
    </BrowserRouter>
  );
};

export default App;
