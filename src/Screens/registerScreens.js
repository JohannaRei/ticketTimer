import Navigation from 'react-native-navigation';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

const registerScreens = (store, Provider) => {
  Navigation.registerComponent(
    'app.HomeScreen',
    () => HomeScreen,
    store,
    Provider
  );
  Navigation.registerComponent(
    'app.ProfileScreen',
    () => ProfileScreen,
    store,
    Provider
  );
};
