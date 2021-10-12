import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from '../components/dashboard/Dashboard';
import { SubjectsRouter, TagsRouter } from '../pages/inside';
import { SearchParamsProvider } from '../contexts';

const InsideRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <SearchParamsProvider>
                <Dashboard>
                    <Switch>
                        <Route path="/" exact>
                            Testing
                        </Route>
                        <Route path="/subjects">
                            <SubjectsRouter />
                        </Route>
                        <Route path="/tags">
                            <TagsRouter />
                        </Route>
                    </Switch>
                </Dashboard>
            </SearchParamsProvider>
        </BrowserRouter>
    )
};

export default InsideRouter;
