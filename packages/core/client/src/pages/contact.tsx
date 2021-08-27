import React from 'react';
import type { NextPage } from 'next';
import Head from '../components/infra/Head';
import NavBar from '../components/outside/NavBar';
import NavBarItems from '../data/outside/NavBarItems';

const Contact: NextPage = () => (
    <>
        <Head title="Contato" />

        <div className="container">
            <NavBar items={NavBarItems} />
            <h1>Contato!</h1>
        </div>
    </>
);

export default Contact;
