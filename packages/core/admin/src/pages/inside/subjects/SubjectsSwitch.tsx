import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { SubjectsAdd } from './SubjectsAdd';
import { SubjectsList } from './SubjectsList';

const SubjectsSwitch: React.FC = () => {
    return (
        <Switch>
            <Route path="/subjects/add">
                <SubjectsAdd />
            </Route>
            <Route path="/subjects/" exact>
                <SubjectsList />
            </Route>
            <Route path="/subjects/:page/">
                <SubjectsList />
            </Route>
        </Switch>
    )
};

export default SubjectsSwitch;
