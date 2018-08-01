import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { HashRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import createHistory from 'history/createBrowserHistory';
import 'babel-polyfill';

import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore.js';
import routes from './routes/routes.js';
import './index.css';
import banBackSpace from './banBackSpace.js';

const history = createHistory();
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <LocaleProvider locale={zh_CN}>
                <Router>
                    {renderRoutes(routes)}
                </Router>
            </LocaleProvider>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
banBackSpace();
