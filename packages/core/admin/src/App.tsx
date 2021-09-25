import React from 'react';
import { SnackbarProvider } from 'notistack';
import Router from './routes';
import { AuthProvider } from './contexts/auth';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

function App() {
    return (
        <SnackbarProvider maxSnack={3}>
            <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    <Router />
                </QueryClientProvider>
            </AuthProvider>
        </SnackbarProvider>
    );
}

export default App;
