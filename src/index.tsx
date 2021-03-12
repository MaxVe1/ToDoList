import {store} from './state/store';
import {Provider} from 'react-redux';
import React from 'react';
import AppWithRedux from './AppWithRedux';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
ReactDOM.render(
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>, document.getElementById('root'));