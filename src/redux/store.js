import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';

import thunk from './thunk';
import rootReducer from './reducers';
import defaultState from './defaultState';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [
  thunk,
  logger,
];

export default createStore(
  rootReducer,
  defaultState,
  composeEnhancers(
    applyMiddleware(...middleware)
  )
);