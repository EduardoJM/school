import React from 'react';
import { useSelector } from 'react-redux';
import { Store } from '../../../redux';
import { LoadingPage, LoadingIndicator } from './styles';

const GlobalDisplays: React.FC = () => {
    const { loadingCount } = useSelector((store: Store) => store.globals);

    return (
        <>
            {loadingCount > 0 && (
                <LoadingPage>
                    <LoadingIndicator />
                </LoadingPage>
            )}
        </>
    );
};

export default GlobalDisplays;
