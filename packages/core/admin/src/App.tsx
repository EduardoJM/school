import React from 'react';
import { SnackbarProvider } from 'notistack';
import Router from './routes';
import { AuthProvider } from './contexts/auth';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
