import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { SubjectsAdd } from './SubjectsAdd';
import { SubjectsList } from './SubjectsList';

export const SubjectsRouter: React.FC = () => {
    return (
        <Switch>
            <Route path="/subjects/add" exact>
                <SubjectsAdd />
            </Route>
            <Route path="/subjects/:id" exact>
                <SubjectsAdd />
            </Route>
            <Route path="/subjects/" exact>
                <SubjectsList />
            </Route>
        </Switch>
    )
};
