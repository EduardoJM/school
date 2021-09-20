import React from 'react';
import { useAuth } from '../contexts/auth';
import InsideRouter from './InsideRouter';
import OutsideRouter from './OutsideRouter';

const Router: React.FC = () => {
    const { loggedIn } = useAuth();

    return (loggedIn ? <InsideRouter /> : <OutsideRouter />);
}

export default Router;
