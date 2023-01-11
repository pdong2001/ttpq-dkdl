import React from 'react';
import App from './App';
import Loading from './components/Loading';
import AuthProvider from './providers/auth';

const AppContainer = () => {
  return (
    <AuthProvider>
      <App />
      <Loading />
    </AuthProvider>
  );
};

export default AppContainer;
