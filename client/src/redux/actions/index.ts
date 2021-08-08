import authActions from './auth';
import globalActions from './globals';

const actions = {
    auth: authActions,
    globals: globalActions,
};

export default actions;
export type { AuthAction, AuthActionCollection, AuthActionType } from './auth';
export type { GlobalAction, GlobalActionCollection, GlobalActionType } from './globals';
