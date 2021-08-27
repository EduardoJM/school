import React from 'react';
import type { NextPage } from 'next';
import Head from '../components/infra/Head';
import NavBar from '../components/outside/NavBar';
import NavBarItems from '../data/outside/NavBarItems';

const About: NextPage = () => (
    <>
        <Head title="Sobre" />

        <div className="container">
            <NavBar items={NavBarItems} />
            <h1>Sobre Nós!</h1>
        </div>
    </>
);

export default About;
