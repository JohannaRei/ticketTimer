import { Navigation } from 'react-native-navigation';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

export function registerScreens(/*store, Provider*/) {
  Navigation.registerComponentWithRedux(
    'app.HomeScreen',
    () => HomeScreen /*,
    store,
    Provider*/
  );
  Navigation.registerComponentWithRedux(
    'app.ProfileScreen',
    () => ProfileScreen /*,
    store,
    Provider*/
  );
}
