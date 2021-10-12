import React from 'react';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@mui/material';
import Router from './routes';
import { AuthProvider } from './contexts';
import { QueryClientProvider, QueryClient } from 'react-query';
import { theme } from './configs';
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient();

function App() {
    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3}>
                <AuthProvider>
                    <QueryClientProvider client={queryClient}>
                        <Router />
                        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
                    </QueryClientProvider>
                </AuthProvider>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
