import React from 'react';
import type { AppProps } from 'next/app';
import { AuthProvider, GlobalDisplayProvider } from '../contexts';
import GlobalStyles from '../styles/Global';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <GlobalDisplayProvider>
            <AuthProvider>
                <Component {...pageProps} />
                <GlobalStyles />
            </AuthProvider>
        </GlobalDisplayProvider>
    );
}

export default MyApp;
