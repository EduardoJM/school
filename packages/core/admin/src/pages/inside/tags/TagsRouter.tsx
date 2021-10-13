import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { TagsAdd } from './TagsAdd';
import { TagsList } from './TagsList';

export const TagsRouter: React.FC = () => {
    return (
        <Switch>
            <Route path="/tags/:subject/add" exact>
                <TagsAdd />
            </Route>
            <Route path="/tags/:subject/:id" exact>
                <TagsAdd />
            </Route>
            <Route path="/tags/:subject" exact>
                <TagsList />
            </Route>
        </Switch>
    )
};
