import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from './redux';

const TestLogin: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.auth.requestLogin('eduardo', '123456'));
    }, [dispatch]);

    return (
        <h1>Testando o Login</h1>
    );
};

export default TestLogin;
