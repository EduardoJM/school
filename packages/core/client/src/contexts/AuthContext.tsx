import React, { createContext, useEffect, useState } from 'react';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import Router from 'next/router';

import { User } from '../types/inventare';
import { AuthService, axios } from '../services/inventare';

export interface AuthContextData {
    isAuthenticated: boolean;
    userData: User | null;
    login: (username: string, password: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function verify() {
            const { '@inventare_auth_token': token } = parseCookies();
            if (!token) {
                return;
            }

            try {
                const localUser = await AuthService.retrieveAuthenticatedUserData();
                setUser(localUser);
            } catch (err) {
                axios.defaults.headers.Authorization = undefined;
                // TODO: add better error handling
                console.log('TODO: ERROR: ', JSON.stringify(err.response.data, null, 4));
            }
        }

        verify();
    }, []);

    async function login(username: string, password: string) {
        try {
            const result = await AuthService.auth({ username, password });
            setCookie(undefined, '@inventare_auth_token', result.token, {
                maxAge: 60 * 60 * 24 * 30, // ~ 1 month
            });
            axios.defaults.headers.Authorization = `Bearer ${result.token}`;
            setUser(result.user);

            Router.push('/dashboard');
        } catch (err) {
            // TODO: add better error handling
            console.log('TODO: ERROR: ', JSON.stringify(err.response.data, null, 4));
        }
    }

    function logout() {
        axios.defaults.headers.Authorization = undefined;
        setUser(null);
        destroyCookie(undefined, '@inventare_auth_token');
        Router.push('/login');
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!user,
                userData: user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
