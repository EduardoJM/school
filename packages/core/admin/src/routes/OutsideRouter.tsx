import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../pages/outside/Login';

const OutsideRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/">
                    <Login />
                </Route>
            </Switch>
        </BrowserRouter>
    )
};

export default OutsideRouter;
