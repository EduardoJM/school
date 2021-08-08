import { all, takeLatest, call, put } from 'redux-saga/effects';
import actions, { AuthAction } from '../actions';
import { AuthResponseBody } from '../../types/inventare';
import { axios, AuthService } from '../../services/inventare';
import { displayAPIError } from '../../utils/errors';

function* login(action: AuthAction<'AuthRequestLogin'>) {
    const { username, password } = action.payload;
    yield put(actions.globals.pushLoading());
    try {
        const response: AuthResponseBody = yield call(AuthService.auth, { username, password });
        axios.defaults.headers.Authorization = `Bearer ${response.access}`;
        console.log(response.access);
        localStorage.setItem('@INVENTARE_REFRESH_TOKEN', response.refresh);
        yield put(actions.auth.setTokens(response.access, response.refresh));
    } catch (err) {
        yield put(actions.globals.pushMessage(displayAPIError(err)));
    } finally {
        yield put(actions.globals.popLoading());
    }
}

function* watchLogin() {
    yield takeLatest<AuthAction<'AuthRequestLogin'>>('AuthRequestLogin', login);
};

export default function* authSagas() {
    yield all([
        watchLogin(),
    ]);
}
