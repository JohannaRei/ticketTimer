import { AsyncStorage } from 'react-native';

const updateTasks = async tasks => {
  try {
    const json = JSON.stringify(tasks);
    await AsyncStorage.setItem('tasks', json);
  } catch (e) {
    console.log(e);
  }
};

const fetchCurrentTasks = async () => {
  try {
    const value = await AsyncStorage.getItem('tasks');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
  return;
};

export { updateTasks, fetchCurrentTasks };
