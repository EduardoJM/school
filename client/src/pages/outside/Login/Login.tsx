import React from 'react';
import { Form } from '@unform/web';
import { useDispatch } from 'react-redux';
import { MdAccountCircle, MdLock } from 'react-icons/md';
import { LoginBox, LoginPageContainer } from './styles';
import { Input } from '../../../components/forms';
import { AuthRequestBody } from '../../../types/inventare';
import { actions } from '../../../redux';

const Login: React.FC = () => {
    const dispatch = useDispatch();

    function handleLogin(data: AuthRequestBody) {
        dispatch(actions.auth.requestLogin(data.username, data.password));
    }

    return (
        <LoginPageContainer>
            <LoginBox>
                <h2>Entrar</h2>

                <Form onSubmit={handleLogin}>
                    <Input
                        name="username"
                        label="Nome de Usuário"
                        id="username"
                        type="text"
                        icon={(<MdAccountCircle size={32} />)}
                    />

                    <Input
                        name="password"
                        label="Senha"
                        id="password"
                        type="password"
                        icon={(<MdLock size={32} />)}
                    />

                    <button type="submit">Entrar</button>
                </Form>
            </LoginBox>
        </LoginPageContainer>
    )
};

export default Login;
