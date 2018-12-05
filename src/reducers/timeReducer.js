import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PREVIOUS_TASKS_SUCCESS:
      return { ...state, tasks: action.previousTasks };
    default:
      return state;
  }
};
