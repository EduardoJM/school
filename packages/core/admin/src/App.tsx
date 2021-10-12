import React from 'react';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@mui/material';
import Router from './routes';
import { AuthProvider } from './contexts';
import { QueryClientProvider, QueryClient } from 'react-query';
import { theme } from './configs';

const queryClient = new QueryClient();

function App() {
    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
                <AuthProvider>
                    <QueryClientProvider client={queryClient}>
                        <Router />
                    </QueryClientProvider>
                </AuthProvider>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
