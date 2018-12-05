import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';

export function configureStore() {
  return createStore(rootReducer);
}
