import { combineReducers } from 'redux';
import authReducer from './auth';
import globalsReducer from './globals';

const reducers = combineReducers({
    auth: authReducer,
    globals: globalsReducer,
});

export default reducers;
