import initialState from './initialState';
import { FETCH_PREVIOUS_TASKS_SUCCESS } from '../constants/actionTypes';

const timeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PREVIOUS_TASKS_SUCCESS:
      return { ...state, previousTasks: action.previousTasks };
    default:
      return state;
  }
};

export default timeReducer;
