import React from 'react';
import { useDispatch } from 'react-redux';
import { actions } from './redux';

const TestLogin: React.FC = () => {
    const dispatch = useDispatch();

    function handleLogin() {
        dispatch(actions.auth.requestLogin('eduardo', '123456'));
    };

    return (
        <>
            <h1>Testando o Login</h1>
            <button onClick={handleLogin}>Try to Login</button>
        </>
    );
};

export default TestLogin;
