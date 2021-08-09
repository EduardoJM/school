import React from 'react';
import { Provider } from "react-redux";
import store from './redux/stores';
import { GlobalDisplays, MessageHub } from './components/global';
import TestLogin from './TestLogin';

function App() {
    return (
        <Provider store={store}>
            <TestLogin />
            
            <GlobalDisplays />
            <MessageHub />
        </Provider>
    );
}

export default App;
