import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from '../components/dashboard/Dashboard';

const InsideRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Dashboard>
                <Switch>
                    <Route path="/">
                        <h1>Logado!</h1>
                    </Route>
                </Switch>
            </Dashboard>
        </BrowserRouter>
    )
};

export default InsideRouter;
