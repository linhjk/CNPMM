import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {LocaleProvider} from 'antd';
import configureStore from './store';
import en_US from 'antd/lib/locale-provider/en_US';
import moment from 'moment';
import {BrowserRouter as Router} from "react-router-dom";
import {createBrowserHistory as history} from "history";

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

moment.locale('en');
ReactDOM.render(
    <Provider store={configureStore()}>
        <App />
    </Provider>, document.getElementById('root'));
// ReactDOM.render(
//     <Router history={history}>
//       <LocaleProvider locale={en_US}>
//         <App/>
//       </LocaleProvider>
//     </Router>, document.getElementById('root')
//   );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
