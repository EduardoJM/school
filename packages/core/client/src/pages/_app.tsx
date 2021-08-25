import React from 'react';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../contexts/AuthContext';
import GlobalStyles from '../styles/Global';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
            <GlobalStyles />
        </AuthProvider>
    );
}

export default MyApp;
