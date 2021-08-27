import React from 'react';
import type { NextPage } from 'next';
import Head from '../components/infra/Head';
import NavBar from '../components/outside/NavBar';
import NavBarItems from '../data/outside/NavBarItems';
import {
    Header,
    HeaderLeft,
    HeaderRight,
    HeaderTitle,
    HeaderSubtitle,
} from '../styles/Home';

const Home: NextPage = () => (
    <>
        <Head />

        <div className="container">
            <NavBar items={NavBarItems} />

            <Header>
                <HeaderLeft>
                    <HeaderTitle>Instituto Inventare</HeaderTitle>
                    <HeaderSubtitle>Olhando para o passado e criando o futuro!</HeaderSubtitle>
                </HeaderLeft>
                <HeaderRight />
            </Header>
        </div>
    </>
);

export default Home;
