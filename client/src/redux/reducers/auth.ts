import { AuthActionCollection } from '../actions';
import { AuthStore, AuthStoreInitial } from '../stores/auth';

export default function authReducer(
    state: AuthStore = AuthStoreInitial,
    action: AuthActionCollection
) : AuthStore {
    if (action.type === 'AuthSetTokens') {
        return {
            ...state,
            tokens: {
                ...state.tokens,
                ...action.payload,
            },
        };
    }
    return state;
}
