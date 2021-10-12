import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from '../components/dashboard/Dashboard';
import SubjectsSwitch from '../pages/inside/subjects/SubjectsSwitch';
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
                            <SubjectsSwitch />
                        </Route>
                    </Switch>
                </Dashboard>
            </SearchParamsProvider>
        </BrowserRouter>
    )
};

export default InsideRouter;
