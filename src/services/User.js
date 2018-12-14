import { AsyncStorage } from 'react-native';

const updateUser = async user => {
  try {
    const value = JSON.stringify(user);
    await AsyncStorage.setItem('user', value);
  } catch (e) {
    console.log(e);
  }
};

const getUser = async () => {
  try {
    const value = await AsyncStorage.getItem('user');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};

export { updateUser, getUser };
