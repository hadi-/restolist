import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// Logger with default options
import logger from 'redux-logger';

import resto from './../../redux/resto';
import category from './../../redux/category';

const reducer = combineReducers({
  resto,
  category
});

const configureStore = preloadedState =>
  createStore(reducer, preloadedState, applyMiddleware(
    logger,
    thunk,
  ));

export default configureStore;
