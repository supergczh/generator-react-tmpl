
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from '../reducers';

const history = createHistory();

export default function configureStore(initialState) {
  const persistedState = initialState;
  const store = createStore(
    rootReducer,
    persistedState,
    compose(
      applyMiddleware(thunk, routerMiddleware(history)),
      (process.env.NODE_ENV === 'development') &&
        typeof window === 'object' &&
        typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f // add support for Redux dev tools
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store;
}