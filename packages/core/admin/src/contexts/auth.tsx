import React, { createContext, useContext, useState } from 'react';
import { useSnackbar } from 'notistack';
import { User } from '../entities';
import { api } from '../services/api';
import { login } from '../services/peoples/auth';
import { getDisplayErrorMessage } from '../utils/error';

export interface AuthContextData {
    loggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [user, setUser] = useState<User | null>(null);

    async function handleLogin(email: string, password: string) {
        try {
            const userResponse = await login(email, password);
            setUser(userResponse.user);

            api.defaults.headers.Authorization = `Bearer ${userResponse.token}`;

            localStorage.setItem('@INVENTARE:JWT', userResponse.token);
        } catch(err) {
            enqueueSnackbar(getDisplayErrorMessage(err), { variant: 'error' });
        }
    }

    async function handleLogout() {
        localStorage.removeItem('@INVENTARE:JWT');
        api.defaults.headers.Authorization = undefined;
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                loggedIn: !!user,
                user,
                login: handleLogin,
                logout: handleLogout,
            }}
        >
            { children }
        </AuthContext.Provider>
    );
};

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
    return context;
}
