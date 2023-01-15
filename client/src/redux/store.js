import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import reducer from './reducer.js';
import rootReducer from './rootReducer.js'

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

// console.log('store: ', store.getState())

export default store;