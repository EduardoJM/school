import React, { createContext, useContext, useEffect, useState } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { useSnackbar } from 'notistack';
//import { User } from '../entities';
//import { api } from '../services/api';
//import { login, validate } from '../services/peoples/auth';
import { AuthServices, User, api } from '@inventare/sdk';
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
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    async function handleLogin(email: string, password: string) {
        try {
            setLoading(true);
            const userResponse = await AuthServices.login(email, password);
            setUser(userResponse.user);

            api.defaults.headers.Authorization = `Bearer ${userResponse.token}`;

            localStorage.setItem('@INVENTARE:JWT', userResponse.token);
            setLoading(false);
        } catch(err) {
            setLoading(false);
            enqueueSnackbar(getDisplayErrorMessage(err), { variant: 'error' });
        }
    }

    async function handleLogout() {
        localStorage.removeItem('@INVENTARE:JWT');
        api.defaults.headers.Authorization = undefined;
        setUser(null);
    }

    useEffect(() => {
        async function handleValidateLogin() {
            const jwt = localStorage.getItem('@INVENTARE:JWT');
            if (!jwt) {
                return;
            }
            setLoading(true);
            api.defaults.headers.Authorization = `Bearer ${jwt}`;

            try {
                //const user = await validate();
                const user = await AuthServices.validate();
                setUser(user);
                setLoading(false);
            } catch(err) {
                enqueueSnackbar(getDisplayErrorMessage(err), { variant: 'error' });
                api.defaults.headers.Authorization = undefined;
                localStorage.removeItem('@INVENTARE:JWT');
                setLoading(false);
            }
        }

        handleValidateLogin();
    }, [enqueueSnackbar]);

    return (
        <>
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
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
};

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
    return context;
}
