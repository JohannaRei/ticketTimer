import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';

export default (initialState: Object) => createStore(rootReducer, initialState);
