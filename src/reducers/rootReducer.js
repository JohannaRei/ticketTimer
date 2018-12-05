import { combineReducers } from 'redux';
import timeReducer from './timeReducer';

const rootReducer = combineReducers({ timeReducer });

export default rootReducer;
