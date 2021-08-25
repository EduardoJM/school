import React from 'react';
import type { NextPage } from 'next';
import Head from '../components/infra/Head';
import NavBar from '../components/outside/NavBar';

const Home: NextPage = () => (
    <>
        <Head />

        <div className="container">
            <NavBar
                items={[
                    {
                        text: 'Sobre Nós',
                        path: '/about',
                    },
                    {
                        text: 'Preços',
                        path: '/pricing',
                    },
                    {
                        text: 'Contato',
                        path: '/contact',
                    },
                ]}
            />
            <h1>HELLO!</h1>
        </div>
    </>
);

export default Home;
