export interface AuthStore {
    tokens: {
        access?: string | null;
        refresh?: string | null;
    };
}

export const AuthStoreInitial: AuthStore = {
    tokens: {
        access: null,
        refresh: null,
    },
};
