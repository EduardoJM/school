import React, { FormEvent, useState } from 'react';
import { useAuth } from '../hooks';
import Head from '../components/infra/Head';

const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        login(username, password);
    }

    return (
        <>
            <Head title="Entrar" />
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <button type="submit">Entrar</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
