import * as types from '../constants/actionTypes';

const _fetchCurrentTasks = () => ({
  type: types.FETCH_CURRENT_TASKS
});

const _fetchCurrentTasksSuccess = body => ({
  type: types.FETCH_CURRENT_TASKS_SUCCESS,
  payload: body
});

const _fetchCurrentTasksFailure = error => ({
  type: types.FETCH_CURRENT_TASKS_FAILURE,
  error
});

export const fetchCurrentTasks = () => dispatch => {
  dispatch(_fetchCurrentTasks());

  return null;
};
