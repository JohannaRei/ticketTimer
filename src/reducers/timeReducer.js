import initialState from './initialState';
import * as types from '../constants/actionTypes';

const timeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_CURRENT_TASKS_SUCCESS:
      return { ...state, currentTasks: action.currentTasks };
    case types.FETCH_PREVIOUS_TASKS_SUCCESS:
      return { ...state, previousTasks: action.previousTasks };
    case types.DELETE_TASK_SUCCESS:
      return {
        ...state,
        currentTasks: action.currentTasks,
        previousTasks: action.previousTasks
      };
    default:
      return state;
  }
};

export default timeReducer;
