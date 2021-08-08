import { Action } from 'redux';

export interface AuthActionTypePayloadMap {
    'AuthSetTokens': {
        refresh?: string;
        access?: string;
    },
    'AuthRequestLogin': {
        username: string;
        password: string;
    };
}

export interface AuthAction<K extends keyof AuthActionTypePayloadMap> extends Action<K> {
    payload: AuthActionTypePayloadMap[K];
}

export type AuthActionType = keyof AuthActionTypePayloadMap;

export type AuthActionCollection =
    AuthAction<'AuthRequestLogin'> |
    AuthAction<'AuthSetTokens'>;

const authActions = {
    setTokens: function(access?: string, refresh?: string): AuthAction<'AuthSetTokens'> {
        return { type: 'AuthSetTokens', payload: { access, refresh } };
    },
    requestLogin: function(username: string, password: string): AuthAction<'AuthRequestLogin'> {
        return { type: 'AuthRequestLogin', payload: { username, password } };
    }
};

export default authActions;
