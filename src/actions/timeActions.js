import * as types from '../constants/actionTypes';

export function fetchPreviousTasksSuccess(res) {
  return {
    type: types.FETCH_PREVIOUS_TASKS_SUCCESS,
    previousTasks: res.data
  };
}

export function fetchPreviousTasks() {
  return function(dispatch) {};
}
