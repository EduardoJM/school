import React from 'react';
import type { NextPage } from 'next';
import Head from '../components/infra/Head';
import NavBar from '../components/outside/NavBar';
import NavBarItems from '../data/outside/NavBarItems';

const Home: NextPage = () => (
    <>
        <Head />

        <div className="container">
            <NavBar items={NavBarItems} />
            <h1>Início!</h1>
        </div>
    </>
);

export default Home;
