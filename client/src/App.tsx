import React from 'react';
import { Provider } from "react-redux";
import store from './redux/stores';
import TestLogin from './TestLogin';

function App() {
    return (
        <Provider store={store}>
            <TestLogin />
        </Provider>
    );
}

export default App;
