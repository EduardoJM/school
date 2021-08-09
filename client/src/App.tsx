import React from 'react';
import { Provider } from "react-redux";
import store from './redux/stores';
import { GlobalDisplays, MessageHub } from './components/global';

import { Login } from './pages';

function App() {
    return (
        <Provider store={store}>
            <Login />
            
            <GlobalDisplays />
            <MessageHub />
        </Provider>
    );
}

export default App;
